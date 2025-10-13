import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface AISettings {
	provider: 'openai' | 'claude' | 'gemini' | 'custom';
	apiKey: string;
	customUrl?: string;
	model?: string;
	temperature?: number;
	maxTokens?: number;
}

export interface AppSettings {
	ai: AISettings;
	notifications: {
		enabled: boolean;
		studyReminders: boolean;
		achievements: boolean;
		dailyMotivation: boolean;
	};
	theme: 'light' | 'dark' | 'auto';
	language: 'id' | 'en';
}

const SETTINGS_KEY = 'we-will-shine-settings';

const defaultSettings: AppSettings = {
	ai: {
		provider: 'openai',
		apiKey: '',
		model: 'gpt-4',
		temperature: 0.7,
		maxTokens: 500
	},
	notifications: {
		enabled: true,
		studyReminders: true,
		achievements: true,
		dailyMotivation: true
	},
	theme: 'light',
	language: 'id'
};

function getInitialSettings(): AppSettings {
	if (browser) {
		const stored = localStorage.getItem(SETTINGS_KEY);
		if (stored) {
			try {
				return { ...defaultSettings, ...JSON.parse(stored) };
			} catch (e) {
				console.error('Failed to parse settings:', e);
			}
		}
	}
	return defaultSettings;
}

function createSettingsStore() {
	const { subscribe, set, update } = writable<AppSettings>(getInitialSettings());

	return {
		subscribe,
		updateAI: (aiSettings: Partial<AISettings>) => {
			update((settings) => {
				const updated = {
					...settings,
					ai: { ...settings.ai, ...aiSettings }
				};
				if (browser) {
					localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
				}
				return updated;
			});
		},
		updateNotifications: (notifSettings: Partial<AppSettings['notifications']>) => {
			update((settings) => {
				const updated = {
					...settings,
					notifications: { ...settings.notifications, ...notifSettings }
				};
				if (browser) {
					localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
				}
				return updated;
			});
		},
		updateTheme: (theme: 'light' | 'dark' | 'auto') => {
			update((settings) => {
				const updated = { ...settings, theme };
				if (browser) {
					localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
				}
				return updated;
			});
		},
		updateLanguage: (language: 'id' | 'en') => {
			update((settings) => {
				const updated = { ...settings, language };
				if (browser) {
					localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
				}
				return updated;
			});
		},
		reset: () => {
			set(defaultSettings);
			if (browser) {
				localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
			}
		}
	};
}

export const appSettings = createSettingsStore();
