// Sitemap voor Google en Bing: wordt bij het bouwen automatisch gemaakt uit alle pagina's en producten.
import type { APIRoute } from 'astro';
import { products, img } from '../data/products';
import { abs } from '../data/site';
import { articles } from '../data/journal';

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const pages: [string, string, string[]][] = [
    ['', '1.0', ['img/hero.svg']], ['shop.html', '0.9', []], ['boxers-heren.html', '0.9', []], ['slips-heren.html', '0.9', []], ['maatgids.html', '0.7', []], ['journal.html', '0.6', []],
    ['over-ons.html', '0.6', []], ['contact.html', '0.5', []],
    ...articles.map((a) => [`journal-${a.slug}.html`, '0.6', [a.image]] as [string, string, string[]]),
    ...products.map((p) => [`product-${p.slug}.html`, '0.8', p.colors.map((k) => img(p.slug, k))] as [string, string, string[]]),
  ];
  const body = pages.map(([path, prio, images]) =>
    `  <url><loc>${abs(path)}</loc><lastmod>${today}</lastmod><priority>${prio}</priority>${images.map((i) => `<image:image><image:loc>${abs(i)}</image:loc></image:image>`).join('')}</url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } });
};
