import React from 'react';
import { motion } from 'framer-motion';

interface Props { dark: boolean; setDark: (d: boolean) => void }

const ThemeToggle: React.FC<Props> = ({ dark, setDark }: Props) => {
  return (
    <motion.button whileTap={{ scale: .9 }} aria-label="Toggle color theme" onClick={() => setDark(!dark)} className="rounded-full border border-white/10 px-4 py-2 text-sm flex items-center gap-2 bg-black/30 backdrop-blur hover:border-accent/60 transition">
      <span className="text-emerald-400 font-medium">{dark ? 'Dark' : 'Light'}</span>
      <div className="relative w-7 h-4 bg-slate-700 rounded-full">
        <motion.span layout className="absolute top-0 left-0 h-4 w-4 rounded-full bg-emerald-400" style={{ x: dark ? 0 : 12 }} />
      </div>
    </motion.button>
  );
};
export default ThemeToggle;
