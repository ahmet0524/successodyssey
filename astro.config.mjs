// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://successodysseyhub.com',
   trailingSlash: 'always', // veya 'never' veya 'ignore'

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
    // Auto-inline small stylesheets for better performance
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
        output: {
          // Optimize chunk naming for better caching
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];

            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name)) {
              return `_assets/images/[name]-[hash][extname]`;
            }
            if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
              return `_assets/fonts/[name]-[hash][extname]`;
            }
            if (ext === 'css') {
              return `_assets/[name]-[hash][extname]`;
            }
            return `_assets/[name]-[hash][extname]`;
          },
          chunkFileNames: '_assets/[name]-[hash].js',
        },
      },
      // Enable CSS code splitting for better caching
      cssCodeSplit: true,
      // Use terser for better minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production',
          drop_debugger: true,
          pure_funcs: process.env.NODE_ENV === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
        },
        format: {
          comments: false,
        },
      },
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
    },
    css: {
      devSourcemap: true,
    },
    // Optimize dependencies
    optimizeDeps: {
      include: [],
    },
  },

  server: {
    port: 4321,
    host: true,
  },
});