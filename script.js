// Menu mobile
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});

// Fermer le menu après un clic sur un lien
nav.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', false);
    menuBtn.querySelector('i').className = 'fa-solid fa-bars';
  })
);

// Mettre en évidence le lien du menu correspondant à la section visible
const links = [...nav.querySelectorAll('a')];
const sections = links
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id)
      );
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// Bouton « Retour en haut »
document.querySelector('.to-top').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// Année automatique dans le pied de page
document.getElementById('year').textContent = new Date().getFullYear();
