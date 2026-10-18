# DY Construction Group — Home page

React + Vite + Tailwind + Framer Motion + three.js. Front end only: the
design-and-quote flow shows a success state but uploads and sends nothing.

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # dist/  -> deploy to Vercel, or npx serve dist
npm run build:solo   # dist-solo/index.html — one file, opens by double-click
```

Only **Home** is built. About, Services, Gallery, Blog and Contact render in the
nav but are disabled with a "Coming soon" tooltip.

## Page order

Hero (with photo upload card) → **Design & quote** → About → Services →
Before/after → 3D bathroom build → Why DY → Reviews → Gallery → Service area →
Final CTA → Footer.

## Design & quote flow (`src/components/DesignQuote.jsx`)

1. **Your room** — room type + a photo (drag-drop or phone camera/library).
2. **Your style** — up to 2 styles, up to 5 features (options change per room),
   a colour palette, free-text notes. These are assembled live into a one-line
   **design brief**, e.g. *"A Japandi and modern bathroom with walk-in shower,
   matte black tapware and backlit mirror, in a warm neutral palette."*
3. **Visualise** — their photo beside the AI redesign slot. **Generate my
   design** is shown but disabled ("launching soon"). The brief is exactly the
   prompt the visualiser will use when it's connected.
4. **Your details** — name, phone, email, suburb, budget, timing → success.

The hero's upload card shares state with the form (`src/lib/design.jsx`), so a
visitor from an ad can drop a photo in the hero and land on the form with it
already loaded.

### To make it real later
- Upload: post the photo + brief + details to a backend / form service.
- AI visualiser: an image-to-image model that takes the photo and the brief.
  Enable the button in `Visualiser` and render the result in the right panel.

## Content notes — check with the client

- **Before/after photos are SAMPLES, not DY's work.** The section says so on
  screen. Replace in `TRANSFORMATIONS` (`src/lib/site.js`) with DY's own pairs.
- **Hero background** is the image his current site uses
  (`10-modern-bathroom-storage-ideas…`). It looks like a stock photo, so it is
  used only as a background and never captioned as a DY project.
- Every gallery, services and about photo is DY's own work.
- Three service descriptions (bathroom, carpentry, interior) are written for the
  demo — his site shows those headings with no body text. Marked in `site.js`.
- Reviews are the three on his current site, word for word.

## Engineering notes

- Fonts (Sora, Figtree) are self-hosted via npm — no Google Fonts request, and
  the single-file demo includes them.
- 3D framing was checked by projecting the room's corners through the camera at
  1440×900, 1280×720, 820×1180, 390×844 and 360×740 across the whole scroll.
- Verified in headless Chromium at desktop and phone sizes: no console errors,
  no horizontal overflow, and the full design-and-quote flow run end to end.
