# Blog-Artikel „Was kostet Kindergartenfotografie?" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Blog-Infrastruktur (Astro Content Collection) aufbauen und den ersten Artikel „Was kostet Kindergartenfotografie?" live schalten.

**Architecture:** Astro Content Collection `blog` mit Markdown-Dateien in `src/content/blog/`. Artikel-Template `src/pages/blog/[slug].astro` rendert Markdown + FAQ-Schema. Blog-Index `src/pages/blog/index.astro` listet alle Artikel.

**Tech Stack:** Astro 6 (SSG), Custom CSS, GSAP ScrollTrigger, @fontsource (Ubuntu + Arima), Zod-Schema in content.config.ts

---

## File Map

| Aktion | Pfad | Zweck |
|---|---|---|
| Modify | `src/content.config.ts` | `blog` Collection hinzufügen |
| Create | `src/content/blog/was-kostet-kindergartenfotografie.md` | Artikel-Inhalt + Frontmatter |
| Create | `src/pages/blog/[slug].astro` | Artikel-Template |
| Create | `src/pages/blog/index.astro` | Blog-Übersichtsseite |

---

## Task 1: Blog Collection in content.config.ts registrieren

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Schritt 1: content.config.ts anpassen**

Ersetze den gesamten Inhalt von `src/content.config.ts`:

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
  }),
});

export const collections = { pages, blog };
```

- [ ] **Schritt 2: Build prüfen**

```bash
cd ~/Development/clients/patricia-bachmann/website
npm run build 2>&1 | tail -20
```

Erwartetes Ergebnis: Build erfolgreich (keine Fehler). Warnung über leere `blog`-Collection ist OK.

- [ ] **Schritt 3: Committen**

```bash
git add src/content.config.ts
git commit -m "feat: blog content collection hinzufügen"
```

---

## Task 2: Artikel-Markdown-Datei anlegen

**Files:**
- Create: `src/content/blog/was-kostet-kindergartenfotografie.md`

- [ ] **Schritt 1: Verzeichnis und Datei anlegen**

```bash
mkdir -p ~/Development/clients/patricia-bachmann/website/src/content/blog
```

Erstelle `src/content/blog/was-kostet-kindergartenfotografie.md` mit folgendem Inhalt:

```markdown
---
title: 'Was kostet Kindergartenfotografie? Preise & Pakete 2026'
description: 'Kindergartenfotografie kostet Eltern je nach Paket 25–90 €. Für Einrichtungen ist es kostenlos. Alle Pakete und Preise – und warum kein Vorabgeld nötig ist.'
pubDate: 2026-06-09
faqs:
  - question: 'Was kostet Kindergartenfotografie in Göppingen?'
    answer: 'Für die Einrichtung fallen keine Kosten an. Für Eltern starten die Pakete bei Patricia Bachmann ab 25,50 €. Gezahlt wird erst nach Ansicht der fertigen Fotos – kein Vorabgeld, keine Mindestbestellmenge.'
  - question: 'Muss ich Fotos kaufen, wenn sie mir nicht gefallen?'
    answer: 'Nein. Es gibt keine Abnahmepflicht und keinen Mindestbestellwert. Eltern sehen die fertigen Bilder ca. 2 Wochen nach dem Fototag online – erst dann wird entschieden ob und was bestellt wird.'
  - question: 'Was kostet der Fototag für den Kindergarten?'
    answer: 'Für Kindergärten und Kitas entstehen keine Kosten – weder für den Fototag selbst noch für die Anfahrt. Das Modell finanziert sich ausschließlich über die freiwilligen Bestellungen der Eltern.'
  - question: 'Gibt es Geschwisterfotos?'
    answer: 'Ja. Das Geschwister-Paket kostet 85,50 € und wird angeboten wenn mehrere Geschwisterkinder in derselben Einrichtung fotografiert werden.'
  - question: 'Wann sind die Bilder fertig?'
    answer: 'In der Regel ca. 2 Wochen nach dem Fototag. Eltern erhalten eine Benachrichtigung und können dann über einen persönlichen QR-Code ihre Fotos ansehen und bestellen.'
---

Wer sich zum ersten Mal mit Kindergartenfotografie beschäftigt, fragt sich oft: Was kommt da eigentlich auf uns zu? Muss ich vorab zahlen? Und was bekomme ich dafür?

Die gute Nachricht vorweg: Das Modell ist einfacher und risikofreier als viele erwarten.

## Das Wichtigste auf einen Blick

> Für Kindergärten und Kitas entstehen **keine Kosten**. Für Eltern sind Pakete ab **25,50 €** erhältlich – gezahlt wird erst nach Ansicht der fertigen Fotos, ohne Mindestbestellmenge. In Deutschland liegen die Preise für Kindergartenfotografie je nach Anbieter und Paketgröße bei rund **20 bis 90 €** pro Kind.

---

## Patricias Pakete im Überblick

| Paket | Preis | Was ist dabei |
|---|---|---|
| **Basis** | 25,50 € | 2× 10×15, 2× 13×19, 1× 15×21, Klebebilder (8er) |
| **Spar Paket** | 39,50 € | 4× 10×15, 2× 13×19, 1× 15×21, 2× Klebebilder |
| **Premium** | 75,50 € | 8× 10×15, 8× 13×19, 2× 15×21, Magnetsticker, Klebebilder |
| **Geschwister** | 85,50 € | 6× 10×15, 6× 13×19, 2× 15×21, 20×30, Fotoaufsteller |

Alle Bestellungen laufen online über Fotograf.de – eine deutsche Plattform mit Servern in Deutschland, sicherer Bezahlung und vollständiger DSGVO-Konformität.

---

## Was kostet der Fototag für die Einrichtung?

Nichts. Kindergärten und Kitas zahlen weder eine Grundgebühr noch Anfahrtskosten. Patricia bringt alles mit – Set-Up, Technik, Accessoires. Das Modell finanziert sich ausschließlich über die freiwilligen Bestellungen der Eltern.

Das bedeutet auch: Keine Einrichtung muss sich sorgen, dass Eltern zum Kauf gedrängt werden. Wer möchte, bestellt. Wer nicht möchte, lässt es.

---

## Kein Risiko für Eltern

Das ist der Teil der viele überrascht: Eltern zahlen nicht am Fototag.

So läuft es ab:

1. Jedes Kind bekommt am Fototag einen **persönlichen QR-Code**
2. Etwa **2 Wochen später** sind die Fotos fertig und online verfügbar
3. Eltern scannen den QR-Code und sehen die Bilder ihres Kindes
4. Erst dann wird bestellt – oder auch nicht

Keine Umlaufmappe, kein Umschlag mit Geld, keine Unterschriften. Alles digital, sicher und ohne Druck.

---

## Frühbucher-Tipp

Gelegentlich gibt es in den **ersten Wochen nach dem Fototag** eine Aktion mit Rabatt. Es lohnt sich also, nicht zu lange zu warten – wer früh schaut, profitiert manchmal.

---

## Geschwisterfotos

Wer zwei Kinder in derselben Einrichtung hat, kann das **Geschwister-Paket (85,50 €)** wählen. Es enthält deutlich mehr Formate und einen Fotoaufsteller – ideal wenn man Bilder beider Kinder haben möchte, ohne zweimal ein Einzelpaket zu kaufen.

---

## Festes Set-Up – warum das einen Unterschied macht

Patricia arbeitet mit einem **festen Set-Up**: professionelles Licht, durchdachter Hintergrund, klarer Bildaufbau.

Spielplatzfotos kann jeder mit dem Handy machen. Was Eltern am Ende wirklich aufheben, einrahmen oder verschenken wollen, sind Bilder die ein Kind wirklich zeigen: klar, scharf, mit einem Ausdruck der bleibt.

Ein festes Set-Up erlaubt außerdem, viele Kinder in kurzer Zeit zu fotografieren – ohne Chaos, ohne Wartezeiten, ohne verwackelte Ergebnisse.

---

## „Das ist mir zu teuer"

Dieser Gedanke ist verständlich. Aber ein paar Überlegungen:

**Kein Risiko bedeutet kein Verlust.** Du siehst die Bilder zuerst. Wenn sie dir nicht gefallen, zahlst du nichts. Kein anderer Kauf funktioniert so.

**Du bestimmst das Budget.** Das Basis-Paket kostet 25,50 €. Es gibt keinen Mindesteinkauf.

**Was bleibt.** Ein Kindergartenfoto ist kein Gebrauchsgegenstand. Es ist ein Bild das in fünf Jahren noch genauso hängt – und in zwanzig Jahren noch mehr bedeutet.

---

## Warum manche Fotografen keine Preise zeigen

Nicht alle Fotografen zeigen ihre Preise offen. Manche verlangen eine Anfrage bevor man überhaupt eine Zahl sieht.

Bei Patricia Bachmann siehst du alles vorher – alle Pakete und Preise sind öffentlich einsehbar. Keine versteckten Kosten, keine Überraschungen am Fototag. Wer transparent mit Preisen umgeht, hat nichts zu verstecken.

---

*Möchtest du Patricia in deinem Kindergarten vorschlagen? Bald erscheint hier: „Als Elternteil einen Fotografen vorschlagen – so geht's über den Elternbeirat."*
```

- [ ] **Schritt 2: Build prüfen**

```bash
cd ~/Development/clients/patricia-bachmann/website
npm run build 2>&1 | tail -20
```

Erwartetes Ergebnis: Build erfolgreich, `blog` Collection hat 1 Eintrag.

- [ ] **Schritt 3: Committen**

```bash
git add src/content/blog/was-kostet-kindergartenfotografie.md
git commit -m "content: erster Blogartikel 'Was kostet Kindergartenfotografie?'"
```

---

## Task 3: Artikel-Template [slug].astro anlegen

**Files:**
- Create: `src/pages/blog/[slug].astro`

- [ ] **Schritt 1: Verzeichnis anlegen**

```bash
mkdir -p ~/Development/clients/patricia-bachmann/website/src/pages/blog
```

- [ ] **Schritt 2: [slug].astro erstellen**

Erstelle `src/pages/blog/[slug].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import WhatsApp from '../../components/WhatsApp.astro';
import FAQ from '../../components/FAQ.astro';
import '../../styles/global.css';
import '@fontsource/ubuntu/400.css';
import '@fontsource/ubuntu/500.css';
import '@fontsource/ubuntu/700.css';
import '@fontsource-variable/arima';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
const { title, description, pubDate, faqs } = post.data;

const canonicalUrl = `https://www.patricia-bachmann.de/blog/${post.id}`;

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description: description,
  datePublished: pubDate.toISOString(),
  author: {
    '@type': 'Person',
    name: 'Patricia Bachmann',
    url: 'https://www.patricia-bachmann.de',
  },
  publisher: {
    '@type': 'LocalBusiness',
    '@id': 'https://www.patricia-bachmann.de/#business',
    name: 'Patricia Bachmann Kindergartenfotografie',
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
};

const faqSchema = faqs ? {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
} : null;

const formattedDate = pubDate.toLocaleDateString('de-DE', {
  day: 'numeric', month: 'long', year: 'numeric',
});
---

<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title} | Patricia Bachmann</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="https://www.patricia-bachmann.de/images/og-image.jpg" />
  <meta property="og:locale" content="de_DE" />
  <meta property="og:site_name" content="Patricia Bachmann Kindergartenfotografie" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="https://www.patricia-bachmann.de/images/og-image.jpg" />
  <link rel="icon" href="/images/68f693e4a34b49b0779b4f31_favicon-32x32.png" type="image/png" />
  <link rel="apple-touch-icon" href="/images/68f6942db4d0e09d8a747738_webclip-patricia-bachmann.png" />
  <script type="application/ld+json" is:inline set:html={JSON.stringify(articleSchema)} />
  {faqSchema && <script type="application/ld+json" is:inline set:html={JSON.stringify(faqSchema)} />}
</head>
<body>
  <Nav />

  <main class="blog-main">
    <div class="padding-global">
      <div class="blog-container">

        <!-- Header -->
        <header class="blog-header scroll-reveal">
          <div class="eyebrow margin-bottom margin-xsmall">
            <div class="eyebrow-bg"></div>
            <p class="text-style-tagline">Blog</p>
          </div>
          <h1 class="blog-title">{title}</h1>
          <time class="blog-date" datetime={pubDate.toISOString()}>{formattedDate}</time>
        </header>

        <!-- Artikel-Content -->
        <article class="prose scroll-reveal">
          <Content />
        </article>

        <!-- FAQ -->
        {faqs && faqs.length > 0 && (
          <div class="blog-faq scroll-reveal">
            <FAQ eyebrow="FAQ" heading="Häufig gestellte Fragen" faqs={faqs} />
          </div>
        )}

        <!-- CTA -->
        <section class="blog-cta scroll-reveal">
          <h2 class="heading-style-h3">Neugierig auf Patricias Pakete?</h2>
          <p>Alle Formate, Preise und Pakete auf einen Blick – oder direkt Verfügbarkeit anfragen.</p>
          <div class="blog-cta-buttons">
            <a href="/pakete" class="button is-link">
              Alle Pakete & Preise ansehen →
            </a>
            <a href="/kontakt" class="button">
              <div class="button--content">
                <span>Verfügbarkeit anfragen</span>
                <img src="/images/68eb6c8d50f03f9535e61da3_patricia-bachman-kindergartenfotografie-goeppingen.avif" alt="" class="button--image" />
              </div>
            </a>
          </div>
        </section>

      </div>
    </div>
  </main>

  <WhatsApp />
  <Footer />
</body>
</html>

<style>
.padding-global { padding-left: var(--pad-x); padding-right: var(--pad-x); }

.blog-main {
  background: var(--color-bg);
  padding-top: 6rem;
  padding-bottom: 6rem;
}

.blog-container {
  max-width: 48rem;
  margin: 0 auto;
}

/* Header */
.eyebrow { position: relative; display: inline-flex; padding: 0.3rem 0.45rem 0.2375rem 0.5rem; justify-content: center; align-items: center; margin-bottom: 1rem; }
.eyebrow-bg { position: absolute; inset: 0%; z-index: 0; border-style: solid; border-width: 0.5px; border-color: #f4b8ce; border-radius: 0.3rem; background-color: rgba(255, 198, 218, 0.16); }
.text-style-tagline { position: relative; z-index: 1; display: inline-block; font-family: var(--font-body); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #b06080; text-decoration: none; }
.margin-bottom { margin-bottom: 1rem; }
.margin-xsmall { margin-bottom: 0.5rem; }

.blog-header { margin-bottom: 3rem; }
.blog-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: -0.04em;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 0.75rem;
}
.blog-date {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-text-mid);
}

/* Prose (Markdown-Inhalt) */
.prose {
  color: var(--color-text);
  line-height: 1.8;
  font-size: 1.0625rem;
  margin-bottom: 3rem;
}

.prose h2 {
  font-family: var(--font-heading);
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.prose h3 {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 400;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.prose p {
  margin-bottom: 1.25rem;
  color: var(--color-text-mid);
}

.prose strong { color: var(--color-text); font-weight: 600; }

.prose a { color: var(--color-glacier-dark); text-underline-offset: 3px; }
.prose a:hover { text-decoration: underline; }

.prose ul, .prose ol {
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
  color: var(--color-text-mid);
}
.prose li { margin-bottom: 0.4rem; }

.prose hr {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 2.5rem 0;
}

/* Answer Box (erste blockquote = AEO-Snippet) */
.prose blockquote {
  background: var(--color-bg-2);
  border-left: 3px solid var(--color-glacier-dark);
  border-radius: 0 8px 8px 0;
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  color: var(--color-text);
}
.prose blockquote p {
  margin-bottom: 0;
  color: var(--color-text);
  font-size: 1rem;
}

/* Tabellen */
.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.9rem;
}
.prose th {
  background: var(--color-bg-3);
  font-family: var(--font-body);
  font-weight: 600;
  text-align: left;
  padding: 0.6rem 0.875rem;
  border-bottom: 2px solid var(--color-border);
  color: var(--color-text);
}
.prose td {
  padding: 0.6rem 0.875rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-mid);
  vertical-align: top;
}
.prose tr:last-child td { border-bottom: none; }

/* em/italic */
.prose em { font-style: italic; color: var(--color-text-mid); }

/* FAQ */
.blog-faq { margin-bottom: 3rem; }

/* CTA */
.blog-cta {
  background: var(--color-sandy);
  border-radius: 16px;
  padding: 2.5rem;
  margin-top: 1rem;
}
.heading-style-h3 {
  font-family: var(--font-heading);
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}
.blog-cta p { color: var(--color-text-mid); margin-bottom: 1.5rem; line-height: 1.6; }
.blog-cta-buttons { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; }

.button { display:inline-flex; align-items:center; gap:0.5rem; border:1px solid var(--color-glacier-dark); background-color:var(--color-glacier); color:var(--color-text); border-radius:10px; padding:0.175rem 0.175rem 0.175rem 1.5rem; font-family:var(--font-body); font-weight:500; text-decoration:none; transition:border-color 0.2s, background-color 0.6s; cursor:pointer; }
.button:hover { background-image: linear-gradient(135deg, #e6eff3, #6b8c9e); }
.button--content { display:flex; align-items:center; gap:0.5rem; }
.button--image { width:2.25rem; height:2.25rem; border-radius:50%; object-fit:cover; flex-shrink:0; }
.button.is-link { background:none; border:none; padding:0.25rem 0; }
.button.is-link:hover { text-decoration:underline; background-image:none; }

@media (max-width: 640px) {
  .blog-main { padding-top: 4rem; padding-bottom: 4rem; }
  .blog-cta { padding: 1.75rem; }
}
</style>

<script>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray<HTMLElement>('.scroll-reveal').forEach(el => {
  gsap.from(el, {
    opacity: 0, y: 28, duration: 0.75, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%' },
  });
});
</script>
```

- [ ] **Schritt 3: Dev-Server starten und Artikel prüfen**

```bash
cd ~/Development/clients/patricia-bachmann/website
npm run dev
```

URL aufrufen: `http://localhost:4321/blog/was-kostet-kindergartenfotografie`

Prüfen:
- [ ] Titel und Datum korrekt
- [ ] Answer-Box (blockquote) hebt sich visuell ab
- [ ] Tabelle mit Paketen lesbar
- [ ] FAQ-Sektion erscheint am Ende
- [ ] CTA-Buttons sichtbar

- [ ] **Schritt 4: Build prüfen**

```bash
npm run build 2>&1 | tail -20
```

Erwartetes Ergebnis: Build ohne Fehler.

- [ ] **Schritt 5: Committen**

```bash
git add src/pages/blog/[slug].astro
git commit -m "feat: Blog-Artikel-Template [slug].astro"
```

---

## Task 4: Blog-Index-Seite anlegen

**Files:**
- Create: `src/pages/blog/index.astro`

- [ ] **Schritt 1: blog/index.astro erstellen**

Erstelle `src/pages/blog/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import WhatsApp from '../../components/WhatsApp.astro';
import '../../styles/global.css';
import '@fontsource/ubuntu/400.css';
import '@fontsource/ubuntu/500.css';
import '@fontsource/ubuntu/700.css';
import '@fontsource-variable/arima';

const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
);
---

<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Blog – Kindergartenfotografie Tipps & Infos | Patricia Bachmann</title>
  <meta name="description" content="Tipps, Infos und Ratgeber rund um Kindergartenfotografie – von Patricia Bachmann aus Hattenhofen bei Göppingen." />
  <link rel="canonical" href="https://www.patricia-bachmann.de/blog" />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.patricia-bachmann.de/blog" />
  <meta property="og:title" content="Blog – Kindergartenfotografie | Patricia Bachmann" />
  <meta property="og:description" content="Tipps, Infos und Ratgeber rund um Kindergartenfotografie." />
  <meta property="og:image" content="https://www.patricia-bachmann.de/images/og-image.jpg" />
  <meta property="og:locale" content="de_DE" />
  <link rel="icon" href="/images/68f693e4a34b49b0779b4f31_favicon-32x32.png" type="image/png" />
  <link rel="apple-touch-icon" href="/images/68f6942db4d0e09d8a747738_webclip-patricia-bachmann.png" />
</head>
<body>
  <Nav />

  <main class="blog-index-main">
    <div class="padding-global">
      <div class="container-large">
        <header class="blog-index-header scroll-reveal">
          <div class="eyebrow margin-bottom margin-xsmall">
            <div class="eyebrow-bg"></div>
            <p class="text-style-tagline">Blog</p>
          </div>
          <h1 class="heading-style-h1">Ratgeber & Tipps</h1>
          <p class="blog-index-sub">Alles rund um Kindergartenfotografie – von Preisen über Ablauf bis zu Tipps für Eltern und Einrichtungen.</p>
        </header>

        <div class="blog-grid">
          {posts.map(post => (
            <article class="blog-card scroll-reveal">
              <a href={`/blog/${post.id}`} class="blog-card-link">
                <div class="blog-card-body">
                  <time class="blog-card-date" datetime={post.data.pubDate.toISOString()}>
                    {post.data.pubDate.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                  <h2 class="blog-card-title">{post.data.title}</h2>
                  <p class="blog-card-desc">{post.data.description}</p>
                  <span class="blog-card-more">Artikel lesen →</span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  </main>

  <WhatsApp />
  <Footer />
</body>
</html>

<style>
.padding-global { padding-left: var(--pad-x); padding-right: var(--pad-x); }
.container-large { width: 100%; max-width: 80rem; margin: 0 auto; }

.blog-index-main {
  background: var(--color-bg);
  padding-top: 6rem;
  padding-bottom: 6rem;
}

.eyebrow { position: relative; display: inline-flex; padding: 0.3rem 0.45rem 0.2375rem 0.5rem; justify-content: center; align-items: center; margin-bottom: 1rem; }
.eyebrow-bg { position: absolute; inset: 0%; z-index: 0; border-style: solid; border-width: 0.5px; border-color: #f4b8ce; border-radius: 0.3rem; background-color: rgba(255, 198, 218, 0.16); }
.text-style-tagline { position: relative; z-index: 1; display: inline-block; font-family: var(--font-body); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #b06080; }
.margin-bottom { margin-bottom: 1rem; }
.margin-xsmall { margin-bottom: 0.5rem; }

.heading-style-h1 { font-family: var(--font-heading); font-size: clamp(2.4rem,5vw,4rem); letter-spacing:-0.05em; font-weight:400; line-height:1.15; }

.blog-index-header { margin-bottom: 4rem; max-width: 40rem; }
.blog-index-sub { font-size: 1.05rem; color: var(--color-text-mid); margin-top: 1rem; line-height: 1.7; }

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1.5rem;
}

.blog-card {
  background: var(--color-white);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.blog-card:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border-color: var(--color-glacier-dark);
}

.blog-card-link { display: block; text-decoration: none; color: inherit; }
.blog-card-body { padding: 1.75rem; }
.blog-card-date { display: block; font-size: 0.8rem; color: var(--color-text-mid); margin-bottom: 0.625rem; }
.blog-card-title {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.3;
  margin-bottom: 0.75rem;
  color: var(--color-text);
}
.blog-card-desc {
  font-size: 0.9rem;
  color: var(--color-text-mid);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}
.blog-card-more {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-glacier-dark);
}

@media (max-width: 640px) {
  .blog-index-main { padding-top: 4rem; padding-bottom: 4rem; }
}
</style>

<script>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray<HTMLElement>('.scroll-reveal').forEach(el => {
  gsap.from(el, {
    opacity: 0, y: 28, duration: 0.75, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%' },
  });
});
</script>
```

- [ ] **Schritt 2: Blog-Index im Browser prüfen**

URL aufrufen: `http://localhost:4321/blog`

Prüfen:
- [ ] Artikel-Karte für den ersten Beitrag erscheint
- [ ] Link auf Artikel funktioniert
- [ ] Datum korrekt formatiert

- [ ] **Schritt 3: Build + Sitemap prüfen**

```bash
npm run build 2>&1 | tail -20
```

```bash
grep -i "blog" dist/sitemap-0.xml
```

Erwartetes Ergebnis: `/blog` und `/blog/was-kostet-kindergartenfotografie` in der Sitemap.

- [ ] **Schritt 4: Committen**

```bash
git add src/pages/blog/index.astro
git commit -m "feat: Blog-Index-Seite"
```

---

## Task 5: Sitemap in Google Search Console einreichen

- [ ] **Schritt 1: Prüfen ob neue URLs in Sitemap sind**

```bash
cat ~/Development/clients/patricia-bachmann/website/dist/sitemap-0.xml | grep blog
```

Erwartetes Ergebnis: Beide Blog-URLs erscheinen.

- [ ] **Schritt 2: Push auf main (Auto-Deploy via Coolify)**

```bash
cd ~/Development/clients/patricia-bachmann/website
git push
```

- [ ] **Schritt 3: Live-URL prüfen**

Nach ca. 1–2 Minuten (Coolify Build):
- `https://www.patricia-bachmann.de/blog` aufrufen
- `https://www.patricia-bachmann.de/blog/was-kostet-kindergartenfotografie` aufrufen

- [ ] **Schritt 4: Sitemap in Google Search Console neu einreichen**

In [Google Search Console](https://search.google.com/search-console) → Sitemaps → `sitemap-0.xml` erneut einreichen (oder URL-Inspektion für den neuen Artikel).

---

## Self-Review

**Spec Coverage:**
- ✅ Direkte Antwort-Box → Blockquote in Markdown (Task 2)
- ✅ Pakete-Tabelle → Markdown-Tabelle (Task 2)
- ✅ Für Einrichtung kostenlos → Abschnitt im Artikel (Task 2)
- ✅ Kein Risiko / kein Vorabgeld → Abschnitt im Artikel (Task 2)
- ✅ Frühbucher-Tipp → Abschnitt im Artikel (Task 2)
- ✅ Geschwisterfotos → Abschnitt im Artikel (Task 2)
- ✅ Set-Up vs. Handyfotos → Abschnitt im Artikel (Task 2)
- ✅ Einwandbehandlung "zu teuer" → Abschnitt im Artikel (Task 2)
- ✅ Warum Fotografen keine Preise zeigen → Abschnitt im Artikel (Task 2)
- ✅ FAQ + FAQPage Schema → frontmatter faqs[] + faqSchema in Template (Task 3)
- ✅ CTA → blog-cta Section in Template (Task 3)
- ✅ Article Schema → articleSchema in Template (Task 3)
- ✅ Blog-Infrastruktur (Collection, Template, Index) → Tasks 1–4
- ✅ Sitemap → Task 5

**Placeholder-Scan:** Keine TBDs oder unvollständigen Stellen.

**Type-Konsistenz:** `post.data.faqs` wird in Task 3 (Template) genauso genutzt wie in Task 2 (frontmatter) definiert: Array von `{question: string, answer: string}`.
