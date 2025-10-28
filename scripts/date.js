document.addEventListener('DOMContentLoaded', () => {
    // Copyright year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Last modified - formatted for visibility
    const lastMod = document.lastModified;
    document.getElementById('lastModified').innerHTML = `Last Updated: ${lastMod}`;
});