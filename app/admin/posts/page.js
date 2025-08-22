'use client';
import { useState, useEffect } from 'react';

export default function PostsManagementPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Manage Posts
      </h1>

      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <p style={{ 
          marginBottom: '2rem', 
          color: '#6b7280',
          fontSize: '1.1rem'
        }}>
          Total Posts: <strong>{posts.length}</strong>
        </p>

        {posts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: '#f9fafb',
            borderRadius: '10px'
          }}>
            <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>
              No posts yet. Start writing!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {posts.map((post) => (
              <div
                key={post.id}
                style={{
                  padding: '1.5rem',
                  background: '#f9fafb',
                  borderRadius: '10px',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.2s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: '1.3rem', 
                    marginBottom: '0.5rem',
                    color: '#1f2937'
                  }}>
                    {post.emoji} {post.title}
                  </h3>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem'
                  }}>
                    {post.date} · {post.readTime}
                  </p>
                  {post.tags && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {post.tags.map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '0.25rem 0.75rem',
                            background: 'linear-gradient(135deg, #667eea20, #764ba220)',
                            border: '1px solid #8b5cf630',
                            borderRadius: '15px',
                            fontSize: '0.75rem',
                            color: '#7c3aed'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => deletePost(post.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#dc2626';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = '#ef4444';
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}