import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import type { Student } from '$lib/data/students';
import type { Achievement } from '$lib/data/achievements';
import { initialAchievements } from '$lib/data/achievements';

export interface Dream {
	id: number;
	text: string;
	date: string;
	color: string;
}

export interface UserProgress {
	studentCode: string;
	studentId: string;
	studentName: string;
	points: number;
	level: number;
	exploredCareers: number[];
	achievements: Achievement[];
	dreams: Dream[];
	quoteCount: number;
	chatCount: number;
	quizCompleted: boolean;
	quizAnswers: string[];
	personalMotivation: string;
}

const STORAGE_KEY = 'we-will-shine-progress';

function getInitialProgress(): UserProgress | null {
	if (browser) {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				return JSON.parse(stored);
			} catch (e) {
				console.error('Failed to parse stored progress:', e);
			}
		}
	}
	return null;
}

function createUserStore() {
	const { subscribe, set, update } = writable<UserProgress | null>(getInitialProgress());

	return {
		subscribe,
		set,
		update,
		login: (student: Student) => {
			const progress: UserProgress = {
				studentCode: student.code,
				studentId: student.id,
				studentName: student.name,
				points: 0,
				level: 1,
				exploredCareers: [],
				achievements: initialAchievements,
				dreams: [],
				quoteCount: 0,
				chatCount: 0,
				quizCompleted: false,
				quizAnswers: [],
				personalMotivation: ''
			};
			set(progress);
			if (browser) {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
			}
		},
		logout: () => {
			set(null);
			if (browser) {
				localStorage.removeItem(STORAGE_KEY);
			}
		},
		addPoints: (points: number) => {
			update((progress) => {
				if (!progress) return progress;
				const newPoints = progress.points + points;
				const newLevel = Math.floor(newPoints / 100) + 1;
				const updated = {
					...progress,
					points: newPoints,
					level: newLevel
				};
				if (browser) {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				}
				return updated;
			});
		},
		exploreCareer: (careerId: number) => {
			update((progress) => {
				if (!progress || progress.exploredCareers.includes(careerId)) return progress;
				const updated = {
					...progress,
					exploredCareers: [...progress.exploredCareers, careerId]
				};
				if (browser) {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				}
				return updated;
			});
		},
		unlockAchievement: (achievementId: string) => {
			update((progress) => {
				if (!progress) return progress;
				const achievements = progress.achievements.map((a) =>
					a.id === achievementId ? { ...a, unlocked: true } : a
				);
				const updated = {
					...progress,
					achievements
				};
				if (browser) {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				}
				return updated;
			});
		},
		addDream: (dream: Omit<Dream, 'id'>) => {
			update((progress) => {
				if (!progress) return progress;
				const newDream: Dream = {
					...dream,
					id: Date.now()
				};
				const updated = {
					...progress,
					dreams: [...progress.dreams, newDream]
				};
				if (browser) {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				}
				return updated;
			});
		},
		removeDream: (dreamId: number) => {
			update((progress) => {
				if (!progress) return progress;
				const updated = {
					...progress,
					dreams: progress.dreams.filter((d) => d.id !== dreamId)
				};
				if (browser) {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				}
				return updated;
			});
		},
		incrementQuoteCount: () => {
			update((progress) => {
				if (!progress) return progress;
				const updated = {
					...progress,
					quoteCount: progress.quoteCount + 1
				};
				if (browser) {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				}
				return updated;
			});
		},
		incrementChatCount: () => {
			update((progress) => {
				if (!progress) return progress;
				const updated = {
					...progress,
					chatCount: progress.chatCount + 1
				};
				if (browser) {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				}
				return updated;
			});
		},
		completeQuiz: (answers: string[], motivation: string) => {
			update((progress) => {
				if (!progress) return progress;
				const updated = {
					...progress,
					quizCompleted: true,
					quizAnswers: answers,
					personalMotivation: motivation
				};
				if (browser) {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				}
				return updated;
			});
		}
	};
}

export const userProgress = createUserStore();

// Derived stores
export const isLoggedIn = derived(userProgress, ($progress) => $progress !== null);

export const levelProgress = derived(userProgress, ($progress) => {
	if (!$progress) return 0;
	return ($progress.points % 100) / 100;
});

export const unlockedAchievements = derived(userProgress, ($progress) => {
	if (!$progress) return [];
	return $progress.achievements.filter((a) => a.unlocked);
});
