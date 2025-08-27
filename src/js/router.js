// Simple client-side router
export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    
    // Listen for URL changes
    window.addEventListener('popstate', () => this.handleRoute());
    
    // Handle initial route
    this.handleRoute();
  }
  
  addRoute(path, handler) {
    this.routes[path] = handler;
  }
  
  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }
  
  handleRoute() {
    const path = window.location.pathname;
    this.currentRoute = path;
    
    // Check for exact match or pattern match
    for (const route in this.routes) {
      if (path === route || path.startsWith(route + '/')) {
        this.routes[route]();
        return;
      }
    }
    
    // Default to home route
    if (this.routes['/']) {
      this.routes['/']();
    }
  }
}

export default Router;