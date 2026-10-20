// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Vul je echte domein in zodra de site online staat (voor zoekmachines).
  site: 'https://underwareshop.netlify.app', // zie ook src/data/site.ts
  build: {
    // shop.html i.p.v. shop/index.html: werkt ook als je de bestanden gewoon opent.
    format: 'file',
    inlineStylesheets: 'always',
  },
  vite: { plugins: [tailwindcss()] },
});
