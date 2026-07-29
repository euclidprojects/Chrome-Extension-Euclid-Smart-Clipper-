import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          popup: path.resolve(__dirname, 'popup.html'),
          sidepanel: path.resolve(__dirname, 'sidepanel.html'),
          screenshot_editor: path.resolve(__dirname, 'screenshot-editor.html'),
          offscreen: path.resolve(__dirname, 'offscreen.html'),
          extensionAuth: path.resolve(__dirname, 'extension-auth/index.html'),
          serviceWorker: path.resolve(__dirname, 'src/service-worker.ts'),
        },
        output: {
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'serviceWorker') {
              return 'service-worker.js';
            }
            return 'assets/[name]-[hash].js';
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
