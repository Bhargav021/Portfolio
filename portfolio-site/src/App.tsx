import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { experiences, projects, miniProjects, certifications, education, skills, contact } from './data/resume';
import { AcademicCapIcon, CodeBracketIcon, RocketLaunchIcon, SparklesIcon } from '@heroicons/react/24/outline';
import ParticleField from './components/ParticleField';
import DataGridBackground from './components/DataGridBackground';
import ScrollProgress from './components/ScrollProgress';
import SectionDivider from './components/SectionDivider';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillCloud from './components/SkillCloud';
import ProjectGallery from './components/ProjectGallery';
import MiniProjects from './components/MiniProjects';
import ThemeToggle from './components/ThemeToggle';
import Certifications from './components/Certifications';
import ContactSection from './components/ContactSection';
import SectionNav from './components/SectionNav';
import AboutMe from './components/AboutMe';
import SectionHeader from './components/SectionHeader';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } })
};

export default function App() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.className = 'bg-slate-950 text-slate-100 font-[Inter,system-ui,-apple-system,sans-serif] min-h-screen overflow-x-hidden antialiased';
  }, []);
  
  return (
    <div className="relative">
      {/* Background layers */}
      <ParticleField />
      <DataGridBackground />
      <ScrollProgress />
      
      <SectionNav />
      
      <header className="relative z-10 py-6 px-6 md:px-12 sticky top-0 backdrop-blur-xl bg-slate-950/90 border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl md:text-2xl font-semibold tracking-tight flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <SparklesIcon className="w-6 h-6 text-emerald-400" />
            </motion.div>
            <span className="text-white">
              Bhargav Limbasia
            </span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <span className="text-sm text-slate-300 hidden sm:block">Data Scientist</span>
            <motion.div 
              className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity 
              }}
            />
          </motion.div>
        </div>
      </header>
      <main className="relative z-10 pb-32">
        <section id="hero" className="px-6 md:px-12 min-h-[85vh] flex flex-col justify-center max-w-5xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-8xl font-bold text-white tracking-tight"
              >
                Bhargav Limbasia
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="h-1 w-12 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
                <p className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Applied Data Scientist
                </p>
              </motion.div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl"
            >
              I build ML systems that actually work in production.
              <br />
              <span className="text-base text-slate-400">
                (You'd be surprised how rare that is)
              </span>
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-3 pt-4"
            >
              {[
                { label: 'Healthcare AI', icon: '🏥', color: 'from-rose-400 to-pink-400' },
                { label: 'Deep Learning', icon: '🧠', color: 'from-purple-400 to-indigo-400' },
                { label: 'Robotics', icon: '🤖', color: 'from-blue-400 to-cyan-400' },
                { label: 'MLOps', icon: '⚙️', color: 'from-emerald-400 to-teal-400' }
              ].map((tag, i) => (
                <motion.span 
                  key={tag.label} 
                  initial={{ opacity: 0, scale: 0.8, y: 20 }} 
                  animate={{ opacity: 1, scale: 1, y: 0 }} 
                  transition={{ 
                    delay: 0.9 + i * 0.1, 
                    type: 'spring', 
                    stiffness: 200,
                    damping: 15
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3
                  }}
                  className="group relative px-5 py-2.5 rounded-xl bg-slate-900/80 backdrop-blur text-white text-sm font-medium border border-slate-700 hover:border-slate-600 transition-all cursor-default"
                >
                  <span className="relative flex items-center gap-2">
                    <span className="text-base">{tag.icon}</span>
                    {tag.label}
                  </span>
                </motion.span>
              ))}
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1.3 }}
              className="text-sm text-slate-400 pt-6 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              MS @ USC | Ex-Anvayaa, Neurapses | Currently breaking (and fixing) neural networks
            </motion.p>
          </motion.div>
        </section>

        <SectionDivider variant="gradient" />
        
        <section className="px-6 md:px-12 scroll-mt-24" id="about">
          <AboutMe />
        </section>
        
        <SectionDivider variant="gradient" />
        
        <section className="px-6 md:px-12 scroll-mt-24 max-w-6xl mx-auto" id="education">
          <SectionHeader title="Education" subtitle="The academic credentials (yes, they matter)" />
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((e,i) => {
              const colors = ['text-purple-300', 'text-cyan-300'];
              const borders = ['border-purple-400/40', 'border-cyan-400/40'];
              const glows = ['from-purple-400/10', 'from-cyan-400/10'];
              return (
                <motion.div 
                  key={e.degree} 
                  initial={{ opacity:0, y:30 }} 
                  whileInView={{ opacity:1, y:0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i*0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`group relative bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 transition-all border ${borders[i]} hover:border-opacity-100 overflow-hidden`}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${glows[i]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">
                    <h3 className={`font-bold ${colors[i]} mb-2 text-lg`}>{e.degree}</h3>
                    <p className="text-sm text-white font-medium">{e.institution} • {e.location}</p>
                    <p className="text-xs text-slate-300 mb-3">({e.start} – {e.end})</p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-200">{e.coursework.join(', ')}</p>
                  </div>
                  <div className={`absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 ${borders[i]} rounded-tr-xl opacity-30`} />
                </motion.div>
              );
            })}
          </div>
        </section>
        
        <SectionDivider variant="gradient" />
        <SectionDivider variant="gradient" />
        
        <section className="px-6 md:px-12 scroll-mt-24 max-w-6xl mx-auto" id="skills">
          <SectionHeader title="Technical Skills" subtitle="The tools I use to make computers do my bidding" />
          <SkillCloud skills={skills} />
        </section>
        
        <SectionDivider variant="gradient" />
        
        <section className="px-6 md:px-12 scroll-mt-24 max-w-6xl mx-auto" id="experience">
          <SectionHeader title="Experience" subtitle="Where I learned that 'it works on my machine' is not a solution" />
          <ExperienceTimeline items={experiences} />
        </section>
        
        <SectionDivider variant="gradient" />
        
        <section className="px-6 md:px-12 scroll-mt-24 max-w-6xl mx-auto" id="skills">
          <SectionHeader title="Technical Skills" subtitle="The tools I use to make computers do my bidding" />
          <SkillCloud skills={skills} />
        </section>
        
        <SectionDivider variant="gradient" />
        
        <section className="px-6 md:px-12 scroll-mt-24 max-w-6xl mx-auto" id="projects">
          <SectionHeader title="Featured Projects" subtitle="The ones that actually worked (mostly)" />
          <ProjectGallery projects={projects} />
        </section>
        
        <SectionDivider variant="gradient" />
        
        <section className="px-6 md:px-12 scroll-mt-24 max-w-6xl mx-auto" id="mini-projects">
          <SectionHeader 
            title="Other Projects" 
            subtitle="Quick experiments that taught me things (like: always version your data)" 
          />
          <MiniProjects projects={miniProjects} />
        </section>
        
        <SectionDivider variant="gradient" />
        
        <section className="px-6 md:px-12 scroll-mt-24" id="certifications">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <Certifications list={certifications} />
          </motion.div>
        </section>
        
        <SectionDivider variant="gradient" />
        
        <section className="px-6 md:px-12 scroll-mt-24" id="contact">
          <ContactSection contact={contact} />
        </section>
      </main>
      
      <footer className="relative z-10 px-6 md:px-12 py-16 border-t border-slate-800/50 bg-gradient-to-b from-transparent to-slate-950">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-6 justify-center mb-8"
          >
            {[
              { label: contact.location, href: null, icon: '📍' },
              { label: contact.phone, href: `tel:${contact.phone}`, icon: '📞' },
              { label: contact.email, href: `mailto:${contact.email}`, icon: '✉️' },
              { label: 'LinkedIn', href: contact.linkedin, icon: '💼' },
              { label: 'Handshake', href: contact.handshake, icon: '🤝' },
              { label: 'GitHub', href: contact.github, icon: '💻' },
            ].map((item, i) => (
              <motion.span
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group"
              >
                {item.href ? (
                  <motion.a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </motion.a>
                ) : (
                  <span className="flex items-center gap-2 text-sm text-slate-400">
                    <span>{item.icon}</span>
                    {item.label}
                  </span>
                )}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-emerald-500/50" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <SparklesIcon className="w-5 h-5 text-emerald-400" />
              </motion.div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-emerald-500/50" />
            </div>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Bhargav Limbasia. Built with React, Vite, Tailwind & Framer Motion. 🚀
            </p>
            <motion.p 
              className="text-xs text-slate-600 mt-2"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Designed for humans, powered by data
            </motion.p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
