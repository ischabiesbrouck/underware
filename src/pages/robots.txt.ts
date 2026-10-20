import type { APIRoute } from 'astro';
import { abs } from '../data/site';

export const GET: APIRoute = () => new Response(`User-agent: *\nAllow: /\nDisallow: /404.html\n\nSitemap: ${abs('sitemap.xml')}\n`, { headers: { 'Content-Type': 'text/plain' } });
