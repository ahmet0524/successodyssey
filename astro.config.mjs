// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://successodyssey.com', // Domain güncellendi

  integrations: [
    sitemap() // Sitemap entegrasyonu eklendi
  ],

  build: {
    assets: '_assets',
    inlineStylesheets: 'auto',
  },

  image: {
    domains: ['successodyssey.com'], // Domain güncellendi
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
<<<<<<< HEAD

  integrations: [],
});
=======
});
>>>>>>> 64d9820 (update content)
