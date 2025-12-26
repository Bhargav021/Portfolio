import React from 'react';
import { motion } from 'framer-motion';

const ParticleField: React.FC = () => {
  // Static neural network nodes - no animation to avoid distraction
  const nodes = [
    // Layer 1 (left)
    { x: 15, y: 20 }, { x: 15, y: 40 }, { x: 15, y: 60 }, { x: 15, y: 80 },
    // Layer 2 (middle-left)
    { x: 35, y: 15 }, { x: 35, y: 35 }, { x: 35, y: 50 }, { x: 35, y: 65 }, { x: 35, y: 85 },
    // Layer 3 (middle-right)
    { x: 65, y: 15 }, { x: 65, y: 35 }, { x: 65, y: 50 }, { x: 65, y: 65 }, { x: 65, y: 85 },
    // Layer 4 (right)
    { x: 85, y: 20 }, { x: 85, y: 40 }, { x: 85, y: 60 }, { x: 85, y: 80 },
  ];

  // Connections between layers
  const connections = [
    // Layer 1 to Layer 2
    ...nodes.slice(0, 4).flatMap((start, i) => 
      nodes.slice(4, 9).map(end => ({ start, end }))
    ),
    // Layer 2 to Layer 3
    ...nodes.slice(4, 9).flatMap((start, i) => 
      nodes.slice(9, 14).map(end => ({ start, end }))
    ),
    // Layer 3 to Layer 4
    ...nodes.slice(9, 14).flatMap((start, i) => 
      nodes.slice(14, 18).map(end => ({ start, end }))
    ),
  ];

  return (
    <>
      {/* Simple, static neural network pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
        <svg className="w-full h-full opacity-5" preserveAspectRatio="none">
          <defs>
            <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Connection lines */}
          {connections.map((conn, i) => (
            <line
              key={i}
              x1={`${conn.start.x}%`}
              y1={`${conn.start.y}%`}
              x2={`${conn.end.x}%`}
              y2={`${conn.end.y}%`}
              stroke="url(#connectionGrad)"
              strokeWidth="0.5"
              opacity="0.6"
            />
          ))}
          
          {/* Nodes */}
          {nodes.map((node, i) => (
            <circle
              key={i}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="3"
              fill="#10b981"
              opacity="0.4"
            />
          ))}
        </svg>
      </div>
      
      {/* Clean solid background */}
      <div className="fixed inset-0 -z-[9] bg-slate-950 pointer-events-none" aria-hidden />
    </>
  );
};

export default ParticleField;
