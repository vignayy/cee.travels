document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector("#primary-menu");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  // Function to set the state of the mobile menu
  const setMenuState = (isOpen) => {
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navMenu.setAttribute("aria-hidden", String(!isOpen));
  };

  // Toggle menu on button click
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  // Smooth scrolling for all anchor links
  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Offset for the fixed header. Adjust this value if header height changes.
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion.matches ? "auto" : "smooth",
        });

        // Close mobile menu after clicking a link
        if (window.innerWidth <= 780 && navToggle.getAttribute("aria-expanded") === "true") {
          setMenuState(false);
        }
      }
    });
  });
});