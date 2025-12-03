// js/modal.js
const modalEl = document.getElementById('modal');

function trapFocus(container) {
  const selectors = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
  const focusable = Array.from(container.querySelectorAll(selectors));
  if (!focusable.length) return () => {};
  const first = focusable[0], last = focusable[focusable.length - 1];

  function handler(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    } else if (e.key === 'Escape') {
      closeModal();
    }
  }
  document.addEventListener('keydown', handler);
  return () => document.removeEventListener('keydown', handler);
}

export function openModal(html, title = '') {
  if (!modalEl) return;
  modalEl.innerHTML = `
    <div class="modal-content" role="document" aria-labelledby="modal-title">
      <button class="modal-close" aria-label="Close dialog">&times;</button>
      <div id="modal-title" style="display:none">${title}</div>
      <div class="modal-body">${html}</div>
    </div>
  `;
  modalEl.setAttribute('aria-hidden', 'false');
  const cleanup = trapFocus(modalEl);
  const closeBtn = modalEl.querySelector('.modal-close');
  closeBtn?.focus();
  closeBtn?.addEventListener('click', closeModal, { once: true });
  modalEl.addEventListener('click', (e) => { if (e.target === modalEl) closeModal(); }, { once: true });
  modalEl._cleanup = cleanup;
}

export function closeModal() {
  if (!modalEl) return;
  modalEl.setAttribute('aria-hidden', 'true');
  modalEl.innerHTML = '';
  if (modalEl._cleanup) modalEl._cleanup();
}
