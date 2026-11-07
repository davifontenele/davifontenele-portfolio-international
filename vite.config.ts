import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
	server: {
		hmr: {
			host: 'localhost',
			port: 24678,
		},
		host: true,
		port: 3001,
		watch: {
			usePolling: true,
			interval: 300,
		}
	},
});
