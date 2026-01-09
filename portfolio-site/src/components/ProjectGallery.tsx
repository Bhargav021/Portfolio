import React, { useState } from 'react';
import { ProjectItem } from '../data/resume';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface Props { projects: ProjectItem[] }

const ProjectCard: React.FC<{ project: ProjectItem; index: number }> = ({ project: p, index: i }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    if (p.github) {
      window.open(p.github, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      data-cursor="project"
      onClick={handleClick}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay: i * 0.1, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative bg-slate-900/95 backdrop-blur-xl p-6 md:p-8 rounded-2xl transition-all border border-slate-700/50 hover:border-emerald-400/50 overflow-hidden ${p.github ? 'cursor-pointer' : ''}`}
    >
      {/* Glow effect on hover only */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <motion.h3 
              className="font-bold text-white text-xl md:text-2xl mb-2 flex items-center gap-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-emerald-400 text-sm">▸</span>
              {p.name}
            </motion.h3>
            {p.tagline && (
              <motion.p 
                className="text-sm text-slate-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {p.tagline}
              </motion.p>
            )}
            {p.highlight && (
              <motion.span 
                className="inline-block mt-2 text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 text-emerald-400 font-medium border border-emerald-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                ✨ {p.highlight}
              </motion.span>
            )}
          </div>
          {p.github && (
            <motion.a 
              href={p.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-emerald-400 hover:text-emerald-300 bg-emerald-400/5 hover:bg-emerald-400/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            </motion.a>
          )}
        </div>

        {/* Quick Summary */}
        {p.context && (
          <motion.p 
            className="text-sm text-slate-200 leading-relaxed mb-4 pb-4 border-b border-slate-700/50"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {p.context}
          </motion.p>
        )}

        {/* Key Details */}
        <div className="space-y-3 mb-4">
          {p.impact && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">📊</span>
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Impact</span>
                  <p className="text-sm text-slate-200 mt-1">{p.impact}</p>
                </div>
              </div>
            </motion.div>
          )}
          {p.learning && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">💡</span>
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">Key Learning</span>
                  <p className="text-sm text-slate-200 mt-1">{p.learning}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Tech Stack */}
        {p.tech && (
          <motion.div 
            className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            {p.tech.map((t: string, idx: number) => (
              <motion.span 
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + idx * 0.05 }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -3,
                  backgroundColor: 'rgba(16, 185, 129, 0.1)'
                }}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 text-slate-200 font-mono border border-slate-700 hover:border-emerald-400/50 hover:text-white transition-colors cursor-default backdrop-blur-sm"
              >
                {t}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-emerald-400/10 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-cyan-400/10 rounded-bl-2xl" />
    </motion.div>
  );
};

const ProjectGallery: React.FC<Props> = ({ projects }: Props) => {
  return (
    <div className="space-y-8">
      {projects.map((project, index) => (
        <ProjectCard key={project.name} project={project} index={index} />
      ))}
    </div>
  );
};

export default ProjectGallery;
