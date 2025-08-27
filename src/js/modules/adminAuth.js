export class AdminAuth {
  constructor() {
    this.ADMIN_PASS = 'kga2801';
    this.clickCount = 0;
    this.clickTimer = null;
    this.isAuthenticated = false;
  }

  init() {
    this.checkExistingSession();
    this.setupSecretTrigger();
    this.setupEventListeners();
  }

  checkExistingSession() {
    this.isAuthenticated = sessionStorage.getItem('isAdmin') === 'true';
    if (this.isAuthenticated) {
      this.showAdminButton();
    }
  }

  setupSecretTrigger() {
    const trigger = document.getElementById('secretTrigger');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.handleSecretClick();
    });
  }

  handleSecretClick() {
    this.clickCount++;
    
    clearTimeout(this.clickTimer);
    this.clickTimer = setTimeout(() => { 
      this.clickCount = 0; 
    }, 1000);
    
    if (this.clickCount === 3) {
      this.showLoginModal();
      this.clickCount = 0;
    }
  }

  setupEventListeners() {
    // Admin button click
    const adminBtn = document.getElementById('adminBtn');
    if (adminBtn) {
      adminBtn.addEventListener('click', () => {
        document.getElementById('writeModal').classList.add('active');
      });
    }

    // Password check
    window.checkPassword = () => this.checkPassword();
    window.closeLogin = () => this.closeLogin();

    // Enter key to submit password
    const passwordInput = document.getElementById('adminPassword');
    if (passwordInput) {
      passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.checkPassword();
        }
      });
    }
  }

  showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.classList.add('active');
      // Focus password input
      setTimeout(() => {
        const input = document.getElementById('adminPassword');
        if (input) input.focus();
      }, 100);
    }
  }

  checkPassword() {
    const input = document.getElementById('adminPassword');
    if (!input) return;
    
    const password = input.value;
    
    if (password === this.ADMIN_PASS) {
      this.authenticateUser();
    } else {
      this.showError('Invalid password');
      input.value = '';
      input.focus();
    }
  }

  authenticateUser() {
    this.isAuthenticated = true;
    sessionStorage.setItem('isAdmin', 'true');
    this.showAdminButton();
    this.closeLogin();
    
    // Open write modal
    setTimeout(() => {
      document.getElementById('writeModal').classList.add('active');
    }, 300);
  }

  showAdminButton() {
    const adminBtn = document.getElementById('adminBtn');
    if (adminBtn) {
      adminBtn.style.display = 'block';
    }
  }

  closeLogin() {
    const modal = document.getElementById('loginModal');
    const input = document.getElementById('adminPassword');
    
    if (modal) {
      modal.classList.remove('active');
    }
    
    if (input) {
      input.value = '';
    }
  }

  showError(message) {
    // You could implement a toast notification here
    alert(message);
  }

  // For testing purposes
  isLoggedIn() {
    return this.isAuthenticated;
  }

  logout() {
    this.isAuthenticated = false;
    sessionStorage.removeItem('isAdmin');
    const adminBtn = document.getElementById('adminBtn');
    if (adminBtn) {
      adminBtn.style.display = 'none';
    }
  }
}

export default AdminAuth;