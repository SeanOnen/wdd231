// Fetch from data/members.json
async function loadMembers(view = 'grid') {
  const response = await fetch('data/members.json');
  const data = await response.json();
  renderMembers(data, view); // Pass view to render
}

// Render members
function renderMembers(members, view) {
  const container = document.getElementById('members');
  if (view === 'grid') {
    container.classList.add('grid');
    container.classList.remove('list');
    container.innerHTML = members.map(member => `
      <div class="member-card level-${member.membershipLevel}">
        <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
        <h3>${member.name}</h3>
        <p>${member.category}</p>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank">Website</a></p>
        <p>${member.description}</p>
      </div>
    `).join('');
  } else {
    container.classList.add('list');
    container.classList.remove('grid');
    container.innerHTML = members.map(member => `
      <div class="member-list-item level-${member.membershipLevel}">
        <img src="${member.image}" alt="${member.name} Logo">
        <div class="member-info">
          <h3>${member.name}</h3>
          <p>${member.category} | Level ${member.membershipLevel}</p>
          <p>${member.address} | ${member.phone}</p>
          <p><a href="${member.website}" target="_blank">Website</a></p>
          <p>${member.description}</p>
        </div>
      </div>
    `).join('');
  }
}

// Toggle view
document.getElementById('grid-view').addEventListener('click', () => {
  document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('grid-view').classList.add('active');
  loadMembers('grid'); // Pass 'grid' to load
});

document.getElementById('list-view').addEventListener('click', () => {
  document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('list-view').classList.add('active');
  loadMembers('list'); // Pass 'list' to load
});

// Footer JS
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Updated: ${document.lastModified}`;

// Initial load
loadMembers();