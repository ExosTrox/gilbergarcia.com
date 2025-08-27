export class VisitorCounter {
  constructor() {
    this.totalVisits = 0;
    this.todayVisits = 0;
  }

  init() {
    this.loadVisitCounts();
    this.incrementVisit();
    this.updateDisplay();
  }

  loadVisitCounts() {
    this.totalVisits = parseInt(localStorage.getItem('totalVisits') || '0');
    this.todayVisits = parseInt(sessionStorage.getItem('todayVisits') || '0');
  }

  incrementVisit() {
    if (!sessionStorage.getItem('counted')) {
      this.totalVisits++;
      this.todayVisits++;
      
      localStorage.setItem('totalVisits', this.totalVisits.toString());
      sessionStorage.setItem('todayVisits', this.todayVisits.toString());
      sessionStorage.setItem('counted', 'true');
    }
  }

  updateDisplay() {
    const element = document.getElementById('visitorCount');
    if (element) {
      element.textContent = `(Visited ${this.totalVisits} times, ${this.todayVisits} visits today)`;
    }
  }

  // For testing purposes
  getTotalVisits() {
    return this.totalVisits;
  }

  getTodayVisits() {
    return this.todayVisits;
  }

  reset() {
    this.totalVisits = 0;
    this.todayVisits = 0;
    localStorage.removeItem('totalVisits');
    sessionStorage.removeItem('todayVisits');
    sessionStorage.removeItem('counted');
  }
}

export default VisitorCounter;