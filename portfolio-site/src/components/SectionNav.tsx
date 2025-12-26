import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const sections = [
  { id: 'hero', label: '👋 Intro' },
  { id: 'about', label: '❤️ My Story' },
  { id: 'education', label: '🎓 Education' },
  { id: 'experience', label: '💼 Experience' },
  { id: 'skills', label: '🚀 Skills' },
  { id: 'projects', label: '💡 Projects' },
  { id: 'certifications', label: '📜 Certifications' },
  { id: 'contact', label: '✉️ Contact' }
];

const SectionNav: React.FC = () => {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpen(false);
    }
  };

  return (
    <div className="fixed top-24 right-6 z-40">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="glass p-3 rounded-full shadow-lg hover:shadow-xl transition"
        aria-label="Toggle navigation menu"
      >
        {open ? (
          <XMarkIcon className="w-6 h-6 text-emerald-400" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-emerald-400" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute top-16 right-0 glass rounded-xl p-4 min-w-[200px] shadow-2xl"
          >
            <p className="text-xs uppercase tracking-wide text-emerald-400 mb-3 font-semibold">Jump to Section</p>
            <nav className="space-y-2">
              {sections.map((section, i) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollToSection(section.id)}
                  className="block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-emerald-400/20 transition text-slate-200"
                >
                  {section.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionNav;
