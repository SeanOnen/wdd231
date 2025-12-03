document.addEventListener('DOMContentLoaded', () => {
  const pre = document.getElementById('form-results');
  if (!pre) return;
  const params = new URLSearchParams(window.location.search);
  if (!params.toString()) {
    pre.textContent = 'No form data found in URL query string.';
    return;
  }
  const obj = {};
  for (const [k,v] of params.entries()) {
    obj[k] = v;
  }
  pre.textContent = JSON.stringify(obj, null, 2);
});
