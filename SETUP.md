# Setting up payments, bookings & notifications

The site is ready. Each service below just needs an account and a link pasted into `config.js`.
Until a link is added, that feature stays hidden or falls back gracefully, so they can be done in any order.

**Tip:** open `index.html` on your own computer and a "Before going live" checklist appears in the
bottom corner, listing whatever is still missing. Visitors to the live site never see it.

---

## 1. Stripe: taking payments

1. Sign up at **stripe.com/gb** and complete business verification (ID and bank account for payouts).
2. **Create a product for each package:** Product catalogue → Add product.
   - Single Session, Career Transition Programme, Confidence & Resilience, with the prices she wants.
3. **Create a Payment Link for each one:** Payment Links → New → choose the product.
   - Under **After payment**, choose "Don't show confirmation page" and redirect to
     `https://YOUR-DOMAIN/thank-you.html`
   - Optional: tick "Collect customers' phone numbers".
   - Recommended: tick **Require customers to accept your terms of service** (first add
     `https://YOUR-DOMAIN/terms.html` under Settings → Public details).
4. Copy each link (looks like `https://buy.stripe.com/...`) into the matching package's
   `paymentLink` in `config.js`. That package's button changes to **"Book & pay securely"**.
5. **Optional, for tailored packages and invoices:** create one more Payment Link, choose
   "Customers choose what to pay", and paste it into `customPaymentLink`.
6. Set the real prices in `config.js` (they must match Stripe) and change `pricesConfirmed` to `true`.
   If you switch payment methods on or off in Stripe, edit `paymentMethods` to match.
   Optional: switching on **Klarna** in Stripe lets clients pay for packages in instalments.
7. **Get emailed for every payment:** Settings → Personal details → Communication preferences
   (Notifications) → tick **Successful payments**. Also install the **Stripe app** on her phone
   for instant alerts.

To test first, switch Stripe to **Test mode**, make test links, and pay with card `4242 4242 4242 4242`
(any future date and any CVC). Swap in the live links when she's happy.

## 2. Formspree: contact form messages to her inbox

1. Sign up at **formspree.io** with the email she wants messages sent to (free: 50 messages a month).
2. New form → copy the endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
3. Paste it into `formEndpoint` in `config.js`.
4. Send a test message from the site. The first one asks her to confirm her email.

Every enquiry then arrives as an email with the person's name, email, phone, topic and message.
Until this is set up, the form opens the visitor's own email app instead (this only works once `email` is filled in).

## 3. Cal.com: online booking for the free consultation

1. Sign up at **cal.com** (free) and connect her Google or Outlook calendar so she's never double-booked.
2. Create an event type "Free consultation", 30 minutes, with a Google Meet, Zoom or phone location.
3. Set her available hours.
4. Copy the event link, e.g. `https://cal.com/jeanna-wenham/free-consultation`, into `bookingLink`.

A **Book online** calendar section then appears on the site, and all "free consultation" buttons
jump to it. She and the client both get confirmation emails, calendar invites and reminders.
(Calendly links work the same way.)

**Optional:** Cal.com can also take payment for paid sessions. In Cal.com, go to Apps → Stripe, connect
her Stripe account, then set a price on a paid event type.

## 4. Contact details

Fill in `email`, `phone` and `linkedin` in `config.js`. They appear in the Contact section and footer automatically.

Also fill in `businessAddress`. UK law requires anyone selling services online to show a postal
address, and Stripe checks for it. A business or correspondence address is fine. It appears in the
footer and the coaching terms.

---

### Summary: how Jeanna hears about new clients
| Event | Notification |
|---|---|
| Someone pays | Stripe email and phone app alert |
| Someone sends the contact form | Formspree email |
| Someone books a consultation | Cal.com email and calendar invite |
