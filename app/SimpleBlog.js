'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './EnhancedBlog.module.css';

export default function SimpleBlog() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentTheme, setCurrentTheme] = useState('light');
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  
  const themes = ['light', 'dark'];
  
  const toggleTheme = () => {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(nextTheme);
    document.documentElement.className = `theme-${nextTheme}`;
    localStorage.setItem('theme', nextTheme);
  };

  useEffect(() => {
    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let initialTheme = 'light';
    if (savedTheme) {
      initialTheme = savedTheme;
    } else if (prefersDark) {
      initialTheme = 'dark';
    }
    
    setCurrentTheme(initialTheme);
    document.documentElement.className = `theme-${initialTheme}`;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll
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
    };

    const handleMouseMove = (e) => {
      if (cursorRef.current && cursorDotRef.current) {
        requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
          }
          if (cursorDotRef.current) {
            cursorDotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`${styles.container} ${styles[currentTheme]}`}>
      {/* Custom Cursor - Desktop Only */}
      <div ref={cursorRef} className={styles.cursor} />
      <div ref={cursorDotRef} className={styles.cursorDot} />

      {/* Background Pattern */}
      <div className={styles.backgroundPattern}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gradientOrb3} />
      </div>

      {/* Navigation */}
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Gilber Garcia</span>
          </div>
          <div className={styles.navLinks}>
            <a 
              href="#home" 
              className={`${styles.navLink} ${activeSection === 'home' ? styles.active : ''}`}
            >
              Home
            </a>
            <a 
              href="#blog" 
              className={`${styles.navLink} ${activeSection === 'blog' ? styles.active : ''}`}
            >
              Blog
            </a>
            <a 
              href="#about" 
              className={`${styles.navLink} ${activeSection === 'about' ? styles.active : ''}`}
            >
              About
            </a>
            <a 
              href="#contact" 
              className={`${styles.navLink} ${activeSection === 'contact' ? styles.active : ''}`}
            >
              Contact
            </a>
            <button 
              onClick={toggleTheme}
              className={styles.themeButton}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                fontSize: '1.2rem',
                transition: 'transform 0.3s ease',
                marginLeft: '1rem'
              }}
              aria-label="Toggle theme"
            >
              {currentTheme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine}>
                <span className={styles.titleWord}>Creating</span>
              </span>
              <span className={styles.titleLine}>
                <span className={styles.titleWord}>Digital</span>
                <span className={styles.titleWord}>Excellence</span>
              </span>
            </h1>
            <p className={styles.heroSubtitle}>
              Software Engineer & Creative Developer
            </p>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.floatingShape1} />
            <div className={styles.floatingShape2} />
            <div className={styles.floatingShape3} />
          </div>
          
          <div className={styles.scrollIndicator}>
            <span className={styles.scrollText}>Scroll</span>
            <div className={styles.scrollLine} />
          </div>
        </div>
      </header>

      {/* Blog Posts Section */}
      <section id="blog" className={styles.blog}>
        <div className={styles.blogContent}>
          <article className={styles.blogPost}>
            <div className={styles.postDate}>
              <span className={styles.day}>26</span>
              <span className={styles.month}>NOV</span>
            </div>
            <div className={styles.postDetails}>
              <h2 className={styles.postTitle}>
                Building Better Software Through Clean Architecture
              </h2>
            </div>
          </article>

          <article className={styles.blogPost}>
            <div className={styles.postDate}>
              <span className={styles.day}>19</span>
              <span className={styles.month}>NOV</span>
            </div>
            <div className={styles.postDetails}>
              <h2 className={styles.postTitle}>
                The Art of Writing Maintainable Code
              </h2>
            </div>
          </article>

          <article className={styles.blogPost}>
            <div className={styles.postDate}>
              <span className={styles.day}>16</span>
              <span className={styles.month}>NOV</span>
            </div>
            <div className={styles.postDetails}>
              <h2 className={styles.postTitle}>
                Understanding Modern Development Workflows
              </h2>
            </div>
          </article>

          <article className={styles.blogPost}>
            <div className={styles.postDate}>
              <span className={styles.day}>10</span>
              <span className={styles.month}>NOV</span>
            </div>
            <div className={styles.postDetails}>
              <h2 className={styles.postTitle}>
                Exploring Design Patterns in Software Engineering
              </h2>
            </div>
          </article>

          <article className={styles.blogPost}>
            <div className={styles.postDate}>
              <span className={styles.day}>05</span>
              <span className={styles.month}>NOV</span>
            </div>
            <div className={styles.postDetails}>
              <h2 className={styles.postTitle}>
                Optimizing Performance in Web Applications
              </h2>
            </div>
          </article>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.about}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>02</span>
            About
          </h2>
          
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <p className={styles.aboutParagraph}>
                I'm a software engineer passionate about creating exceptional digital experiences 
                that combine beautiful design with powerful functionality.
              </p>
              <p className={styles.aboutParagraph}>
                With expertise in modern JavaScript frameworks, cloud architecture, and UI/UX design, 
                I help companies build products that users love.
              </p>
              
              <div className={styles.skills}>
                <div className={styles.skillCategory}>
                  <h4 className={styles.skillTitle}>Frontend</h4>
                  <ul className={styles.skillList}>
                    <li>React / Next.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Framer Motion</li>
                  </ul>
                </div>
                <div className={styles.skillCategory}>
                  <h4 className={styles.skillTitle}>Backend</h4>
                  <ul className={styles.skillList}>
                    <li>Node.js</li>
                    <li>Python</li>
                    <li>PostgreSQL</li>
                    <li>GraphQL</li>
                  </ul>
                </div>
                <div className={styles.skillCategory}>
                  <h4 className={styles.skillTitle}>Tools</h4>
                  <ul className={styles.skillList}>
                    <li>AWS / Vercel</li>
                    <li>Docker</li>
                    <li>Git / GitHub</li>
                    <li>Figma</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contact}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>03</span>
            Contact
          </h2>
          
          <div className={styles.contactContent}>
            <p className={styles.contactText}>
              Let's create something amazing together
            </p>
            <a href="mailto:gilbergarciata@gmail.com" className={styles.contactEmail}>
              gilbergarciata@gmail.com
            </a>
            
            <div className={styles.socialLinks}>
              <a href="https://github.com" className={styles.socialLink}>GitHub</a>
              <a href="https://linkedin.com" className={styles.socialLink}>LinkedIn</a>
              <a href="https://twitter.com" className={styles.socialLink}>Twitter</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.copyright}>© 2024 Gilber Garcia</p>
        </div>
      </footer>
    </div>
  );
}