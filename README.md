# Jeanna Wenham Coaching website

A static website (no build step) based on Jeanna's Life Coach Directory profile.
Open `index.html` in a browser to preview it.

## Before going live: edit `config.js` (step-by-step guide in SETUP.md)
- **email / phone / linkedin / businessAddress**: real contact details. These are blank for now and are hidden until filled in.
- **formEndpoint**: create a free form at formspree.io and paste its endpoint here. Without it, the contact form opens the visitor's email app.
- **bookingLink**: optional Calendly or Cal.com link for free consultations.
- **packages**: prices are PLACEHOLDERS (£95 / £480 / £260). Set real ones, then set `pricesConfirmed: true`.
- **paymentLink**: for each package, create a Stripe Payment Link and paste its URL.
  In Stripe, set "After payment" to redirect to `https://YOUR-DOMAIN/thank-you.html`.
  Packages without a link show "Enquire to book".

Previewing the site locally shows a "Before going live" checklist of anything still missing (never shown on the live site).

## Pages
`index.html` (home), `thank-you.html` (after Stripe payment), `terms.html`, `privacy.html`, `404.html`.

## Other things to add
- Photo: `images/jeanna.jpg` (400×400). Swap in a larger version (800×1000 or bigger) for a sharper image on retina screens.
- Testimonials, if she has any. None were taken from the profile.
- Check the wording of the cancellation and refund policy in `terms.html` and `privacy.html` (it also appears in the FAQ in `index.html`).

## Hosting
Upload the folder to any static host (Netlify drop, Cloudflare Pages, GitHub Pages) under her own account and domain.
