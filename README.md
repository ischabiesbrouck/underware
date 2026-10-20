# underware · webshop (Astro + Tailwind CSS)

Dit is de webshop gebouwd met **Astro** (sitegenerator) en **Tailwind CSS** (opmaak).
Producten staan in één databestand; de pagina's, de productpagina's en de illustraties
worden daaruit automatisch gemaakt. De Shopify Buy Button wordt automatisch ingevoegd
zodra je je Shopify-gegevens invult.

## Meteen bekijken (zonder installatie)

De gebouwde site staat in **`dist/`**. Dubbelklik `dist/index.html` en ze werkt in je browser.
Online zetten = de inhoud van `dist/` uploaden naar je host (Netlify, Vercel, Cloudflare Pages, Combell, ...).

## Aanpassen en opnieuw bouwen

Daarvoor heb je **Node.js 22 of nieuwer** nodig ([nodejs.org](https://nodejs.org), kies "LTS").
Open daarna een terminal in deze map en voer uit:

```bash
npm install      # eenmalig: haalt Astro en Tailwind op
npm run dev      # live voorbeeld op http://localhost:4321, ververst bij elke wijziging
npm run build    # maakt een nieuwe dist/ om online te zetten
```

## Waar staat wat

| Bestand | Inhoud |
|---|---|
| `src/data/products.ts` | **Alle producten**: naam, prijs, kleuren, tekst, badge, Shopify-ID |
| `src/data/shopify.ts` | **Shopify-gegevens** (domein en toegangstoken) |
| `src/styles/global.css` | Huisstijl: kleuren, lettertypes en herbruikbare stijlen |
| `src/layouts/Base.astro` | Kop, menu, aankondigingsbalk, footer (op elke pagina) |
| `src/pages/*.astro` | De pagina's: home, shop, over ons, contact |
| `src/pages/product-[slug].astro` | Eén sjabloon voor alle productpagina's |
| `src/components/` | Bouwstenen: productkaart, Buy Button, iconen, ... |
| `src/lib/garment.ts` | Tekent de tijdelijke productillustraties |
| `public/js/main.js` | Menu, filter, kleurkeuze, formulieren |

Een product toevoegen of een prijs wijzigen doe je enkel in `src/data/products.ts`.
Shop, productpagina en afbeeldingen volgen vanzelf.

## Shopify Buy Button koppelen

1. Zet je producten (met maten en kleuren als varianten) in Shopify.
2. Voeg in Shopify het verkoopkanaal **Buy Button** toe (Instellingen > Apps en verkoopkanalen).
3. Maak een **Productknop** voor één product en klik **Code kopiëren**. In die code staan:
   ```js
   domain: 'jouwwinkel.myshopify.com',
   storefrontAccessToken: '1a2b3c...',
   ...
   id: '8123456789012',
   ```
4. Vul `domain` en `storefrontAccessToken` in **`src/data/shopify.ts`** in (één keer).
5. Vul per product het `id` in bij **`shopifyId`** in **`src/data/products.ts`**
   (maak daarvoor in Shopify voor elk product een Buy Button en kopieer telkens het id).
6. `npm run build`. Op elke productpagina staat nu de echte knop, met maat- en kleurkeuze,
   winkelmandje en afrekenen via Shopify. Kleuren en tekst zijn al afgestemd op de huisstijl
   (zie `src/components/BuyButton.astro`).

Zolang iets leeg is, toont de productpagina een gestippelde plaatshouder.
De Buy Button werkt pas online of via `npm run dev`, niet altijd vanuit een dubbelgeklikt bestand.

## Nog aan te vullen

- **Productfoto's:** vervang de illustraties. Zet foto's in `public/img/` en pas de
  functie `img()` onderaan `src/data/products.ts` aan (bv. naar `.jpg`).
- **Reviews** op de homepage zijn **voorbeeldteksten** (`src/pages/index.astro`). Vervang ze
  door echte reviews; verzonnen reviews tonen is in de EU verboden.
- **Claims controleren:** "100% biologisch", "GOTS-gecertificeerd", "gemaakt in Europa" en
  "plasticvrij verpakt" enkel vermelden als je dat kunt aantonen. Elastiek in een tailleband
  is meestal geen katoen; vermeld dan de exacte samenstelling.
- **Prijzen, maten, verzendvoorwaarden** (€ 60-grens, 30 dagen retour) en **betaalmethodes** in de footer.
- **Contactgegevens** en de **brief** op over-ons (`VUL AAN` in de code).
- **Formulieren:** contact en nieuwsbrief tonen nu enkel een bedankje. Zet een `action`-URL op het
  formulier, bv. van [Formspree](https://formspree.io) of je nieuwsbriefdienst.
- **Domein:** vul je echte webadres in bij `site` in `astro.config.mjs`.
- **Juridisch:** algemene voorwaarden, privacy- en cookiebeleid (Shopify kan sjablonen maken).

## SEO en vindbaarheid in Google

- **Domein:** pas `url` aan in `src/data/site.ts` (nu `https://ischabiesbrouck.github.io/underware`). Canonical-links, sitemap, deelafbeelding en Google-gegevens volgen automatisch.
- **Per product:** `seoTitle`, `seoDescription`, `sku` (en optioneel `gtin`/EAN) in `src/data/products.ts`.
- **Automatisch gemaakt:** `sitemap.xml`, `robots.txt`, gestructureerde gegevens (Product, Organization, FAQ, Breadcrumb), `404.html`.
- **Na livegang:** voeg de site toe in Google Search Console en dien `sitemap.xml` in.
- **Beloftes en FAQ:** `src/data/promises.ts` en `src/data/faq.ts`. Dit zijn beleidskeuzes; beloof alleen wat je waarmaakt.
- Zie ook `/mnt/project-files/underware/onderzoek/concurrentie-en-concept.md` (concurrentieanalyse en concept).

## Publiceren via GitHub Pages

Elke push naar `main` bouwt de site en zet hem op GitHub Pages via `.github/workflows/pages.yml`. Eenmalig: Settings › Pages › Source: **GitHub Actions**. Adres: https://ischabiesbrouck.github.io/underware/
