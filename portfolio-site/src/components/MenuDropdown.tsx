import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuSection {
  id: string;
  label: string;
  icon: string;
}

const sections: MenuSection[] = [
  { id: 'hero', label: 'Home', icon: '🏠' },
  { id: 'projects', label: 'Featured Projects', icon: '⭐' },
  { id: 'about', label: 'About Me', icon: '👤' },
  { id: 'other-projects', label: 'Other Work', icon: '💼' },
  { id: 'contact', label: 'Contact', icon: '📬' },
];

const MenuDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2 group"
        aria-label="Toggle menu"
      >
        <span className="text-sm font-medium">Menu</span>
        <motion.svg
          className="w-5 h-5"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute top-12 right-0 w-72 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden z-50"
            >
              <div className="p-4">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4 px-4">
                  Navigation
                </div>
                
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(section.id)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-emerald-400/10 transition-all group flex items-center gap-3"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {section.icon}
                    </span>
                    <span className="text-white group-hover:text-emerald-400 transition-colors font-medium">
                      {section.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-slate-700/50 p-4">
                <div className="text-xs text-slate-500 text-center">
                  Press <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Esc</kbd> to close
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuDropdown;
