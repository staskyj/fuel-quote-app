import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig( ({ mode }) => {
  loadEnv(mode, process.cwd(), '').chrome

  return {
      plugins: [react()],
      server: {
          open: true,
      }
  }
})
