'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './MinimalBlog.module.css';

const posts = [
  {
    id: 1,
    category: 'THOUGHTS',
    title: 'The Philosophy of Clean Code',
    excerpt: 'Code is poetry written for two audiences: computers and humans. While computers merely execute, humans must understand, maintain, and evolve.',
    date: 'November 15, 2024',
    readTime: '5 min read',
    featured: true
  },
  {
    id: 2,
    category: 'ENGINEERING',
    title: 'Building for Scale',
    excerpt: 'Systems that grow gracefully are not accidents. They are deliberate compositions of patterns, principles, and pragmatic decisions.',
    date: 'November 10, 2024',
    readTime: '8 min read'
  },
  {
    id: 3,
    category: 'DESIGN',
    title: 'The Space Between',
    excerpt: 'Negative space is not empty space. It is breathing room for ideas, a pause between thoughts, the silence that makes music meaningful.',
    date: 'November 5, 2024',
    readTime: '4 min read'
  },
  {
    id: 4,
    category: 'TECHNOLOGY',
    title: 'On Digital Minimalism',
    excerpt: 'In an age of infinite complexity, simplicity becomes an act of rebellion. Less code, fewer dependencies, clearer intentions.',
    date: 'October 28, 2024',
    readTime: '6 min read'
  }
];

export default function MinimalBlog() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredPost, setHoveredPost] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Smooth cursor follow
      if (cursorRef.current) {
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
    <div className={styles.container}>
      {/* Custom Cursor */}
      <div ref={cursorRef} className={styles.cursor} />
      <div ref={cursorDotRef} className={styles.cursorDot} />

      {/* Navigation */}
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Gilber Garcia</span>
            <span className={styles.logoSubtext}>Developer & Designer</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#work" className={styles.navLink}>Work</a>
            <a href="#about" className={styles.navLink}>About</a>
            <a href="#contact" className={styles.navLink}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              <span className={styles.line}>
                <span className={styles.word}>Crafting</span>
              </span>
              <span className={styles.line}>
                <span className={styles.word}>Digital</span>
                <span className={styles.word}>Experiences</span>
              </span>
            </h1>
            <p className={styles.heroDescription}>
              A journal on code, design, and the spaces between.
              Written by someone who believes that great software
              is not just functional, but beautiful.
            </p>
          </div>
          <div className={styles.scrollIndicator}>
            <div className={styles.scrollLine} />
          </div>
        </div>
      </header>

      {/* Featured Post */}
      <section className={styles.featured}>
        <div className={styles.featuredContent}>
          <span className={styles.featuredLabel}>FEATURED</span>
          <article className={styles.featuredPost}>
            <div className={styles.featuredMeta}>
              <span className={styles.category}>{posts[0].category}</span>
              <span className={styles.date}>{posts[0].date}</span>
            </div>
            <h2 className={styles.featuredTitle}>{posts[0].title}</h2>
            <p className={styles.featuredExcerpt}>{posts[0].excerpt}</p>
            <a href="#" className={styles.readMore}>
              Read Article
              <svg className={styles.arrow} width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </article>
        </div>
      </section>

      {/* Posts Grid */}
      <section className={styles.posts}>
        <div className={styles.postsGrid}>
          {posts.slice(1).map((post, index) => (
            <article 
              key={post.id}
              className={styles.post}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className={styles.postContent}>
                <div className={styles.postMeta}>
                  <span className={styles.category}>{post.category}</span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>
                <h3 className={styles.postTitle}>
                  <a href="#" className={styles.postLink}>
                    {post.title}
                    <span className={styles.linkUnderline} />
                  </a>
                </h3>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                <div className={styles.postFooter}>
                  <span className={styles.postDate}>{post.date}</span>
                </div>
              </div>
              <div 
                className={styles.postHoverBg}
                style={{
                  opacity: hoveredPost === post.id ? 1 : 0
                }}
              />
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Connect</h4>
            <div className={styles.footerLinks}>
              <a href="https://github.com" className={styles.footerLink}>GitHub</a>
              <a href="https://twitter.com" className={styles.footerLink}>Twitter</a>
              <a href="https://linkedin.com" className={styles.footerLink}>LinkedIn</a>
            </div>
          </div>
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Contact</h4>
            <a href="mailto:hello@example.com" className={styles.footerLink}>hello@gilbergarcia.com</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>© 2024 Gilber Garcia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}