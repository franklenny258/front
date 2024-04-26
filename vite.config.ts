import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    proxy: {
      '/feed': 'http://host.docker.internal:3000',
    },
  },
  server: {
    proxy: {
      '/feed': 'http://localhost:3000',
    },
    host: true,
  },
  plugins: [react()],
});
