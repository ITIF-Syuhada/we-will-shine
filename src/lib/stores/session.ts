import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const SESSION_KEY = 'student_code';

// Initialize store with value from sessionStorage
function createSessionStore() {
	const initialValue = browser ? sessionStorage.getItem(SESSION_KEY) || '' : '';
	const { subscribe, set } = writable<string>(initialValue);

	return {
		subscribe,
		set: (value: string) => {
			if (browser) {
				if (value) {
					sessionStorage.setItem(SESSION_KEY, value);
				} else {
					sessionStorage.removeItem(SESSION_KEY);
				}
			}
			set(value);
		},
		clear: () => {
			if (browser) {
				sessionStorage.removeItem(SESSION_KEY);
			}
			set('');
		}
	};
}

export const studentCode = createSessionStore();

// Helper functions
export function setStudentCode(code: string): void {
	studentCode.set(code);
}

export function getStudentCode(): string {
	if (!browser) return '';
	return sessionStorage.getItem(SESSION_KEY) || '';
}

export function clearStudentCode(): void {
	studentCode.clear();
}

export function isStudentLoggedIn(): boolean {
	return getStudentCode().length > 0;
}
