document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.navigation');
    const links = document.querySelectorAll('.nav-list a');

    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
    });

    // Wayfinding: Set active on current page
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    // Close menu on link click (mobile UX)
    links.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
});