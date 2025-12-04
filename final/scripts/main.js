import { loadProjects } from './projects.js';

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Current year in footer
document.getElementById('year')?.forEach(el => el.textContent = new Date().getFullYear());

// Last visit message
const lastVisit = localStorage.getItem('lastVisit');
if (lastVisit) {
  const msg = document.getElementById('last-visit');
  if (msg) {
    const days = Math.round((Date.now() - new Date(lastVisit)) / (1000*60*60*24));
    msg.textContent = `You last visited ${days === 0 ? 'today' : days === 1 ? 'yesterday' : `${days} days ago`}. Welcome back!`;
    msg.style.background = '#2b7a2b';
    msg.style.color = 'white';
    msg.style.padding = '1rem';
    msg.style.textAlign = 'center';
  }
}

// Load projects only on the projects page
if (document.getElementById('projects-grid')) {
  loadProjects();
}