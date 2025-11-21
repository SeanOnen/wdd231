// thankyou.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const out = field => {
    const el = document.getElementById(field);
    if (!el) return;
    const keyMap = {
      "out-fname": "fname",
      "out-lname": "lname",
      "out-email": "email",
      "out-phone": "phone",
      "out-org": "org",
      "out-timestamp": "timestamp"
    };
    const paramKey = keyMap[field];
    let v = params.get(paramKey) || "";
    // simple escaping
    v = v.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    if (field === "out-timestamp" && v) {
      // Attempt to parse ISO-style or formatted date
      const d = new Date(v);
      if (!isNaN(d)) {
        v = d.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        });
      }
    }
    el.textContent = v;
  };

  ["out-fname","out-lname","out-email","out-phone","out-org","out-timestamp"].forEach(out);
  
  // footer update (same as join.js)
  const yearEl = document.getElementById("currentYear");
  const lastModEl = document.getElementById("lastModified");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastModEl) lastModEl.textContent = "Last Updated: " + document.lastModified;
});
