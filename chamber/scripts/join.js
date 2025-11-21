// join.js
document.addEventListener("DOMContentLoaded", () => {
  // Timestamp
  const tsField = document.getElementById("timestamp");
  if (tsField) {
    const now = new Date();
    const formatted = now.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    tsField.value = formatted;
  }

  // Modal functionality
  const modalLinks = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".modal .close");

  modalLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = link.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
        // focus first interactive element for accessibility
        const focusable = modal.querySelector('button, [href], input, select, textarea');
        if (focusable) focusable.focus();
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
      }
    });
  });

  // Close modal on overlay click or ESC
  window.addEventListener("click", (e) => {
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach(modal => {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
      });
    }
  });

  // Footer update
  const yearEl = document.getElementById("currentYear");
  const lastModEl = document.getElementById("lastModified");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastModEl) lastModEl.textContent = "Last Updated: " + document.lastModified;
});
