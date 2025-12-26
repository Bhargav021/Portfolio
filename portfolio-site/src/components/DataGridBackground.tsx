import React from 'react';

const DataGridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-[8] overflow-hidden pointer-events-none">
      {/* Subtle grid - no animation */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Corner accents - static */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-emerald-500/10" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-cyan-500/10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-emerald-500/10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-cyan-500/10" />
    </div>
  );
};

export default DataGridBackground;
