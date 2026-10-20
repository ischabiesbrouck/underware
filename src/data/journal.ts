// JOURNAL: gidsartikelen die mensen vinden via Google en die doorverwijzen naar de shop.
// Een artikel toevoegen = hier een blok toevoegen. Elk artikel krijgt automatisch een pagina
// (journal-<slug>.html), komt in de sitemap en krijgt Article-gegevens voor Google.
// Schrijf voor één zoekvraag per artikel; zet het belangrijkste antwoord bovenaan.

export interface Article {
  slug: string;
  title: string;          // H1 op de pagina
  seoTitle: string;       // <title>, max. ~60 tekens
  description: string;    // meta-omschrijving, max. ~155 tekens
  intro: string;          // eerste alinea: het directe antwoord
  date: string;           // publicatiedatum, JJJJ-MM-DD
  minutes: number;        // leestijd
  image: string;          // beeld uit img/
  related: string[];      // productslugs om naar te verwijzen
  sections: { h: string; p: string[] }[]; // eenvoudige HTML toegestaan in p (<a>, <strong>)
}

export const articles: Article[] = [
  {
    slug: 'biologisch-katoen-ondergoed',
    title: 'Biologisch katoen in ondergoed: wat is het verschil?',
    seoTitle: 'Biologisch katoen ondergoed: wat is het verschil?',
    description: 'Wat maakt biologisch katoen anders, waarom telt het juist bij ondergoed en hoe herken je echt biologisch? Helder uitgelegd, met de GOTS-keurmerkregels.',
    intro: 'Biologisch katoen wordt geteeld zonder synthetische pesticiden, zonder kunstmest en zonder genetisch gewijzigd zaad. Bij ondergoed, dat de hele dag op je huid zit, maakt dat een tastbaar verschil: minder chemische resten, en vaak een zachtere, voller aanvoelende stof.',
    date: '2026-10-16', minutes: 5, image: 'img/knit-ecru.svg', related: ['de-boxer', 'het-basispakket'],
    sections: [
      { h: 'Wat is biologisch katoen precies?', p: [
        'Gewoon katoen is een van de gewassen waarop wereldwijd het meest gespoten wordt. Biologische boeren werken anders: ze gebruiken natuurlijke bemesting, wisselen gewassen af om de bodem gezond te houden en bestrijden plagen zonder synthetische middelen.',
        'Het resultaat is dezelfde plant, maar geteeld op een manier die bodem, water en boer minder belast.' ] },
      { h: 'Waarom het juist bij ondergoed telt', p: [
        'Ondergoed is het kledingstuk dat het langst en het dichtst op je huid zit. Een biologisch gecertificeerde productie beperkt niet alleen het telen, maar ook de chemicaliën die tijdens het spinnen, verven en afwerken gebruikt mogen worden.',
        'Daarbij komt comfort: biologisch katoen wordt vaak minder agressief behandeld, waardoor de vezel haar natuurlijke zachtheid en ademend vermogen beter behoudt.' ] },
      { h: 'Hoe herken je echt biologisch katoen?', p: [
        'Let op het <strong>GOTS-keurmerk</strong> (Global Organic Textile Standard). Een product met het label "organic" moet volgens GOTS minstens 95% gecertificeerde biologische vezels bevatten; bij "made with organic" is dat minstens 70%. GOTS controleert de hele keten, van vezel tot naad, inclusief sociale voorwaarden.',
        'Een vage term als "natuurlijk" of "eco" zonder keurmerk zegt weinig. Vraag gerust naar het certificaatnummer; een eerlijk merk deelt dat zonder aarzelen.' ] },
      { h: 'Waar underware voor kiest', p: [
        'Onze stukken zijn gemaakt van 100% biologisch katoen, zonder elastaanmenging in de stof, en volledig in Europa geproduceerd. We kiezen een zware, dichte brei, zodat het ondergoed jarenlang zijn vorm houdt. Bekijk <a href="product-de-boxer.html">De Boxer</a> of begin met <a href="product-het-basispakket.html">Het Basispakket</a>.' ] },
    ],
  },
  {
    slug: 'hoe-lang-gaat-ondergoed-mee',
    title: 'Hoe lang gaat ondergoed mee, en wanneer vervang je het?',
    seoTitle: 'Hoe lang gaat ondergoed mee? Zo weet je het',
    description: 'Vijf duidelijke tekenen dat je ondergoed aan vervanging toe is, en zes tips om boxers en slips jaren langer mee te laten gaan. Met rekenvoorbeeld per draagbeurt.',
    intro: 'Goedkoop ondergoed is vaak na enkele maanden op: de tailleband lubbert, de pijpen rollen op en de stof wordt dun. Stevig gemaakt ondergoed gaat bij goede verzorging meerdere jaren mee. Hieronder lees je wanneer het tijd is om te vervangen, en hoe je dat moment uitstelt.',
    date: '2026-10-16', minutes: 4, image: 'img/stack.svg', related: ['het-basispakket', 'de-trunk'],
    sections: [
      { h: 'Vijf tekenen dat je ondergoed op is', p: [
        '<strong>1. De tailleband is slap</strong> en blijft niet meer op zijn plaats. <strong>2. De pijpen rollen op</strong> of de zoom krult. <strong>3. De stof is dun</strong> of doorschijnend geworden. <strong>4. Er zitten gaatjes of losse naden</strong> in. <strong>5. Het past niet meer</strong> omdat het is uitgelubberd of gekrompen.' ] },
      { h: 'Zes tips om langer te doen met je ondergoed', p: [
        'Was op maximaal 40 °C en met gelijke kleuren. Draai het binnenstebuiten. Gebruik weinig wasmiddel en geen wasverzachter, die de vezels verzwakt. Laat aan de lijn drogen in plaats van in de droogkast. Wissel af: met zeven tot tien stuks slijt elk stuk trager. En kies bij aankoop een dichte brei met platte, dubbel gestikte naden.' ] },
      { h: 'Rekenvoorbeeld: prijs per keer dragen', p: [
        'Een boxer van € 9 die na een half jaar op is en twintig keer gedragen werd, kost ongeveer € 0,45 per keer. Een boxer van € 29 die drie jaar meegaat en honderdvijftig keer gedragen wordt, kost ongeveer € 0,19 per keer. Dit is een rekenvoorbeeld, geen meting; het toont waarom stevig op termijn vaak voordeliger is.' ] },
      { h: 'Onze stevigheidsbelofte', p: [
        'Verliest een stuk van underware binnen een jaar zijn vorm of gaat een naad los bij normaal gebruik, dan vervangen we het. Wil je je lade in één keer vernieuwen? <a href="product-het-basispakket.html">Het Basispakket</a> bevat drie boxers voor € 75.' ] },
    ],
  },
  {
    slug: 'boxer-trunk-of-slip',
    title: 'Boxer, trunk of slip: welk herenondergoed past bij jou?',
    seoTitle: 'Boxer, trunk of slip? Zo kies je herenondergoed',
    description: 'Het verschil tussen een boxer, trunk en slip, en welk model past bij jouw broek, lichaam en dag. Inclusief tips voor de juiste maat.',
    intro: 'Kort gezegd: een boxer met langere pijp geeft de meeste bedekking en rolt niet op, een trunk is korter en nauwsluitend onder een slanke broek, en een slip geeft de meeste vrijheid en steun. De beste keuze hangt af van je broek, je dag en wat je prettig vindt.',
    date: '2026-10-16', minutes: 4, image: 'img/hero.svg', related: ['de-boxer', 'de-trunk', 'de-slip'],
    sections: [
      { h: 'De boxer: bedekking en rust', p: [
        'Een boxershort met een iets langere pijp zit rustig en schuurt niet tussen de dijen. Ideaal voor lange dagen, wandelen en wie houdt van bedekking. Let op een zoom die niet oprolt. Bekijk <a href="product-de-boxer.html">De Boxer</a>.' ] },
      { h: 'De trunk: strak onder een slanke broek', p: [
        'Een trunk heeft een korte pijp en sluit nauw aan. Onder een slanke jeans of pantalon zie je niets van naden of plooien. Bekijk <a href="product-de-trunk.html">De Trunk</a>.' ] },
      { h: 'De slip: vrijheid en steun', p: [
        'De klassieke slip gebruikt het minste stof en geeft goede steun, prettig bij sport en warm weer. Kies er een met een brede tailleband die niet insnijdt. Bekijk <a href="product-de-slip.html">De Slip</a>.' ] },
      { h: 'De juiste maat kiezen', p: [
        'Meet je tailleomtrek ter hoogte van je navel en gebruik onze <a href="maatgids.html">maatgids</a>. Tussen twee maten? Kies de grotere. Bij underware is je eerste maatwissel gratis.' ] },
    ],
  },
];

export const articleBySlug = (s: string) => articles.find((a) => a.slug === s);
