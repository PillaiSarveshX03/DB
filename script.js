const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');

    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', targetId);
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
});


const focusCard = document.querySelector('.hero-card');
const focusOrb = document.querySelector('.orb');

if (focusCard && focusOrb) {
  const moveOrb = (event) => {
    const cardBounds = focusCard.getBoundingClientRect();
    const x = event.clientX - cardBounds.left;
    const y = event.clientY - cardBounds.top;

    focusOrb.style.setProperty('--orb-x', `${x}px`);
    focusOrb.style.setProperty('--orb-y', `${y}px`);
  };

  focusCard.addEventListener('pointermove', moveOrb);

  focusCard.addEventListener('pointerleave', () => {
    focusOrb.style.removeProperty('--orb-x');
    focusOrb.style.removeProperty('--orb-y');
  });
}
