document.addEventListener('DOMContentLoaded', () => {
    // Full array of course objects (dynamic source)
    const courses = [
        { code: 'CSE110', name: 'Introduction to Programming', completed: true, credits: 3 },
        { code: 'WDD130', name: 'Web Fundamentals', completed: true, credits: 3 },
        { code: 'CSE111', name: 'Programming with Functions', completed: true, credits: 3 },
        { code: 'CSE210', name: 'Programming with Classes', completed: true, credits: 3 },
        { code: 'WDD131', name: 'Dynamic Web Fundamentals', completed: true, credits: 3 },
        { code: 'WDD231', name: 'Web Frontend Development', completed: false, credits: 3 } // In progress
    ];

    const slots = {
        all: document.getElementById('all-slot'),
        cse: document.getElementById('cse-slot'),
        wdd: document.getElementById('wdd-slot')
    };

    // Detect desktop (min-width: 600px)
    let isDesktop = window.matchMedia('(min-width: 600px)').matches;
    window.matchMedia('(min-width: 600px)').addListener(mq => isDesktop = mq.matches); // Listen for resize

    function renderToSlot(slotId) {
        const slot = slots[slotId];
        if (slot) {
            let filteredCourses;
            if (slotId === 'all') {
                filteredCourses = [...courses]; // All courses
            } else if (slotId === 'cse') {
                filteredCourses = courses.filter(c => c.code.startsWith('CSE'));
            } else if (slotId === 'wdd') {
                filteredCourses = courses.filter(c => c.code.startsWith('WDD'));
            }
            slot.innerHTML = filteredCourses.map(course => `
                <div class="course-card ${course.completed ? 'completed' : ''}">
                    <h3>${course.code}: ${course.name}</h3>
                    <p>Status: ${course.completed ? 'Completed' : 'In Progress'}</p>
                    <p>Credits: ${course.credits}</p>
                </div>
            `).join('');
        }
    }

    function toggleOtherSlots(activeSlotId) {
        Object.keys(slots).forEach(slotId => {
            if (slotId === activeSlotId) {
                slots[slotId].classList.remove('faded-slot', 'hidden-slot');
                slots[slotId].style.display = 'block'; // Show active
            } else {
                if (isDesktop) {
                    // Desktop: Fade
                    slots[slotId].classList.add('faded-slot');
                    slots[slotId].classList.remove('hidden-slot');
                    slots[slotId].style.display = 'block'; // Keep visible but faded
                } else {
                    // Mobile: Hide
                    slots[slotId].classList.add('hidden-slot');
                    slots[slotId].classList.remove('faded-slot');
                    slots[slotId].style.display = 'none'; // Full hide
                }
            }
        });
    }

    function updateCredits(slotId) {
        let filteredCourses;
        if (slotId === 'all') {
            filteredCourses = [...courses];
        } else if (slotId === 'cse') {
            filteredCourses = courses.filter(c => c.code.startsWith('CSE'));
        } else if (slotId === 'wdd') {
            filteredCourses = courses.filter(c => c.code.startsWith('WDD'));
        }
        const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        document.getElementById('totalCredits').textContent = `The Total Credits for the Courses Listed Above is ${total}`;
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            renderToSlot(filter);
            toggleOtherSlots(filter);
            updateCredits(filter);
        });
    });

    // Initial: Show "ALL" (render all courses, fade/hide others, full total)
    document.querySelector('[data-filter="all"]').click();
});