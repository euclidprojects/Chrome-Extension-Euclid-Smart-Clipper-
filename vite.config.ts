import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const isWebsiteBuild = process.env.BUILD_TARGET === 'website';
  const isExtensionBuild = process.env.BUILD_TARGET === 'extension';

  if (command === 'build' && isWebsiteBuild) {
    return {
      plugins: [react(), tailwindcss()],
      publicDir: 'public-website',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        },
      },
      build: {
        outDir: 'website-dist',
        emptyOutDir: true,
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html'),
            extensionAuth: path.resolve(__dirname, 'extension-auth/index.html'),
          },
          output: {
            entryFileNames: 'assets/[name]-[hash].js',
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
  }

  if (command === 'build' && isExtensionBuild) {
    return {
      plugins: [react(), tailwindcss()],
      publicDir: 'public-extension',
      resolve: {
        alias: [
          { find: /^firebase\/auth$/, replacement: path.resolve(__dirname, 'node_modules/firebase/auth/web-extension/dist/esm/index.esm.js') },
          { find: /^@firebase\/auth$/, replacement: path.resolve(__dirname, 'node_modules/firebase/auth/web-extension/dist/esm/index.esm.js') },
          { find: '@', replacement: path.resolve(__dirname, '.') },
        ],
      },
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: false,
        rollupOptions: {
          input: {
            popup: path.resolve(__dirname, 'popup.html'),
            sidepanel: path.resolve(__dirname, 'sidepanel.html'),
            screenshot_editor: path.resolve(__dirname, 'screenshot-editor.html'),
            offscreen: path.resolve(__dirname, 'offscreen.html'),
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
  }

  // Development server / fallback
  return {
    plugins: [react(), tailwindcss()],
    publicDir: 'public-website',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      outDir: 'website-dist',
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
