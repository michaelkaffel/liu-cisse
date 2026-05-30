/* ============================================================
   LIU-CISSÉ HOLDINGS — MAIN.JS
   ============================================================ */

(function () {
  'use strict';

  const nav        = document.getElementById('nav');
  const hamburger  = document.getElementById('hamburger');
  const drawer     = document.getElementById('drawer');
  const drawerLinks = drawer.querySelectorAll('.drawer-link');

  /* ----------------------------------------------------------
     NAV: Scroll state
     ---------------------------------------------------------- */
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    updateActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load


  /* ----------------------------------------------------------
     NAV: Hamburger toggle
     ---------------------------------------------------------- */
  hamburger.addEventListener('click', function () {
    const isOpen = drawer.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close drawer when a link is clicked
  drawerLinks.forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer on outside click
  document.addEventListener('click', function (e) {
    if (drawer.classList.contains('open') &&
        !drawer.contains(e.target) &&
        !hamburger.contains(e.target)) {
      closeDrawer();
    }
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  function closeDrawer() {
    drawer.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  }


  /* ----------------------------------------------------------
     NAV: Active link highlight on scroll
     ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  function updateActiveLink() {
    let current = '';
    const scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollY) {
        current = section.id;
      }
    });

    navAnchors.forEach(function (a) {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) {
        a.classList.add('active');
      }
    });
  }


  /* ----------------------------------------------------------
     SMOOTH SCROLL: anchor links (fallback for older browsers)
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });


  /* ----------------------------------------------------------
     NEWSLETTER FORMS: Resend-ready fetch handler
     Replace the action URLs with your Resend API endpoint
     or Vercel serverless function when ready.
     ---------------------------------------------------------- */
  document.querySelectorAll('.newsletter__form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      const listName = form.getAttribute('name');
      const btn = form.querySelector('.newsletter__submit');

      btn.textContent = 'Sending…';
      btn.disabled = true;

      /*
        TODO: Replace with your Vercel serverless function or Resend API call.

        fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, list: listName })
        })
        .then(r => r.json())
        .then(() => {
          btn.textContent = 'You\'re on the list.';
        })
        .catch(() => {
          btn.textContent = 'Try again.';
          btn.disabled = false;
        });
      */

      // Temporary confirmation (remove when API is wired)
      setTimeout(function () {
        btn.textContent = 'You\'re on the list.';
        form.querySelector('input[type="email"]').value = '';
      }, 800);
    });
  });

})();