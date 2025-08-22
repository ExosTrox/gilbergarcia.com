'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid password');
        console.error('Login failed:', data);
      }
    } catch (err) {
      setError('Connection error. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(-45deg, #f0f9ff, #fef3c7, #f0fdfa, #fce7f3)',
      backgroundSize: '400% 400%',
      animation: 'gradient 15s ease infinite'
    }}>
      <div className="container" style={{ maxWidth: '400px' }}>
        <form onSubmit={handleLogin} style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '2rem',
            fontSize: '2rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🔐 Admin Login
          </h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#4b5563',
              fontSize: '0.95rem',
              fontWeight: '500'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s',
                background: loading ? '#f9fafb' : 'white'
              }}
              onFocus={(e) => {
                if (!loading) {
                  e.target.style.borderColor = '#8b5cf6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          {error && (
            <div style={{ 
              marginBottom: '1rem',
              padding: '0.75rem',
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: '8px',
              color: '#dc2626',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: loading ? 'none' : '0 10px 20px rgba(139, 92, 246, 0.3)'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          <p style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            color: '#6b7280',
            fontSize: '0.9rem'
          }}>
            Secure admin access only
          </p>
        </form>
      </div>
    </div>
  );
}