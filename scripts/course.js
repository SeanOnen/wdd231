document.addEventListener('DOMContentLoaded', () => {
    const slots = {
        all: document.getElementById('all-slot'),
        cse: document.getElementById('cse-slot'),
        wdd: document.getElementById('wdd-slot')
    };

    const courses = {
        all: { code: 'WDD 130' }, // Only abbreviation
        cse: { code: 'WDD 131' },
        wdd: { code: 'WDD 231' }
    };

    // Render all courses statically to their slots (no hiding)
    function renderAllCourses() {
        // Render to each slot without clearing others
        Object.entries(courses).forEach(([slotId, course]) => {
            const slot = slots[slotId];
            if (slot) {
                slot.innerHTML = `
                    <div class="course-card">
                        <h3>${course.code}</h3>
                    </div>
                `;
            }
        });
    }

    // Buttons do nothing (no filtering, no active class)
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default action
            // No changes—everything stays visible
        });
    });

    // Initial: Render all immediately
    renderAllCourses();
});