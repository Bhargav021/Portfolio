import React from 'react';
import { motion } from 'framer-motion';

interface SkillCategory {
  label: string;
  description: string;
  technologies: string[];
}

interface SkillMap { 
  [category: string]: SkillCategory;
}

interface Props { skills: SkillMap }

const SkillCloud: React.FC<Props> = ({ skills }: Props) => {
  const entries = Object.entries(skills);
  const categoryColors = ['text-pink-400', 'text-cyan-400', 'text-yellow-400', 'text-orange-400'];
  const categoryBorders = ['border-pink-500/30', 'border-cyan-500/30', 'border-yellow-500/30', 'border-orange-500/30'];
  const tagColors = [
    ['bg-pink-500/20', 'text-pink-300', 'border-pink-500/40'],
    ['bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40'],
    ['bg-yellow-500/20', 'text-yellow-300', 'border-yellow-500/40'],
    ['bg-orange-500/20', 'text-orange-300', 'border-orange-500/40']
  ];
  
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {entries.map(([cat, data]: [string, SkillCategory], i: number) => (
        <motion.div 
          key={cat} 
          initial={{ opacity:0, y:20 }} 
          whileInView={{ opacity:1, y:0 }} 
          viewport={{ once:true }} 
          transition={{ delay: i*0.1 }}
          whileHover={{ scale:1.02 }}
          className={`bg-slate-900/80 backdrop-blur-sm p-6 rounded-xl hover:shadow-2xl transition-all border ${categoryBorders[i]}`}
        >
          <h3 className={`font-bold mb-2 ${categoryColors[i]} text-lg flex items-center gap-2`}>
            <span className="text-2xl">
              {i===0 ? '🧠' : i===1 ? '👁️' : i===2 ? '🗄️' : '🛠️'}
            </span>
            {data.label}
          </h3>
          <p className="text-sm text-slate-200 mb-4 leading-relaxed">
            {data.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {data.technologies.map((s: string) => (
              <motion.span 
                key={s} 
                whileHover={{ scale:1.1, y:-2 }}
                className={`px-3 py-1.5 text-xs rounded-lg ${tagColors[i][0]} ${tagColors[i][1]} border ${tagColors[i][2]} font-medium transition-all shadow-sm hover:shadow-md`}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
export default SkillCloud;
