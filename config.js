/*
 * SITE SETTINGS: edit this file to update contact details, prices and payment links.
 * Anything left empty is hidden on the site or falls back gracefully.
 * Open the site locally (double-click index.html) to see a checklist of what's still missing.
 */
window.SITE = {
  name: "Jeanna Wenham",
  tagline: "Executive & Leadership Coaching",

  // Contact details (shown in the Contact section and footer once filled in)
  email: "coachingwithjeanna@gmail.com",  // e.g. "hello@jeannawenham.co.uk"
  phone: "",            // e.g. "07700 900000"
  linkedin: "",         // e.g. "https://www.linkedin.com/in/..."
  // UK law requires anyone selling online to show a postal address. A business or
  // correspondence address is fine; it doesn't have to be a home address.
  businessAddress: "35 Harebell Close, Milton Keynes, MK7 7BA",  // e.g. "Jeanna Wenham Coaching, 1 Example Street, Milton Keynes MK7 0AA"
  directoryProfile: "https://www.lifecoach-directory.org.uk/lifecoaches/jeanna-wenham",

  // Contact form: create a free form at https://formspree.io and paste its endpoint here.
  // Left empty, the form opens the visitor's email app instead (needs `email` above).
  formEndpoint: "",     // e.g. "https://formspree.io/f/abcdwxyz"

  // Online booking for the free consultation (Cal.com or Calendly). Optional.
  bookingLink: "",      // e.g. "https://cal.com/jeanna-wenham/free-consultation"

  /*
   * PACKAGES & PAYMENTS
   * For each package, create a Stripe Payment Link (Stripe dashboard → Payment Links → New)
   * and paste the URL into paymentLink. Set the link's "After payment" redirect to
   * https://jeannawenhamcoaching.com/thank-you.html  (full steps in SETUP.md)
   * Packages with no paymentLink show an "Enquire to book" button instead.
   */
  currency: "£",

  // The prices below are PLACEHOLDERS. Set the real ones, then change this to true.
  pricesConfirmed: true,

  // Optional Stripe Payment Link where the customer types the amount ("Customers choose what
  // to pay"). Used for tailored packages and invoices. Shown under the packages when set.
  customPaymentLink: "",

  // Payment methods shown under the packages. Match these to what's switched on in Stripe.
  paymentMethods: ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay"],

  packages: [
    {
      id: "single",
      name: "Single Session",
      price: 180,
      sessions: 1,
      blurb: "A focused session to work through one specific challenge or decision.",
      features: ["2 hours, online or in person", "Pre-session reflection questions", "Written summary and next steps"],
      paymentLink: "https://book.stripe.com/14A9AVactbdic4I1HNeME00",
      featured: false
    },
    {
      id: "transition",
      name: "Career Transition Programme",
      price: null,      // set the new price, then add its Stripe link
      sessions: 6,
      blurb: "For a promotion, a new role or a change of direction: clarity, a plan and the confidence to act.",
      features: ["Six 2-hour sessions", "Strengths and values exploration", "CV, LinkedIn and interview preparation", "Email support between sessions"],
      paymentLink: "",
      featured: true
    },
    {
      id: "confidence",
      name: "Confidence & Resilience",
      price: null,      // set the new price, then add its Stripe link
      sessions: 3,
      blurb: "Rebuild self-belief and manage workplace pressure so you can show up as your best self.",
      features: ["Three 60-minute sessions", "Practical tools for stress and pressure", "Your personal confidence plan"],
      paymentLink: "",
      featured: false
    }
  ]
};
