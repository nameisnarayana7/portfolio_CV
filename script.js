// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
      // Trigger hero animations after preloader
      triggerHeroAnimations();
    }, 800);
  }, 2500); // Show preloader for 2.5 seconds
});

function triggerHeroAnimations() {
  const heroTag = document.querySelector('.hero-tag');
  const heroName = document.querySelector('.hero-name');
  const heroDesc = document.querySelector('.hero-desc');
  const heroCta = document.querySelector('.hero-cta');
  const heroDeco = document.querySelector('.hero-deco');

  if (heroTag) heroTag.style.animation = 'fadeUp 0.7s 0.2s forwards';
  if (heroName) heroName.style.animation = 'heroTitleEnter 1s 0.4s forwards';
  if (heroDesc) heroDesc.style.animation = 'heroDescEnter 0.8s 0.8s forwards';
  if (heroCta) heroCta.style.animation = 'heroCtaEnter 0.8s 1s forwards';
  if (heroDeco) heroDeco.style.animation = 'fadeIn 1.2s 1.2s both';
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

// Smooth section transitions
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId.length < 2) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    document.querySelectorAll('section.section-focus').forEach(section => {
      section.classList.remove('section-focus');
    });

    setTimeout(() => {
      target.classList.add('section-focus');
      setTimeout(() => target.classList.remove('section-focus'), 750);
    }, 180);
  });
});

// Active nav highlight and parallax
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  const scrolled = window.pageYOffset;

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? 'var(--text)'
      : '';
  });

  // Parallax effect for hero
  const heroImage = document.querySelector('.hero-image');
  const heroDeco = document.querySelector('.hero-deco');

  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
  }
  if (heroDeco) {
    heroDeco.style.transform = `translateY(${scrolled * -0.1}px)`;
  }
});

// Contact form submit
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = 'Message Sent ✓';
  btn.style.background = 'var(--highlight)';

  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}
