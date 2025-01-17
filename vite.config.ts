import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { sentrySvelteKit } from '@sentry/sveltekit';
import { paraglide } from '@inlang/paraglide-vite';

export default defineConfig({
	plugins: [
		sentrySvelteKit(),
		sveltekit(),
		paraglide({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	],
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
