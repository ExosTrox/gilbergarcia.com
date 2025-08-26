'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext();

const themes = {
  light: {
    name: 'light',
    icon: '☀️',
    class: 'theme-light'
  },
  dark: {
    name: 'dark', 
    icon: '🌙',
    class: 'theme-dark'
  },
  sunset: {
    name: 'sunset',
    icon: '🌅',
    class: 'theme-sunset'
  },
  forest: {
    name: 'forest',
    icon: '🌲',
    class: 'theme-forest'
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let initialTheme = 'light';
    if (savedTheme && themes[savedTheme]) {
      initialTheme = savedTheme;
    } else if (prefersDark) {
      initialTheme = 'dark';
    }
    
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    document.documentElement.className = themes[initialTheme].class;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        document.documentElement.className = themes[newTheme].class;
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const cycleTheme = useCallback(() => {
    setIsTransitioning(true);
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    const nextTheme = themeKeys[nextIndex];
    
    document.documentElement.classList.add('theme-transitioning');
    
    setTimeout(() => {
      setTheme(nextTheme);
      document.documentElement.setAttribute('data-theme', nextTheme);
      document.documentElement.className = `${themes[nextTheme].class} theme-transitioning`;
      localStorage.setItem('theme', nextTheme);
      
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
        setIsTransitioning(false);
      }, 50);
    }, 50);
  }, [theme]);

  const setSpecificTheme = useCallback((themeName) => {
    if (!themes[themeName]) return;
    
    setIsTransitioning(true);
    document.documentElement.classList.add('theme-transitioning');
    
    setTimeout(() => {
      setTheme(themeName);
      document.documentElement.setAttribute('data-theme', themeName);
      document.documentElement.className = `${themes[themeName].class} theme-transitioning`;
      localStorage.setItem('theme', themeName);
      
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
        setIsTransitioning(false);
      }, 50);
    }, 50);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme, setSpecificTheme, isTransitioning, themes }}>
      <>
        <div className="theme-controls">
          <button 
            className={`theme-toggle ${isTransitioning ? 'transitioning' : ''}`}
            onClick={cycleTheme}
            aria-label="Cycle theme"
            title={`Current: ${themes[theme].name}`}
          >
            <span className="theme-icon">{themes[theme].icon}</span>
            <span className="theme-ring"></span>
          </button>
          <div className="theme-palette">
            {Object.entries(themes).map(([key, value]) => (
              <button
                key={key}
                className={`theme-dot ${theme === key ? 'active' : ''}`}
                onClick={() => setSpecificTheme(key)}
                aria-label={`Switch to ${value.name} theme`}
                title={value.name}
                data-theme-preview={key}
              />
            ))}
          </div>
        </div>
        {children}
      </>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};