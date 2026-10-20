// Genereert bij het bouwen alle beelden als losse .svg-bestanden in dist/img/.
import type { APIRoute, GetStaticPaths } from 'astro';
import { products, colors, type ColorKey } from '../../data/products';
import { garment, folded, svg, knit } from '../../lib/garment';

const knitLine: Record<ColorKey, string> = { ecru: '#d9cfbd', zwart: '#1d1c1a', olijf: '#5b6449', klei: '#9c7b64' };

function images(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const p of products) {
    for (const c of p.colors) {
      out[`${p.slug}-${c}`] = p.multipack
        ? svg(folded(p.colors[2], 30, 118, 140) + folded(p.colors[1], 26, 90, 148) + folded(p.colors[0], 30, 62, 140))
        : svg(garment(p.shape, c));
    }
  }
  // Hero en sfeerbeelden
  out['hero'] = svg(garment('trunk', 'ecru', -24, 2, 0.78) + garment('slip', 'klei', 70, -2, 0.78) + garment('boxer', 'olijf', 22, 44, 0.84));
  out['stack'] = svg(
    folded('klei', 40, 150, 120) + folded('olijf', 36, 124, 128) + folded('ecru', 40, 98, 120) +
    folded('zwart', 38, 72, 124) + folded('ecru', 40, 46, 120));
  out['cat-boxers'] = svg(garment('trunk', 'ecru', -18, 6, 0.78) + garment('boxer', 'zwart', 52, 34, 0.78));
  out['cat-slips'] = svg(garment('slip', 'olijf', -14, 8, 0.78) + garment('slip', 'ecru', 56, 40, 0.78));
  out['cat-sets'] = svg(folded('olijf', 40, 132, 120) + folded('ecru', 36, 106, 128) + folded('zwart', 40, 80, 120) + folded('klei', 38, 54, 124));
  // Close-ups
  out['detail-band'] = svg('<rect width="200" height="200" fill="#cfcbb8"/>' + garment('boxer', 'olijf', 0, 0, 1, false), '70 46 60 60');
  out['detail-naad'] = svg('<rect width="200" height="200" fill="#d6ccb9"/>' + garment('boxer', 'ecru', 0, 0, 1, false), '34 112 46 46');
  for (const c of Object.keys(colors) as ColorKey[]) out[`knit-${c}`] = svg(knit(colors[c].fill, knitLine[c]));
  out['stof'] = out['knit-ecru'];
  out['detail-brei'] = out['knit-olijf'];
  // Deelafbeelding voor sociale media en Google (wordt door scripts/og.mjs omgezet naar og.jpg)
  const heroBody = garment('trunk', 'ecru', -24, 2, 0.78) + garment('slip', 'klei', 70, -2, 0.78) + garment('boxer', 'olijf', 22, 44, 0.84);
  out['og'] = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><radialGradient id="ogbg" cx="62%" cy="45%" r="75%"><stop offset="0" stop-color="#34322d"/><stop offset=".55" stop-color="#1d1c1a"/><stop offset="1" stop-color="#121210"/></radialGradient></defs>
<rect width="1200" height="630" fill="url(#ogbg)"/>
<text x="80" y="160" font-family="Helvetica, Arial, sans-serif" font-size="15" letter-spacing="4.5" fill="#a39684">BIOLOGISCH HERENONDERGOED · EUROPA</text>
<g font-family="Georgia, 'Times New Roman', serif" font-size="96" fill="#f4f1ec"><text x="76" y="270">Basis,</text><text x="76" y="368">maar dan</text><text x="76" y="466" font-style="italic" fill="#a39684">beter.</text></g>
<text x="80" y="570" font-family="Helvetica, Arial, sans-serif" font-size="16" letter-spacing="6.7" fill="#f4f1ec">UNDERWARE</text>
<svg x="560" y="-5" width="640" height="640" viewBox="0 0 200 200">${heroBody}</svg></svg>`;
  out['favicon'] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#151513"/><text x="32" y="45" font-family="Georgia,serif" font-size="40" text-anchor="middle" fill="#f4f1ec">u</text></svg>';
  return out;
}

const all = images();

export const getStaticPaths = (() => Object.keys(all).map((name) => ({ params: { name } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) =>
  new Response(all[params.name as string], { headers: { 'Content-Type': 'image/svg+xml' } });
