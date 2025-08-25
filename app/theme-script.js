// This script runs before React hydration to prevent flashing
const themeScript = `
  (function() {
    try {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // User's manual choice takes priority
      const shouldBeDark = savedTheme !== null ? savedTheme === 'dark' : prefersDark;
      
      if (shouldBeDark) {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
      }
    } catch (e) {}
  })();
`;

export default themeScript;