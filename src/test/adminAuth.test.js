import { AdminAuth } from '../js/modules/adminAuth.js';

describe('AdminAuth', () => {
  let adminAuth;
  
  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = `
      <span id="secretTrigger" class="logo-dot"></span>
      <button id="adminBtn" style="display:none;">Write</button>
      <div id="loginModal" class="modal"></div>
      <div id="writeModal" class="modal"></div>
      <input id="adminPassword" type="password" />
    `;
    
    // Clear storage
    sessionStorage.clear();
    
    // Create instance
    adminAuth = new AdminAuth();
    
    // Mock alert
    jest.spyOn(window, 'alert').mockImplementation();
  });

  afterEach(() => {
    sessionStorage.clear();
    document.body.innerHTML = '';
    jest.clearAllTimers();
    window.alert.mockRestore();
  });

  describe('Initialization', () => {
    test('should initialize with default values', () => {
      expect(adminAuth.isAuthenticated).toBe(false);
      expect(adminAuth.clickCount).toBe(0);
    });

    test('should detect existing session', () => {
      sessionStorage.setItem('isAdmin', 'true');
      adminAuth.init();
      
      expect(adminAuth.isAuthenticated).toBe(true);
      expect(document.getElementById('adminBtn').style.display).toBe('block');
    });
  });

  describe('Secret Trigger', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      adminAuth.init();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('should show login modal after 3 clicks', () => {
      const trigger = document.getElementById('secretTrigger');
      const modal = document.getElementById('loginModal');
      
      // Click 3 times
      trigger.click();
      trigger.click();
      trigger.click();
      
      expect(modal.classList.contains('active')).toBe(true);
      expect(adminAuth.clickCount).toBe(0); // Reset after triggering
    });

    test('should reset click count after timeout', () => {
      const trigger = document.getElementById('secretTrigger');
      
      trigger.click();
      expect(adminAuth.clickCount).toBe(1);
      
      jest.advanceTimersByTime(1000);
      expect(adminAuth.clickCount).toBe(0);
    });

    test('should not trigger with less than 3 clicks', () => {
      const trigger = document.getElementById('secretTrigger');
      const modal = document.getElementById('loginModal');
      
      trigger.click();
      trigger.click();
      
      expect(modal.classList.contains('active')).toBe(false);
    });
  });

  describe('Authentication', () => {
    beforeEach(() => {
      adminAuth.init();
    });

    test('should authenticate with correct password', () => {
      const passwordInput = document.getElementById('adminPassword');
      passwordInput.value = 'kga2801';
      
      adminAuth.checkPassword();
      
      expect(adminAuth.isAuthenticated).toBe(true);
      expect(sessionStorage.getItem('isAdmin')).toBe('true');
      expect(document.getElementById('adminBtn').style.display).toBe('block');
    });

    test('should reject incorrect password', () => {
      const passwordInput = document.getElementById('adminPassword');
      passwordInput.value = 'wrong';
      
      adminAuth.checkPassword();
      
      expect(adminAuth.isAuthenticated).toBe(false);
      expect(sessionStorage.getItem('isAdmin')).toBeNull();
      expect(window.alert).toHaveBeenCalledWith('Invalid password');
      expect(passwordInput.value).toBe('');
    });

    test('should open write modal after successful login', (done) => {
      const passwordInput = document.getElementById('adminPassword');
      const writeModal = document.getElementById('writeModal');
      passwordInput.value = 'kga2801';
      
      adminAuth.checkPassword();
      
      setTimeout(() => {
        expect(writeModal.classList.contains('active')).toBe(true);
        done();
      }, 400);
    });

    test('should handle enter key in password input', () => {
      const passwordInput = document.getElementById('adminPassword');
      const checkPasswordSpy = jest.spyOn(adminAuth, 'checkPassword');
      
      adminAuth.setupEventListeners();
      passwordInput.value = 'kga2801';
      
      const enterEvent = new KeyboardEvent('keypress', { key: 'Enter' });
      passwordInput.dispatchEvent(enterEvent);
      
      expect(checkPasswordSpy).toHaveBeenCalled();
    });
  });

  describe('Session Management', () => {
    beforeEach(() => {
      adminAuth.init();
    });

    test('should check login status', () => {
      expect(adminAuth.isLoggedIn()).toBe(false);
      
      adminAuth.authenticateUser();
      expect(adminAuth.isLoggedIn()).toBe(true);
    });

    test('should logout properly', () => {
      adminAuth.authenticateUser();
      expect(adminAuth.isLoggedIn()).toBe(true);
      
      adminAuth.logout();
      
      expect(adminAuth.isLoggedIn()).toBe(false);
      expect(sessionStorage.getItem('isAdmin')).toBeNull();
      expect(document.getElementById('adminBtn').style.display).toBe('none');
    });

    test('should close login modal', () => {
      const modal = document.getElementById('loginModal');
      const passwordInput = document.getElementById('adminPassword');
      
      modal.classList.add('active');
      passwordInput.value = 'test';
      
      adminAuth.closeLogin();
      
      expect(modal.classList.contains('active')).toBe(false);
      expect(passwordInput.value).toBe('');
    });
  });

  describe('Admin Button', () => {
    test('should show write modal when admin button clicked', () => {
      adminAuth.init();
      adminAuth.authenticateUser();
      
      const adminBtn = document.getElementById('adminBtn');
      const writeModal = document.getElementById('writeModal');
      
      adminBtn.click();
      
      expect(writeModal.classList.contains('active')).toBe(true);
    });
  });
});