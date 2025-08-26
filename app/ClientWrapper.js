'use client';
import dynamic from 'next/dynamic';

// Dynamically import ParticleAnimation to avoid SSR issues
const ParticleAnimation = dynamic(() => import('./ParticleAnimation'), { 
  ssr: false,
  loading: () => null
});

export default function ClientWrapper() {
  return <ParticleAnimation />;
}