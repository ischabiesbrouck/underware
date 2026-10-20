// Tekent de productbeelden als SVG "studio-renders": stofstructuur, volume, plooien,
// geribde tailleband met geweven label en dubbele naden. Vervang ze later door echte
// foto's (zie README); tot dan geven ze elke kleur en pasvorm een verzorgd beeld.
import { colors, type ColorKey, type Shape } from '../data/products';

interface ShapeDef {
  wy: number; wh: number; bottom: number; body: string;
  hems: string[]; pouch?: string; folds: string[];
}

const shapes: Record<Shape, ShapeDef> = {
  boxer: { wy: 52, wh: 15, bottom: 152,
    body: 'M40 66 C70 69 130 69 160 66 L167 152 L113 152 L100 120 L87 152 L33 152 Z',
    hems: ['M34.5 146 L89.6 146', 'M110.4 146 L166.4 146'],
    pouch: 'M87 69 C85 96 92 108 100 113 C108 108 115 96 113 69',
    folds: ['M52 90 C60 110 58 128 50 146', 'M148 92 C140 112 142 130 150 146', 'M70 72 C74 84 76 92 74 104', 'M128 74 C124 86 124 96 128 106'] },
  trunk: { wy: 58, wh: 14, bottom: 132,
    body: 'M40 71 C70 74 130 74 160 71 L165 132 L112 132 L100 109 L88 132 L35 132 Z',
    hems: ['M35.5 127 L90.6 127', 'M109.4 127 L164.5 127'],
    pouch: 'M89 74 C87 94 93 102 100 106 C107 102 113 94 111 74',
    folds: ['M54 92 C60 106 58 118 52 128', 'M146 94 C140 108 142 120 148 128', 'M72 76 C75 86 76 92 74 100'] },
  slip: { wy: 60, wh: 13, bottom: 146,
    body: 'M40 72 C70 75 130 75 160 72 L152 103 C126 110 114 122 111 146 L89 146 C86 122 74 110 48 103 Z',
    hems: ['M49.5 99 C76 106 88 118 92 142', 'M150.5 99 C124 106 112 118 108 142'],
    pouch: 'M88 75 C86 96 93 106 100 110 C107 106 114 96 112 75',
    folds: ['M66 80 C72 90 74 96 72 104', 'M134 80 C128 90 126 96 128 104'] },
};

let uid = 0;

/** Een kledingstuk, vooraanzicht, met belichting van linksboven. */
export function garment(shape: Shape, color: ColorKey, x = 0, y = 0, scale = 1, shadow = true): string {
  const u = `g${++uid}`;
  const s = shapes[shape];
  const { fill, band } = colors[color];
  const light = color === 'ecru';
  const stitch = light ? '#6f6556' : '#f4efe6';
  const so = light ? '.5' : '.32';
  const knitBlend = light ? 'multiply' : 'overlay';
  const wy = s.wy, wh = s.wh;
  const bandPath = `M37 ${wy + 1.5} C70 ${wy - 1} 130 ${wy - 1} 163 ${wy + 1.5} L163 ${wy + wh + 1.5} C130 ${wy + wh - 0.5} 70 ${wy + wh - 0.5} 37 ${wy + wh + 1.5} Z`;
  const dbl = (d: string) =>
    `<path d="${d}" fill="none" stroke="${stitch}" stroke-opacity="${so}" stroke-width=".55" stroke-dasharray="1.8 1.4"/>` +
    `<path d="${d}" fill="none" stroke="${stitch}" stroke-opacity="${so}" stroke-width=".55" stroke-dasharray="1.8 1.4" transform="translate(0 -2.2)"/>`;
  const folds = s.folds.map((f) =>
    `<path d="${f}" fill="none" stroke="#000" stroke-opacity="${light ? '.10' : '.22'}" stroke-width="3" filter="url(#${u}b2)"/>` +
    `<path d="${f}" fill="none" stroke="#fff" stroke-opacity="${light ? '.35' : '.10'}" stroke-width="1.6" filter="url(#${u}b1)" transform="translate(2 0)"/>`).join('');
  const pouch = s.pouch
    ? `<path d="${s.pouch}" fill="none" stroke="#000" stroke-opacity=".14" stroke-width="2.2" filter="url(#${u}b1)"/>` +
      `<path d="${s.pouch}" fill="none" stroke="${stitch}" stroke-opacity="${so}" stroke-width=".55" stroke-dasharray="1.8 1.4" transform="translate(0 1.2)"/>`
    : '';
  return `<g transform="translate(${x} ${y}) scale(${scale})">
<defs>
<clipPath id="${u}c"><path d="${s.body}"/></clipPath>
<clipPath id="${u}cb"><path d="${bandPath}"/></clipPath>
<filter id="${u}b1" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1"/></filter>
<filter id="${u}b2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.2"/></filter>
<filter id="${u}b4" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4"/></filter>
<filter id="${u}sh" x="-40%" y="-300%" width="180%" height="700%"><feGaussianBlur stdDeviation="6"/></filter>
<filter id="${u}k" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="3.2 1.1" numOctaves="1" seed="${uid % 7}" result="n"/>
  <feDiffuseLighting in="n" surfaceScale=".7" lighting-color="#fff" result="l"><feDistantLight azimuth="225" elevation="60"/></feDiffuseLighting>
  <feColorMatrix in="l" type="saturate" values="0"/>
</filter>
<linearGradient id="${u}h" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".22" stop-color="#fff" stop-opacity=".10"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset=".85" stop-color="#000" stop-opacity=".10"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient>
<linearGradient id="${u}v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".05"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>
<radialGradient id="${u}r" cx=".32" cy=".25" r=".7"><stop offset="0" stop-color="#fff" stop-opacity="${light ? '.35' : '.14'}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<pattern id="${u}rib" width="1.9" height="4" patternUnits="userSpaceOnUse"><rect width=".8" height="4" fill="#000" fill-opacity=".16"/><rect x=".8" width=".35" height="4" fill="#fff" fill-opacity=".08"/></pattern>
</defs>
${shadow ? `<ellipse cx="100" cy="${s.bottom + 3}" rx="70" ry="7" fill="#2b241b" opacity=".18" filter="url(#${u}sh)"/>
<ellipse cx="100" cy="${s.bottom + 1}" rx="58" ry="2.4" fill="#2b241b" opacity=".22" filter="url(#${u}b2)"/>` : ''}
<path d="${s.body}" fill="${fill}"/>
<g clip-path="url(#${u}c)">
  <rect x="20" y="${wy}" width="160" height="${s.bottom - wy + 10}" filter="url(#${u}k)" opacity="${light ? '.09' : '.07'}" style="mix-blend-mode:${knitBlend}"/>
  <rect x="20" y="${wy}" width="160" height="${s.bottom - wy + 10}" fill="url(#${u}h)"/>
  <rect x="20" y="${wy}" width="160" height="${s.bottom - wy + 10}" fill="url(#${u}v)"/>
  <rect x="20" y="${wy}" width="160" height="${s.bottom - wy + 10}" fill="url(#${u}r)"/>
  ${folds}
  <path d="${s.body}" fill="none" stroke="#000" stroke-opacity=".28" stroke-width="5" filter="url(#${u}b4)"/>
  <rect x="30" y="${wy + wh}" width="140" height="6" fill="#000" opacity=".22" filter="url(#${u}b2)"/>
  ${pouch}${s.hems.map(dbl).join('')}
</g>
<path d="${bandPath}" fill="${band}"/>
<g clip-path="url(#${u}cb)">
  <rect x="30" y="${wy - 4}" width="140" height="${wh + 8}" fill="url(#${u}rib)"/>
  <rect x="30" y="${wy - 4}" width="140" height="${wh + 8}" fill="url(#${u}h)"/>
  <rect x="30" y="${wy - 2}" width="140" height="3.2" fill="#fff" opacity="${light ? '.45' : '.16'}" filter="url(#${u}b1)"/>
  <rect x="30" y="${wy + wh - 1}" width="140" height="3" fill="#000" opacity=".18" filter="url(#${u}b1)"/>
</g>
<rect x="85" y="${wy + 3.2}" width="30" height="${wh - 5}" rx=".6" fill="${light ? '#efe8dc' : fill}" stroke="#000" stroke-opacity=".12" stroke-width=".3"/>
<text x="100" y="${wy + 3.2 + (wh - 5) / 2 + 1.25}" font-family="Helvetica, Arial, sans-serif" font-size="3.3" font-weight="600" letter-spacing=".9" text-anchor="middle" fill="${light ? '#5a5146' : '#efe8dc'}" fill-opacity=".9">UNDERWARE</text>
</g>`;
}

/** Een opgevouwen stuk (zoals in een winkelkast), van voren gezien. */
export function folded(color: ColorKey, x: number, y: number, w = 120): string {
  const u = `f${++uid}`;
  const { fill, band } = colors[color];
  const light = color === 'ecru';
  const h = 26;
  return `<g transform="translate(${x} ${y})">
<defs>
<linearGradient id="${u}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="${light ? '.35' : '.12'}"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>
<linearGradient id="${u}s" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".18"/><stop offset=".08" stop-color="#000" stop-opacity="0"/><stop offset=".92" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>
<pattern id="${u}rib" width="1.9" height="4" patternUnits="userSpaceOnUse"><rect width=".8" height="4" fill="#000" fill-opacity=".16"/></pattern>
<filter id="${u}b" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.5"/></filter>
</defs>
<rect x="2" y="${h - 2}" width="${w - 4}" height="5" rx="2" fill="#000" opacity=".25" filter="url(#${u}b)"/>
<rect width="${w}" height="${h}" rx="4" fill="${fill}"/>
<rect width="${w}" height="${h}" rx="4" fill="url(#${u}g)"/>
<rect width="${w}" height="${h}" rx="4" fill="url(#${u}s)"/>
<rect y="0" width="${w}" height="8" rx="3" fill="${band}"/>
<rect y="0" width="${w}" height="8" rx="3" fill="url(#${u}rib)"/>
<rect x="1" y=".6" width="${w - 2}" height="1" fill="#fff" opacity="${light ? '.5' : '.18'}"/>
<rect x="${w / 2 - 12}" y="1.8" width="24" height="4.4" rx=".5" fill="${light ? '#efe8dc' : fill}"/>
<text x="${w / 2}" y="5.1" font-family="Helvetica, Arial, sans-serif" font-size="2.7" font-weight="600" letter-spacing=".75" text-anchor="middle" fill="${light ? '#5a5146' : '#efe8dc'}">UNDERWARE</text>
<path d="M4 ${h - 3} Q${w / 2} ${h - 1.5} ${w - 4} ${h - 3}" fill="none" stroke="#000" stroke-opacity=".15" stroke-width=".8"/>
</g>`;
}

export const svg = (body: string, viewBox = '0 0 200 200') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${body}</svg>`;

/** Macro van de gebreide stof, met belichting. */
export const knit = (base: string, line: string, size = 200) =>
  `<defs>
<pattern id="kn" width="7" height="8" patternUnits="userSpaceOnUse">
  <path d="M0.8 -0.5 C1.6 4 3 6.4 3.5 7.2 C4 6.4 5.4 4 6.2 -0.5" fill="none" stroke="${line}" stroke-width="2.1" stroke-linecap="round"/>
  <path d="M1.2 0 C1.9 3.8 3.1 5.8 3.5 6.4" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width=".7" stroke-linecap="round"/>
</pattern>
<filter id="kl" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" result="n"/>
  <feDiffuseLighting in="n" surfaceScale="1" lighting-color="#fff"><feDistantLight azimuth="225" elevation="55"/></feDiffuseLighting>
</filter>
<radialGradient id="kv" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>
</defs>
<rect width="${size}" height="${size}" fill="${base}"/>
<rect width="${size}" height="${size}" fill="url(#kn)"/>
<rect width="${size}" height="${size}" filter="url(#kl)" opacity=".12" style="mix-blend-mode:multiply"/>
<rect width="${size}" height="${size}" fill="url(#kv)"/>`;
