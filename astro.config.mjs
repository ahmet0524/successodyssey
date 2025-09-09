// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://successodysseyhub.com',

  integrations: [
    sitemap({
      // Sitemap konfigürasyonu
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),

      // İstemediğin sayfaları filtrele
      filter: (page) => {
        return !page.includes('/admin') &&
               !page.includes('/private') &&
               !page.includes('/404') &&
               !page.includes('/api/');
      },

      // Custom page priorities
      serialize: (item) => {
        // Ana sayfa - en yüksek öncelik
        if (item.url === 'https://successodysseyhub.com/') {
          return {
            ...item,
            priority: 1.0,
            changefreq: 'daily'
          };
        }

        // Ürün sayfaları - yüksek öncelik
        if (item.url.includes('/products/')) {
          return {
            ...item,
            priority: 0.9,
            changefreq: 'weekly'
          };
        }

        // Blog yazıları - orta-yüksek öncelik
        if (item.url.includes('/blog/')) {
          return {
            ...item,
            priority: 0.8,
            changefreq: 'monthly'
          };
        }

        // Ana kategori sayfaları
        if (item.url.match(/\/(products|blog|about|contact)$/)) {
          return {
            ...item,
            priority: 0.7,
            changefreq: 'weekly'
          };
        }

        // Diğer sayfalar
        return {
          ...item,
          priority: 0.5,
          changefreq: 'monthly'
        };
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
      cssCodeSplit: false, // Tek CSS dosyası için
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
