import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorFollower: React.FC = () => {
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'click'>('default');
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const trailIdRef = useRef(0);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Add trail effect
      if (Math.random() > 0.7) {
        setTrail(prev => {
          const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailIdRef.current++ }];
          return newTrail.slice(-8);
        });
      }
      
      // Magnetic effect for interactive elements
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"]');
      
      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        
        if (distance < 80) {
          const pullStrength = 0.3;
          cursorX.set(e.clientX + (centerX - e.clientX) * pullStrength);
          cursorY.set(e.clientY + (centerY - e.clientY) * pullStrength);
        }
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea')) {
        setCursorVariant('hover');
      } else {
        setCursorVariant('default');
      }
    };

    const handleMouseDown = () => setCursorVariant('click');
    const handleMouseUp = () => setCursorVariant('default');

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      scale: 1,
      opacity: 1
    },
    hover: {
      scale: 1.5,
      opacity: 0.8
    },
    click: {
      scale: 0.8,
      opacity: 0.6
    }
  };

  return (
    <>
      {/* Trail particles */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="pointer-events-none fixed z-40"
          initial={{ x: point.x - 4, y: point.y - 4, opacity: 1, scale: 1 }}
          animate={{ 
            opacity: 0, 
            scale: 0.5,
            x: point.x - 4,
            y: point.y - 4
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onAnimationComplete={() => {
            setTrail(prev => prev.filter(p => p.id !== point.id));
          }}
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400" />
        </motion.div>
      ))}
      
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed z-50 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
      >
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400" />
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 blur-md animate-pulse" />
        </div>
      </motion.div>
      
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed z-40"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: cursorVariant === 'hover' ? 1.3 : cursorVariant === 'click' ? 0.9 : 1
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        <div className="w-8 h-8 rounded-full border border-emerald-400/40 backdrop-blur-sm" />
      </motion.div>
    </>
  );
};

export default CursorFollower;
