import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Circular progress indicator with click to scroll to top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 hidden md:flex items-center justify-center cursor-pointer bg-slate-900/80 backdrop-blur-sm rounded-full border border-emerald-500/30 hover:border-emerald-400 transition-all group"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 1 }}
        aria-label="Scroll to top"
      >
        <svg className="w-full h-full -rotate-90 absolute inset-0">
          <circle
            cx="28"
            cy="28"
            r="24"
            className="stroke-slate-700"
            strokeWidth="2"
            fill="none"
          />
          <motion.circle
            cx="28"
            cy="28"
            r="24"
            className="stroke-emerald-400"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            style={{
              pathLength: scrollYProgress
            }}
            strokeDasharray="0 1"
          />
        </svg>
        <motion.div 
          className="text-lg font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors z-10"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↑
        </motion.div>
      </motion.button>
    </>
  );
};

export default ScrollProgress;
