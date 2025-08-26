'use client';
import { useEffect, useState } from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent} style={{
        transform: mounted ? `translate(${mousePosition.x}px, ${mousePosition.y}px)` : 'none'
      }}>
        <div className={styles.badge}>
          <span className={styles.badgeText}>✨ Welcome to the Future</span>
        </div>
        
        <h1 className={styles.title}>
          <span className={styles.gradient}>Gilber Garcia</span>
          <br />
          <span className={styles.subtitle}>Full-Stack Engineer & Creative Developer</span>
        </h1>
        
        <p className={styles.description}>
          Crafting exceptional digital experiences with cutting-edge technology.
          Specializing in React, Next.js, and modern web architecture.
        </p>
        
        <div className={styles.ctaContainer}>
          <button className={styles.primaryCta}>
            <span>View My Work</span>
            <svg className={styles.arrow} width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M13 7L18 12L13 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button className={styles.secondaryCta}>
            <span>Get In Touch</span>
          </button>
        </div>
        
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Projects Completed</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>5+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Client Satisfaction</span>
          </div>
        </div>
      </div>
      
      <div className={styles.floatingCard} style={{
        transform: mounted ? `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)` : 'none'
      }}>
        <div className={styles.cardContent}>
          <div className={styles.codeBlock}>
            <span className={styles.codeLine}>
              <span className={styles.keyword}>const</span> developer = {'{'}
            </span>
            <span className={styles.codeLine}>
              &nbsp;&nbsp;name: <span className={styles.string}>"Gilber Garcia"</span>,
            </span>
            <span className={styles.codeLine}>
              &nbsp;&nbsp;skills: [<span className={styles.string}>"React"</span>, <span className={styles.string}>"Next.js"</span>, <span className={styles.string}>"Node.js"</span>],
            </span>
            <span className={styles.codeLine}>
              &nbsp;&nbsp;passion: <span className={styles.string}>"Building amazing products"</span>
            </span>
            <span className={styles.codeLine}>{'}'}</span>
          </div>
        </div>
      </div>
      
      <div className={styles.orbitContainer}>
        <div className={styles.orbit}>
          <div className={styles.orbitItem}></div>
        </div>
        <div className={styles.orbit2}>
          <div className={styles.orbitItem2}></div>
        </div>
        <div className={styles.orbit3}>
          <div className={styles.orbitItem3}></div>
        </div>
      </div>
    </section>
  );
}