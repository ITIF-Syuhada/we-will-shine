import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });
dotenv.config({ path: resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
	console.error('❌ Missing Supabase credentials!');
	console.error('PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
	console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
	process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface Student {
	id: string;
	student_code: string;
	student_name: string;
	points: number;
	level: number;
	kelas?: string;
	rombel?: string;
	angkatan?: string;
	created_at: string;
}

async function cleanupStudents() {
	console.log('\n🧹 Starting student cleanup process...\n');

	try {
		// 1. Get all students
		console.log('📊 Fetching all students...');
		const { data: students, error: fetchError } = await supabase
			.from('students')
			.select('*')
			.order('created_at', { ascending: true });

		if (fetchError) {
			throw fetchError;
		}

		console.log(`✓ Found ${students?.length || 0} total students\n`);

		if (!students || students.length === 0) {
			console.log('ℹ️  No students found. Nothing to clean up.');
			return;
		}

		// 2. Find duplicates based on student_code
		console.log('🔍 Identifying duplicates...');
		const codeMap = new Map<string, Student[]>();

		students.forEach((student) => {
			const code = student.student_code;
			if (!codeMap.has(code)) {
				codeMap.set(code, []);
			}
			codeMap.get(code)!.push(student as Student);
		});

		const duplicates = Array.from(codeMap.entries()).filter(([, list]) => list.length > 1);

		console.log(`✓ Found ${duplicates.length} duplicate student codes\n`);

		// 3. Remove duplicates (keep the oldest one based on created_at)
		if (duplicates.length > 0) {
			console.log('🗑️  Removing duplicate students...');

			for (const [code, studentList] of duplicates) {
				// Sort by created_at, keep the first (oldest)
				const sorted = studentList.sort(
					(a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
				);

				const toKeep = sorted[0];
				const toDelete = sorted.slice(1);

				console.log(`\n  Code: ${code}`);
				console.log(`  ✓ Keeping: ${toKeep.student_name} (ID: ${toKeep.id.substring(0, 8)}...)`);
				console.log(`  ✗ Deleting ${toDelete.length} duplicate(s):`);

				for (const student of toDelete) {
					console.log(
						`    - ${student.student_name} (ID: ${student.id.substring(0, 8)}..., Created: ${new Date(student.created_at).toLocaleString()})`
					);

					const { error: deleteError } = await supabase
						.from('students')
						.delete()
						.eq('id', student.id);

					if (deleteError) {
						console.error(`    ❌ Failed to delete: ${deleteError.message}`);
					} else {
						console.log(`    ✓ Deleted successfully`);
					}
				}
			}
		}

		// 4. Reset points and level for all remaining students
		console.log('\n🔄 Resetting points and levels for all students...');

		const { data: remainingStudents, error: remainingError } = await supabase
			.from('students')
			.select('id, student_name, student_code');

		if (remainingError) {
			throw remainingError;
		}

		if (remainingStudents && remainingStudents.length > 0) {
			const { error: resetError } = await supabase
				.from('students')
				.update({
					points: 0,
					level: 1
				})
				.neq('id', '00000000-0000-0000-0000-000000000000'); // Update all

			if (resetError) {
				throw resetError;
			}

			console.log(`✓ Reset ${remainingStudents.length} students to points: 0, level: 1\n`);
		}

		// 5. Clean up related tables
		console.log('🗑️  Cleaning up activity tracking tables...');

		// Delete all sessions
		const { error: sessionsError } = await supabase.from('student_sessions').delete().neq('id', '');

		if (sessionsError && sessionsError.code !== 'PGRST116') {
			// PGRST116 = no rows found (table empty)
			console.error(`  ❌ Failed to clean sessions: ${sessionsError.message}`);
		} else {
			console.log('  ✓ Cleared all student_sessions');
		}

		// Delete all activity logs
		const { error: activityError } = await supabase
			.from('student_activity_log')
			.delete()
			.neq('id', '');

		if (activityError && activityError.code !== 'PGRST116') {
			console.error(`  ❌ Failed to clean activity logs: ${activityError.message}`);
		} else {
			console.log('  ✓ Cleared all student_activity_log');
		}

		// Delete all login stats
		const { error: statsError } = await supabase
			.from('student_login_stats')
			.delete()
			.neq('student_id', '');

		if (statsError && statsError.code !== 'PGRST116') {
			console.error(`  ❌ Failed to clean login stats: ${statsError.message}`);
		} else {
			console.log('  ✓ Cleared all student_login_stats');
		}

		// 6. Final summary
		const { data: finalStudents, error: finalError } = await supabase.from('students').select('*');

		if (finalError) {
			throw finalError;
		}

		console.log('\n' + '═'.repeat(60));
		console.log('✅ CLEANUP COMPLETE!');
		console.log('═'.repeat(60));
		console.log(`\n📊 Final Statistics:`);
		console.log(`  • Total students: ${finalStudents?.length || 0}`);
		console.log(
			`  • Duplicates removed: ${duplicates.reduce((sum, [, list]) => sum + (list.length - 1), 0)}`
		);
		console.log(`  • All students reset to: points: 0, level: 1`);
		console.log(`  • All tracking data cleared`);
		console.log('\n💡 Students can now login fresh to populate tracking data!\n');
	} catch (error) {
		console.error('\n❌ Error during cleanup:', error);
		process.exit(1);
	}
}

// Run the cleanup
cleanupStudents();
