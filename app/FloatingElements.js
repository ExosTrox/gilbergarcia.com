'use client';
import { useEffect, useState } from 'react';
import styles from './FloatingElements.module.css';

const shapes = [
  { type: 'sphere', size: 80, color: 'rgba(99, 102, 241, 0.3)', blur: 20 },
  { type: 'cube', size: 60, color: 'rgba(167, 139, 250, 0.3)', blur: 15 },
  { type: 'pyramid', size: 70, color: 'rgba(249, 115, 22, 0.3)', blur: 18 },
  { type: 'torus', size: 90, color: 'rgba(34, 197, 94, 0.3)', blur: 25 },
  { type: 'diamond', size: 50, color: 'rgba(192, 132, 252, 0.3)', blur: 12 },
  { type: 'hexagon', size: 65, color: 'rgba(129, 140, 248, 0.3)', blur: 22 }
];

export default function FloatingElements() {
  const [elements, setElements] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize floating elements with random positions
    const initialElements = shapes.map((shape, index) => ({
      ...shape,
      id: index,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 100,
      rotateX: Math.random() * 360,
      rotateY: Math.random() * 360,
      rotateZ: Math.random() * 360,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      vRotateX: (Math.random() - 0.5) * 2,
      vRotateY: (Math.random() - 0.5) * 2,
      vRotateZ: (Math.random() - 0.5) * 2
    }));
    setElements(initialElements);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(function animate() {
      setElements(prevElements => 
        prevElements.map(el => {
          let newX = el.x + el.vx + mousePosition.x * 0.02;
          let newY = el.y + el.vy + mousePosition.y * 0.02;

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth - el.size) {
            el.vx *= -1;
            newX = el.x + el.vx;
          }
          if (newY <= 0 || newY >= window.innerHeight - el.size) {
            el.vy *= -1;
            newY = el.y + el.vy;
          }

          return {
            ...el,
            x: newX,
            y: newY,
            rotateX: (el.rotateX + el.vRotateX) % 360,
            rotateY: (el.rotateY + el.vRotateY) % 360,
            rotateZ: (el.rotateZ + el.vRotateZ) % 360
          };
        })
      );
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition]);

  const renderShape = (element) => {
    switch (element.type) {
      case 'sphere':
        return (
          <div className={styles.sphere} style={{
            width: element.size,
            height: element.size,
            background: `radial-gradient(circle at 30% 30%, ${element.color}, transparent)`,
            boxShadow: `0 0 ${element.blur}px ${element.color}`
          }} />
        );
      case 'cube':
        return (
          <div className={styles.cube} style={{
            width: element.size,
            height: element.size
          }}>
            <div className={styles.face} style={{ background: element.color }} />
            <div className={styles.face} style={{ background: element.color }} />
            <div className={styles.face} style={{ background: element.color }} />
            <div className={styles.face} style={{ background: element.color }} />
            <div className={styles.face} style={{ background: element.color }} />
            <div className={styles.face} style={{ background: element.color }} />
          </div>
        );
      case 'pyramid':
        return (
          <div className={styles.pyramid} style={{
            width: 0,
            height: 0,
            borderLeft: `${element.size/2}px solid transparent`,
            borderRight: `${element.size/2}px solid transparent`,
            borderBottom: `${element.size}px solid ${element.color}`,
            filter: `blur(${element.blur/10}px)`
          }} />
        );
      case 'torus':
        return (
          <div className={styles.torus} style={{
            width: element.size,
            height: element.size,
            border: `${element.size/4}px solid ${element.color}`,
            borderRadius: '50%',
            filter: `blur(${element.blur/10}px)`
          }} />
        );
      case 'diamond':
        return (
          <div className={styles.diamond} style={{
            width: element.size,
            height: element.size,
            background: element.color,
            filter: `blur(${element.blur/10}px)`
          }} />
        );
      case 'hexagon':
        return (
          <div className={styles.hexagon} style={{
            width: element.size,
            height: element.size * 0.866,
            background: element.color,
            filter: `blur(${element.blur/10}px)`
          }} />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {elements.map((element) => (
        <div
          key={element.id}
          className={styles.floatingElement}
          style={{
            transform: `
              translate3d(${element.x}px, ${element.y}px, ${element.z}px)
              rotateX(${element.rotateX}deg)
              rotateY(${element.rotateY}deg)
              rotateZ(${element.rotateZ}deg)
            `,
            zIndex: Math.floor(element.z)
          }}
        >
          {renderShape(element)}
        </div>
      ))}
    </div>
  );
}