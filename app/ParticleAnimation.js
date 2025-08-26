'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useTheme } from './ThemeProvider';

const particleConfigs = {
  light: {
    particles: ['🍂', '🍁', '🍃', '✨', '☀️'],
    count: 15,
    colors: ['#fbbf24', '#fb923c', '#f97316'],
    windStrength: 0.002,
    gravity: 0.0015,
    rotationSpeed: 2
  },
  dark: {
    particles: ['✨', '⭐', '🌟', '💫', '🌙'],
    count: 20,
    colors: ['#818cf8', '#a78bfa', '#c084fc'],
    windStrength: 0.001,
    gravity: 0.001,
    rotationSpeed: 1
  },
  sunset: {
    particles: ['🌅', '☁️', '🌤️', '✨', '🌻'],
    count: 12,
    colors: ['#f97316', '#fbbf24', '#fb923c'],
    windStrength: 0.003,
    gravity: 0.0008,
    rotationSpeed: 1.5
  },
  forest: {
    particles: ['🌲', '🍃', '🌿', '🦋', '🐦'],
    count: 18,
    colors: ['#22c55e', '#4ade80', '#86efac'],
    windStrength: 0.0025,
    gravity: 0.0012,
    rotationSpeed: 2.5
  }
};

class Particle {
  constructor(canvas, config, particleType) {
    this.canvas = canvas;
    this.config = config;
    this.type = particleType;
    this.reset(true);
  }

  reset(initial = false) {
    const canvas = this.canvas;
    this.x = initial ? Math.random() * canvas.width : Math.random() * canvas.width;
    this.y = initial ? Math.random() * canvas.height - canvas.height : -50;
    this.z = Math.random() * 0.5 + 0.5; // Depth for parallax
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = Math.random() * 0.5 + 0.5;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * this.config.rotationSpeed * 0.05;
    this.size = Math.random() * 20 + 15;
    this.opacity = initial ? Math.random() : 0;
    this.fadeInSpeed = 0.01;
    this.swayPhase = Math.random() * Math.PI * 2;
    this.swaySpeed = Math.random() * 0.02 + 0.01;
    this.swayAmount = Math.random() * 30 + 20;
    this.lifespan = Math.random() * 300 + 200;
    this.age = 0;
  }

  update(deltaTime, wind) {
    // Apply physics
    this.vy += this.config.gravity * this.z * deltaTime;
    this.vx += wind * this.config.windStrength * deltaTime;
    
    // Sway motion
    this.swayPhase += this.swaySpeed * deltaTime;
    const sway = Math.sin(this.swayPhase) * this.swayAmount * this.z;
    
    // Update position
    this.x += (this.vx + sway * 0.01) * deltaTime;
    this.y += this.vy * deltaTime;
    
    // Update rotation
    this.rotation += this.rotationSpeed * deltaTime;
    
    // Age and fade
    this.age += deltaTime;
    
    if (this.opacity < 1 && this.age < 50) {
      this.opacity = Math.min(1, this.opacity + this.fadeInSpeed * deltaTime);
    } else if (this.age > this.lifespan - 50) {
      this.opacity = Math.max(0, this.opacity - this.fadeInSpeed * deltaTime);
    }
    
    // Reset if out of bounds or too old
    if (this.y > this.canvas.height + 50 || this.age > this.lifespan) {
      this.reset();
    }
    
    // Wrap horizontally
    if (this.x < -50) this.x = this.canvas.width + 50;
    if (this.x > this.canvas.width + 50) this.x = -50;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity * 0.8;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.z, this.z);
    ctx.font = `${this.size}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add glow effect for certain themes
    if (this.config === particleConfigs.dark || this.config === particleConfigs.sunset) {
      ctx.shadowColor = this.config.colors[0];
      ctx.shadowBlur = 10;
    }
    
    ctx.fillText(this.type, 0, 0);
    ctx.restore();
  }
}

export default function ParticleAnimation() {
  const [isClient, setIsClient] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const windRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);
  const { theme } = useTheme();
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
  }, []);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const config = particleConfigs[theme] || particleConfigs.light;
    particlesRef.current = [];
    
    for (let i = 0; i < config.count; i++) {
      const particleType = config.particles[Math.floor(Math.random() * config.particles.length)];
      particlesRef.current.push(new Particle(canvas, config, particleType));
    }
  }, [theme]);

  const animate = useCallback((currentTime) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    // Calculate delta time
    const deltaTime = Math.min(currentTime - lastTimeRef.current, 32); // Cap at ~30fps min
    lastTimeRef.current = currentTime;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update wind based on mouse movement
    const targetWind = (mouseRef.current.x - window.innerWidth / 2) / window.innerWidth * 2;
    windRef.current += (targetWind - windRef.current) * 0.05;
    
    // Update and draw particles
    const config = particleConfigs[theme] || particleConfigs.light;
    particlesRef.current.forEach(particle => {
      particle.config = config;
      particle.update(deltaTime * 0.06, windRef.current);
      particle.draw(ctx);
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, [theme]);

  useEffect(() => {
    resizeCanvas();
    initParticles();
    
    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };
    
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, resizeCanvas, initParticles, animate]);

  // Reinitialize particles when theme changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const config = particleConfigs[theme] || particleConfigs.light;
    const currentCount = particlesRef.current.length;
    
    if (currentCount < config.count) {
      // Add more particles
      for (let i = currentCount; i < config.count; i++) {
        const particleType = config.particles[Math.floor(Math.random() * config.particles.length)];
        particlesRef.current.push(new Particle(canvas, config, particleType));
      }
    } else if (currentCount > config.count) {
      // Remove excess particles
      particlesRef.current = particlesRef.current.slice(0, config.count);
    }
    
    // Update particle types for existing particles
    particlesRef.current.forEach(particle => {
      particle.type = config.particles[Math.floor(Math.random() * config.particles.length)];
      particle.config = config;
    });
  }, [theme]);

  if (!isClient) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="particles-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.9
      }}
    />
  );
}