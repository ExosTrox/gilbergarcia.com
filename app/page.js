'use client';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Default posts for when no posts exist yet
  const defaultPosts = [
    {
      id: '1',
      date: "December 15, 2024",
      title: "Welcome to My Blog",
      content: "This is where I'll share my thoughts on technology, programming, and life. Stay tuned for more content!",
      readTime: "1 min read",
      tags: ["Welcome", "Blog"],
      emoji: "👋"
    }
  ];

  const displayPosts = posts.length > 0 ? posts : defaultPosts;

  return (
    <div className="container">
      <header>
        <h1>Gilbert Garcia</h1>
        <p className="subtitle">Engineering elegant solutions to complex problems</p>
      </header>
      
      <main>
        {displayPosts.map((post) => (
          <article key={post.id}>
            <div className="post-meta">
              <div className="post-date">
                <span className="emoji">{post.emoji || "📝"}</span>
                {post.date} · {post.readTime || "5 min read"}
              </div>
            </div>
            {post.tags && (
              <div className="tags">
                {post.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            )}
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <a href="#" className="read-more">Continue reading</a>
          </article>
        ))}
      </main>

      <footer>
        <div className="footer-content">
          <p>© 2024 Gilbert Garcia · Crafted with passion</p>
        </div>
        <div className="social-links">
          <a href="#" title="GitHub">GH</a>
          <a href="#" title="LinkedIn">LI</a>
          <a href="#" title="Twitter">TW</a>
          <a href="#" title="Email">@</a>
        </div>
      </footer>
    </div>
  );
}