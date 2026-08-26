import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Static SPA build for GitHub Pages (output to /docs so it can be served from a branch)
		adapter: adapter({ fallback: 'index.html', pages: 'docs' }),
		prerender: { entries: [] },
		// base: deploy uses BASE_PATH (e.g. /the-model-weaver); local stays root
		paths: { base: process.env.BASE_PATH || '' }
	}
};

export default config;
