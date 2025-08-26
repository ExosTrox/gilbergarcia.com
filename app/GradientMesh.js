'use client';
import { useEffect, useRef, useState } from 'react';

export default function GradientMesh() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Gradient mesh points
    const meshPoints = [
      { x: 0.1, y: 0.1, vx: 0.0002, vy: 0.0003, color: { r: 99, g: 102, b: 241 } },
      { x: 0.9, y: 0.2, vx: -0.0003, vy: 0.0002, color: { r: 167, g: 139, b: 250 } },
      { x: 0.5, y: 0.5, vx: 0.0002, vy: -0.0002, color: { r: 192, g: 132, b: 252 } },
      { x: 0.2, y: 0.8, vx: -0.0002, vy: -0.0003, color: { r: 129, g: 140, b: 248 } },
      { x: 0.8, y: 0.9, vx: 0.0003, vy: 0.0002, color: { r: 249, g: 115, b: 22 } },
      { x: 0.3, y: 0.3, vx: -0.0001, vy: 0.0002, color: { r: 34, g: 197, b: 94 } }
    ];

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Create gradient mesh
      const imageData = ctx.createImageData(window.innerWidth, window.innerHeight);
      const data = imageData.data;

      // Update mesh points
      meshPoints.forEach(point => {
        point.x += point.vx + (mouseRef.current.x - 0.5) * 0.0001;
        point.y += point.vy + (mouseRef.current.y - 0.5) * 0.0001;

        // Bounce off edges
        if (point.x <= 0 || point.x >= 1) point.vx *= -1;
        if (point.y <= 0 || point.y >= 1) point.vy *= -1;

        // Keep in bounds
        point.x = Math.max(0, Math.min(1, point.x));
        point.y = Math.max(0, Math.min(1, point.y));
      });

      // Render gradient mesh
      for (let x = 0; x < window.innerWidth; x += 2) {
        for (let y = 0; y < window.innerHeight; y += 2) {
          let r = 0, g = 0, b = 0, totalWeight = 0;

          meshPoints.forEach(point => {
            const dx = x / window.innerWidth - point.x;
            const dy = y / window.innerHeight - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const weight = Math.exp(-distance * distance * 8);

            r += point.color.r * weight;
            g += point.color.g * weight;
            b += point.color.b * weight;
            totalWeight += weight;
          });

          if (totalWeight > 0) {
            r /= totalWeight;
            g /= totalWeight;
            b /= totalWeight;
          }

          const idx = (y * window.innerWidth + x) * 4;
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 40; // Low opacity for subtlety
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Add blur effect
      ctx.filter = 'blur(100px)';
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.6,
        pointerEvents: 'none'
      }}
    />
  );
}