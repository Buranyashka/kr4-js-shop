(function () {
  const toggle = document.querySelector('.site-nav__toggle');
  const nav = document.querySelector('.site-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('site-nav--open', !isOpen);
  });

  nav.querySelectorAll('.site-nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('site-nav--open');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('site-nav--open')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('site-nav--open');
      toggle.focus();
    }
  });
})();