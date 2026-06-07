# chroma

**Color Converter & Scheme Generator**

Interaktive Medien 2 (IM2) — Multimedia Production BSc  
Frühlingssemester 2026

---

## Projektbeschreibung

Chroma ist ein browserbasiertes Tool zur Farb-Konvertierung und Farbschema-Generierung. Die Applikation ruft Daten von der öffentlichen [The Color API](https://www.thecolorapi.com) ab und stellt diese dynamisch und interaktiv dar.

Nutzerinnen und Nutzer können Farben in verschiedenen Formaten eingeben (HEX oder RGB), erhalten die konvertierte Ausgabe, den Farbnamen sowie verwandte Farbschemata — alles user-gesteuert und ohne Seitenreload.

---

## Features

- **HEX → RGB Konvertierung** — Eingabe eines HEX-Werts, Ausgabe als RGB mit Copy-Funktion
- **RGB → HEX Konvertierung** — Eingabe der drei Kanäle R, G, B, Ausgabe als HEX-Wert
- **Color Picker** — nativer Systemdialog über einen Pipette-Button; alle Eingabefelder synchronisieren sich automatisch
- **Farbvorschau** — zeigt den aktuell gewählten Farbton und Farbnamen; vor der ersten Auswahl läuft eine Lottie-Animation als Platzhalter
- **Scheme Generator** — generiert Farbschemata in 8 Modi (Monochrome, Analogic, Complement, Triad, Quad etc.) mit frei wählbarer Anzahl Farben (2–10)
- **Hintergrundpillen** — zwei Pill-Elemente im Hintergrund wechseln ihre Farbe synchron mit der gewählten Farbe (sanfte CSS-Transition)
- **Responsive Design** — mobile Breakpoint ab 600px; Hintergrundpillen ausgeblendet, Layout kompakt gestapelt
- **Clipboard-Integration** — jedes Ergebnis und jeder Scheme-Chip ist per Klick kopierbar (Toast-Notification)
- **Animationen** — Lottie-Animation als Intro, CSS-Keyframe-Animationen für Seiteneingang, Ergebnis-Reveal, Chip-Eingang, Swatch-Pop und Picker-Puls-Ring
- **Barrierefreiheit** — alle Animationen respektieren `prefers-reduced-motion`

---

## Verwendete API

**The Color API** — `https://www.thecolorapi.com`

Zwei Endpunkte werden genutzt:

| Endpunkt                       | Verwendung                                |
| ------------------------------ | ----------------------------------------- |
| `/id?hex=…` oder `/id?rgb=…`   | Gibt Farbnamen, HEX- und RGB-Werte zurück |
| `/scheme?hex=…&mode=…&count=…` | Gibt ein Array verwandter Farben zurück   |

Die API ist öffentlich, kostenlos und erfordert keinen API-Key. Antwortformat: JSON.

**Beispiel-Response `/id?hex=4a90d9`:**

```json
{
  "name": { "value": "Havelock Blue" },
  "hex": { "value": "#4A90D9" },
  "rgb": { "r": 74, "g": 144, "b": 217 }
}
```

---

## Projektstruktur

```
chroma/
├── index.html      — Struktur und Markup der Applikation
├── style.css       — Styling, Neomorphism-Design, Animationen, Responsive Breakpoint
├── script.js       — Gesamte Applikationslogik (DOM, API, Events, Animationen)
└── README.md       — Diese Dokumentation
```

---

## Technische Umsetzung

### JavaScript

Der gesamte Code ist in `script.js` in 10 klar gegliederte Abschnitte aufgeteilt:

| Abschnitt           | Inhalt                                                                                                                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. DOM Elements     | Alle HTML-Elemente werden einmalig mit `querySelector` referenziert                                                                                                                |
| 2. Lottie Animation | Initialisierung der eingebetteten Lottie-Animation; `dismissLottie()` für den Übergang                                                                                             |
| 3. Helpers          | Wiederverwendbare Hilfsfunktionen (`showLoader`, `showError`, `triggerAnimation`, `copyToClipboard`, `updatePreview`, `showResult`, `isValidHex`, `isValidRgbValue`, `syncInputs`) |
| 4. API              | Zentrale `fetchColorData()`-Funktion mit `async/await` und `try/catch`                                                                                                             |
| 5. HEX → RGB        | Konvertierungsfunktion mit Validierung                                                                                                                                             |
| 6. RGB → HEX        | Konvertierungsfunktion mit Validierung                                                                                                                                             |
| 7. Color Picker     | Event-Listener für den Pipette-Button und den versteckten `<input type="color">`                                                                                                   |
| 8. Scheme Generator | Fetch-Logik für den `/scheme`-Endpunkt, dynamisches Erstellen der Chips                                                                                                            |
| 9. Event Listeners  | Verbindung aller Buttons und Enter-Tastenkürzel mit ihren Funktionen                                                                                                               |
| 10. Init            | Stilles Vorausfüllen der Eingabefelder beim Seitenload                                                                                                                             |

**Zentrale JavaScript-Konzepte:**

- `async / await` für nicht-blockierende API-Anfragen
- `fetch()` für HTTP-Requests, `.json()` zum Parsen der Antwort
- DOM-Manipulation: `createElement`, `classList`, `innerHTML`, `style`, `appendChild`
- Event-Listener für `click`, `input`, `keydown`
- Template Literals für dynamische HTML-Strings
- Destructuring: `const { r, g, b } = data.rgb`
- `requestAnimationFrame` für saubere Animations-Neustarts
- `setTimeout` für zeitgesteuerte UI-Übergänge

### CSS

- **Neomorphism** als gestalterisches Prinzip: `box-shadow` mit hellen und dunklen Versätzen erzeugt ein weiches Relief
- CSS Custom Properties (Variablen) für alle Design-Tokens (Farben, Schatten, Radien, Schriften)
- `@keyframes` für: `fadeUp`, `slideInLeft`, `chipIn`, `swatchPop`, `shimmer`, `dotBounce`, `drawLine`, `shake`, `pickerPulse`
- CSS `transition` für sanfte Übergänge bei Farb- und Zustandswechseln
- `clamp()` für responsive Größen ohne Media Queries
- Media Query `@media (max-width: 600px)` für den mobilen Breakpoint
- `@media (prefers-reduced-motion: reduce)` für Barrierefreiheit

### Lottie

Die Lottie-Animation (`Flow 1`) ist direkt als JSON-Objekt in `script.js` eingebettet — kein externer Datei-Request nötig. Die Lottie Web-Library wird via CDN eingebunden (`lottie-web 5.12.2`).

---

## User Interaction Flow

```
Seitenload
  └── init() lädt Standardfarbe still im Hintergrund
      └── Lottie-Animation läuft, Picker-Button pulst

Nutzer wählt Farbe (Eingabe, Picker oder Konvertierung)
  └── API-Anfrage via fetchColorData()
      └── Lottie blendet aus, Farbvorschau erscheint
          └── Alle Felder synchronisieren sich (syncInputs)
              └── Hintergrundpillen wechseln Farbe (updateBlobs)

Nutzer generiert Scheme
  └── API-Anfrage an /scheme mit gewähltem Modus und Anzahl
      └── Chips erscheinen gestaffelt (index × 80ms)
          └── Klick auf Chip → Farbe in Clipboard
```

---

## Installation & Deployment

Das Projekt benötigt keinen Build-Step und keine Dependencies ausser dem Lottie CDN-Script.

**Lokal:**

```
Ordner öffnen → index.html mit Live Server starten
```

**Deployment:**

```
Alle drei Dateien (index.html, style.css, script.js) via SFTP
auf den Hostpoint-Server hochladen.
```

**Voraussetzungen:**

- Moderner Browser (Chrome, Firefox, Safari, Edge)
- Internetverbindung (für The Color API und Google Fonts)

---

## Quellen

- [The Color API](https://www.thecolorapi.com) — Joshua Moxon
- [Lottie Web](https://github.com/airbnb/lottie-web) — Airbnb, MIT License
- [DM Mono / DM Sans](https://fonts.google.com/specimen/DM+Mono) — Google Fonts, Open Font License
- Lottie-Animation `Flow 1` — eigene Datei (LottieFiles Figma Export)
