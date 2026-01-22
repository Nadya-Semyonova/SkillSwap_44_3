import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import path from 'path';

export default defineConfig({
  plugins: [react(), eslint()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@store': path.resolve(__dirname, './src/store'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@features': path.resolve(__dirname, './src/features'),
      '@db': path.resolve(__dirname, './src/db'),
      '@img': path.resolve(__dirname, './src/img'),
      '@public': path.resolve(__dirname, './public'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
});
