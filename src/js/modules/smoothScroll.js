export class SmoothScroll {
  constructor() {
    this.offset = 80; // Offset for fixed header
  }

  init() {
    this.setupAnchors();
  }

  setupAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => this.handleClick(e));
    });
  }

  handleClick(e) {
    e.preventDefault();
    
    const href = e.currentTarget.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (!target) return;
    
    this.scrollToElement(target);
  }

  scrollToElement(element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - this.offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  // For programmatic scrolling
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrollToSection(sectionId) {
    const element = document.querySelector(sectionId);
    if (element) {
      this.scrollToElement(element);
    }
  }
}

export default SmoothScroll;