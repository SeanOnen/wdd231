// scripts/discover.js
import { items } from "../data/items.mjs";

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       1. RENDER DISCOVER CARDS
    =============================== */

    const grid = document.getElementById("discover-grid");

    function renderItems(list) {
        grid.innerHTML = list.map((item, index) => `
            <article class="card">
                <h2>${item.title}</h2>
                <figure>
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                </figure>
                <address>${item.address}</address>
                <p>${item.description.substring(0, 80)}...</p>
                <button class="learn-btn" data-id="${index}">Learn More</button>
            </article>
        `).join("");
    }

    renderItems(items);


    /* ===============================
       2. LAST VISIT MESSAGE LOGIC
    =============================== */

    const messageBox = document.getElementById("visit-message");

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

    const closeBtn = document.getElementById("visit-close");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            messageBox.parentElement.style.display = "none";
        });
    }


    /* ===============================
       3. MODAL FUNCTIONALITY
    =============================== */

    const modal = document.getElementById("info-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalImage = document.getElementById("modal-image");
    const modalAddress = document.getElementById("modal-address");
    const modalDescription = document.getElementById("modal-description");
    const modalClose = document.querySelector(".modal-close");

    // Open modal on Learn More button
    grid.addEventListener("click", (e) => {
        const btn = e.target.closest(".learn-btn");
        if (!btn) return;

        const id = btn.getAttribute("data-id");
        const item = items[id];

        modalTitle.textContent = item.title;
        modalImage.src = item.image;
        modalImage.alt = item.title;
        modalAddress.textContent = item.address;
        modalDescription.textContent = item.description;

        modal.style.display = "flex";
    });

    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") modal.style.display = "none";
    });
});

// FOOTER DATE HANDLING
document.getElementById("currentYear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent =
    "Last Modified: " + document.lastModified;
