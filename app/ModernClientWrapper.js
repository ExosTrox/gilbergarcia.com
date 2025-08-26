'use client';
import dynamic from 'next/dynamic';

// Dynamically import components to avoid SSR issues
const GradientMesh = dynamic(() => import('./GradientMesh'), { 
  ssr: false,
  loading: () => null
});

const FloatingElements = dynamic(() => import('./FloatingElements'), { 
  ssr: false,
  loading: () => null
});

const HeroSection = dynamic(() => import('./HeroSection'), { 
  ssr: false,
  loading: () => null
});

export default function ModernClientWrapper() {
  return (
    <>
      <GradientMesh />
      <FloatingElements />
      <HeroSection />
    </>
  );
}