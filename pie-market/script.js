document.documentElement.classList.add('js');

/* Mobile menu */
(function initMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 62rem)').addEventListener('change', () => setOpen(false));
})();

/* Reveal on scroll */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => observer.observe(el));
})();

/* Back to top */
(function initToTop() {
  const btn = document.querySelector('.to-top');
  if (!btn) return;
  const update = () => { btn.hidden = window.scrollY < 700; };
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
