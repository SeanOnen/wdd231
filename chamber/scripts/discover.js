import { items } from "../data/items.mjs";

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- DOM references ---------- */
  const grid = document.getElementById("discover-grid");
  const messageBox = document.getElementById("visit-message");
  const closeVisitBtn = document.getElementById("visit-close");

  const modal = document.getElementById("info-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalAddress = document.getElementById("modal-address");
  const modalDescription = document.getElementById("modal-description");
  const modalClose = document.querySelector(".modal-close");

  /* ---------- Render cards ---------- */
  function renderItems(list) {
    grid.innerHTML = list.map((item, index) => `
      <article class="card" data-index="${index}">
        <h2>${item.title}</h2>
        <figure>
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button class="learn-btn" data-id="${index}">Learn More</button>
      </article>
    `).join("");
  }
  renderItems(items);

  /* ---------- Last-visit logic ---------- */
  const LAST_KEY = "discover-last-visit";
  const now = Date.now();
  const last = Number(localStorage.getItem(LAST_KEY) || 0);

  function daysBetween(ms1, ms2) {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.floor((ms1 - ms2) / msPerDay);
  }

  if (!last) {
    messageBox.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = daysBetween(now, last);
    if (days < 1) {
      messageBox.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
      messageBox.textContent = "You last visited 1 day ago.";
    } else {
      messageBox.textContent = `You last visited ${days} days ago.`;
    }
  }
  localStorage.setItem(LAST_KEY, String(now));

  if (closeVisitBtn) {
    closeVisitBtn.addEventListener("click", () => {
      messageBox.parentElement.style.display = "none";
    });
  }

  /* ---------- Modal behavior ---------- */
  function openModal(item) {
    modalTitle.textContent = item.title;
    modalImage.src = item.image;
    modalImage.alt = item.title;
    modalAddress.textContent = item.address;
    modalDescription.textContent = item.description;

    modal.setAttribute("aria-hidden", "false");
    // move focus into modal
    modalClose.focus();
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    // return focus to first Learn More button (best-effort)
    const firstBtn = grid.querySelector(".learn-btn");
    if (firstBtn) firstBtn.focus();
  }

  // delegation for Learn More buttons
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".learn-btn");
    if (!btn) return;
    const id = Number(btn.getAttribute("data-id"));
    const item = items[id];
    if (item) openModal(item);
  });

  // close handlers
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  /* ---------- Footer dates (shared) ---------- */
  const currentYear = document.getElementById("currentYear");
  const lastModified = document.getElementById("lastModified");
  if (currentYear) currentYear.textContent = new Date().getFullYear();
  if (lastModified) lastModified.textContent = "Last Modified: " + document.lastModified;
});
