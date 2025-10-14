import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';
import { browser } from '$app/environment';

// Singleton pattern to prevent multiple instances
let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
	if (supabaseInstance) {
		return supabaseInstance;
	}

	const supabaseUrl = env.PUBLIC_SUPABASE_URL || '';
	const supabaseKey = env.PUBLIC_SUPABASE_ANON_KEY || '';

	supabaseInstance = createClient(supabaseUrl, supabaseKey, {
		auth: {
			persistSession: browser,
			storageKey: 'we-will-shine-auth',
			autoRefreshToken: true,
			detectSessionInUrl: false
		}
	});

	return supabaseInstance;
}

export const supabase = getSupabaseClient();

// Database types (will be updated with actual schema)
export interface Student {
	id: string;
	student_code: string;
	student_name: string;
	points: number;
	level: number;
	kelas?: string; // e.g., "X", "XI", "XII"
	rombel?: string; // e.g., "A", "B", "C"
	angkatan?: string; // e.g., "2024", "2025"
	created_at: string;
	updated_at: string;
}

export interface ChatMessage {
	id: string;
	student_id: string;
	type: 'user' | 'bot';
	message: string;
	created_at: string;
}

export interface StudentInsight {
	id: string;
	student_id: string;
	topics: Record<string, number>; // { coding: 0.8, design: 0.6 }
	learning_style: 'visual' | 'auditory' | 'kinesthetic' | null;
	sentiment_trend: Array<{
		date: string;
		mood: string;
		confidence: number;
	}>;
	subjects: Array<{
		name: string;
		hours: number;
		progress: number;
	}>;
	challenges: Array<{
		topic: string;
		frequency: number;
		resolved: boolean;
	}>;
	study_schedule: Array<{
		subject: string;
		time: string;
		duration: number;
	}>;
	completion_rate: number;
	created_at: string;
	updated_at: string;
}

export interface Achievement {
	id: string;
	student_id: string;
	achievement_id: string;
	unlocked_at: string;
}

export interface Admin {
	id: string;
	email: string;
	name: string;
	role: 'super_admin' | 'admin' | 'teacher';
	permissions: string[];
	created_at: string;
}

export interface StudentSession {
	id: string;
	student_id: string;
	session_token: string;
	is_active: boolean;
	device_type?: string;
	browser?: string;
	os?: string;
	ip_address?: string;
	user_agent?: string;
	login_at: string;
	last_activity_at: string;
	logout_at?: string;
	created_at: string;
}

export interface StudentActivityLog {
	id: string;
	student_id: string;
	session_id: string;
	activity_type: string;
	activity_data: Record<string, unknown>;
	page_url?: string;
	duration_seconds?: number;
	created_at: string;
}

export interface StudentLoginStats {
	student_id: string;
	total_logins: number;
	first_login_at?: string;
	last_login_at?: string;
	last_logout_at?: string;
	total_sessions: number;
	active_sessions: number;
	longest_session_minutes: number;
	average_session_minutes: number;
	devices_used: Array<{ type: string; count: number; last_used: string }>;
	browsers_used: Array<{ name: string; count: number; last_used: string }>;
	most_active_hour?: number;
	most_active_day?: string;
	total_activity_minutes: number;
	current_streak_days: number;
	longest_streak_days: number;
	last_activity_date?: string;
	updated_at: string;
}

// Helper functions
export const db = {
	// Students
	async getStudent(code: string) {
		const { data, error } = await supabase
			.from('students')
			.select('*')
			.eq('student_code', code)
			.maybeSingle();

		if (error) throw error;
		return data as Student | null;
	},

	async createStudent(student: Omit<Student, 'id' | 'created_at' | 'updated_at'>) {
		const { data, error } = await supabase.from('students').insert(student).select().single();

		if (error) throw error;
		return data as Student;
	},

	async updateStudent(id: string, updates: Partial<Student>) {
		const { data, error } = await supabase
			.from('students')
			.update({ ...updates, updated_at: new Date().toISOString() })
			.eq('id', id)
			.select()
			.single();

		if (error) throw error;
		return data as Student;
	},

	async bulkCreateStudents(students: Omit<Student, 'id' | 'created_at' | 'updated_at'>[]) {
		const { data, error } = await supabase.from('students').insert(students).select();

		if (error) throw error;
		return data as Student[];
	},

	async getStudentsWithFilter(filters: {
		kelas?: string;
		rombel?: string;
		angkatan?: string;
		search?: string;
		limit?: number;
		offset?: number;
	}) {
		let query = supabase.from('students').select('*', { count: 'exact' });

		if (filters.kelas) {
			query = query.eq('kelas', filters.kelas);
		}
		if (filters.rombel) {
			query = query.eq('rombel', filters.rombel);
		}
		if (filters.angkatan) {
			query = query.eq('angkatan', filters.angkatan);
		}
		if (filters.search) {
			query = query.or(
				`student_name.ilike.%${filters.search}%,student_code.ilike.%${filters.search}%`
			);
		}

		query = query.order('student_name', { ascending: true });

		if (filters.limit) {
			query = query.limit(filters.limit);
		}
		if (filters.offset) {
			query = query.range(filters.offset, filters.offset + (filters.limit || 40) - 1);
		}

		const { data, error, count } = await query;

		if (error) throw error;
		return { students: data as Student[], total: count || 0 };
	},

	async getUniqueValues() {
		const { data, error } = await supabase.from('students').select('kelas,rombel,angkatan');

		if (error) throw error;

		if (!data || data.length === 0) {
			return { kelas: [], rombel: [], angkatan: [] };
		}

		const kelas = [...new Set(data.map((s) => s.kelas).filter(Boolean))].sort();
		const rombel = [...new Set(data.map((s) => s.rombel).filter(Boolean))].sort();
		const angkatan = [...new Set(data.map((s) => s.angkatan).filter(Boolean))].sort();

		return { kelas, rombel, angkatan };
	},

	// Chat Messages
	async getChatHistory(studentId: string, limit = 50) {
		const { data, error } = await supabase
			.from('chat_messages')
			.select('*')
			.eq('student_id', studentId)
			.order('created_at', { ascending: true })
			.limit(limit);

		if (error) throw error;
		return data as ChatMessage[];
	},

	async saveChatMessage(message: Omit<ChatMessage, 'id' | 'created_at'>) {
		const { data, error } = await supabase.from('chat_messages').insert(message).select().single();

		if (error) throw error;
		return data as ChatMessage;
	},

	// Student Insights
	async getInsights(studentId: string) {
		const { data, error } = await supabase
			.from('student_insights')
			.select('*')
			.eq('student_id', studentId)
			.single();

		if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
		return data as StudentInsight | null;
	},

	async updateInsights(
		studentId: string,
		insights: Partial<Omit<StudentInsight, 'id' | 'student_id' | 'created_at' | 'updated_at'>>
	) {
		const existing = await this.getInsights(studentId);

		if (existing) {
			const { data, error } = await supabase
				.from('student_insights')
				.update({ ...insights, updated_at: new Date().toISOString() })
				.eq('student_id', studentId)
				.select()
				.single();

			if (error) throw error;
			return data as StudentInsight;
		} else {
			const { data, error } = await supabase
				.from('student_insights')
				.insert({ student_id: studentId, ...insights })
				.select()
				.single();

			if (error) throw error;
			return data as StudentInsight;
		}
	},

	// Achievements
	async getAchievements(studentId: string) {
		const { data, error } = await supabase
			.from('achievements')
			.select('*')
			.eq('student_id', studentId);

		if (error) throw error;
		return data as Achievement[];
	},

	async unlockAchievement(studentId: string, achievementId: string) {
		const { data, error } = await supabase
			.from('achievements')
			.insert({ student_id: studentId, achievement_id: achievementId })
			.select()
			.single();

		if (error) throw error;
		return data as Achievement;
	},

	// Study Sessions
	async getStudySessions(studentId: string, limit = 30) {
		const { data, error } = await supabase
			.from('study_sessions')
			.select('*')
			.eq('student_id', studentId)
			.order('started_at', { ascending: false })
			.limit(limit);

		if (error) throw error;
		return data;
	},

	async createStudySession(session: {
		student_id: string;
		subject: string;
		duration_minutes: number;
		started_at: string;
	}) {
		const { data, error } = await supabase.from('study_sessions').insert(session).select().single();

		if (error) throw error;
		return data;
	},

	// Admin Authentication
	async adminLogin(email: string, password: string) {
		const { data, error } = await supabase
			.from('admins')
			.select('*')
			.eq('email', email)
			.eq('password_hash', password) // In production, use proper password hashing
			.maybeSingle();

		if (error) {
			console.error('Admin login error:', error);
			throw error;
		}
		return data as Admin | null;
	},

	async getAdmin(id: string) {
		const { data, error } = await supabase.from('admins').select('*').eq('id', id).single();

		if (error) throw error;
		return data as Admin;
	},

	async createAdmin(admin: {
		email: string;
		password_hash: string;
		name: string;
		role: 'super_admin' | 'admin' | 'teacher';
		permissions: string[];
	}) {
		const { data, error } = await supabase.from('admins').insert(admin).select().single();

		if (error) throw error;
		return data as Admin;
	},

	// Admin Analytics
	async getAllStudents() {
		const { data, error } = await supabase
			.from('students')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) throw error;
		return data as Student[];
	},

	async getStudentAnalytics(studentId: string) {
		const [student, insights, chats, achievements, sessions] = await Promise.all([
			this.getStudent(studentId),
			this.getInsights(studentId),
			this.getChatHistory(studentId, 100),
			this.getAchievements(studentId),
			this.getStudySessions(studentId, 30)
		]);

		return {
			student,
			insights,
			chats,
			achievements,
			sessions
		};
	},

	// Student Activity Tracking Functions
	async getStudentSessions(studentId: string, limit = 10) {
		const { data, error } = await supabase
			.from('student_sessions')
			.select('*')
			.eq('student_id', studentId)
			.order('login_at', { ascending: false })
			.limit(limit);

		if (error) throw error;
		return data as StudentSession[];
	},

	async getStudentActivities(studentId: string, limit = 10) {
		const { data, error } = await supabase
			.from('student_activity_log')
			.select('*')
			.eq('student_id', studentId)
			.order('created_at', { ascending: false })
			.limit(limit);

		if (error) throw error;
		return data as StudentActivityLog[];
	},

	async getStudentLoginStats(studentId: string) {
		const { data, error } = await supabase
			.from('student_login_stats')
			.select('*')
			.eq('student_id', studentId)
			.single();

		if (error) {
			// Return default stats if not found
			if (error.code === 'PGRST116') {
				return null;
			}
			throw error;
		}
		return data as StudentLoginStats;
	},

	async getStudentDetailData(studentId: string) {
		const [sessions, activities, stats] = await Promise.all([
			this.getStudentSessions(studentId, 10),
			this.getStudentActivities(studentId, 10),
			this.getStudentLoginStats(studentId)
		]);

		return {
			sessions,
			activities,
			stats
		};
	},

	// Create new session when student logs in
	async createStudentSession(
		studentId: string,
		deviceInfo?: {
			browser?: string;
			os?: string;
			deviceType?: string;
			ipAddress?: string;
			userAgent?: string;
		}
	) {
		const sessionToken = crypto.randomUUID();

		const { data, error } = await supabase
			.from('student_sessions')
			.insert({
				student_id: studentId,
				session_token: sessionToken,
				is_active: true,
				device_type: deviceInfo?.deviceType,
				browser: deviceInfo?.browser,
				os: deviceInfo?.os,
				ip_address: deviceInfo?.ipAddress,
				user_agent: deviceInfo?.userAgent,
				login_at: new Date().toISOString(),
				last_activity_at: new Date().toISOString()
			})
			.select()
			.single();

		if (error) throw error;
		return data as StudentSession;
	},

	// Log student activity
	async logStudentActivity(
		studentId: string,
		sessionId: string,
		activityType: string,
		activityData?: Record<string, unknown>,
		pageUrl?: string,
		durationSeconds?: number
	) {
		const { data, error } = await supabase
			.from('student_activity_log')
			.insert({
				student_id: studentId,
				session_id: sessionId,
				activity_type: activityType,
				activity_data: activityData || {},
				page_url: pageUrl,
				duration_seconds: durationSeconds
			})
			.select()
			.single();

		if (error) throw error;
		return data as StudentActivityLog;
	},

	// Update session activity timestamp
	async updateSessionActivity(sessionId: string) {
		const { error } = await supabase
			.from('student_sessions')
			.update({ last_activity_at: new Date().toISOString() })
			.eq('id', sessionId);

		if (error) throw error;
	},

	// Close session (logout)
	async closeStudentSession(sessionId: string) {
		const { error } = await supabase
			.from('student_sessions')
			.update({
				is_active: false,
				logout_at: new Date().toISOString()
			})
			.eq('id', sessionId);

		if (error) throw error;
	}
};
