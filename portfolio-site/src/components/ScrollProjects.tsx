import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface MiniProject {
  name: string;
  purpose: string;
  tech: string[];
  outcomes: string;
  lessons: string;
  github?: string;
}

interface Props {
  projects: MiniProject[];
}

const ScrollProjects: React.FC<Props> = ({ projects }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Map scroll progress to project index
      const newIndex = Math.min(
        Math.floor(latest * projects.length),
        projects.length - 1
      );
      setActiveIndex(Math.max(0, newIndex));
    });

    return () => unsubscribe();
  }, [scrollYProgress, projects.length]);

  return (
    <div 
      ref={containerRef} 
      className="relative"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {projects.map((project, index) => {
          const isActive = index === activeIndex;
          const isPrev = index < activeIndex;

          const handleClick = () => {
            if (project.github) {
              window.open(project.github, '_blank', 'noopener,noreferrer');
            }
          };

          return (
            <motion.div
              key={project.name}
              data-cursor="project"
              onClick={handleClick}
              initial={{ opacity: 0 }}
              animate={{
                opacity: isActive ? 1 : 0,
                y: isPrev ? -100 : 0,
                scale: isActive ? 1 : 0.95,
              }}
              transition={{
                opacity: { duration: 0.6, ease: 'easeInOut' },
                y: { duration: 0.5, ease: 'easeOut' },
                scale: { duration: 0.5, ease: 'easeOut' },
              }}
              className={`absolute inset-0 flex items-center justify-center px-6 md:px-12 ${project.github ? 'cursor-pointer' : ''}`}
            >
              <div className="max-w-5xl w-full bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 md:p-12">
                {/* Project Number */}
                <div className="text-emerald-400 text-sm font-mono mb-4">
                  {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </div>

                {/* Project Name */}
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-4xl md:text-5xl font-black text-white">
                    {project.name}
                  </h3>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors ml-4"
                      aria-label="View GitHub Repository"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                </div>

                {/* Grid Layout for Content */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-bold text-emerald-400 uppercase tracking-wide mb-2">
                        Purpose
                      </p>
                      <p className="text-slate-200 leading-relaxed">
                        {project.purpose}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-emerald-400 uppercase tracking-wide mb-2">
                        Outcomes
                      </p>
                      <p className="text-slate-200 leading-relaxed">
                        {project.outcomes}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-bold text-cyan-400 uppercase tracking-wide mb-2">
                        Key Lesson
                      </p>
                      <p className="text-slate-200 leading-relaxed italic">
                        {project.lessons}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3">
                        Tech Stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 text-slate-200 font-mono border border-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scroll Indicator */}
                <div className="mt-8 pt-6 border-t border-slate-700/50 flex items-center justify-center gap-2">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">
                    Scroll to explore more
                  </span>
                  <svg className="w-4 h-4 text-slate-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Progress Indicator */}
        <div className="absolute bottom-12 right-12 flex flex-col gap-2">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-8 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-emerald-400'
                  : index < activeIndex
                  ? 'bg-slate-600'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollProjects;
