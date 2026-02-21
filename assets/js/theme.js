/**
 * TRACKINN — Theme Manager
 * Handles switching and persisting Dark/Light mode using CSS classes and localStorage.
 */

// Execute immediately to prevent FOUC (Flash of Unstyled Content)
(function() {
    const savedTheme = localStorage.getItem('trackinn_theme');
    // If no preference, default to dark. If light pref, apply immediately.
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-theme');
    }
})();

// Global Toggle Function
window.toggleTheme = function() {
    const root = document.documentElement;
    const isLight = root.classList.contains('light-theme');
    
    // Toggle theme
    if (isLight) {
        root.classList.remove('light-theme');
        localStorage.setItem('trackinn_theme', 'dark');
    } else {
        root.classList.add('light-theme');
        localStorage.setItem('trackinn_theme', 'light');
    }
    
    // Update all toggle buttons on the page (could be multiple if mobile vs desktop navs)
    updateThemeIcons(!isLight);
};

// Update icons when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const isLight = document.documentElement.classList.contains('light-theme');
    updateThemeIcons(isLight);
});

function updateThemeIcons(isLight) {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
        // We use string emojis for wider compatibility without FontAwesome
        btn.innerHTML = isLight ? '🌙' : '☀️';
        
        // Setup tooltip text if exist
        if (btn.hasAttribute('title') || btn.hasAttribute('data-tooltip')) {
            const txt = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
            if (btn.hasAttribute('title')) btn.title = txt;
            if (btn.hasAttribute('data-tooltip')) btn.setAttribute('data-tooltip', txt);
        }
    });
}
