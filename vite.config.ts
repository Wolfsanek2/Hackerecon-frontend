import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					// @import "./src/styles";
					@use "@styles/variables" as *;
				`,
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@type': path.resolve(__dirname, './src/types'),
			'@store': path.resolve(__dirname, './src/store'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@styles': path.resolve(__dirname, './src/styles'),
			'@api': path.resolve(__dirname, './src/api'),
			'@consts': path.resolve(__dirname, './src/consts'),
		},
	},
});
