// js/data.js
export async function fetchSystems(url = './data/systems.json') {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Network error: ${res.status} ${res.statusText}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Invalid data format: expected an array');
    return data;
  } catch (err) {
    console.error('fetchSystems error:', err);
    throw err;
  }
}
