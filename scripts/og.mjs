// Na het bouwen: maak de deelafbeelding (og.jpg, 1200x630) en het app-icoon (apple-touch-icon.png)
// uit de SVG's in dist/img/. Gebruikt sharp, dat met Astro mee geïnstalleerd wordt.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const dist = (f) => fileURLToPath(new URL(`../dist/${f}`, import.meta.url));
await sharp(dist('img/og.svg'), { density: 96 }).flatten({ background: '#151513' }).jpeg({ quality: 82, mozjpeg: true }).toFile(dist('og.jpg'));
await sharp(dist('img/favicon.svg'), { density: 300 }).resize(180, 180).flatten({ background: '#151513' }).png().toFile(dist('apple-touch-icon.png'));
console.log('Deelafbeelding en app-icoon gemaakt.');
