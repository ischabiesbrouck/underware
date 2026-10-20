// HET UNDERWARE-CONCEPT: "De blijvende lade".
// Vier beloftes die we op de site tonen. VUL AAN / CONTROLEER: dit zijn beleidskeuzes.
// Pas ze aan of schrap ze voordat de site live gaat; beloof alleen wat je echt waarmaakt.
export const promises = [
  {
    key: 'maat', icon: 'return', title: 'Maat-zeker',
    short: 'Eerste maatwissel gratis',
    text: 'Past je maat niet? Je eerste ruil is gratis, ook als je hem al hebt gepast. Zo durf je te kiezen zonder twijfel.',
  },
  {
    key: 'stevig', icon: 'knit', title: 'Stevigheidsbelofte',
    short: '1 jaar op vorm en naden',
    text: 'Verliest een stuk binnen een jaar zijn vorm of gaat een naad los bij normaal gebruik, dan vervangen we het. Zonder discussie.',
  },
  {
    key: 'terug', icon: 'leaf', title: 'Terugname',
    short: 'Oud ondergoed terug, € 5 korting',
    text: 'Stuur je versleten ondergoed (van elk merk) gratis terug. Wij laten het vezelrecycleren en jij krijgt € 5 op je volgende bestelling.',
  },
  {
    key: 'eerlijk', icon: 'lock', title: 'Eerlijk verkopen',
    short: 'Geen nepkorting, geen afteltimers',
    text: 'Eén vaste prijs, het hele jaar. Geen kunstmatige schaarste, geen druk. Alleen een sterk product dat zichzelf verkoopt.',
  },
] as const;
