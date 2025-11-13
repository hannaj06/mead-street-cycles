(function () {
  const header = document.querySelector(".site-header");
  const btn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  if (!header || !btn || !nav) return;

  btn.addEventListener("click", () => {
    const open = header.getAttribute("data-menu-open") === "true";
    header.setAttribute("data-menu-open", String(!open));
    btn.setAttribute("aria-expanded", String(!open));
  });

  // Close menu if user tabs/clicks outside on mobile
  document.addEventListener("click", (e) => {
    const open = header.getAttribute("data-menu-open") === "true";
    if (!open) return;
    if (!header.contains(e.target)) {
      header.setAttribute("data-menu-open", "false");
      btn.setAttribute("aria-expanded", "false");
    }
  });
})();