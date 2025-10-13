import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface Admin {
	id: string;
	email: string;
	name: string;
	role: 'super_admin' | 'admin' | 'teacher';
	permissions: string[];
}

const ADMIN_STORAGE_KEY = 'we-will-shine-admin';

function getInitialAdmin(): Admin | null {
	if (browser) {
		const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
		if (stored) {
			try {
				return JSON.parse(stored);
			} catch (e) {
				console.error('Failed to parse admin data:', e);
			}
		}
	}
	return null;
}

function createAdminStore() {
	const { subscribe, set } = writable<Admin | null>(getInitialAdmin());

	return {
		subscribe,
		login: (admin: Admin) => {
			set(admin);
			if (browser) {
				localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(admin));
			}
		},
		logout: () => {
			set(null);
			if (browser) {
				localStorage.removeItem(ADMIN_STORAGE_KEY);
			}
		}
	};
}

export const adminStore = createAdminStore();
