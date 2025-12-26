import React from 'react';
import { ExperienceItem } from '../data/resume';
import { motion } from 'framer-motion';

interface Props { items: ExperienceItem[] }

const ExperienceTimeline: React.FC<Props> = ({ items }: Props) => {
  const accentColors = ['text-cyan-400', 'text-orange-400'];
  const dotColors = ['bg-cyan-400', 'bg-orange-400'];
  const borderColors = ['border-cyan-500/30', 'border-orange-500/30'];
  
  return (
    <div className="space-y-12 relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-orange-500 to-transparent" />
      {items.map((item: ExperienceItem, idx: number) => (
        <motion.div
          key={item.company + idx}
          initial={{ opacity:0, x:-30 }}
          whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.6, delay: idx*0.05 }}
          whileHover={{ x: 5 }}
          className={`relative pl-12 bg-slate-900/80 backdrop-blur-sm rounded-xl py-6 px-6 hover:shadow-2xl transition-all border ${borderColors[idx % 2]} hover:border-opacity-100`}
        >
          <div className={`absolute left-2 top-8 w-5 h-5 rounded-full ${dotColors[idx % 2]} shadow-lg animate-pulse ring-4 ring-white/10`} />
          <h3 className={`font-bold ${accentColors[idx % 2]} text-lg`}>{item.role}</h3>
          <p className="text-base text-white font-medium mt-1">{item.company}</p>
          <p className="text-xs mt-1 text-slate-300">{item.location} | {item.start} – {item.end}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-100 list-disc list-outside pl-5">
            {item.bullets.map((b: string) => <li key={b}>{b}</li>)}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};
export default ExperienceTimeline;
