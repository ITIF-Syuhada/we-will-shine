import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		paths: {
			// Ganti 'we-will-shine' dengan nama repository GitHub Anda
			base: dev ? '' : '/we-will-shine'
		},
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Ignore 404s for paths that don't start with base
				if (path.startsWith('/') && !path.startsWith('/we-will-shine')) {
					return;
				}
				throw new Error(message);
			},
			handleUnseenRoutes: 'ignore'
		}
	}
};

export default config;
