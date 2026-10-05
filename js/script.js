/* ============================================================
   Charejro — Cezary Rybak · strony internetowe
   script.js
   ============================================================ */
(function () {
  "use strict";

  /* ============================================================
     KONFIGURACJA
     ------------------------------------------------------------
     Formularz wysyła wiadomości przez darmowy serwis formsubmit.co
     (bez konta, bez serwera). Wiadomość trafia na charejro@gmail.com,
     a klient dostaje potwierdzenie na swój e-mail.

     Adres docelowy i treść potwierdzenia ustawia się w kontakt.html:
       - action="https://formsubmit.co/charejro@gmail.com"
       - pole ukryte name="_autoresponse"
     ============================================================ */
  var CONFIG = {
    email: "charejro@gmail.com",
    whatsapp: "48501589194",

    /* Opcjonalnie: powiadomienie na WhatsApp o każdym zgłoszeniu
       (darmowy klucz z callmebot.com — szczegóły w README). */
    callmebotKey: ""
  };

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.getElementById("site-nav");
  var toTop = document.querySelector(".to-top");
  var yearEl = document.getElementById("year");
  var form = document.getElementById("contact-form");
  var formStatus = document.getElementById("form-status");
  var formSuccess = document.getElementById("form-success");

  /* ---------- Rok w stopce ---------- */
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Nagłówek: tło po przewinięciu ---------- */
  function onScroll() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 10);
    }
    if (toTop) {
      toTop.classList.toggle("is-visible", window.scrollY > 600);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobilne ---------- */
  function closeNav() {
    if (!header || !navToggle) return;
    header.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Otwórz menu");
  }

  if (header && navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.setAttribute("aria-label", isOpen ? "Zamknij menu" : "Otwórz menu");
    });

    siteNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });

    document.addEventListener("click", function (event) {
      if (!header.classList.contains("nav-open")) return;
      if (!header.contains(event.target)) closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 940) closeNav();
    });
  }

  /* ---------- Animacje pojawiania się sekcji ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Powrót na stronę po wysłaniu formularza ---------- */
  if (formSuccess && window.location.hash === "#wyslano") {
    formSuccess.hidden = false;
    window.setTimeout(function () {
      formSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  }

  /* ---------- Formularz kontaktowy ---------- */
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = form.querySelector("#cf-name").value.trim();
      var email = form.querySelector("#cf-email").value.trim();
      var topic = form.querySelector("#cf-topic").value;
      var message = form.querySelector("#cf-message").value.trim();
      var consent = form.querySelector("#cf-consent").checked;
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name) {
        formStatus.textContent = "Uzupełnij imię i nazwisko.";
        form.querySelector("#cf-name").focus();
        return;
      }
      if (!emailPattern.test(email)) {
        formStatus.textContent = "Podaj poprawny adres e-mail.";
        form.querySelector("#cf-email").focus();
        return;
      }
      if (!topic) {
        formStatus.textContent = "Wybierz temat zapytania.";
        form.querySelector("#cf-topic").focus();
        return;
      }
      if (!message) {
        formStatus.textContent = "Napisz kilka słów o swoim projekcie.";
        form.querySelector("#cf-message").focus();
        return;
      }
      if (!consent) {
        formStatus.textContent = "Zaznacz zgodę na kontakt.";
        form.querySelector("#cf-consent").focus();
        return;
      }

      formStatus.textContent = "Wysyłam…";

      /* Dynamiczny temat wiadomości i powrót na tę stronę po wysłaniu */
      var subjectInput = form.querySelector('input[name="_subject"]');
      if (subjectInput) subjectInput.value = "Zapytanie ze strony: " + topic;

      var nextInput = form.querySelector('input[name="_next"]');
      if (nextInput) {
        nextInput.value = window.location.origin + window.location.pathname + "#wyslano";
      }

      /* Opcjonalne powiadomienie na WhatsApp (jeśli wpisano klucz) */
      if (CONFIG.callmebotKey) {
        try {
          var waText =
            "Nowe zapytanie ze strony:\n\n" +
            message +
            "\n\n— — —\nImię i nazwisko: " + name +
            "\nE-mail: " + email +
            "\nTemat: " + topic;
          var beacon = new Image();
          beacon.src =
            "https://api.callmebot.com/whatsapp.php?phone=" +
            encodeURIComponent("+" + CONFIG.whatsapp) +
            "&text=" + encodeURIComponent(waText) +
            "&apikey=" + encodeURIComponent(CONFIG.callmebotKey);
        } catch (e) { /* nic — formularz i tak wysyła e-mail */ }
      }

      /* Wysyłka przez formsubmit.co (wiadomość + potwierdzenie dla klienta) */
      form.submit();
    });
  }
})();
