// Tab Navigation Store
import { writable } from 'svelte/store';

interface TabSection {
	id: string;
	label: string;
	icon: string;
}

interface TabNavigationState {
	sections: TabSection[];
	activeSection: string;
	queryParam: string;
	isVisible: boolean;
	showInHeader: boolean; // New: control header visibility
}

// Create the store
export const tabNavigationStore = writable<TabNavigationState>({
	sections: [],
	activeSection: '',
	queryParam: 'tab',
	isVisible: false,
	showInHeader: false
});

// Helper functions
export function setTabNavigation(
	sections: TabSection[],
	activeSection: string = '',
	queryParam: string = 'tab'
) {
	tabNavigationStore.set({
		sections,
		activeSection: activeSection || sections[0]?.id || '',
		queryParam,
		isVisible: true,
		showInHeader: false // Start with header hidden
	});
}

export function hideTabNavigation() {
	tabNavigationStore.update((state) => ({
		...state,
		isVisible: false,
		showInHeader: false
	}));
}

export function updateActiveSection(activeSection: string) {
	tabNavigationStore.update((state) => ({
		...state,
		activeSection
	}));
}

export function setHeaderVisibility(showInHeader: boolean) {
	tabNavigationStore.update((state) => ({
		...state,
		showInHeader
	}));
}
