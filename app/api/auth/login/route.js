import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

// Disable static generation for this route
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { password } = body;
    
    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }
    
    // Get admin password from environment
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not set in environment');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    
    // Check password
    if (password !== adminPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
    
    // Create JWT token
    const secret = process.env.JWT_SECRET || 'default-secret-change-in-production';
    const token = jwt.sign(
      { admin: true, timestamp: Date.now() },
      secret,
      { expiresIn: '7d' }
    );
    
    // Create response with cookie
    const response = NextResponse.json({ success: true, message: 'Login successful' });
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      error: 'Server error', 
      details: error.message 
    }, { status: 500 });
  }
}