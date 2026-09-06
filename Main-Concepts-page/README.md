# KPM Luxe Rentals Website Concepts

Four premium homepage directions for KPM Luxe Rentals:

1. **Signature Services** - a polished landing slider with image-led service cards.
2. **Quiet Authority** - a corporate and embassy-focused direction.
3. **Fleet Store** - a vehicle-first catalogue direction.
4. **Elite Car Dreams** - the provided concept added into the main concept mix.

## Run Locally

Requirements: Node.js 22.13 or later.

```bash
npm install
npm run dev
```

Then open the local address shown in the terminal. On Windows, `http://127.0.0.1:5173/` may work more reliably than `localhost`.

## Main Files

- `app/page.tsx` and `app/concept-client.tsx` - routing, interactions and the concept hub.
- `app/services/[slug]/page.tsx` - dedicated service pages for each service card.
- `app/globals.css` - responsive styling and the KPM Luxe Rentals visual system.
- `public/assets/` - logo and concept vehicle imagery.

## Important Notes

- Vehicle visuals are concept placeholders unless replaced with KPM's actual fleet photography.
- Availability and prices are intentionally not invented.
- The enquiry form and AI concierge are front-end prototypes and must be connected to KPM's final email, WhatsApp or backend workflow before launch.
