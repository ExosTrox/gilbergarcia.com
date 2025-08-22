import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import jwt from 'jsonwebtoken';

// Disable static generation for this route
export const dynamic = 'force-dynamic';

const postsFile = path.join(process.cwd(), 'data', 'posts.json');

async function getPosts() {
  try {
    const data = await fs.readFile(postsFile, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function savePosts(posts) {
  await fs.writeFile(postsFile, JSON.stringify(posts, null, 2));
}

export async function DELETE(request, { params }) {
  try {
    // Verify authentication
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'default-secret-change-in-production');
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    const posts = await getPosts();
    const filteredPosts = posts.filter(post => post.id !== params.id);
    
    if (posts.length === filteredPosts.length) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    await savePosts(filteredPosts);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}