// --- Utility Functions ---
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- Typewriter Effect ---
async function typewrite(
  text,
  { target = document.getElementById("typewriter"), delay = 120, loop = true, deleteDelay = 70 } = {}
) {
  if (!target) return;
  
  const set = (val) => (target.textContent = val);
  
  do {
    // Type forward
    for (let i = 0; i < text.length; i++) {
      set(text.slice(0, i + 1));
      await sleep(delay);
    }
    await sleep(1200);
    
    // Delete backward (if looping)
    if (loop) {
      for (let i = text.length; i > 0; i--) {
        set(text.slice(0, i - 1));
        await sleep(deleteDelay);
      }
      await sleep(500);
    }
  } while (loop);
}

// --- Falling Leaves Animation ---
function createFallingLeaves() {
  const leafColors = ['#d97706', '#f59e0b', '#92400e', '#fbbf24'];
  const leafCount = 12;
  
  for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leaf.textContent = '🍂';
    leaf.style.left = `${Math.random() * 100}vw`;
    leaf.style.animationDuration = `${6 + Math.random() * 4}s`;
    leaf.style.animationDelay = `${Math.random() * 5}s`;
    leaf.style.fontSize = `${1 + Math.random()}rem`;
    leaf.style.color = leafColors[Math.floor(Math.random() * leafColors.length)];
    
    // Add ARIA attribute to hide decorative elements from screen readers
    leaf.setAttribute('aria-hidden', 'true');
    
    document.body.appendChild(leaf);
  }
}

// --- Mobile Menu Toggle ---
function setupMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuToggle || !navLinks) return;
  
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translateY(8px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // Close menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

// --- Smooth Scroll with Offset ---
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or "#main" (skip link)
      if (href === '#' || href === '#main') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// --- Navbar Scroll Effect ---
function setupNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// --- Intersection Observer for Fade-in Animation ---
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe sections
  document.querySelectorAll('.about, .projects, .contact').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
  
  // Observe project cards
  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
}

// --- Handle Missing Images ---
function handleImageErrors() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      // Create a placeholder if image fails to load
      this.style.background = 'linear-gradient(135deg, #fbbf24, #d97706)';
      this.style.display = 'flex';
      this.style.alignItems = 'center';
      this.style.justifyContent = 'center';
      this.alt = 'Image not available';
      // Remove src to prevent repeated error attempts
      this.removeAttribute('src');
    });
  });
}

// --- Reduce Motion Check ---
function respectsReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// --- Initialize Everything ---
function init() {
  // Start typewriter effect (skip animation if reduced motion is preferred)
  if (!respectsReducedMotion()) {
    typewrite("Welcome to Thana's Portfolio", { delay: 100, loop: true });
    createFallingLeaves();
  } else {
    const target = document.getElementById("typewriter");
    if (target) target.textContent = "Welcome to Thana's Portfolio";
  }
  
  // Setup interactive features
  setupMobileMenu();
  setupSmoothScroll();
  setupNavbarScroll();
  setupScrollAnimations();
  handleImageErrors();
}

// Run when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Cleanup function (optional, useful for SPAs)
window.addEventListener('beforeunload', () => {
  // Remove all leaf elements to prevent memory leaks
  document.querySelectorAll('.leaf').forEach(leaf => leaf.remove());
});
