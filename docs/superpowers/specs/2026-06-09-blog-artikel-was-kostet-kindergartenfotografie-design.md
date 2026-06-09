# Design: Blog-Artikel „Was kostet Kindergartenfotografie?"

**Datum:** 2026-06-09
**Projekt:** patricia-bachmann.de
**URL:** `/blog/was-kostet-kindergartenfotografie`

---

## Ziel

Erster Blog-Artikel auf patricia-bachmann.de. Primäres Ziel: AEO (Google AI Overviews, Featured Snippets) für die Suchanfrage „was kostet kindergartenfotografie". Sekundäres Ziel: Einwandbehandlung für den Preiseinwand „zu teuer" durch Content statt Verkaufsgespräch. Drittens: interner Link-Aufbau zu zukünftigen Artikeln (Elternbeirat).

**Zielgruppe:** Eltern die noch keinen Fotografen kennen und googeln. Nicht: bestehende Anfragen.

---

## Infrastruktur (wird parallel aufgebaut)

- `src/content/blog/` — Astro Content Collection, Markdown-Dateien
- `src/content.config.ts` — `blog` Collection hinzufügen
- `src/pages/blog/index.astro` — Blog-Übersichtsseite
- `src/pages/blog/[slug].astro` — Artikel-Template
- Erster Artikel: `src/content/blog/was-kostet-kindergartenfotografie.md`

**Nicht PocketBase** — Blog-Content bleibt in Markdown-Dateien im Repo. Einfacher, kein Build-time-Fetch nötig.

---

## Artikel-Struktur

### 1. Direkte Antwort-Box (AEO/Snippet)
~100 Wörter, als visuell hervorgehobener Block (z.B. `<aside class="answer-box">`).

Inhalt:
- Für die Einrichtung: kostenlos
- Für Eltern: je nach Paket 25,50–85,50 €
- Kein Vorabgeld — erst nach Ansicht der fertigen Fotos
- Keine Mindestbestellmenge
- Marktübliche Range in Deutschland: ca. 20–90 €

### 2. Patricias Pakete (Tabelle)
Alle 4 Pakete mit Preis und Hauptinhalt:

| Paket | Preis | Highlights |
|---|---|---|
| Basis | 25,50 € | 2× 10×15, 2× 13×19, 1× 15×21, Klebebilder |
| Spar Paket | 39,50 € | 4× 10×15, 2× 13×19, 1× 15×21, 2× Klebebilder |
| Premium | 75,50 € | 8× 10×15, 8× 13×19, 2× 15×21, Magnetsticker, Klebebilder |
| Geschwister | 85,50 € | 6× 10×15, 6× 13×19, 2× 15×21, 20×30, Aufsteller |

Hinweis: Gelegentlich Frühbucher-Aktion in den ersten 1–2 Wochen nach Fototag.

### 3. Was kostet der Fotograf für die Einrichtung?
- Für Kitas und Schulen: keine Kosten
- Kein Mindesumsatz, kein Organisationsaufwand
- Anfahrt inklusive
- Kurze Erklärung des Geschäftsmodells: Fotografin verdient über Eltern-Bestellungen

### 4. Kein Risiko für Eltern
- Fotos erst online ansehen (ca. 2 Wochen nach Fototag, via QR-Code)
- Dann entscheiden — kaufen oder nicht
- Keine Umlaufmappe, kein Vorabgeld, keine Unterschriften
- Fotograf.de als sichere, DSGVO-konforme Plattform (Serverstandort Deutschland)

### 5. Frühbucher-Tipp
Kurzer Hinweis: In den ersten Wochen nach dem Fototag gibt es manchmal eine Aktion — lohnt sich früh zu entscheiden.

### 6. Geschwisterfotos
- Eigenes Geschwister-Paket (85,50 €) vorhanden
- Wie es funktioniert: beide Kinder werden am Fototag gemeinsam fotografiert
- Relevant wenn mehrere Kinder in derselben Einrichtung

### 7. Set-Up vs. Handyfotos — warum das kein Vergleich ist
- Patricia arbeitet mit festem Set-Up
- Konsistente, professionelle Ergebnisse — kein Vergleich mit Spielplatzfotos
- Schneller Ablauf: Set-Up ermöglicht effizientes Fotografieren vieler Kinder
- Rahmenwürdige Bilder, nicht „hätte ich selbst auch machen können"

### 8. Einwandbehandlung: „Das ist mir zu teuer"
- Kein Vorabgeld — Kaufentscheidung erst nach Ansicht
- Keine Mindestbestellung — auch ein einzelnes Bild ist möglich
- Verglichen mit Alltagsausgaben (Restaurantbesuch, Spielzeug): bleibendes Erinnerungsstück
- Kein Risiko: Gefällt es nicht → kein Kauf

### 9. Warum manche Fotografen keine Preise zeigen
- Kurze, sachliche Erwähnung: nicht alle Anbieter sind transparent (z.B. Anfrage nötig)
- Patricias Preise sind offen einsehbar — kein Versteckspiel
- Vertrauenssignal: wer Preise zeigt, hat nichts zu verstecken

### 10. FAQ (mit FAQPage Schema-Markup)
Mindestens 4 Fragen:
1. Was kostet Kindergartenfotografie in Göppingen?
2. Muss ich Fotos kaufen wenn sie mir nicht gefallen?
3. Was kostet der Fotografin für den Kindergarten?
4. Gibt es Geschwisterfotos?
5. Wann sind die Bilder fertig?

### 11. CTA + interne Links
- Button → `/pakete` (alle Pakete ansehen)
- Button → `/kontakt` (Verfügbarkeit anfragen)
- Textlink → zukünftiger Artikel: „Als Elternteil einen Fotografen vorschlagen – so geht's"

---

## SEO

- **Title:** `Was kostet Kindergartenfotografie? Preise & Pakete 2026`
- **Meta Description:** Kindergartenfotografie kostet Eltern je nach Paket 25–90 €. Für Einrichtungen ist es kostenlos. Wir zeigen alle Pakete, erklären das Modell und warum kein Vorabgeld nötig ist.
- **H1:** `Was kostet Kindergartenfotografie?`
- **Schema:** `Article` + `FAQPage`
- **Canonical:** `https://www.patricia-bachmann.de/blog/was-kostet-kindergartenfotografie`

---

## Ton & Stil

- Schreibstimme: Patricia spricht direkt zu Eltern (Ich-Form)
- Klar, ehrlich, kein Marketingsprech
- Kurze Absätze, Zwischenüberschriften für Scannbarkeit
- Länge: ca. 1.200–1.500 Wörter

---

## Wettbewerb (Recherche-Ergebnis)

| Anbieter | Preise öffentlich | Einstiegspaket |
|---|---|---|
| Photo Schneider (Kirchheim/T.) | ❌ Nein | – |
| Bildwichtel | ✅ Ja | 25 € |
| Kleine Sternchen | ✅ Ja | 21 € |
| Patricia Bachmann | ✅ Ja | 25,50 € |

Patricia Bachmanns Preise sind marktüblich. Einzigartiges Alleinstellungsmerkmal: dediziertes Geschwister-Paket.
