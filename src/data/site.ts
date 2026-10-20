// Algemene merk- en SEO-gegevens. Pas het domein aan als je een eigen domeinnaam koppelt
// (bv. https://www.underware.be): canonical-links, sitemap en Google-gegevens volgen vanzelf.
export const site = {
  url: 'https://ischabiesbrouck.github.io/underware',
  name: 'underware',
  legalName: 'underware', // VUL AAN: officiële bedrijfsnaam
  email: 'hallo@underware.example', // VUL AAN
  country: 'BE',
  currency: 'EUR',
  locale: 'nl_BE',
  freeShippingFrom: 60,
  shippingCost: '4,95',
  returnDays: 30,
  ogImage: 'og.jpg',
  sameAs: [] as string[], // VUL AAN: Instagram-, Facebook-, LinkedIn-URL's
  // Bezoekersstatistieken zonder cookies (geen cookiebanner nodig): maak een account op plausible.io
  // en vul hier je domein in, bv. 'ischabiesbrouck.github.io'. Leeg = geen statistieken.
  plausibleDomain: '',
  // Google Search Console: plak hier de code uit de HTML-tag-verificatie (alleen de content-waarde).
  googleVerification: '',
  // Aankondigingsbalk bovenaan elke pagina. Leeg laten = geen balk.
  announcement: ['Gratis verzending vanaf € 60 in BE & NL', 'Eerste maatwissel gratis', '100% biologisch katoen, gemaakt in Europa'],
};

export const abs = (path = '') => `${site.url}/${path.replace(/^\//, '')}`;
