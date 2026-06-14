(function () {
  const wrapper = document.querySelector('[data-nav="wrapper"]');
  if (!wrapper) return;

  const toggle = wrapper.querySelector('[data-nav-toggle]');
  const menu = wrapper.querySelector('[data-nav-menu]');

  if (!toggle || !menu) return;

  const isOpen = () => wrapper.getAttribute('data-menu-open') === 'true';

  const openMenu = () => {
    wrapper.setAttribute('data-menu-open', 'true');
    toggle.setAttribute('aria-expanded', 'true');
    menu.removeAttribute('aria-hidden');
  };

  const closeMenu = () => {
    wrapper.setAttribute('data-menu-open', 'false');
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  };

  closeMenu();

  toggle.addEventListener('click', () => {
    if (isOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener('click', (event) => {
    if (!isOpen()) return;
    if (wrapper.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !isOpen()) return;
    closeMenu();
    toggle.focus();
  });
})();
