import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const SESSION_KEY = 'student_session';
const EXPIRY_DAYS = 7; // Session expires after 7 days
const EXPIRY_MS = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

interface SessionData {
	code: string;
	timestamp: number;
	expiresAt: number;
}

// Check if session is expired and clear if needed
function getValidSession(): string {
	if (!browser) return '';

	const stored = localStorage.getItem(SESSION_KEY);
	if (!stored) return '';

	try {
		const session: SessionData = JSON.parse(stored);
		const now = Date.now();

		// Check if expired
		if (now > session.expiresAt) {
			// Session expired, clear it
			localStorage.removeItem(SESSION_KEY);
			return '';
		}

		return session.code;
	} catch {
		// Invalid data, clear it
		localStorage.removeItem(SESSION_KEY);
		return '';
	}
}

// Initialize store with valid session from localStorage
function createSessionStore() {
	const initialValue = getValidSession();
	const { subscribe, set } = writable<string>(initialValue);

	return {
		subscribe,
		set: (value: string) => {
			if (browser) {
				if (value) {
					const now = Date.now();
					const session: SessionData = {
						code: value,
						timestamp: now,
						expiresAt: now + EXPIRY_MS
					};
					localStorage.setItem(SESSION_KEY, JSON.stringify(session));
				} else {
					localStorage.removeItem(SESSION_KEY);
				}
			}
			set(value);
		},
		clear: () => {
			if (browser) {
				localStorage.removeItem(SESSION_KEY);
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
	return getValidSession();
}

export function clearStudentCode(): void {
	studentCode.clear();
}

export function isStudentLoggedIn(): boolean {
	return getStudentCode().length > 0;
}

// Get session info (for debugging/admin purposes)
export function getSessionInfo(): SessionData | null {
	if (!browser) return null;

	const stored = localStorage.getItem(SESSION_KEY);
	if (!stored) return null;

	try {
		return JSON.parse(stored);
	} catch {
		return null;
	}
}

// Get remaining time in milliseconds
export function getSessionRemainingTime(): number {
	const session = getSessionInfo();
	if (!session) return 0;

	const remaining = session.expiresAt - Date.now();
	return remaining > 0 ? remaining : 0;
}
