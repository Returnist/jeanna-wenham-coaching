(function () {
  var S = window.SITE || {};
  var $ = function (id) { return document.getElementById(id); };
  document.documentElement.classList.add("js");

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (text) node.textContent = text;
    return node;
  }

  var icons = {
    email: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
    lock: '<svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>'
  };

  document.querySelectorAll(".year").forEach(function (n) { n.textContent = new Date().getFullYear(); });

  // Header: shadow once scrolled, mobile menu, highlight the section in view
  var header = document.querySelector(".site-header");
  function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = document.querySelector(".menu-toggle");
  var menu = $("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  if ("IntersectionObserver" in window) {
    var navLinks = menu ? menu.querySelectorAll('a[href^="#"]:not(.btn)') : [];
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(function (a) { var s = document.querySelector(a.getAttribute("href")); if (s) spy.observe(s); });

    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); reveal.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (n, i) {
      n.style.transitionDelay = (i % 4) * 70 + "ms";
      reveal.observe(n);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (n) { n.classList.add("in"); });
  }

  if (S.directoryProfile && $("directory-link")) $("directory-link").href = S.directoryProfile;

  // Packages
  var grid = $("price-grid");
  if (grid && S.packages) {
    S.packages.forEach(function (p) {
      var card = el("div", { class: "price-card reveal" + (p.featured ? " featured" : "") });
      if (p.featured) card.appendChild(el("span", { class: "tag" }, "Most popular"));
      card.appendChild(el("h3", {}, p.name));
      var hasPrice = typeof p.price === "number";
      var price = el("div", { class: "price" }, hasPrice ? S.currency + p.price : "On request");
      price.appendChild(el("small", {}, p.sessions > 1 ? p.sessions + " sessions" : "per session"));
      card.appendChild(price);
      var per = !hasPrice ? "Get in touch for current pricing" : p.sessions > 1 ? "Works out at " + S.currency + Math.round(p.price / p.sessions) + " per session" : "Pay as you go";
      card.appendChild(el("p", { class: "per" }, per));
      card.appendChild(el("p", { class: "blurb" }, p.blurb));
      var ul = el("ul");
      p.features.forEach(function (f) { ul.appendChild(el("li", {}, f)); });
      card.appendChild(ul);

      var btnClass = "btn btn-block" + (p.featured ? " btn-light" : "");
      var btn;
      if (p.paymentLink) {
        btn = el("a", { class: btnClass, href: p.paymentLink, rel: "noopener" });
        btn.innerHTML = icons.lock + "<span>Book &amp; pay securely</span>";
        card.appendChild(btn);
        var hint = el("p", { class: "pay-hint" });
        hint.innerHTML = icons.lock + "<span>Secure checkout · receipt by email</span>";
        card.appendChild(hint);
      } else {
        btn = el("a", { class: btnClass + (p.featured ? "" : " btn-ghost"), href: "#contact", "data-package": p.name }, "Enquire to book");
        card.appendChild(btn);
      }
      grid.appendChild(card);
      if (card.classList.contains("reveal") && window.IntersectionObserver) {
        reveal.observe(card);
      } else {
        card.classList.add("in");
      }
    });
  }

  var methods = $("pay-methods");
  if (methods) (S.paymentMethods || []).forEach(function (m) { methods.appendChild(el("li", {}, m)); });

  if (S.customPaymentLink && $("custom-pay")) {
    $("custom-pay-link").href = S.customPaymentLink;
    $("custom-pay").hidden = false;
  }

  // "Enquire" and "Request an invoice" buttons pre-fill the contact form
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-package], [data-interest]");
    if (!a || !$("contact-form")) return;
    var msg = $("message"), interest = $("interest");
    var pkg = a.getAttribute("data-package");
    if (pkg) {
      interest.value = "A coaching package";
      if (!msg.value) msg.value = "Hi Jeanna, I'd like to book the " + pkg + ". ";
    } else {
      interest.value = a.getAttribute("data-interest");
      if (!msg.value && interest.value === "Coaching funded by my employer") {
        msg.value = "Hi Jeanna, my employer would like to fund coaching. Organisation name: ";
      }
    }
  });

  // Contact details
  var list = $("contact-list");
  function addRow(icon, content) {
    var li = el("li");
    li.innerHTML = '<span class="ci">' + icons[icon] + "</span>";
    var span = el("span");
    if (typeof content === "string") span.textContent = content; else span.appendChild(content);
    li.appendChild(span);
    list.appendChild(li);
  }
  if (list) {
    if (S.email) addRow("email", el("a", { href: "mailto:" + S.email }, S.email));
    if (S.phone) addRow("phone", el("a", { href: "tel:" + S.phone.replace(/\s/g, "") }, S.phone));
    if (S.linkedin) addRow("link", el("a", { href: S.linkedin, target: "_blank", rel: "noopener" }, "Connect on LinkedIn"));
  }

  // Footer contact column (all pages)
  var foot = $("foot-contact");
  if (foot) {
    var parts = [];
    if (S.email) parts.push('<a href="mailto:' + S.email + '">' + S.email + "</a>");
    if (S.phone) parts.push('<a href="tel:' + S.phone.replace(/\s/g, "") + '">' + S.phone + "</a>");
    if (S.linkedin) parts.push('<a href="' + S.linkedin + '" target="_blank" rel="noopener">LinkedIn</a>');
    if (S.businessAddress) parts.push(S.businessAddress);
    if (parts.length) foot.innerHTML = parts.join("<br>");
  }
  document.querySelectorAll("[data-address]").forEach(function (n) {
    if (S.businessAddress) { n.textContent = S.businessAddress; n.parentElement.hidden = false; }
  });
  document.querySelectorAll("[data-email]").forEach(function (n) {
    if (S.email) { n.textContent = S.email; n.href = "mailto:" + S.email; }
  });

  // Booking calendar (Cal.com / Calendly): embed it and point the consultation buttons at it
  if (S.bookingLink) {
    if ($("book")) {
      $("book").hidden = false;
      $("booking-iframe").src = S.bookingLink;
      $("booking-newtab").href = S.bookingLink;
      $("booking-wrap").hidden = false;
      document.querySelectorAll("[data-consult]").forEach(function (a) { a.href = "#book"; });
    }
    document.querySelectorAll("[data-booking]").forEach(function (a) { a.href = S.bookingLink; a.hidden = false; });
  }

  // Contact form
  var form = $("contact-form");
  if (form) {
    var status = $("form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      if (!form.checkValidity() || !$("consent").checked) {
        status.textContent = "Please fill in your name, a valid email and a message, and tick the consent box.";
        status.classList.add("err");
        return;
      }
      var data = new FormData(form);
      if (data.get("_gotcha")) return;

      if (!S.formEndpoint) {
        if (!S.email) {
          status.textContent = "The contact form isn't set up yet. Please try again soon.";
          status.classList.add("err");
          return;
        }
        var body = "Name: " + data.get("name") + "\nEmail: " + data.get("email") + "\nPhone: " + (data.get("phone") || "-") +
          "\nInterested in: " + data.get("interest") + "\n\n" + data.get("message");
        location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent("Coaching enquiry: " + data.get("interest")) +
          "&body=" + encodeURIComponent(body);
        return;
      }

      var submit = form.querySelector('button[type="submit"]');
      submit.disabled = true;
      status.textContent = "Sending…";
      data.append("_subject", "Coaching enquiry: " + data.get("interest"));
      fetch(S.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          form.reset();
          status.textContent = "Thank you. Your message has been sent and Jeanna will be in touch within two working days.";
          status.classList.add("ok");
        })
        .catch(function () {
          status.textContent = "Sorry, something went wrong. Please try again" + (S.email ? " or email " + S.email : "") + ".";
          status.classList.add("err");
        })
        .then(function () { submit.disabled = false; });
    });
  }

  // Setup checklist: only visible when previewing the site locally, never to visitors
  var local = location.protocol === "file:" || /^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname) || /[?&]setup\b/.test(location.search);
  if (local && $("price-grid")) {
    var todo = [];
    if (!S.email) todo.push("Email address");
    if (!S.phone) todo.push("Phone number");
    if (!S.businessAddress) todo.push("Business address (legally required to sell online)");
    if (!S.formEndpoint) todo.push("Formspree form endpoint");
    if (!S.bookingLink) todo.push("Cal.com booking link (optional)");
    if (!S.pricesConfirmed) todo.push("Confirm real prices (currently placeholders)");
    var unpaid = (S.packages || []).filter(function (p) { return !p.paymentLink; }).map(function (p) { return p.name; });
    if (unpaid.length) todo.push("Stripe Payment Link for: " + unpaid.join(", "));
    if (todo.length) {
      var box = el("details", { class: "setup-check", role: "note" });
      if (window.innerWidth > 760) box.open = true;
      box.innerHTML = "<summary>Before going live: " + todo.length + " to do in config.js</summary><button aria-label='Dismiss'>×</button>";
      var ul = el("ul");
      todo.forEach(function (t) { ul.appendChild(el("li", {}, t)); });
      box.appendChild(ul);
      box.appendChild(el("p", {}, "Only shown in local previews. See SETUP.md."));
      box.querySelector("button").onclick = function () { box.remove(); };
      document.body.appendChild(box);
    }
  }
})();
