// Na het bouwen: maak alle paden relatief, zodat dist/ ook werkt als je
// index.html rechtstreeks opent (dubbelklikken) of in een submap host.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('../dist/', import.meta.url));
for (const f of await readdir(dir)) {
  if (!f.endsWith('.html')) continue;
  const p = join(dir, f);
  const html = await readFile(p, 'utf8');
  await writeFile(p, html.replaceAll('"/_astro/', '"_astro/').replaceAll('url(/_astro/', 'url(_astro/'));
}
console.log('Paden relatief gemaakt.');
