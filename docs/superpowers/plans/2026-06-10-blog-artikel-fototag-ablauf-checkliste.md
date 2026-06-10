# Blog-Artikel 2 „Fototag Ablauf + Checkliste" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Artikel 2 „So läuft ein Kindergarten-Fototag ab – und wie du Patricia vorschlägst" als Markdown-Datei anlegen, Kita-Checkliste (interaktives HTML) integrieren, CTA-Text per Frontmatter konfigurierbar machen und den Platzhalter-Link in Artikel 1 auf die neue URL aktualisieren.

**Architecture:** Artikel als `src/content/blog/fototag-ablauf-checkliste.md`. Blog-Infrastruktur (Content Collection, `[slug].astro`, `blog/index.astro`) ist aus Artikel 1 bereits fertig. Drei Änderungen an bestehenden Dateien: (1) `content.config.ts` bekommt zwei optionale CTA-Felder, (2) `[slug].astro` bekommt `.kita-checklist` CSS + optionalen CTA-Text, (3) `was-kostet-kindergartenfotografie.md` bekommt den Platzhalterlink ersetzt.

**Tech Stack:** Astro 6 (SSG), Markdown mit Inline-HTML (Astro lässt HTML in .md durch), Custom CSS, GSAP ScrollTrigger

---

## File Map

| Aktion | Pfad | Zweck |
|--------|------|-------|
| Create | `src/content/blog/fototag-ablauf-checkliste.md` | Artikel-Inhalt + Frontmatter |
| Modify | `src/content.config.ts` | `ctaHeading` + `ctaBody` als optionale Felder |
| Modify | `src/pages/blog/[slug].astro` | CTA-Felder auslesen + `.kita-checklist` CSS |
| Modify | `src/content/blog/was-kostet-kindergartenfotografie.md` | Platzhalterlink auf aktive URL setzen |

---

## Task 1: content.config.ts – optionale CTA-Felder ergänzen

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Schritt 1: Zwei optionale Felder ins Blog-Schema aufnehmen**

Ersetze den Blog-Schema-Block in `src/content.config.ts`:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/pages' }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    ctaHeading: z.string().optional(),
    ctaBody: z.string().optional(),
  }),
});

export const collections = { pages, blog };
```

- [ ] **Schritt 2: Build prüfen**

```bash
cd ~/Development/clients/patricia-bachmann/website
npm run build 2>&1 | tail -10
```

Erwartetes Ergebnis: Build erfolgreich. Artikel 1 erzeugt keine Fehler (neue Felder sind optional).

- [ ] **Schritt 3: Committen**

```bash
git add src/content.config.ts
git commit -m "feat: optionale ctaHeading/ctaBody Felder im Blog-Schema"
```

---

## Task 2: [slug].astro – CTA-Text konfigurierbar + Kita-Checkliste CSS

**Files:**
- Modify: `src/pages/blog/[slug].astro`

- [ ] **Schritt 1: CTA-Felder aus post.data auslesen**

In `src/pages/blog/[slug].astro`, Zeile 23, ersetze:

```ts
const { title, description, pubDate, faqs } = post.data;
```

durch:

```ts
const { title, description, pubDate, faqs, ctaHeading, ctaBody } = post.data;
const resolvedCtaHeading = ctaHeading ?? 'Neugierig auf Patricias Pakete?';
const resolvedCtaBody = ctaBody ?? 'Alle Formate, Preise und Pakete auf einen Blick – oder direkt Verfügbarkeit anfragen.';
```

- [ ] **Schritt 2: CTA-Sektion im Template auf die Variablen umstellen**

In `src/pages/blog/[slug].astro`, Zeile 112–124, ersetze:

```astro
<section class="blog-cta scroll-reveal">
  <h2 class="heading-style-h3">Neugierig auf Patricias Pakete?</h2>
  <p>Alle Formate, Preise und Pakete auf einen Blick – oder direkt Verfügbarkeit anfragen.</p>
  <div class="blog-cta-buttons">
    <a href="/pakete" class="button is-link">Alle Pakete & Preise ansehen →</a>
    <a href="/kontakt" class="button">
      <div class="button--content">
        <span>Verfügbarkeit anfragen</span>
        <img src="/images/68eb6c8d50f03f9535e61da3_patricia-bachman-kindergartenfotografie-goeppingen.avif" alt="" class="button--image" />
      </div>
    </a>
  </div>
</section>
```

durch:

```astro
<section class="blog-cta scroll-reveal">
  <h2 class="heading-style-h3">{resolvedCtaHeading}</h2>
  <p>{resolvedCtaBody}</p>
  <div class="blog-cta-buttons">
    <a href="/pakete" class="button is-link">Alle Pakete & Preise ansehen →</a>
    <a href="/kontakt" class="button">
      <div class="button--content">
        <span>Verfügbarkeit anfragen</span>
        <img src="/images/68eb6c8d50f03f9535e61da3_patricia-bachman-kindergartenfotografie-goeppingen.avif" alt="" class="button--image" />
      </div>
    </a>
  </div>
</section>
```

- [ ] **Schritt 3: .kita-checklist CSS ergänzen**

In `src/pages/blog/[slug].astro`, vor dem schließenden `</style>`-Tag (nach Zeile 248, vor `@media`-Block), füge ein:

```css
/* Kita-Checkliste */
.kita-checklist {
  background: var(--color-bg-2);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.75rem 2rem;
  margin: 2rem 0;
}
.kita-checklist__title {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-text);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.kita-checklist__item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.95rem;
  color: var(--color-text-mid);
  cursor: pointer;
  line-height: 1.5;
  transition: color 0.15s;
}
.kita-checklist__item:last-of-type { border-bottom: none; }
.kita-checklist__item input[type="checkbox"] {
  flex-shrink: 0;
  width: 1.1rem;
  height: 1.1rem;
  margin-top: 0.15rem;
  accent-color: var(--color-glacier-dark);
  cursor: pointer;
}
.kita-checklist__item:has(input:checked) {
  color: var(--color-text);
  text-decoration: line-through;
  text-decoration-color: var(--color-glacier-dark);
}
.kita-checklist__note {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: var(--color-text-mid);
  font-style: italic;
}
```

- [ ] **Schritt 4: Build prüfen**

```bash
cd ~/Development/clients/patricia-bachmann/website
npm run build 2>&1 | tail -10
```

Erwartetes Ergebnis: Build erfolgreich.

- [ ] **Schritt 5: Committen**

```bash
git add src/pages/blog/[slug].astro
git commit -m "feat: konfigurierbarer CTA-Text + Kita-Checkliste CSS"
```

---

## Task 3: Artikel-Markdown anlegen

**Files:**
- Create: `src/content/blog/fototag-ablauf-checkliste.md`

- [ ] **Schritt 1: Datei anlegen**

Erstelle `src/content/blog/fototag-ablauf-checkliste.md` mit folgendem Inhalt:

```markdown
---
title: 'So läuft ein Kindergarten-Fototag ab – und wie du Patricia vorschlägst'
description: 'Als Elternteil eine Fotografin vorschlagen? Hier ist wie es geht – vom Elternbeirat bis zu den fertigen Bildern. Inkl. Kita-Checkliste zum Weiterschicken.'
pubDate: 2026-06-10
ctaHeading: 'Patricia in deiner Kita vorschlagen?'
ctaBody: 'Schreib uns kurz – wir schicken dir Unterlagen für den Elternbeirat oder beantworten deine Fragen direkt.'
faqs:
  - question: 'Wie schlage ich eine Fotografin dem Elternbeirat vor?'
    answer: 'Ein kurzer Hinweis beim Elternabend reicht: Patricia fotografiert Kindergärten in der Region, für die Einrichtung kostenlos. Auf Anfrage schickt Patricia Infomaterial für den Elternbeirat. Der Rest läuft über die Einrichtung.'
  - question: 'Wie lange dauert ein Kindergarten-Fototag?'
    answer: 'Je nach Größe der Einrichtung zwischen 2 und 5 Stunden. Mit vorbereiteten Gruppen und klarer Reihenfolge geht es schnell – oft in unter 3 Stunden.'
  - question: 'Muss die Kita sich auf den Fototag vorbereiten?'
    answer: 'Ja, ein paar kleine Dinge helfen: Gruppenreihenfolge festlegen, einen Raum reservieren (mind. 3×3m, gutes Licht) und Geschwisterkinder notieren. Patricia liefert ein Infoblatt für die Eltern.'
  - question: 'Wann sind die Bilder nach dem Fototag fertig?'
    answer: 'In der Regel ca. 2 Wochen nach dem Fototag. Eltern erhalten eine Benachrichtigung und können über einen persönlichen QR-Code ihre Fotos sehen und bestellen – ohne Mindestbestellung.'
---

Du hörst von Bekannten, dass deren Kita tolle Fotos hatte – und fragst dich: Könnte das bei uns auch klappen?

Ja. Und es ist einfacher als du denkst.

## Das Wichtigste auf einen Blick

> Wer eine Fotografin dem Elternbeirat vorschlagen möchte, schreibt kurz eine Nachricht an Patricia – sie schickt alle Unterlagen. Nach der Zusage koordiniert Patricia Termin und Ablauf mit der Einrichtung direkt. Am Fototag bringt sie alles mit. Eltern zahlen nichts vorab – erst nach Ansicht der fertigen Bilder.

---

## Wie du Patricia vorschlägst

Es gibt zwei Wege wie Patricia in eine Einrichtung kommt.

**Weg 1: Du sprichst den Elternbeirat an**

Ein kurzer Hinweis beim nächsten Elternabend oder per Nachricht reicht: *„Ich habe von Patricia Bachmann gehört – sie fotografiert Kindergärten in der Region. Für die Einrichtung entstehen keine Kosten, Eltern zahlen erst nach Ansicht der Bilder."*

Wenn du möchtest, schreib Patricia kurz an – sie schickt dir Infomaterial das du dem Elternbeirat zeigen kannst: Beispielbilder, Ablaufbeschreibung, Paketinfos.

**Weg 2: Die Einrichtung nimmt direkt Kontakt auf**

Manche Einrichtungen buchen über die Leitung oder eine Erzieherin. Wenn du weißt wer dafür zuständig ist, kannst du Patricia auch dort ins Gespräch bringen.

[Patricia kontaktieren →](/kontakt)

---

## Was vor dem Fototag passiert

Nach der Zusage übernimmt Patricia die Koordination. Sie meldet sich bei der Einrichtung, bespricht den Termin und klärt alles was gebraucht wird.

Die Kita bekommt ein **Infoblatt für die Eltern** – Patricia stellt es bereit, die Einrichtung verteilt es. Darin steht wann der Fototag ist, was Kinder anziehen können und wie die Bestellung später funktioniert.

Für einen reibungslosen Ablauf hilft es wenn die Einrichtung zusätzlich:

- eine **Reihenfolge** für die Gruppen festlegt
- einen **Raum** reserviert (mind. 3×3m, gutes Tageslicht oder neutrale Wand)
- Geschwisterkinder in einer Liste festhält

Das klingt nach viel – ist es aber nicht. Weiter unten gibt es dafür eine Checkliste die du einfach weiterschicken kannst.

---

## Am Fototag

Patricia kommt mit allem was sie braucht: Licht, Hintergrund, Zubehör. Es muss nichts vorbereitet werden – kein Tisch, keine Dekoration, kein Stuhl.

**Wie die Erzieherinnen helfen können:**

- Kinder in kleinen Gruppen heranbringen – nicht alle auf einmal
- Geschwister rechtzeitig zusammenführen
- Reihenfolge im Blick behalten – wer vorbereitet ist, spart viel Zeit

Für Kinder die schüchtern sind: Patricia ist das gewohnt. Kein Kind wird gedrängt. Meistens entspannen sie sich schnell wenn sie sehen was die anderen machen.

---

## Nach dem Fototag

Jedes Kind bekommt am Fototag einen **persönlichen QR-Code**.

Etwa **2 Wochen später** sind die Bilder fertig und online. Eltern scannen den Code, sehen die Fotos ihres Kindes – und bestellen was sie möchten. Oder auch nichts.

Kein Umschlag mit Geld, keine Umlaufmappe, keine Mindestbestellung.

**Frühbucher-Tipp:** In den ersten Wochen nach dem Fototag gibt es manchmal eine Aktion mit Rabatt. Es lohnt sich früh zu schauen.

---

## Das kannst du der Einrichtung schicken

Einfach diesen Link teilen – oder die Liste ausdrucken und mitgeben.

<div class="kita-checklist">
  <p class="kita-checklist__title">Checkliste Fototag</p>
  <label class="kita-checklist__item"><input type="checkbox" /> Patricia kontaktiert und Termin bestätigt</label>
  <label class="kita-checklist__item"><input type="checkbox" /> Infoblatt an Eltern verteilt</label>
  <label class="kita-checklist__item"><input type="checkbox" /> Gruppenreihenfolge für alle Kinder festgelegt</label>
  <label class="kita-checklist__item"><input type="checkbox" /> Raum für Set-Up reserviert (mind. 3×3m, gute Beleuchtung)</label>
  <label class="kita-checklist__item"><input type="checkbox" /> Geschwister-Liste vorbereitet</label>
  <label class="kita-checklist__item"><input type="checkbox" /> QR-Codes am Fototag bereit (Patricia bringt sie mit)</label>
  <label class="kita-checklist__item"><input type="checkbox" /> Eltern über Bestellzeitraum informiert</label>
  <p class="kita-checklist__note">PDF-Version zum Ausdrucken folgt in Kürze.</p>
</div>

---

*Bald hier: [Kindergartenfotografie ohne Umlaufmappe – wie das digitale System funktioniert.](/blog)*
```

- [ ] **Schritt 2: Build prüfen**

```bash
cd ~/Development/clients/patricia-bachmann/website
npm run build 2>&1 | tail -10
```

Erwartetes Ergebnis: Build erfolgreich. Blog Collection hat jetzt 2 Einträge.

- [ ] **Schritt 3: Dev-Server starten und Artikel prüfen**

```bash
npm run dev
```

URL aufrufen: `http://localhost:4321/blog/fototag-ablauf-checkliste`

Prüfen:
- [ ] H1 und Datum korrekt
- [ ] AEO Answer-Box (Blockquote) hebt sich visuell ab
- [ ] Alle 4 Abschnitte (Vorschlagen / Vor dem Tag / Am Tag / Danach) korrekt
- [ ] `.kita-checklist` mit Checkboxen erscheint
- [ ] Checkbox `:has(input:checked)` funktioniert – angehaktes Item bekommt Durchstreichung
- [ ] CTA zeigt "Patricia in deiner Kita vorschlagen?" (nicht den Standard-Text)
- [ ] FAQ-Sektion am Ende erscheint
- [ ] Blog-Index `http://localhost:4321/blog` zeigt beide Artikel

- [ ] **Schritt 4: Committen**

```bash
git add src/content/blog/fototag-ablauf-checkliste.md
git commit -m "content: Blog-Artikel 2 'Fototag Ablauf + Kita-Checkliste'"
```

---

## Task 4: Platzhalterlink in Artikel 1 aktualisieren

**Files:**
- Modify: `src/content/blog/was-kostet-kindergartenfotografie.md`

- [ ] **Schritt 1: Letzten Satz in Artikel 1 auf aktiven Link ändern**

In `src/content/blog/was-kostet-kindergartenfotografie.md`, letzter Satz, ersetze:

```markdown
*Möchtest du Patricia in deinem Kindergarten vorschlagen? Bald erscheint hier: „Als Elternteil einen Fotografen vorschlagen – so geht's über den Elternbeirat."*
```

durch:

```markdown
*Möchtest du Patricia in deinem Kindergarten vorschlagen? [So läuft ein Fototag ab – und wie du Patricia vorschlägst →](/blog/fototag-ablauf-checkliste)*
```

- [ ] **Schritt 2: Link im Browser prüfen**

URL aufrufen: `http://localhost:4321/blog/was-kostet-kindergartenfotografie`

Prüfen:
- [ ] Letzter Satz zeigt einen klickbaren Link (kein "erscheint demnächst")
- [ ] Klick auf Link führt zu `/blog/fototag-ablauf-checkliste`

- [ ] **Schritt 3: Committen**

```bash
git add src/content/blog/was-kostet-kindergartenfotografie.md
git commit -m "content: Platzhalterlink in Artikel 1 auf Artikel 2 aktualisieren"
```

---

## Task 5: Build, Sitemap + Deploy

- [ ] **Schritt 1: Finaler Build**

```bash
cd ~/Development/clients/patricia-bachmann/website
npm run build 2>&1 | tail -10
```

Erwartetes Ergebnis: Build ohne Fehler.

- [ ] **Schritt 2: Neue URL in Sitemap prüfen**

```bash
grep "fototag" dist/sitemap-0.xml
```

Erwartetes Ergebnis: `/blog/fototag-ablauf-checkliste` erscheint in der Sitemap.

- [ ] **Schritt 3: Push auf main (Auto-Deploy via Coolify)**

```bash
git push
```

- [ ] **Schritt 4: Live-URLs prüfen** (nach ~1–2 Minuten)

- `https://www.patricia-bachmann.de/blog/fototag-ablauf-checkliste` aufrufen
- `https://www.patricia-bachmann.de/blog` – beide Artikel sichtbar
- Link in Artikel 1 zeigt auf Artikel 2

- [ ] **Schritt 5: Google Search Console – neue URL einreichen**

In [Google Search Console](https://search.google.com/search-console) → URL-Inspektion → `https://www.patricia-bachmann.de/blog/fototag-ablauf-checkliste` eintragen → „Indexierung beantragen".

---

## Self-Review

**Spec Coverage:**
- ✅ Primärzielgruppe Eltern → Weg 1 / Weg 2 im Artikel
- ✅ AEO Answer Box → Blockquote direkt nach Intro
- ✅ Elternbeirat-Abschnitt mit konkretem Vorschlagstext
- ✅ Vor dem Fototag (Infoblatt, Raum, Reihenfolge, Geschwister) → Abschnitt 2
- ✅ Am Fototag (Patricia bringt alles, Erzieherinnen-Tipps) → Abschnitt 3
- ✅ Nach dem Fototag (QR-Code, 2 Wochen, Frühbucher) → Abschnitt 4
- ✅ Kita-Checkliste als HTML-Block mit Checkboxen → Task 3 + CSS Task 2
- ✅ "PDF folgt in Kürze" Hinweis → `kita-checklist__note`
- ✅ FAQPage Schema (4 Fragen) → frontmatter faqs[]
- ✅ CTA "Patricia in deiner Kita vorschlagen?" → ctaHeading/ctaBody via Frontmatter
- ✅ Interner Link zu Artikel 3 (Platzhalter) → letzter Satz im Artikel
- ✅ Link in Artikel 1 aktualisieren → Task 4
- ✅ Sitemap + Deploy → Task 5

**Placeholder-Scan:** Keine TBDs. Vollständiger Artikel-Text im Plan.

**Type-Konsistenz:**
- `ctaHeading: z.string().optional()` in content.config.ts → `ctaHeading` in post.data destructuring → `resolvedCtaHeading` im Template ✅
- `ctaBody: z.string().optional()` analog ✅
- `faqs[]` Schema identisch zu Artikel 1 ✅
- `.kita-checklist__item`, `.kita-checklist__title`, `.kita-checklist__note` → exakt dieselben Klassen im Markdown-HTML und im CSS ✅
