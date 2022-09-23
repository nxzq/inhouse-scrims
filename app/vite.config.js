import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    commonjsOptions: {
      include: [/inhouse-scrims/, /node_modules/]
    }
  },
  plugins: [react(), svgrPlugin()],
  server: {
    open: true,
  },
  optimizeDeps: {
    include: ['inhouse-scrims']
  }
});
