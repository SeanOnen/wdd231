// js/storage.js
const KEY = 'rehub:favorites';

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function saveFavorites(arr) {
  try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch (e) { console.warn(e); }
}

export function toggleFavorite(id) {
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx === -1) favs.push(id);
  else favs.splice(idx, 1);
  saveFavorites(favs);
  return favs;
}
