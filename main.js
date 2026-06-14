// ===== PRELOADER =====
const preloader = document.getElementById('preloader');

window.addEventListener('load', () => {
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 1800);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== SCROLL SPY =====
const scrollSpySections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-link, .nav-cta-btn');

function updateScrollSpy() {
  const scrollPos = window.scrollY + 200;

  scrollSpySections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateScrollSpy);
updateScrollSpy();

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link, .nav-cta-btn').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== NAV LINKS — SECTION TRANSITION =====
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link, .nav-cta-btn');

function showPreloaderThenScroll(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  // Show preloader
  preloader.classList.remove('hidden');

  // Scroll to top instantly so transition looks clean
  window.scrollTo(0, 0);

  // After preloader animation, hide and scroll to section
  setTimeout(() => {
    preloader.classList.add('hidden');

    // Small delay then smooth scroll
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, 1600);
}

navLinkEls.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      showPreloaderThenScroll(targetId);
    }
  });
});

// Also handle footer links
document.querySelectorAll('.footer-links-col a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    showPreloaderThenScroll(targetId);
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
  '.section-header, .service-card, .case-card, .team-card, .testimonial-card, .pricing-card, .process-step, .value-item, .contact-info-item, .contact-form, .about-content, .about-visual, .cta-content'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
  el.classList.add('section-transition');
  revealObserver.observe(el);
});

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current);
      }, 30);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ===== TESTIMONIALS CAROUSEL =====
const track = document.getElementById('testimonials-track');
const prevBtn = document.getElementById('testi-prev');
const nextBtn = document.getElementById('testi-next');
const dots = document.querySelectorAll('.testi-dot');
let currentSlide = 0;
const totalSlides = dots.length;

function goToSlide(idx) {
  currentSlide = idx;
  track.style.transform = `translateX(-${idx * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

prevBtn.addEventListener('click', () => {
  goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
  goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToSlide(parseInt(dot.getAttribute('data-idx')));
  });
});

// Auto-play
setInterval(() => {
  goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
}, 6000);

// ===== HERO PARTICLES =====
const particlesContainer = document.getElementById('hero-particles');

function createParticle() {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDuration = (Math.random() * 8 + 4) + 's';
  particle.style.animationDelay = Math.random() * 4 + 's';
  particle.style.width = particle.style.height = (Math.random() * 3 + 1) + 'px';
  particlesContainer.appendChild(particle);

  setTimeout(() => particle.remove(), 12000);
}

setInterval(createParticle, 300);

// ===== MARQUEE DUPLICATION =====
const marqueeContent = document.getElementById('marquee-content');
if (marqueeContent) {
  const clone = marqueeContent.innerHTML;
  marqueeContent.innerHTML = clone + clone;
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('form-submit-btn');
  btn.innerHTML = '<span>Yuborilmoqda...</span>';
  btn.disabled = true;

  setTimeout(() => {
    contactForm.reset();
    formSuccess.style.display = 'block';
    btn.innerHTML = `<span>So'rov yuborish</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    btn.disabled = false;

    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 5000);
  }, 1500);
});
