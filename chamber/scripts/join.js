// Modal functionality
document.addEventListener("DOMContentLoaded", () => {

    // Insert formatted timestamp
    const timestampField = document.getElementById("timestamp");

    const now = new Date();
    const formatted = now.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    timestampField.value = formatted;

    // Modal Elements
    const modalLinks = document.querySelectorAll("[data-modal]");
    const modals = document.querySelectorAll(".modal");
    const closes = document.querySelectorAll(".close");

    // Open modal
    modalLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const modalId = this.getAttribute("data-modal");
            document.getElementById(modalId).style.display = "block";
        });
    });

    // Close modal buttons
    closes.forEach(btn => {
        btn.addEventListener("click", function () {
            this.closest(".modal").style.display = "none";
        });
    });

    // Close when clicking outside
    window.addEventListener("click", function (e) {
        modals.forEach(modal => {
            if (e.target === modal) modal.style.display = "none";
        });
    });

});

// Footer Script
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Updated: " + document.lastModified;
