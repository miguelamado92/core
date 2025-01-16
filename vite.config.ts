import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { sentrySvelteKit } from '@sentry/sveltekit';

export default defineConfig({
	plugins: [sentrySvelteKit(), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		reporters: ['default', 'html'],
		outputFile: 'vitest/results/index.html',
		coverage: {
			include: ['src/**/*.{js,ts}'],
			exclude: ['src/lib/i18n/localizations/**/*', 'src/zapatos/**/*'],
			reporter: ['text', 'json', 'html'],
			reportsDirectory: 'vitest/coverage'
		}
	},
	build: {
		commonjsOptions: { transformMixedEsModules: true } // Change
	}
});
