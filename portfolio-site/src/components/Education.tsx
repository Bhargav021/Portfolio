import React from 'react';
import { motion } from 'framer-motion';

interface EducationItem {
  degree: string;
  school: string;
  year: string;
  location: string;
  gpa?: string;
  honors?: string;
}

interface Props {
  education: EducationItem[];
}

const Education: React.FC<Props> = ({ education }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {education.map((edu, index) => (
        <motion.div
          key={edu.degree}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="relative group"
        >
          {/* Card */}
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-emerald-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-400/10">
            {/* Year Badge */}
            <div className="inline-block mb-4">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">
                {edu.year}
              </span>
            </div>

            {/* Degree */}
            <h3 className="text-2xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors">
              {edu.degree}
            </h3>

            {/* School */}
            <p className="text-lg text-slate-300 mb-3 font-light">
              {edu.school}
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{edu.location}</span>
            </div>

            {/* Additional Info */}
            <div className="space-y-2">
              {edu.gpa && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500">GPA:</span>
                  <span className="text-white font-semibold">{edu.gpa}</span>
                </div>
              )}
              {edu.honors && (
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-emerald-400 mt-0.5">🏆</span>
                  <span className="text-slate-200">{edu.honors}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Education;
