// This script runs before React hydration to prevent theme flashing
const themeScript = `
  (function() {
    try {
      const validThemes = ['light', 'dark', 'sunset', 'forest'];
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      let theme = 'light';
      
      if (savedTheme && validThemes.includes(savedTheme)) {
        theme = savedTheme;
      } else if (prefersDark) {
        theme = 'dark';
      }
      
      // Set theme class and data attribute immediately
      document.documentElement.className = 'theme-' + theme;
      document.documentElement.setAttribute('data-theme', theme);
      
      // Add transition prevention during initial load
      document.documentElement.style.transition = 'none';
      document.body.style.transition = 'none';
      
      // Re-enable transitions after a brief delay
      window.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
          document.documentElement.style.transition = '';
          document.body.style.transition = '';
        }, 100);
      });
      
      // Optimize for accessibility
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduce-motion');
      }
      
      // High contrast mode detection
      if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.documentElement.classList.add('high-contrast');
      }
    } catch (e) {
      console.error('Theme initialization error:', e);
    }
  })();
`;

export default themeScript;