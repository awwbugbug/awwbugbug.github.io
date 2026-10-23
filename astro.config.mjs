import { defineConfig } from 'astro/config';

// SITE_URL / BASE_PATH are set by the GitHub Pages workflow.
// On Cloudflare Pages or a custom domain, the defaults are fine.
export default defineConfig({
  site: process.env.SITE_URL || 'https://awwbugbug.github.io',
  base: process.env.BASE_PATH || '/',
});
