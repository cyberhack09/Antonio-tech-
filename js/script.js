
/* ========================================
   ORBIX DIGITAL — JAVASCRIPT
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {

  // 1. MENÚ MÓVIL
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = navMenu
    ? navMenu.querySelectorAll("a")
    : [];

  function closeMenu() {
    if (!menuToggle || !navMenu) return;

    menuToggle.classList.remove("active");
    navMenu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Cerrar el menú si se pulsa fuera de él.
    document.addEventListener("click", (event) => {
      if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    // Cerrar el menú al volver a una pantalla grande.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) {
        closeMenu();
      }
    });
  }


  // 2. ANIMACIONES AL DESPLAZARSE
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Animar cada elemento una sola vez.
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    // Compatibilidad con navegadores antiguos.
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }


  // 3. AÑO AUTOMÁTICO EN EL FOOTER
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // 4. RESALTAR EL ENLACE DE LA SECCIÓN ACTUAL
  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const sectionLinks = document.querySelectorAll(
    '.nav-menu a[href^="#"]'
  );

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.id;

          sectionLinks.forEach((link) => {
            const isCurrent =
              link.getAttribute("href") === "#" + sectionId;

            link.classList.toggle("active", isCurrent);

            if (isCurrent) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        threshold: 0,
        rootMargin: "-25% 0px -65% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }


  // 5. AÑO Y ENLACES: VALIDACIÓN BÁSICA DE INICIO
  console.log("Orbix Digital está listo.");
  
  // 6. INDICADOR DE PROGRESO DE LECTURA
  const progressBar = document.getElementById("scroll-progress");

  function updateScrollProgress() {
    if (!progressBar) return;

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (scrollableHeight <= 0) {
      progressBar.style.width = "0%";
      return;
    }

    const progress =
      (window.scrollY / scrollableHeight) * 100;

    progressBar.style.width =
      Math.min(100, Math.max(0, progress)) + "%";
  }

  window.addEventListener("scroll", updateScrollProgress, {
    passive: true
  });

  window.addEventListener("resize", updateScrollProgress);

  updateScrollProgress();

  
  // 7. COTIZACIONES POR WHATSAPP

  // Sustituye este valor por tu número real.
  // Formato: código de país + número, sin +, espacios ni guiones.
  const whatsappNumber = "18099861302";

  const pricingButtons = document.querySelectorAll(
    ".pricing-button[data-plan]"
  );

  pricingButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const plan = button.dataset.plan;

      const message =
        `Hola, Orbix Digital. Me interesa el plan ${plan}. ` +
        "Me gustaría conocer los detalles y solicitar una cotización.";

      if (
        !/^[0-9]{8,15}$/.test(whatsappNumber) ||
        whatsappNumber.includes("X")
      ) {
        alert(
          "Configura primero tu número real de WhatsApp en js/script.js."
        );
        return;
      }

      const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  });
  
  // 8. FORMULARIO DE CAPTACIÓN DE CLIENTES

  const leadForm = document.getElementById("lead-form");

  if (leadForm) {
    leadForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!leadForm.reportValidity()) return;

      if (
        typeof whatsappNumber === "undefined" ||
        !/^[0-9]{8,15}$/.test(whatsappNumber) ||
        whatsappNumber.includes("X")
      ) {
        alert(
          "Configura tu número real de WhatsApp en script.js."
        );
        return;
      }

      const name = document
        .getElementById("client-name")
        .value.trim();

      const email = document
        .getElementById("client-contact")
        .value.trim();

      const project = document
        .getElementById("project-type")
        .value;

      const budget = document
        .getElementById("project-budget")
        .value;

      const details = document
        .getElementById("project-details")
        .value.trim();

      const consent = document
        .getElementById("contact-consent")
        .checked;

      if (!consent) {
        alert("Debes aceptar el aviso de contacto.");
        return;
      }

      const message = [
        "Hola, Orbix Digital. Quiero solicitar una cotización.",
        "",
        "NOMBRE: " + name,
        "CORREO: " + email,
        "PROYECTO: " + project,
        "PRESUPUESTO: " + budget,
        "",
        "DETALLES DEL PROYECTO:",
        details
      ].join("\n");

      const url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);

      window.open(url, "_blank", "noopener,noreferrer");
    });
  }


});
