/**
 * TRACKINN — Admin Panel JS
 * Company control center logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin Module Initialized');

    // Sidebar Toggle (from dashboard.css logic)
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    const mobileMenuBtn = document.querySelector('.topbar-mobile-menu');
    const overlay = document.querySelector('.sidebar-overlay');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            document.querySelector('.main-content').classList.toggle('shifted');
        });
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.add('mobile-open');
            overlay.classList.add('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
        });
    }

    // Commission Rule Switcher
    const ruleSwitches = document.querySelectorAll('.rule-switch');
    ruleSwitches.forEach(sw => {
        sw.addEventListener('change', (e) => {
            const status = e.target.checked ? 'Active' : 'Paused';
            console.log(`Commission Rule ${e.target.dataset.rule}: ${status}`);
        });
    });

    // Mock Chart Rendering Message
    const chartContainers = document.querySelectorAll('.chart-placeholder');
    chartContainers.forEach(container => {
        container.innerHTML = '<div class="flex items-center justify-center w-full h-full text-muted" style="background: rgba(255,255,255,0.02); border: 1px dashed var(--border); border-radius: 8px;">Chart Logic Ready</div>';
    });
});
