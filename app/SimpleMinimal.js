'use client';
import { useEffect, useState } from 'react';
import './minimal.css';

export default function SimpleMinimal() {
  const [theme, setTheme] = useState('dark');
  const [posts, setPosts] = useState([]);
  const [showWritePanel, setShowWritePanel] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [newPost, setNewPost] = useState({
    title: '',
    category: '',
    description: '',
    content: ''
  });
  const themes = ['light', 'dark', 'sunset'];
  const ADMIN_PASSWORD = 'kga2801'; 
  
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Load saved posts from localStorage
    try {
      const savedPosts = localStorage.getItem('blogPosts');
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts);
        // Convert date strings back to Date objects
        const postsWithDates = parsedPosts.map(post => ({
          ...post,
          date: new Date(post.date)
        }));
        setPosts(postsWithDates);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      // Clear corrupted data
      localStorage.removeItem('blogPosts');
    }
    
    // Check if user is authenticated
    try {
      const authToken = sessionStorage.getItem('blogAuth');
      if (authToken === btoa(ADMIN_PASSWORD)) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    }
  }, []);

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      const post = {
        ...newPost,
        date: new Date().toISOString(), // Store as ISO string for proper serialization
        readTime: `${Math.ceil(newPost.content.split(' ').length / 200)} min read`,
        id: Date.now()
      };
      
      const updatedPosts = [post, ...posts];
      setPosts(updatedPosts.map(p => ({
        ...p,
        date: p.date instanceof Date ? p.date : new Date(p.date)
      })));
      
      // Save to localStorage with dates as strings
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      
      // Reset form
      setNewPost({
        title: '',
        category: '',
        description: '',
        content: ''
      });
      setShowWritePanel(false);
    }
  };

  const deletePost = (postId) => {
    if (!isAuthenticated) return;
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    // Save with dates as strings for proper serialization
    const postsToSave = updatedPosts.map(p => ({
      ...p,
      date: p.date instanceof Date ? p.date.toISOString() : p.date
    }));
    localStorage.setItem('blogPosts', JSON.stringify(postsToSave));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('blogAuth', btoa(ADMIN_PASSWORD));
      setShowLoginModal(false);
      setShowWritePanel(true);
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Invalid password');
    }
  };

  const handleWriteClick = () => {
    if (isAuthenticated) {
      setShowWritePanel(!showWritePanel);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('blogAuth');
    setShowWritePanel(false);
  };

  return (
    <div className="container">
      <nav className="nav">
        <a href="#" className="logo">
          <span className="logo-text">Gilber Garcia</span>
          <span className="logo-dot"></span>
        </a>
        <div className="nav-right">
          {isAuthenticated && (
            <div className="admin-panel">
              <button onClick={handleWriteClick} className="write-btn">
                {showWritePanel ? 'Close' : 'Write'}
              </button>
              <span className="admin-badge">Admin</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
          {!isAuthenticated && (
            <button onClick={handleWriteClick} className="admin-btn" title="Admin Login">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          <a href="#blog" className="nav-link">Blog</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button onClick={toggleTheme} className="theme-btn" aria-label="Toggle theme">
            {theme === 'light' && (
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5.64 5.64l1.41 1.41M16.95 16.95l1.41 1.41M5.64 18.36l1.41-1.41M16.95 7.05l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
            {theme === 'dark' && (
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {theme === 'sunset' && (
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <path d="M12 3v6M5.64 5.64l1.41 1.41M3 12h6M18.36 5.64l-1.41 1.41M21 12h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 16h8M7 20h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">Creating</span>
            <span className="title-line gradient">Digital Excellence</span>
          </h1>
          <p className="hero-subtitle">Software Engineer & Creative Developer</p>
        </div>
      </header>

      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="login-title">Admin Login</h2>
            <form onSubmit={handleLogin} className="login-form">
              <input
                type="password"
                placeholder="Enter password..."
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
              />
              {loginError && <p className="error-message">{loginError}</p>}
              <div className="login-actions">
                <button type="submit" className="submit-btn">Login</button>
                <button type="button" onClick={() => setShowLoginModal(false)} className="cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showWritePanel && isAuthenticated && (
        <div className="write-panel">
          <h2 className="write-title">Write a New Post</h2>
          <form onSubmit={handleSubmitPost} className="write-form">
            <input
              type="text"
              placeholder="Post title..."
              className="input-field"
              value={newPost.title}
              onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Category (e.g., Engineering, Design, etc.)"
              className="input-field"
              value={newPost.category}
              onChange={(e) => setNewPost({...newPost, category: e.target.value})}
            />
            <input
              type="text"
              placeholder="Short description..."
              className="input-field"
              value={newPost.description}
              onChange={(e) => setNewPost({...newPost, description: e.target.value})}
            />
            <textarea
              placeholder="Write your post content here..."
              className="textarea-field"
              rows="10"
              value={newPost.content}
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              required
            />
            <div className="write-actions">
              <button type="submit" className="submit-btn">Publish Post</button>
              <button type="button" onClick={() => setShowWritePanel(false)} className="cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <main id="blog" className="blog">
        <div className="blog-header">
          <h2 className="section-title">Recent Articles</h2>
          <p className="section-subtitle">
            {posts.length > 0 ? 'Thoughts on code, design, and technology' : 'No posts yet. Click "Write" to create your first post!'}
          </p>
        </div>
        
        <div className="posts-container">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              <div className="card-calendar">
                <div className="calendar-header">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                </div>
                <div className="calendar-body">
                  {new Date(post.date).getDate()}
                </div>
                <div className="calendar-footer">
                  {new Date(post.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
              </div>
              
              <div className="card-content">
                <div className="card-meta">
                  {post.category && <span className="category-badge">{post.category}</span>}
                  <span className="read-time">{post.readTime}</span>
                </div>
                
                <h3 className="card-title">{post.title}</h3>
                
                <p className="card-description">
                  {post.description || post.content.substring(0, 150) + '...'}
                </p>
                
                <div className="card-footer">
                  <a href={`/article/${post.id}`} className="read-link">
                    <span>Read Article</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  {isAuthenticated && (
                    <button onClick={() => deletePost(post.id)} className="delete-btn" aria-label="Delete post">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6M5 6l1 13a2 2 0 002 2h8a2 2 0 002-2l1-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <section id="about" className="about">
        <div className="about-content">
          <h2 className="section-title">About</h2>
          <p className="about-text">
            I'm a software engineer passionate about creating exceptional digital experiences 
            that combine beautiful design with powerful functionality.
          </p>
          <div className="skills-grid">
            <div className="skill-item">React / Next.js</div>
            <div className="skill-item">TypeScript</div>
            <div className="skill-item">Node.js</div>
            <div className="skill-item">Python</div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-content">
          <h2 className="section-title">Let's Connect</h2>
          <p className="contact-text">Have a project in mind? Let's create something amazing together.</p>
          <a href="mailto:gilbergarciata@gmail.com" className="email-link">
            <span className="email-text">gilbergarciata@gmail.com</span>
            <span className="email-underline"></span>
          </a>
          <div className="social-links">
            <a href="https://github.com" className="social-link" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://twitter.com" className="social-link" aria-label="Twitter">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Gilber Garcia · Crafted with care</p>
        </div>
      </footer>
    </div>
  );
}