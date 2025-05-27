// Enhanced fade‑in on scroll with subtle animations
const faders = document.querySelectorAll('.guest-card, .team h2, .team p, .contact-info');
const listItems = document.querySelectorAll('.value-list li');

// Make sure list items are visible by default
document.addEventListener('DOMContentLoaded', () => {
  listItems.forEach(item => {
    item.style.opacity = '1';
    item.style.transform = 'none';
  });
});

const appearOptions = { 
  threshold: 0.15, 
  rootMargin: '0px 0px -80px 0px' 
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (!entry.isIntersecting) return;
    
    setTimeout(() => {
      entry.target.classList.add('appear');
    }, index * 80);
    
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(el => appearOnScroll.observe(el));

// Immersive navbar and scroll to top button
const header = document.querySelector('.site-header');
const scrollTopBtn = document.querySelector('.scroll-top-btn');
const heroSection = document.querySelector('.hero');
let heroHeight;

// Calculate hero section height
const updateHeroHeight = () => {
  heroHeight = heroSection ? heroSection.offsetHeight : 300;
};

// Update on page load and resize
window.addEventListener('load', updateHeroHeight);
window.addEventListener('resize', updateHeroHeight);

// Handle scroll events for navbar and scroll-to-top button
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  
  // Immersive navbar
  if (scrollPos > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Scroll to top button visibility
  if (scrollPos > heroHeight) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
  
  // Parallax effect on hero (keeping this from original code)
  if (heroSection && scrollPos < 600) {
    const translateY = scrollPos * 0.15;
    heroSection.style.transform = `translateY(${translateY}px)`;
    heroSection.style.opacity = 1 - (scrollPos * 0.002);
  }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Smooth scroll for internal links with refined animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 70, // Offset for fixed header
        behavior: 'smooth'
      });
    }
  });
});

// Button hover effects - simplified for a cleaner look
const buttons = document.querySelectorAll('.cta-btn');
buttons.forEach(button => {
  if (button.classList.contains('primary')) {
    button.addEventListener('mouseover', () => {
      button.style.transition = 'all 0.3s ease';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transition = 'all 0.3s ease';
    });
  }
});
