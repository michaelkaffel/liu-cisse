/* ============================================================
   LIU-CISSÉ HOLDINGS — MAIN.JS
   ============================================================ */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        const nav = document.getElementById('nav');
        const hamburger = document.getElementById('hamburger');
        const drawer = document.getElementById('drawer');

        if (!nav || !hamburger || !drawer) {
            console.warn('Nav elements not found.');
            return;
        }

        const drawerLinks = drawer.querySelectorAll('a');
        const sections = document.querySelectorAll('section[id]');
        const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

        /* ----------------------------------------------------------
           DRAWER TOGGLE
           ---------------------------------------------------------- */
        function toggleDrawer(open) {
            drawer.classList.toggle('open', open);
            hamburger.classList.toggle('open', open);
            hamburger.setAttribute('aria-expanded', String(open));
            document.body.style.overflow = open ? 'hidden' : '';
        }

        function closeDrawer() {
            toggleDrawer(false);
        }

        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleDrawer(!drawer.classList.contains('open'));
        });

        drawerLinks.forEach(function (link) {
            link.addEventListener('click', closeDrawer);
        });

        document.addEventListener('click', function (e) {
            if (
                drawer.classList.contains('open') &&
                !drawer.contains(e.target) &&
                !hamburger.contains(e.target)
            ) {
                closeDrawer();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeDrawer();
        });

        /* ----------------------------------------------------------
           ACTIVE NAV LINK
           ---------------------------------------------------------- */
        function updateActiveLink() {
            let current = '';
            const scrollY = window.scrollY + 120;
            sections.forEach(function (section) {
                if (section.offsetTop <= scrollY) current = section.id;
            });
            navAnchors.forEach(function (a) {
                a.classList.toggle('active', a.getAttribute('href') === '#' + current);
            });
        }

        /* ----------------------------------------------------------
           SCROLL HANDLER
           ---------------------------------------------------------- */
        function onScroll() {
            nav.classList.toggle('scrolled', window.scrollY > 40);
            updateActiveLink();
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        /* ----------------------------------------------------------
           SMOOTH SCROLL
           ---------------------------------------------------------- */
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (!target) return;
                e.preventDefault();
                closeDrawer();
                const top = target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight;
                window.scrollTo({ top: top, behavior: 'smooth' });
            });
        });

        /* ----------------------------------------------------------
           NEWSLETTER FORMS
           ---------------------------------------------------------- */
        document.querySelectorAll('.newsletter__form').forEach(function (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const emailInput = form.querySelector('input[type="email"]');
                const btn = form.querySelector('.newsletter__submit');

                btn.textContent = 'Sending…';
                btn.disabled = true;

                /*
                  TODO: wire to Vercel + Resend
                  fetch('/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: emailInput.value, list: form.getAttribute('name') })
                  })
                  .then(r => r.json())
                  .then(() => { btn.textContent = 'You\'re on the list.'; })
                  .catch(() => { btn.textContent = 'Try again.'; btn.disabled = false; });
                */

                setTimeout(function () {
                    btn.textContent = 'You\'re on the list.';
                    emailInput.value = '';
                }, 800);
            });
        });


        /* ----------------------------------------------------------
           MODALS
           ---------------------------------------------------------- */

        // Modal open
        document.querySelectorAll('[data-modal]').forEach(function (trigger) {
            trigger.addEventListener('click', function (e) {
                e.preventDefault();
                const id = this.getAttribute('data-modal');
                document.getElementById(id).classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });

        // Modal close — button or backdrop
        document.querySelectorAll('.modal').forEach(function (modal) {
            modal.addEventListener('click', function (e) {
                if (e.target === modal || e.target.classList.contains('modal__close')) {
                    modal.classList.remove('open');
                    document.body.style.overflow = '';
                }
            });
        });

        // Modal close — Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.open').forEach(function (m) {
                    m.classList.remove('open');
                    document.body.style.overflow = '';
                });
            }
        });

    });

})();