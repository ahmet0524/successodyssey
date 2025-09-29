// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://successodysseyhub.com',

  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),

      // Sadece gerçek sorunlu sayfaları filtrele
      filter: (page) => !page.includes('/404'),

      serialize: (item) => {
        // Homepage
        if (item.url === 'https://successodysseyhub.com/') {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }

        // Products section
        if (item.url.includes('/products/')) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }

        // Blog posts
        if (item.url.includes('/blog/') && item.url.split('/').length > 4) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }

        // Main sections (products, blog, about pages)
        if (item.url.match(/\/(products|blog|about)\/?$/)) {
          return { ...item, priority: 0.7, changefreq: 'weekly' };
        }

        // Other pages
        return { ...item, priority: 0.5, changefreq: 'monthly' };
      }
    })
  ],

  build: {
    assets: '_assets',
    inlineStylesheets: 'auto',
  },

  image: {
    domains: ['successodysseyhub.com'],
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
      cssCodeSplit: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production',
          drop_debugger: true,
        },
      },
    },
    css: {
      devSourcemap: true,
    },
  },

  server: {
    port: 4321,
    host: true,
  },
});