import { loadProjects } from './projects.js';

// Hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => navLinks.classList.toggle('active'));

// Year
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

// Last visit
const lastVisit = localStorage.getItem('lastVisit');
if (lastVisit && document.getElementById('last-visit')) {
  const days = Math.round((Date.now() - new Date(lastVisit)) / (1000 * 60 * 60 * 24));
  document.getElementById('last-visit').innerHTML = `<p style="background:var(--color-primary);color:white;padding:1rem;text-align:center;">You last visited ${days === 0 ? 'today' : days === 1 ? 'yesterday' : `${days} days ago`}. Welcome back!</p>`;
}

// Load projects on systems page
if (document.getElementById('projects-grid')) loadProjects();