import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const dev = process.argv.includes('dev');

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	base: dev ? '' : '/we-will-shine/',
	preview: {
		port: 4173
	}
});
