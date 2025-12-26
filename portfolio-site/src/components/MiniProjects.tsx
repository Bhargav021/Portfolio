import React from 'react';
import { motion } from 'framer-motion';

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

const MiniProjects: React.FC<Props> = ({ projects }: Props) => {
  const projectColors = ['text-yellow-400', 'text-pink-400', 'text-cyan-400', 'text-orange-400'];
  const borderColors = ['border-yellow-500/30', 'border-pink-500/30', 'border-cyan-500/30', 'border-orange-500/30'];
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((p: MiniProject, i: number) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className={`bg-slate-900/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-2xl transition-all border ${borderColors[i % 4]}`}
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className={`font-bold ${projectColors[i % 4]} text-lg`}>{p.name}</h3>
            <div className="flex items-center gap-2">
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="View GitHub Repository"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              <span className="text-xl">🚀</span>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-white mb-1">Purpose:</p>
              <p className="text-slate-200 leading-relaxed">{p.purpose}</p>
            </div>

            <div>
              <p className="font-semibold text-white mb-1">Outcomes:</p>
              <p className="text-slate-200 leading-relaxed">{p.outcomes}</p>
            </div>

            <div>
              <p className="font-semibold text-white mb-1">Key Lesson:</p>
              <p className="text-slate-200 leading-relaxed italic">{p.lessons}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-700">
            {p.tech.map((t: string) => (
              <span
                key={t}
                className={`text-xs px-2 py-1 rounded-md ${projectColors[i % 4]} bg-white/5 border border-white/20 font-medium`}
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MiniProjects;
