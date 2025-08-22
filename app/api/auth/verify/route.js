import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

// Disable static generation for this route
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({ authenticated: false, message: 'No token found' }, { status: 401 });
    }
    
    const secret = process.env.JWT_SECRET || 'default-secret-change-in-production';
    
    try {
      const decoded = jwt.verify(token, secret);
      return NextResponse.json({ authenticated: true, admin: decoded.admin });
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError.message);
      return NextResponse.json({ authenticated: false, message: 'Invalid token' }, { status: 401 });
    }
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json({ 
      authenticated: false, 
      error: 'Server error' 
    }, { status: 500 });
  }
}