export interface Achievement {
	id: string;
	name: string;
	icon: string;
	description: string;
	unlocked: boolean;
}

export const initialAchievements: Achievement[] = [
	{
		id: 'first-login',
		name: 'First Explorer',
		icon: '🥇',
		description: 'Login pertama kali',
		unlocked: false
	},
	{
		id: 'quote-master',
		name: 'Quote Master',
		icon: '📝',
		description: 'Baca 5 quote motivasi',
		unlocked: false
	},
	{
		id: 'career-explorer',
		name: 'Career Explorer',
		icon: '🎯',
		description: 'Jelajahi 3 bidang karir',
		unlocked: false
	},
	{
		id: 'ai-chatter',
		name: 'AI Chatter',
		icon: '🤖',
		description: 'Chat 10 kali dengan AI',
		unlocked: false
	},
	{
		id: 'dream-builder',
		name: 'Dream Builder',
		icon: '✨',
		description: 'Tambah 5 impian',
		unlocked: false
	},
	{
		id: 'quiz-master',
		name: 'Quiz Master',
		icon: '🧠',
		description: 'Selesaikan quiz kepribadian',
		unlocked: false
	},
	{
		id: 'all-careers',
		name: 'Career Master',
		icon: '🌟',
		description: 'Jelajahi semua 8 karir',
		unlocked: false
	},
	{
		id: 'level-5',
		name: 'Rising Star',
		icon: '⭐',
		description: 'Capai level 5',
		unlocked: false
	}
];
