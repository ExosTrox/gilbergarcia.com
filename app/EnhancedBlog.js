'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './EnhancedBlog.module.css';

export default function EnhancedBlog() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentTheme, setCurrentTheme] = useState('light');
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  
  // Try to get theme from context, but don't fail if not available
  let theme = 'light';
  try {
    const { useTheme } = require('./ThemeProvider');
    const themeContext = useTheme();
    if (themeContext) {
      theme = themeContext.theme;
    }
  } catch {
    // Use default theme if context not available
  }
  
  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll
      const sections = ['home', 'work', 'about', 'contact'];
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
      setMousePosition({ x: e.clientX, y: e.clientY });
      
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
              href="#work" 
              className={`${styles.navLink} ${activeSection === 'work' ? styles.active : ''}`}
            >
              Work
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine}>
                <span className={styles.titleWord} data-text="Creating">Creating</span>
              </span>
              <span className={styles.titleLine}>
                <span className={styles.titleWord} data-text="Digital">Digital</span>
                <span className={styles.titleWord} data-text="Excellence">Excellence</span>
              </span>
            </h1>
            <p className={styles.heroSubtitle}>
              Full-Stack Engineer specializing in modern web technologies
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

      {/* Work Section */}
      <section id="work" className={styles.work}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>01</span>
            Selected Work
          </h2>
          
          <div className={styles.projects}>
            <article className={styles.project}>
              <div className={styles.projectNumber}>01</div>
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>E-Commerce Platform</h3>
                <p className={styles.projectDescription}>
                  Modern shopping experience built with Next.js and Stripe
                </p>
                <div className={styles.projectTech}>
                  <span className={styles.techTag}>React</span>
                  <span className={styles.techTag}>Node.js</span>
                  <span className={styles.techTag}>PostgreSQL</span>
                </div>
              </div>
              <a href="#" className={styles.projectLink}>
                <span>View Project</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </article>

            <article className={styles.project}>
              <div className={styles.projectNumber}>02</div>
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>SaaS Dashboard</h3>
                <p className={styles.projectDescription}>
                  Analytics platform with real-time data visualization
                </p>
                <div className={styles.projectTech}>
                  <span className={styles.techTag}>TypeScript</span>
                  <span className={styles.techTag}>D3.js</span>
                  <span className={styles.techTag}>AWS</span>
                </div>
              </div>
              <a href="#" className={styles.projectLink}>
                <span>View Project</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </article>

            <article className={styles.project}>
              <div className={styles.projectNumber}>03</div>
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>Mobile Banking App</h3>
                <p className={styles.projectDescription}>
                  Secure financial management with React Native
                </p>
                <div className={styles.projectTech}>
                  <span className={styles.techTag}>React Native</span>
                  <span className={styles.techTag}>GraphQL</span>
                  <span className={styles.techTag}>MongoDB</span>
                </div>
              </div>
              <a href="#" className={styles.projectLink}>
                <span>View Project</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </article>
          </div>
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
                I'm a engineer passionate about creating exceptional digital experiences 
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