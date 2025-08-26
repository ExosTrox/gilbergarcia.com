'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import '../../minimal.css';

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: '',
    category: '',
    description: '',
    content: ''
  });
  const themes = ['light', 'dark', 'sunset'];
  const ADMIN_PASSWORD = 'kga2801';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Load theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Check authentication
    const authToken = sessionStorage.getItem('blogAuth');
    if (authToken === btoa(ADMIN_PASSWORD)) {
      setIsAuthenticated(true);
    }
    
    // Load post
    try {
      const savedPosts = localStorage.getItem('blogPosts');
      if (savedPosts) {
        const posts = JSON.parse(savedPosts);
        const foundPost = posts.find(p => p.id === parseInt(params.id));
        if (foundPost) {
          const postWithDate = {
            ...foundPost,
            date: new Date(foundPost.date)
          };
          setPost(postWithDate);
          setEditedPost({
            title: foundPost.title,
            category: foundPost.category || '',
            description: foundPost.description || '',
            content: foundPost.content
          });
        }
      }
    } catch (error) {
      console.error('Error loading post:', error);
    }
  }, [params.id]);

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const handleEdit = () => {
    setShowEditPanel(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    try {
      const savedPosts = localStorage.getItem('blogPosts');
      if (savedPosts) {
        const posts = JSON.parse(savedPosts);
        const updatedPosts = posts.map(p => {
          if (p.id === parseInt(params.id)) {
            return {
              ...p,
              ...editedPost,
              readTime: `${Math.ceil(editedPost.content.split(' ').length / 200)} min read`
            };
          }
          return p;
        });
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
        
        // Update current post
        setPost({
          ...post,
          ...editedPost,
          readTime: `${Math.ceil(editedPost.content.split(' ').length / 200)} min read`
        });
        setShowEditPanel(false);
      }
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        const savedPosts = localStorage.getItem('blogPosts');
        if (savedPosts) {
          const posts = JSON.parse(savedPosts);
          const updatedPosts = posts.filter(p => p.id !== parseInt(params.id));
          localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
          router.push('/');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (!post) {
    return (
      <div className="container">
        <div className="loading">Loading article...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <nav className="nav">
        <a href="/" className="logo">
          <span className="logo-text">Gilber Garcia</span>
          <span className="logo-dot"></span>
        </a>
        <div className="nav-right">
          <a href="/" className="nav-link">← Back to Blog</a>
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

      <article className="article">
        {isAuthenticated && (
          <div className="admin-bar">
            <button onClick={handleEdit} className="admin-action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit
            </button>
            <button onClick={handleDelete} className="admin-action-btn delete">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6M5 6l1 13a2 2 0 002 2h8a2 2 0 002-2l1-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Delete
            </button>
          </div>
        )}

        <header className="article-header">
          <div className="article-meta">
            {post.category && <span className="article-category">{post.category}</span>}
            <span className="article-date">
              {post.date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span className="article-read-time">{post.readTime}</span>
          </div>
          <h1 className="article-title">{post.title}</h1>
          {post.description && (
            <p className="article-description">{post.description}</p>
          )}
        </header>

        <div className="article-content">
          {post.content.split('\n').map((paragraph, i) => (
            paragraph.trim() && <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>

      {showEditPanel && (
        <div className="modal-overlay" onClick={() => setShowEditPanel(false)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="edit-title">Edit Article</h2>
            <form onSubmit={handleSaveEdit} className="write-form">
              <input
                type="text"
                placeholder="Post title..."
                className="input-field"
                value={editedPost.title}
                onChange={(e) => setEditedPost({...editedPost, title: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Category"
                className="input-field"
                value={editedPost.category}
                onChange={(e) => setEditedPost({...editedPost, category: e.target.value})}
              />
              <input
                type="text"
                placeholder="Short description..."
                className="input-field"
                value={editedPost.description}
                onChange={(e) => setEditedPost({...editedPost, description: e.target.value})}
              />
              <textarea
                placeholder="Post content..."
                className="textarea-field"
                rows="15"
                value={editedPost.content}
                onChange={(e) => setEditedPost({...editedPost, content: e.target.value})}
                required
              />
              <div className="write-actions">
                <button type="submit" className="submit-btn">Save Changes</button>
                <button type="button" onClick={() => setShowEditPanel(false)} className="cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Gilber Garcia · Crafted with care</p>
        </div>
      </footer>
    </div>
  );
}