import type { Einrichtung } from '../lib/pocketbase';

const fallbackEinrichtungen: Einrichtung[] = [
  {
    id: 'fallback-kindergarten-gruibingen',
    collectionId: 'fallback',
    name: 'Kindergarten Gruibingen',
    slug: 'kindergarten-gruibingen',
    typ: 'kita',
    ort: 'Gruibingen',
    beschreibung:
      '<p>Patricia Bachmann begleitet Fototage in Kindergärten mit ruhiger, kindgerechter Atmosphäre und einem klaren Ablauf für das Team vor Ort.</p><p>Für Einrichtungen in Gruibingen bedeutet das: natürliche Bilder, wenig organisatorischer Aufwand und eine einfache Bestellung für Eltern.</p>',
    seo_title: 'Kindergarten Gruibingen | Kindergartenfotografie Patricia Bachmann',
    seo_description:
      'Natürliche Kindergartenfotografie im Kindergarten Gruibingen. Einfühlsame Kinderfotos, einfacher Ablauf und DSGVO-konforme Bestellabwicklung.',
    status: 'besucht',
    bilder: [],
  },
  {
    id: 'fallback-kindergarten-hattenhofen',
    collectionId: 'fallback',
    name: 'Kindergarten Hattenhofen',
    slug: 'kindergarten-hattenhofen',
    typ: 'kita',
    ort: 'Hattenhofen',
    beschreibung:
      '<p>Als Kindergartenfotografin aus der Region ist Patricia Bachmann regelmäßig in Hattenhofen im Einsatz und kennt die Anforderungen von Einrichtungen und Eltern vor Ort.</p><p>Im Fokus stehen ehrliche Portraits, entspannte Abläufe und Fotos, die Kinder natürlich zeigen.</p>',
    seo_title: 'Kindergarten Hattenhofen | Kindergartenfotografie Patricia Bachmann',
    seo_description:
      'Kindergartenfotografie im Kindergarten Hattenhofen: natürliche Kinderfotos, entspannte Abläufe und einfache Online-Bestellung für Eltern.',
    status: 'besucht',
    bilder: [],
  },
  {
    id: 'fallback-kindergarten-kuchen',
    collectionId: 'fallback',
    name: 'Kindergarten Kuchen',
    slug: 'kindergarten-kuchen',
    typ: 'kita',
    ort: 'Kuchen',
    beschreibung:
      '<p>Fototage im Kindergarten Kuchen werden so geplant, dass der Alltag der Einrichtung möglichst wenig unterbrochen wird.</p><p>Eltern erhalten natürliche Erinnerungen, während die Organisation für das pädagogische Team schlank und verlässlich bleibt.</p>',
    seo_title: 'Kindergarten Kuchen | Kindergartenfotografie Patricia Bachmann',
    seo_description:
      'Kindergartenfotografie im Kindergarten Kuchen mit natürlichen Kinderportraits, einfacher Organisation und DSGVO-konformer Bestellstrecke.',
    status: 'besucht',
    bilder: [],
  },
  {
    id: 'fallback-kindergarten-zell-unter-aichelberg',
    collectionId: 'fallback',
    name: 'Kindergarten Zell unter Aichelberg',
    slug: 'kindergarten-zell-unter-aichelberg',
    typ: 'kita',
    ort: 'Zell unter Aichelberg',
    beschreibung:
      '<p>Im Kindergarten Zell unter Aichelberg entstehen Kinderfotos ohne steife Studio-Anmutung: locker, freundlich und nah am echten Moment.</p><p>Patricia Bachmann übernimmt die fotografische Umsetzung so, dass Eltern hochwertige Erinnerungen bekommen und die Einrichtung wenig Zusatzaufwand hat.</p>',
    seo_title: 'Kindergarten Zell unter Aichelberg | Kindergartenfotografie Patricia Bachmann',
    seo_description:
      'Natürliche Kindergartenfotografie in Zell unter Aichelberg. Liebevolle Kinderfotos, klarer Ablauf und einfache Bestellung für Familien.',
    status: 'besucht',
    bilder: [],
  },
  {
    id: 'fallback-meerbach-grundschule',
    collectionId: 'fallback',
    name: 'Meerbach Grundschule',
    slug: 'meerbach-grundschule',
    typ: 'schule',
    ort: 'Börtlingen',
    beschreibung:
      '<p>Auch an Schulen setzt Patricia Bachmann auf natürliche Bilder, schnelle Abläufe und eine Organisation, die für Lehrkräfte realistisch funktioniert.</p><p>Die Schulfotografie an der Meerbach Grundschule zeigt, dass moderne Schulbilder ohne unnötigen Aufwand möglich sind.</p>',
    seo_title: 'Meerbach Grundschule | Schulfotografie Patricia Bachmann',
    seo_description:
      'Moderne Schulfotografie an der Meerbach Grundschule mit natürlichen Portraits, schnellen Abläufen und einfacher Online-Bestellung.',
    status: 'besucht',
    bilder: [],
  },
  {
    id: 'fallback-michaelis-kindergarten',
    collectionId: 'fallback',
    name: 'Michaelis Kindergarten Reichenbach',
    slug: 'michaelis-kindergarten',
    typ: 'kita',
    ort: 'Reichenbach an der Fils',
    beschreibung:
      '<p>Im Michaelis Kindergarten Reichenbach fotografiert Patricia Bachmann Kinder mit Geduld, Feingefühl und einem Blick für authentische Ausdrücke.</p><p>So entstehen Bilder, die Familien gern behalten und die Einrichtung ohne komplizierte Vorbereitung ermöglichen kann.</p>',
    seo_title: 'Michaelis Kindergarten Reichenbach | Kindergartenfotografie Patricia Bachmann',
    seo_description:
      'Kindergartenfotografie im Michaelis Kindergarten Reichenbach: authentische Kinderfotos, entspannter Ablauf und DSGVO-konforme Online-Bestellung.',
    status: 'besucht',
    bilder: [],
  },
];

export const featuredEinrichtungen = fallbackEinrichtungen.map(({ name, slug }) => ({
  name,
  slug,
}));

export function mergeEinrichtungen(records: Einrichtung[]): Einrichtung[] {
  const merged = new Map<string, Einrichtung>();

  for (const item of fallbackEinrichtungen) {
    merged.set(item.slug, item);
  }

  for (const item of records) {
    merged.set(item.slug, item);
  }

  return Array.from(merged.values()).sort((a, b) => a.name.localeCompare(b.name, 'de'));
}

export function isEinrichtungIndexable(einrichtung: Einrichtung): boolean {
  const hasSeoDescription = Boolean(einrichtung.seo_description?.trim());
  const hasBeschreibung = Boolean(einrichtung.beschreibung?.trim());

  return hasSeoDescription && hasBeschreibung;
}
