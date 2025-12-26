import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedDataIconProps {
  size?: number;
  className?: string;
}

const AnimatedDataIcon: React.FC<AnimatedDataIconProps> = ({ size = 40, className = '' }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Outer ring */}
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="url(#grad1)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      {/* Inner hexagon */}
      <motion.path
        d="M 50 20 L 70 35 L 70 65 L 50 80 L 30 65 L 30 35 Z"
        fill="none"
        stroke="url(#grad2)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      
      {/* Data nodes */}
      {[
        { cx: 50, cy: 20 },
        { cx: 70, cy: 35 },
        { cx: 70, cy: 65 },
        { cx: 50, cy: 80 },
        { cx: 30, cy: 65 },
        { cx: 30, cy: 35 },
      ].map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r="3"
          fill="#10b981"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ 
            duration: 0.5, 
            delay: 1 + i * 0.1,
            repeat: Infinity,
            repeatDelay: 3
          }}
        />
      ))}
      
      {/* Center core */}
      <motion.circle
        cx="50"
        cy="50"
        r="8"
        fill="url(#grad3)"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.1, 1] }}
        transition={{ duration: 0.8, delay: 1.5 }}
      />
      
      {/* Connecting lines */}
      {[
        { x1: 50, y1: 20, x2: 50, y2: 42 },
        { x1: 70, y1: 35, x2: 58, y2: 50 },
        { x1: 70, y1: 65, x2: 58, y2: 50 },
        { x1: 50, y1: 80, x2: 50, y2: 58 },
        { x1: 30, y1: 65, x2: 42, y2: 50 },
        { x1: 30, y1: 35, x2: 42, y2: 50 },
      ].map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="#06b6d4"
          strokeWidth="1"
          opacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1.8 + i * 0.05 }}
        />
      ))}
      
      {/* Gradients */}
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="grad3">
          <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
};

export default AnimatedDataIcon;
