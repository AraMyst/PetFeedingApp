import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true, // abre o navegador automaticamente
  },
  // If you want to use custom env prefixes (e.g. VITE_APP_*)
  // envPrefix: 'VITE_APP_',
});
