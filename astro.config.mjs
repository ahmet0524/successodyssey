// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://successodysseyhub.com',
  trailingSlash: 'never',

  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),

      // ✅ GÜÇLENDIRILMIŞ FILTER - Google GSC hatalarını önler
      filter: (page) => {
        const url = page.toLowerCase();

        // Hariç tutulacaklar
        const excludePatterns = [
          '/404',
          '/_',
          '.xml',
          '/index.html',
          '?search=',              // Query parametreleri
          '?q=',
          'search_term_string',    // Google placeholder
          '&',                     // Tüm query string'ler
        ];

        // Trailing slash kontrolü (homepage hariç)
        if (url !== 'https://successodysseyhub.com/' && url.endsWith('/')) {
          return false;
        }

        // WWW kontrolü - sadece non-www kabul et
        if (url.includes('://www.')) {
          return false;
        }

        // Pattern kontrolü
        return !excludePatterns.some(pattern => url.includes(pattern));
      },

      serialize: (item) => {
        // URL'yi normalize et
        let url = item.url;

        // WWW kaldır
        url = url.replace('://www.', '://');

        // Trailing slash kaldır (homepage hariç)
        if (url !== 'https://successodysseyhub.com/' && url.endsWith('/')) {
          url = url.slice(0, -1);
        }

        // Query string'leri kaldır
        if (url.includes('?')) {
          url = url.split('?')[0];
        }

        // Homepage
        if (url === 'https://successodysseyhub.com/') {
          return { ...item, url, priority: 1.0, changefreq: 'daily' };
        }

        // Products
        if (url.includes('/products/') && url.split('/').length > 4) {
          return { ...item, url, priority: 0.9, changefreq: 'weekly' };
        }

        // Blog posts
        if (url.includes('/blog/') && url.split('/').length > 4) {
          return { ...item, url, priority: 0.8, changefreq: 'monthly' };
        }

        // Main sections
        if (url.match(/\/(products|blog|about|terms|privacy|contact)$/)) {
          return { ...item, url, priority: 0.7, changefreq: 'weekly' };
        }

        // Other pages
        return { ...item, url, priority: 0.5, changefreq: 'monthly' };
      }
    })
  ],

  build: {
    assets: '_assets',
    inlineStylesheets: 'always',
  },

  image: {
    domains: ['successodysseyhub.com'],
  },

  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production',
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      },
    },
  },

  server: {
    port: 4321,
    host: true,
  },
});