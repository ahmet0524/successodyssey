// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://successodyssey.netlify.app',

  build: {
    assets: '_assets',
    inlineStylesheets: 'auto',
  },

  image: {
    domains: ['successodyssey.netlify.app'],
  },

  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },

  vite: {
    build: {
      rollupOptions: {
        external: [],
      },
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    css: {
      devSourcemap: true,
    },
    optimizeDeps: {
      exclude: ['@astrojs/image'],
    },
  },

  server: {
    port: 4321,
    host: true,
  },

  integrations: [],
});
