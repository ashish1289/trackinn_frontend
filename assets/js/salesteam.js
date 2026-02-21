/**
 * TRACKINN — Sales Team JS
 * Functionality for field onboarding and tracking.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Sales Team Module Initialized');

    // Simple Navigation Active State
    const currentPath = window.location.pathname;
    document.querySelectorAll('.bnav-item').forEach(item => {
        if (currentPath.includes(item.getAttribute('href'))) {
            item.classList.add('active');
        }
    });

    // Onboarding Form Logic (Mock)
    const onboardingForm = document.getElementById('onboardingForm');
    if (onboardingForm) {
        onboardingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Hotel data saved locally. Ready for sync!');
        });
    }

    // Document Upload Mock
    const uploadArea = document.querySelector('.upload-zone');
    if (uploadArea) {
        uploadArea.addEventListener('click', () => {
            alert('Opening file selector...');
        });
    }

    // Incentive Calculator
    const calcBtn = document.getElementById('calculateIncentive');
    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            const hotels = document.getElementById('hotelsOnboarded').value || 0;
            const revenue = document.getElementById('revenueGenerated').value || 0;
            const incentive = (hotels * 500) + (revenue * 0.01);
            document.getElementById('incentiveResult').innerText = `₹${incentive.toLocaleString()}`;
        });
    }
    // Sidebar Logic
    const salesSidebar = document.querySelector('.sales-sidebar');
    const openSidebarBtn = document.querySelector('.open-sidebar');
    const closeSidebarBtn = document.querySelector('.close-sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    function toggleSidebar() {
        if (salesSidebar) salesSidebar.classList.toggle('active');
        if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
    }

    if (openSidebarBtn) openSidebarBtn.addEventListener('click', toggleSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', toggleSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);

    // --- Kanban Drag & Drop ---
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    // We expose these functions to the window as they are called from HTML attributes
    window.allowDrop = function (ev) {
        ev.preventDefault();
        const container = ev.target.closest('.pipeline-stage');
        if (container) {
            container.style.background = 'rgba(255,255,255,0.05)';
        }
    };

    window.drag = function (ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    };

    window.drop = function (ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        var draggedElement = document.getElementById(data);
        var dropContainer = ev.target.closest('.pipeline-stage');

        if (dropContainer && draggedElement) {
            dropContainer.appendChild(draggedElement);
            dropContainer.style.background = ''; // reset bg

            // Optional: Alert on status change if moved to "Won" or "Lost"
            if (dropContainer.id.includes('won')) {
                alert(`Deal Closed! 🎉 \n${draggedElement.querySelector('h4').innerText} marked as WON.`);
            } else if (dropContainer.id.includes('lost')) {
                alert(`Lead Lost. \n${draggedElement.querySelector('h4').innerText} marked as LOST.`);
            }
        }
    };
    // Reset background on dragleave
    document.querySelectorAll('.pipeline-stage').forEach(stage => {
        stage.addEventListener('dragleave', () => {
            stage.style.background = '';
        });
    });

    // --- Revenue Potential Score Calculator ---
    window.calculateRevenueScore = function () {
        // Formula: (rooms * avg price * occupancy * season factor * 0.001) clamped to 100
        const rooms = parseInt(document.getElementById('invTotal').value) || 0;
        const price = parseInt(document.getElementById('invPrice').value) || 0;
        const season = parseFloat(document.getElementById('invSeason').value) || 1.0;
        const occ = 0.65; // standard occupancy assumption
        const cityIndex = 0.9;

        let score = (rooms * price * occ * season * cityIndex * 0.002);
        score = Math.min(Math.round(score), 100);

        // Update UI
        const scoreDisplay = document.getElementById('revScoreDisplay');
        const meterFill = document.getElementById('revMeterFill');

        if (scoreDisplay && meterFill) {
            scoreDisplay.innerHTML = `${score}<span style="font-size: 1.2rem; opacity: 0.5;">/100</span>`;
            meterFill.style.width = `${score}%`;

            // Color Coding
            if (score > 75) meterFill.style.background = 'var(--success)';
            else if (score > 40) meterFill.style.background = 'var(--warning)';
            else meterFill.style.background = 'var(--danger)';

            // Update details
            document.getElementById('scoreRooms').innerText = rooms;
            document.getElementById('scorePrice').innerText = `₹${price}`;
        }
    }
});
