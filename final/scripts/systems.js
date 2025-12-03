// js/systems.js
import { fetchSystems } from './data.js';
import { openModal } from './modal.js';
import { getFavorites, toggleFavorite } from './storage.js';

const container = document.getElementById('systems-container');
const filterEl = document.getElementById('filter-type');
const sortEl = document.getElementById('sort-by');
const clearFavsBtn = document.getElementById('clear-favs');
const itemsCount = document.getElementById('items-count');

let ALL_ITEMS = [];

function esc(s = '') {
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function renderCard(item) {
  const favs = getFavorites();
  const isFav = favs.includes(item.id);
  return `
    <article class="item-card" role="listitem" data-id="${item.id}">
      <img src="${esc(item.image)}" alt="${esc(item.name)}" loading="lazy" width="800" height="450">
      <h3>${esc(item.name)}</h3>
      <p class="item-meta">${esc(item.type)} — ${esc(item.location)}</p>
      <p>${esc(item.description)}</p>
      <ul>
        <li>Power: ${esc(item.power_kw)} kW</li>
        <li>Cost: $${Number(item.cost_usd).toLocaleString()}</li>
      </ul>
      <div class="card-actions">
        <button class="btn detail" data-id="${item.id}">Details</button>
        <button class="btn fav ${isFav ? 'ghost' : ''}" data-id="${item.id}" aria-pressed="${isFav}">${isFav ? 'Saved' : 'Save'}</button>
      </div>
    </article>
  `;
}

function renderList(items) {
  if (!container) return;
  container.innerHTML = items.map(renderCard).join('');
  itemsCount && (itemsCount.textContent = `${items.length} items shown`);
  // attach event handlers
  container.querySelectorAll('.detail').forEach(btn => btn.addEventListener('click', onDetail));
  container.querySelectorAll('.fav').forEach(btn => btn.addEventListener('click', onFav));
}

function onDetail(e) {
  const id = Number(e.currentTarget.dataset.id);
  const item = ALL_ITEMS.find(x => x.id === id);
  if (!item) return;
  const html = `
    <img src="${esc(item.image)}" alt="${esc(item.name)}" style="max-width:100%;height:auto" loading="lazy">
    <h2>${esc(item.name)}</h2>
    <p>${esc(item.description)}</p>
    <ul>
      <li>Type: ${esc(item.type)}</li>
      <li>Power: ${esc(item.power_kw)} kW</li>
      <li>Location: ${esc(item.location)}</li>
      <li>Cost: $${Number(item.cost_usd).toLocaleString()}</li>
    </ul>
  `;
  openModal(html, item.name);
}

function onFav(e) {
  const id = Number(e.currentTarget.dataset.id);
  toggleFavorite(id);
  renderList(applyFiltersAndSort());
}

function applyFiltersAndSort() {
  let list = ALL_ITEMS.slice();
  const type = filterEl?.value || 'all';
  if (type !== 'all') list = list.filter(i => i.type === type);
  const sortBy = sortEl?.value || 'name';
  if (sortBy === 'power') list.sort((a,b) => b.power_kw - a.power_kw);
  else if (sortBy === 'cost') list.sort((a,b) => a.cost_usd - b.cost_usd);
  else list.sort((a,b) => a.name.localeCompare(b.name));
  if (list.length < 15 && ALL_ITEMS.length >= 15) list = ALL_ITEMS.slice(0,15);
  return list;
}

async function init() {
  try {
    const items = await fetchSystems('./data/systems.json');
    // ensure each item has an id. If not, add numeric ids.
    ALL_ITEMS = items.map((it, idx) => ({ id: it.id ?? (idx + 1), ...it }));
    renderList(applyFiltersAndSort());
    filterEl?.addEventListener('change', () => renderList(applyFiltersAndSort()));
    sortEl?.addEventListener('change', () => renderList(applyFiltersAndSort()));
    clearFavsBtn?.addEventListener('click', () => {
      localStorage.removeItem('rehub:favorites');
      renderList(applyFiltersAndSort());
    });
  } catch (err) {
    if (container) container.innerHTML = `<p class="error">Unable to load systems: ${esc(err.message)}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', init);
