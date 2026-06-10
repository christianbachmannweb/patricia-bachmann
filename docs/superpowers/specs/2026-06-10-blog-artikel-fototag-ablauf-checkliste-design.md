# Design: Blog-Artikel 2 – Fototag Ablauf + Kita-Checkliste

**Datum:** 2026-06-10
**URL:** `/blog/fototag-ablauf-checkliste`
**Datei:** `src/content/blog/fototag-ablauf-checkliste.md`

---

## Ziel

Eltern, die Patricia dem Elternbeirat vorschlagen wollen, erhalten eine konkrete Anleitung. Gleichzeitig verstehen sie den gesamten Ablauf – und bekommen eine Checkliste, die sie an die Einrichtung weitergeben können.

---

## Zielgruppe

**Primär:** Eltern, die Patricia in ihrer Kita vorschlagen möchten (kommen oft von Artikel 1)
**Sekundär:** Elternbeirat-Mitglieder, die den Vorschlag bewerten

Die Einrichtungsseite (Erzieherinnen, Kita-Leitung) wird über eine separate Brief-/Direct-Mail-Strategie angesprochen – nicht über diesen Artikel.

---

## SEO

| Feld | Inhalt |
|------|--------|
| H1 | So schlägst du Patricia vor – und was dann passiert |
| Title Tag | So läuft ein Kindergarten-Fototag ab – und wie du Patricia vorschlägst |
| Meta Description | Als Elternteil eine Fotografin vorschlagen? Wir zeigen wie es geht – vom Elternbeirat bis zu den fertigen Bildern. Inkl. Kita-Checkliste zum Weiterschicken. |
| Primäre Keywords | fototag kindergarten ablauf, kindergarten fototag vorbereitung, elternbeirat fotograf vorschlagen |
| Pub Date | 2026-06-10 |

---

## Artikel-Struktur

### AEO Answer Box (Blockquote)

Direkte Antwort für Google/KI-Suchen. Steht direkt nach dem Intro.

> Wer eine Fotografin dem Elternbeirat vorschlagen möchte, schreibt kurz eine Nachricht an Patricia – sie schickt alle Unterlagen. Nach der Zusage koordiniert Patricia Termin und Ablauf mit der Einrichtung. Am Fototag bringt sie alles mit. Eltern zahlen nichts vorab – erst nach Ansicht der fertigen Bilder.

---

### Abschnitt 1: Wie du Patricia vorschlägst

- Zwei Wege: (a) Elternteil schlägt vor → Elternbeirat stimmt ab; (b) Erzieherin/Leitung nimmt direkt Kontakt auf
- Konkret: Was man sagen oder schreiben kann – kein leeres Blatt
- Patricia liefert Unterlagen/Infomaterial auf Anfrage
- CTA-Link auf `/kontakt`

### Abschnitt 2: Was vor dem Fototag passiert

- Patricia nimmt nach Zusage Kontakt mit Einrichtung auf, Termin wird vereinbart
- Infoblatt für Eltern: Patricia stellt es bereit, Kita verteilt es
- Einrichtung plant Gruppenreihenfolge und reserviert einen Raum (mind. 3×3m, gutes Licht)
- Geschwister-Liste vorbereiten

### Abschnitt 3: Am Fototag

- Patricia bringt alles mit: Set-Up, Licht, Hintergrund, Accessoires
- Wie Erzieherinnen helfen können: Kinder ruhig heranführen, Reihenfolge koordinieren, Geschwister rechtzeitig zusammenbringen
- Fototag-Tempo: gut vorbereitete Gruppen = weniger Wartezeit
- Dieser Abschnitt hilft Eltern, der Kita zu erklären was erwartet wird

### Abschnitt 4: Nach dem Fototag

- Jedes Kind bekommt persönlichen QR-Code
- Bilder online in ca. 2 Wochen
- Frühbucher-Tipp (erste Wochen nach Fototag)
- Keine Mindestbestellung, kein Druck

### Abschnitt 5: Kita-Checkliste

**Überschrift:** "Das kannst du der Einrichtung schicken"

**Positionierung:** Werkzeug für Eltern – nicht für sie selbst, sondern zum Weitergeben.

**Format:** HTML-Checkliste mit interaktiven Checkboxen (JavaScript, kein Server-State – nur UI-Feedback). Checkboxen speichern keinen Zustand (kein localStorage nötig).

**Inhalt:**
- [ ] Patricia kontaktiert und Termin bestätigt
- [ ] Infoblatt an Eltern verteilt
- [ ] Gruppenreihenfolge für alle Kinder festgelegt
- [ ] Raum für Set-Up reserviert (mind. 3×3m, gute Beleuchtung)
- [ ] Geschwister-Liste vorbereitet
- [ ] QR-Codes am Fototag bereit (Patricia bringt sie mit)
- [ ] Eltern über Bestellzeitraum informiert

**PDF-Hinweis:** Kleiner Hinweis unter der Checkliste – "PDF-Version folgt in Kürze" (Platzhalter, bis Christian die Adobe-Express-Version fertig hat).

### FAQs (4 Fragen für FAQPage-Schema)

1. **Wie schlage ich eine Fotografin dem Elternbeirat vor?**
   Kurze E-Mail oder Nachricht an den Elternbeirat reicht. Patricia stellt auf Anfrage Infomaterial bereit. Der Elternbeirat stimmt ab – für Kindergärten entstehen dabei keine Kosten.

2. **Wie lange dauert ein Kindergarten-Fototag?**
   Je nach Größe der Einrichtung zwischen 2 und 5 Stunden. Patricia fotografiert effizient in kurzer Zeit – mit gutem Set-Up und vorbereiteten Gruppen geht es schnell.

3. **Muss die Kita sich auf den Fototag vorbereiten?**
   Ja, ein paar kleine Dinge helfen: Gruppenreihenfolge planen, Raum reservieren, Eltern informieren. Patricia liefert dafür ein Infoblatt.

4. **Wann sind die Bilder nach dem Fototag fertig?**
   In der Regel ca. 2 Wochen nach dem Fototag. Eltern erhalten eine Benachrichtigung und können die Bilder über einen persönlichen QR-Code online ansehen und bestellen.

---

### CTA (wie Artikel 1)

- Heading: "Patricia in deiner Kita vorschlagen?"
- Body: Pakete ansehen + Verfügbarkeit anfragen
- Buttons: `/pakete` (Link) + `/kontakt` (Button)

---

### Interner Link am Ende

Vorschau auf Artikel 3: *"Bald: Kindergartenfotografie ohne Umlaufmappe – wie funktioniert das?"*
→ Ersetzt den Platzhalter aus Artikel 1 (dort muss `/blog/fototag-ablauf-checkliste` als aktiver Link eingetragen werden)

---

## Schema

- `Article` (identisch zu Artikel 1: author = Patricia Bachmann, publisher = LocalBusiness)
- `FAQPage` (aus frontmatter `faqs[]`)

---

## Checkliste-Implementierung (technisch)

Die Kita-Checkliste wird **nicht** im Markdown-Body gerendert, sondern als eigene Komponente oder als HTML-Block im Artikel-Template über einen neuen Frontmatter-Key `checklist`.

**Option:** Einfachste Lösung – Checkliste direkt im Markdown als HTML-Block mit `<div class="kita-checklist">` + inline JavaScript. Funktioniert ohne neue Komponente, da Astro HTML in Markdown-Dateien durchreicht.

---

## Link-Updates

| Datei | Änderung |
|-------|----------|
| `src/content/blog/was-kostet-kindergartenfotografie.md` | Letzten Satz von "erscheint demnächst" auf aktiven Link `/blog/fototag-ablauf-checkliste` ändern |

---

## Abhängigkeiten

- Blog-Infrastruktur (Content Collection, `[slug].astro`, `blog/index.astro`) ist bereits fertig aus Artikel 1
- Keine neuen Komponenten nötig
- CSS für `.kita-checklist` muss in `[slug].astro` ergänzt werden
