document.addEventListener("DOMContentLoaded", () => {
  // --- Existing Navigation Logic (No changes here) ---
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector("#primary-menu");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const setMenuState = (isOpen) => {
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navMenu.setAttribute("aria-hidden", String(!isOpen));
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion.matches ? "auto" : "smooth",
        });

        if (window.innerWidth <= 780 && navToggle.getAttribute("aria-expanded") === "true") {
          setMenuState(false);
        }
      }
    });
  });

  // --- NEW: Client Logo Scroller Logic ---
  const scrollers = document.querySelectorAll(".logo-scroller");

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }

  function addAnimation() {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".logo-scroller-inner");
      const scrollerContent = Array.from(scrollerInner.children);

      // Duplicate the logos for a seamless loop
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }
});