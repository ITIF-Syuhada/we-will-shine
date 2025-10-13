import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

// Create Supabase client
export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

// Database types (will be updated with actual schema)
export interface Student {
	id: string;
	student_code: string;
	student_name: string;
	points: number;
	level: number;
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

// Helper functions
export const db = {
	// Students
	async getStudent(code: string) {
		const { data, error } = await supabase
			.from('students')
			.select('*')
			.eq('student_code', code)
			.single();

		if (error) throw error;
		return data as Student;
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
	}
};
