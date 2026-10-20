import { site } from './site';

// Veelgestelde vragen: gebruikt op de contactpagina, de maatgids en in de Google-gegevens (FAQPage).
export const faq = [
  ['Hoe lang duurt de levering?', 'In België en Nederland leveren we binnen 1 tot 3 werkdagen. Voor de rest van Europa rekenen we 3 tot 6 werkdagen.'],
  ['Wat kost verzending?', `Gratis in België en Nederland vanaf € ${site.freeShippingFrom}. Daaronder rekenen we € ${site.shippingCost}.`],
  ['Kan ik ruilen of retourneren?', `Ja, binnen ${site.returnDays} dagen. Je eerste maatwissel is gratis, ook als je het stuk al hebt gepast. Andere retouren moeten ongedragen en in de originele verpakking zijn.`],
  ['Welke maat heb ik nodig?', 'Meet je taille ter hoogte van je navel en gebruik de maatgids. Twijfel je tussen twee maten, kies dan de grotere: biologisch katoen krimpt bij de eerste wasbeurt licht.'],
  ['Waarom is jullie ondergoed duurder dan gewoon ondergoed?', 'We gebruiken een zwaardere biologische stof en laten alles in Europa maken. Daardoor gaat elk stuk veel langer mee, zodat je per keer dragen minder betaalt en op termijn minder koopt.'],
  ['Hoe lang gaat underware mee?', 'Bij normaal gebruik en wassen op 40 °C rekenen we op enkele jaren. Verliest een stuk binnen een jaar zijn vorm of gaat een naad los, dan vervangen we het.'],
  ['Hoe verpakken jullie?', 'In een kartonnen doos met papieren vulling, zonder plastic. Alles kan bij het oud papier.'],
] as const;

export const faqSchema = (items: readonly (readonly [string, string])[] = faq) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});
