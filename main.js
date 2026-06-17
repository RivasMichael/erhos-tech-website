/* ═══════════════════════════════════════════
   ERHOS TECHNOLOGY — main.js
   Carrusel · Menú · FAQ · Scroll · Contacto
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════
     1. HEADER — sticky + shadow al scroll
  ══════════════════════════════════════ */
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  /* ══════════════════════════════════════
     2. MENÚ HAMBURGUESA (móvil)
  ══════════════════════════════════════ */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Cierra el menú al hacer clic en un enlace
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    // Cierra el menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }


  /* ══════════════════════════════════════
     3. CARRUSEL (index.html)
  ══════════════════════════════════════ */
  const slides    = document.querySelectorAll('.slide');
  const dots      = document.querySelectorAll('.dot');
  const prevBtn   = document.getElementById('prevBtn');
  const nextBtn   = document.getElementById('nextBtn');

  if (slides.length > 0) {
    let currentSlide = 0;
    let autoplayTimer = null;
    const INTERVAL = 5000; // 5 segundos

    function goToSlide(index) {
      const outVid = slides[currentSlide].querySelector('video');
      if (outVid) outVid.pause();

      slides[currentSlide].classList.remove('active');
      if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

      currentSlide = (index + slides.length) % slides.length;

      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');

      const inVid = slides[currentSlide].querySelector('video');
      if (inVid) {
        inVid.currentTime = 0;
        inVid.play().catch(() => {});
      }
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, INTERVAL);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    // Botones prev / next
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        startAutoplay(); // reinicia el timer
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        startAutoplay();
      });
    }

    // Dots
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        startAutoplay();
      });
    });

    // Pausa al pasar el mouse
    const carousel = document.getElementById('carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
    }

    // Soporte táctil (swipe)
    let touchStartX = 0;
    if (carousel) {
      carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });

      carousel.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
          startAutoplay();
        }
      });
    }

    // Pausa los slides que no son el inicial
    slides.forEach((slide, i) => {
      const vid = slide.querySelector('video');
      if (vid && i !== 0) vid.pause();
    });

    // Inicia autoplay
    startAutoplay();
  }


  /* ══════════════════════════════════════
     4. FAQ — acordeón
  ══════════════════════════════════════ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Cierra todos los demás
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });

      // Alterna el actual
      item.classList.toggle('open', !isOpen);
    });
  });


  /* ══════════════════════════════════════
     5. SCROLL REVEAL (animación de entrada)
  ══════════════════════════════════════ */
  // Agrega clase 'reveal' a los elementos que queremos animar
  const revealTargets = [
    '.service-card',
    '.stat-card',
    '.step-mini',
    '.faq-item',
    '.mv-card',
    '.audience-card',
    '.coming-soon',
    '.proyecto-card',
    '.about-text',
    '.about-visual',
    '.intro-text',
    '.intro-stats',
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal');
    });
  });

  // Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Pequeño delay escalonado para grupos
        const siblings = Array.from(entry.target.parentElement.children);
        const index = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


  /* ══════════════════════════════════════
     6. SMOOTH SCROLL para anclas internas
  ══════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // altura del header
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ══════════════════════════════════════
     7. FORMULARIO DE CONTACTO
        → Redirige a WhatsApp con el mensaje
  ══════════════════════════════════════ */
  const sendBtn = document.getElementById('sendBtn');

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const nombre   = (document.getElementById('nombre')?.value || '').trim();
      const email    = (document.getElementById('email')?.value || '').trim();
      const servicio = (document.getElementById('servicio')?.value || '').trim();
      const mensaje  = (document.getElementById('mensaje')?.value || '').trim();

      // Validación básica
      if (!nombre) {
        alert('Por favor, ingresa tu nombre.');
        return;
      }
      if (!mensaje) {
        alert('Por favor, escribe tu mensaje.');
        return;
      }

      // Construye el mensaje para WhatsApp
      let wa = `Hola, soy ${nombre}`;
      if (email)    wa += ` (${email})`;
      if (servicio) wa += `.\nServicio de interés: ${servicio}`;
      if (mensaje)  wa += `.\n\nMensaje: ${mensaje}`;

      const url = `https://wa.me/51960118562?text=${encodeURIComponent(wa)}`;
      window.open(url, '_blank');
    });
  }

});
