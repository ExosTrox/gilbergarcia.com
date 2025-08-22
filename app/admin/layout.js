'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = async () => {
    // Don't check auth on login page
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }
    
    try {
      const res = await fetch('/api/auth/verify');
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        router.push('/admin/login');
      }
    } catch {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div style={{ fontSize: '1.5rem' }}>Loading...</div>
      </div>
    );
  }

  // Show login page without admin nav
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Show admin layout only when authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Admin Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        padding: '1rem 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <h2 style={{ 
              color: 'white', 
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>
              🔒 Admin Panel
            </h2>
            
            <nav style={{ display: 'flex', gap: '1.5rem' }}>
              <Link 
                href="/admin"
                style={{
                  color: pathname === '/admin' ? '#fef3c7' : 'white',
                  textDecoration: 'none',
                  fontWeight: pathname === '/admin' ? '600' : '400',
                  fontSize: '1rem',
                  transition: 'color 0.2s'
                }}
              >
                ✏️ Write Post
              </Link>
              
              <Link 
                href="/admin/posts"
                style={{
                  color: pathname === '/admin/posts' ? '#fef3c7' : 'white',
                  textDecoration: 'none',
                  fontWeight: pathname === '/admin/posts' ? '600' : '400',
                  fontSize: '1rem',
                  transition: 'color 0.2s'
                }}
              >
                📚 All Posts
              </Link>
              
              <Link 
                href="/"
                target="_blank"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  transition: 'color 0.2s'
                }}
              >
                🌐 View Site
              </Link>
            </nav>
          </div>
          
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            Logout →
          </button>
        </div>
      </header>

      {/* Admin Content */}
      <main style={{
        minHeight: 'calc(100vh - 80px)',
        background: 'linear-gradient(to bottom, #f7fafc, #ffffff)'
      }}>
        {children}
      </main>
    </div>
  );
}