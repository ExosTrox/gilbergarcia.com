'use client';
import { useEffect, useState, useCallback } from 'react';
import styles from './OptimizedBlog.module.css';

export default function OptimizedBlog() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState('light');

  const themeColors = {
    light: {
      '--bg-primary': '#ffffff',
      '--bg-secondary': '#f8f9fa',
      '--text-primary': '#1a1a1a',
      '--text-secondary': '#6c757d',
      '--border-color': '#e9ecef',
      '--accent': '#4f46e5',
      '--accent-hover': '#4338ca',
      '--card-bg': '#ffffff',
      '--nav-bg': 'rgba(255, 255, 255, 0.95)'
    },
    dark: {
      '--bg-primary': '#0f0f0f',
      '--bg-secondary': '#1a1a1a',
      '--text-primary': '#ffffff',
      '--text-secondary': '#a0a0a0',
      '--border-color': '#2a2a2a',
      '--accent': '#6366f1',
      '--accent-hover': '#818cf8',
      '--card-bg': '#1a1a1a',
      '--nav-bg': 'rgba(15, 15, 15, 0.95)'
    }
  };

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    
    // Apply theme colors
    const colors = themeColors[initialTheme];
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    // Optimized scroll handler with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          
          const sections = ['home', 'blog', 'about', 'contact'];
          const scrollPosition = window.scrollY + 200;
          
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    
    // Apply theme colors
    const colors = themeColors[nextTheme];
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    
    localStorage.setItem('theme', nextTheme);
  }, [theme, themeColors]);

  const blogPosts = [
    { day: '26', month: 'NOV', title: 'Building Better Software Through Clean Architecture', category: 'Engineering' },
    { day: '19', month: 'NOV', title: 'The Art of Writing Maintainable Code', category: 'Best Practices' },
    { day: '16', month: 'NOV', title: 'Understanding Modern Development Workflows', category: 'Workflow' },
    { day: '10', month: 'NOV', title: 'Exploring Design Patterns in Software Engineering', category: 'Design' },
    { day: '05', month: 'NOV', title: 'Optimizing Performance in Web Applications', category: 'Performance' }
  ];

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContent}>
          <a href="#home" className={styles.logo}>Gilber Garcia</a>
          
          <div className={styles.navLinks}>
            <a href="#home" className={`${styles.navLink} ${activeSection === 'home' ? styles.active : ''}`}>
              Home
            </a>
            <a href="#blog" className={`${styles.navLink} ${activeSection === 'blog' ? styles.active : ''}`}>
              Blog
            </a>
            <a href="#about" className={`${styles.navLink} ${activeSection === 'about' ? styles.active : ''}`}>
              About
            </a>
            <a href="#contact" className={`${styles.navLink} ${activeSection === 'contact' ? styles.active : ''}`}>
              Contact
            </a>
            <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span>Creating</span>
            <span>Digital Excellence</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Software Engineer & Creative Developer
          </p>
          <div className={styles.heroActions}>
            <a href="#blog" className={styles.primaryButton}>View Articles</a>
            <a href="#contact" className={styles.secondaryButton}>Get in Touch</a>
          </div>
        </div>
      </header>

      {/* Blog Section */}
      <section id="blog" className={styles.blog}>
        <div className={styles.blogHeader}>
          <h2 className={styles.sectionTitle}>Recent Articles</h2>
          <p className={styles.sectionSubtitle}>Thoughts on software, design, and technology</p>
        </div>
        
        <div className={styles.blogGrid}>
          {blogPosts.map((post, index) => (
            <article key={index} className={styles.blogCard}>
              <div className={styles.dateBox}>
                <span className={styles.day}>{post.day}</span>
                <span className={styles.month}>{post.month}</span>
              </div>
              <div className={styles.postContent}>
                <span className={styles.category}>{post.category}</span>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <a href="#" className={styles.readMore}>Read Article →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.about}>
        <div className={styles.aboutContent}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className={styles.aboutText}>
            I'm a software engineer passionate about creating exceptional digital experiences 
            that combine beautiful design with powerful functionality.
          </p>
          <p className={styles.aboutText}>
            With expertise in modern JavaScript frameworks, cloud architecture, and UI/UX design, 
            I help companies build products that users love.
          </p>
          
          <div className={styles.skills}>
            <div className={styles.skillGroup}>
              <h3>Frontend</h3>
              <ul>
                <li>React / Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div className={styles.skillGroup}>
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Python</li>
                <li>PostgreSQL</li>
              </ul>
            </div>
            <div className={styles.skillGroup}>
              <h3>Tools</h3>
              <ul>
                <li>AWS / Vercel</li>
                <li>Docker</li>
                <li>Git / GitHub</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contact}>
        <div className={styles.contactContent}>
          <h2 className={styles.sectionTitle}>Let's Connect</h2>
          <p className={styles.contactText}>
            Have a project in mind? Let's create something amazing together.
          </p>
          <a href="mailto:gilbergarciata@gmail.com" className={styles.emailLink}>
            gilbergarciata@gmail.com
          </a>
          <div className={styles.social}>
            <a href="https://github.com" aria-label="GitHub">GitHub</a>
            <a href="https://linkedin.com" aria-label="LinkedIn">LinkedIn</a>
            <a href="https://twitter.com" aria-label="Twitter">Twitter</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 Gilber Garcia. All rights reserved.</p>
      </footer>
    </div>
  );
}