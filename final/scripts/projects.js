// scripts/projects.js

export async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  try {
    const response = await fetch('data/renewable-projects.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const projects = await response.json();

    // Save to localStorage
    localStorage.setItem('cachedProjects', JSON.stringify(projects));
    localStorage.setItem('lastVisit', new Date().toISOString());

    displayProjects(projects);
  } catch (error) {
    console.error('Failed to load projects:', error);
    grid.innerHTML = `<p style="color:red; grid-column:1/-1; text-align:center;">Could not load projects. Please check your connection or JSON file path.</p>`;
  }
}

function displayProjects(projects) {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';

  projects.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.farm} ${p.type} renewable energy project" loading="lazy" width="400" height="300">
      <div class="card-body">
        <h3>${p.farm}</h3>
        <p><strong>${p.type}</strong> • ${p.capacity_kW} kW • ${p.state}</p>
        <p>Savings: <strong>${p.savings}</strong></p>
        <button class="details-btn" data-id="${p.id}">View Details →</button>
      </div>
    `;
    card.addEventListener('click', () => openModal(p));
    grid.appendChild(card);
  });

  setupFilters(projects);
}

function openModal(project) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-img').src = project.image;
  document.getElementById('modal-img').alt = `${project.farm} ${project.type} installation`;
  document.getElementById('modal-title').textContent = `${project.farm} – ${project.type}`;
  document.getElementById('modal-details').innerHTML = `
    <p><strong>Location:</strong> ${project.state}</p>
    <p><strong>Capacity:</strong> ${project.capacity_kW} kW</p>
    <p><strong>Year Installed:</strong> ${project.year}</p>
    <p><strong>Annual Savings:</strong> ${project.savings}</p>
    <p>${project.desc}</p>
  `;

  modal.setAttribute('aria-hidden', 'false');
  modal.querySelector('.close').focus();
}

function setupFilters(allProjects) {
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filters button.active')?.classList.remove('active');
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const filtered = filter === 'all' ? allProjects : allProjects.filter(p => p.type === filter);
      displayProjects(filtered);
    });
  });
}

// Close modal
document.addEventListener('click', e => {
  const modal = document.getElementById('modal');
  if (e.target === modal || e.target.classList.contains('close')) {
    modal.setAttribute('aria-hidden', 'true');
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('modal')?.setAttribute('aria-hidden', 'true');
  }
});