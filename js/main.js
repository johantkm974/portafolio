// ===================================
// TYPING ANIMATION
// ===================================
class TypeWriter {
  constructor(element, words, wait = 3000) {
    this.element = element;
    this.words = words;
    this.wait = parseInt(wait, 10);
    this.wordIndex = 0;
    this.txt = '';
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.innerHTML = this.txt;

    let typeSpeed = 100;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// ===================================
// DOM CONTENT LOADED
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize typing animation
  const typedElement = document.querySelector('.typed-text');
  if (typedElement) {
    const words = ['Desarrollador Web', 'Front-End Developer', 'UI/UX Designer', 'Freelancer'];
    new TypeWriter(typedElement, words, 2000);
  }

  // ===================================
  // NAVBAR SCROLL EFFECT
  // ===================================
  const navbar = document.querySelector('.navbar');
  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavbarScroll);

  // ===================================
  // ACTIVE NAV LINK ON SCROLL
  // ===================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);

  // ===================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      }
    });
  });

  // ===================================
  // SCROLL TO TOP BUTTON
  // ===================================
  const scrollToTopBtn = document.getElementById('scrollToTop');

  const toggleScrollToTop = () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', toggleScrollToTop);

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ===================================
  // PROJECT FILTER
  // ===================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      projectItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          }, 300);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ===================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ===================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elements to animate
  const animateElements = document.querySelectorAll(
    '.service-card, .project-card, .testimonial-card, .contact-info-card, .contact-form-card'
  );

  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
  });

  // Add CSS class for animation
  const style = document.createElement('style');
  style.textContent = `
    .animate-fadeInUp {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // ===================================
  // FORM VALIDATION ENHANCEMENT
  // ===================================
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const name = this.querySelector('#name');
      const email = this.querySelector('#email');
      const message = this.querySelector('#message');
      let isValid = true;

      // Simple validation
      [name, email, message].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          isValid = false;
        } else {
          field.style.borderColor = '#22c55e';
        }
      });

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value && !emailRegex.test(email.value)) {
        email.style.borderColor = '#ef4444';
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault();
        // Add shake animation to form
        contactForm.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
          contactForm.style.animation = '';
        }, 500);
      }
    });

    // Reset border color on input
    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('focus', function() {
        this.style.borderColor = '';
      });
    });
  }

  // Add shake animation CSS
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(shakeStyle);

  // ===================================
  // PARALLAX EFFECT ON HERO
  // ===================================
  const heroOverlay = document.querySelector('.hero-overlay');
  if (heroOverlay) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
  }

  // ===================================
  // LOADING ANIMATION
  // ===================================
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="loader-spinner"></div>
  `;
  document.body.prepend(loader);

  const loaderStyle = document.createElement('style');
  loaderStyle.textContent = `
    .page-loader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    }
    .page-loader.hidden {
      opacity: 0;
      visibility: hidden;
    }
    .loader-spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(37, 99, 235, 0.2);
      border-top-color: #2563eb;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(loaderStyle);

  // Hide loader when page is loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 500);
    }, 500);
  });

  // ===================================
  // COUNTER ANIMATION
  // ===================================
  const counterElement = document.querySelector('.experience-badge .years');
  if (counterElement) {
    const targetNumber = parseInt(counterElement.textContent);
    let currentNumber = 0;
    const increment = targetNumber / 50;

    const updateCounter = () => {
      if (currentNumber < targetNumber) {
        currentNumber += increment;
        counterElement.textContent = Math.ceil(currentNumber) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        counterElement.textContent = targetNumber + '+';
      }
    };

    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCounter();
        counterObserver.unobserve(counterElement);
      }
    }, { threshold: 0.5 });

    counterObserver.observe(counterElement);
  }
});
