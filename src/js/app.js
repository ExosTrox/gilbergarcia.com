// Main Application JavaScript
import { PostManager } from './modules/postManager.js';
import { AdminAuth } from './modules/adminAuth.js';
import { VisitorCounter } from './modules/visitorCounter.js';
import { SmoothScroll } from './modules/smoothScroll.js';

class App {
  constructor() {
    this.postManager = new PostManager();
    this.adminAuth = new AdminAuth();
    this.visitorCounter = new VisitorCounter();
    this.smoothScroll = new SmoothScroll();
  }

  init() {
    // Initialize all modules
    this.postManager.init();
    this.adminAuth.init();
    this.visitorCounter.init();
    this.smoothScroll.init();

    // Set up global event listeners
    this.setupEventListeners();

    console.log('App initialized successfully');
  }

  setupEventListeners() {
    // Escape key to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });

    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });
  }

  closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(modal => {
      modal.classList.remove('active');
    });
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    window.app.init();
  });
} else {
  window.app = new App();
  window.app.init();
}

export default App;