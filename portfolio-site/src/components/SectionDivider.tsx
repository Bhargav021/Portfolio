import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'gradient' | 'data' | 'wave' | 'pulse';
}

const SectionDivider: React.FC<SectionDividerProps> = ({ variant = 'gradient' }) => {
  if (variant === 'gradient') {
    return (
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent my-24 origin-center"
      />
    );
  }
  
  if (variant === 'data') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="my-24 flex items-center justify-center gap-2"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0.2 }}
            whileInView={{ scaleY: Math.random() * 0.8 + 0.2 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: i * 0.05,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 2
            }}
            className="w-1 bg-gradient-to-t from-emerald-500/30 to-cyan-500/30 origin-bottom"
            style={{ 
              height: `${20 + Math.random() * 20}px`
            }}
          />
        ))}
      </motion.div>
    );
  }
  
  if (variant === 'wave') {
    return (
      <div className="my-24 overflow-hidden">
        <svg viewBox="0 0 1200 60" className="w-full h-8">
          <motion.path
            d="M0,30 Q150,10 300,30 T600,30 T900,30 T1200,30"
            stroke="url(#waveGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0" />
              <stop offset="50%" stopColor="rgb(16, 185, 129)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="rgb(6, 182, 212)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }
  
  if (variant === 'pulse') {
    return (
      <motion.div 
        className="my-24 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="h-px w-64 bg-gradient-to-r from-emerald-500/50 via-cyan-500/50 to-transparent" />
          <motion.div 
            className="w-2 h-2 rounded-full bg-cyan-400"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <div className="h-px w-64 bg-gradient-to-r from-transparent via-emerald-500/50 to-cyan-500/50" />
          <motion.div 
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
      </motion.div>
    );
  }
  
  return null;
};

export default SectionDivider;
