import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://successodyssey.netlify.app/',
	integrations: [mdx(), sitemap(), tailwind()],
});
