// Alle productinformatie op één plek. Een product toevoegen = hier een blok toevoegen;
// de shop, de productpagina en de afbeeldingen worden dan automatisch gemaakt.

export type ColorKey = 'ecru' | 'zwart' | 'olijf' | 'klei';
export type Shape = 'boxer' | 'trunk' | 'slip';

export const colors: Record<ColorKey, { name: string; fill: string; band: string; bg: string; text: string }> = {
  ecru:  { name: 'Ecru',  fill: '#f4eee3', band: '#d8ccb6', bg: '#dfd6c6', text: 'Ongeverfd, zoals katoen van nature is. Zacht, licht en eerlijk.' },
  zwart: { name: 'Zwart', fill: '#252422', band: '#161514', bg: '#e6e1d8', text: 'Diep en mat. De basis onder alles, van jeans tot maatpak.' },
  olijf: { name: 'Olijf', fill: '#6d7758', band: '#565f44', bg: '#e3e2d4', text: 'Een gedempt groen, geïnspireerd op het veld waar alles begint.' },
  klei:  { name: 'Klei',  fill: '#b38f76', band: '#987660', bg: '#eee0d4', text: 'Warm en aards. Een zachte tint die mooi oud wordt.' },
};

export interface Product {
  slug: string;
  name: string;
  category: 'boxers' | 'slips' | 'sets';
  shape: Shape;
  price: string;
  colors: ColorKey[];
  short: string;
  description: string;
  badge?: string;
  multipack?: boolean;
  /**
   * SHOPIFY: het product-ID uit de Buy Button-code van Shopify
   * (de waarde bij `id: '...'`). Leeg = er verschijnt een plaatshouder.
   */
  shopifyId: string;
  /** SEO: zoekvriendelijke titel en omschrijving voor Google (max. ~60 en ~155 tekens) */
  seoTitle: string;
  seoDescription: string;
  /** VUL AAN: je eigen artikelnummer en (optioneel) EAN-barcode uit Shopify */
  sku: string;
  gtin?: string;
}

export const products: Product[] = [
  {
    slug: 'de-boxer', name: 'De Boxer', category: 'boxers', shape: 'boxer', price: '29,00',
    colors: ['zwart', 'ecru', 'olijf'], short: 'Boxershort met lange pijp', badge: 'Bestseller',
    description: 'Onze klassieker. Een boxershort met een iets langere pijp die niet oprolt, gebreid uit dicht biologisch katoen dat na honderd wasbeurten nog steeds in vorm blijft. Basic, maar met de afwerking die je anders alleen bij luxemerken vindt.',
    shopifyId: '',
    seoTitle: 'De Boxer · Boxershort heren van biologisch katoen',
    seoDescription: 'Stevige herenboxer met lange pijp van 100% biologisch katoen, gemaakt in Europa. Rolt niet op, houdt zijn vorm. Gratis maatwissel. € 29.',
    sku: 'UW-BOX',
  },
  {
    slug: 'de-trunk', name: 'De Trunk', category: 'boxers', shape: 'trunk', price: '27,00',
    colors: ['ecru', 'zwart', 'klei'], short: 'Korte boxer, nauwsluitend', badge: 'Nieuw',
    description: 'Korter van pijp en nauwsluitend, voor wie onder een slanke broek niets wil voelen. Dezelfde stevige stof, dezelfde zachte tailleband, een tikje moderner gesneden.',
    shopifyId: '',
    seoTitle: 'De Trunk · Korte herenboxer van biologisch katoen',
    seoDescription: 'Nauwsluitende trunk van zwaar, biologisch katoen, gemaakt in Europa. Onzichtbaar onder een slanke broek. Gratis maatwissel. € 27.',
    sku: 'UW-TRU',
  },
  {
    slug: 'de-slip', name: 'De Slip', category: 'slips', shape: 'slip', price: '24,00',
    colors: ['ecru', 'olijf'], short: 'Klassieke herenslip',
    description: 'Een eerlijke slip zoals hij hoort: goede steun, vlakke naden en een tailleband die niet insnijdt. Ingetogen, tijdloos en gemaakt om jaren mee te gaan.',
    shopifyId: '',
    seoTitle: 'De Slip · Herenslip van biologisch katoen',
    seoDescription: 'Klassieke herenslip met goede steun en platte naden, van 100% biologisch Europees katoen. Tijdloos en extra stevig. € 24.',
    sku: 'UW-SLI',
  },
  {
    slug: 'het-basispakket', name: 'Het Basispakket', category: 'sets', shape: 'boxer', price: '75,00',
    colors: ['zwart', 'ecru', 'olijf'], short: 'Set van 3 boxers, voordeliger', badge: 'Voordeel', multipack: true,
    description: 'Drie keer De Boxer in onze drie basiskleuren. De slimste manier om je lade in één keer te vernieuwen, en voordeliger dan los gekocht.',
    shopifyId: '',
    seoTitle: 'Het Basispakket · 3 biologische boxers voor heren',
    seoDescription: 'Drie boxers in zwart, ecru en olijf van 100% biologisch katoen, gemaakt in Europa. € 75 in plaats van € 87 los gekocht.',
    sku: 'UW-SET3',
  },
];

export const sizes = [['S', '76–81'], ['M', '82–87'], ['L', '88–95'], ['XL', '96–103'], ['XXL', '104–111']] as const;

/** '29,00' -> '29.00' (voor Google) */
export const priceNumber = (p: string) => p.replace(',', '.');

export const img = (slug: string, color: ColorKey) => `img/${slug}-${color}.svg`;
