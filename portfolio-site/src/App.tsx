import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { experiences, projects, miniProjects, certifications, education, skills, contact } from './data/resume';
import ScrollProgress from './components/ScrollProgress';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillCloud from './components/SkillCloud';
import ProjectGallery from './components/ProjectGallery';
import ScrollProjects from './components/ScrollProjects';
import Certifications from './components/Certifications';
import ContactSection from './components/ContactSection';
import AboutMe from './components/AboutMe';
import SectionHeader from './components/SectionHeader';
import CustomCursor from './components/CustomCursor';
import Education from './components/Education';
import MenuDropdown from './components/MenuDropdown';
import AboutModal from './components/AboutModal';
import ContactForm from './components/ContactForm';
import SectionTransition from './components/SectionTransition';

export default function App() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.className = 'bg-black text-slate-100 font-[Inter,system-ui,-apple-system,sans-serif] min-h-screen overflow-x-hidden antialiased';
  }, []);
  
  return (
    <div className="relative">
      <CustomCursor />
      <ScrollProgress />
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />
      <ContactForm isOpen={contactFormOpen} onClose={() => setContactFormOpen(false)} email={contact.email} />
      
      {/* Simplified Header */}
      <header className="relative z-20 h-16 px-6 md:px-12 sticky top-0 backdrop-blur-xl bg-black/80 border-b border-slate-800/30">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setAboutModalOpen(true)}
              className="text-xl font-black tracking-tight text-white hover:text-emerald-400 transition-colors"
              aria-label="Open About"
            >
              BL
            </button>
            <button
              onClick={() => setAboutModalOpen(true)}
              className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors"
            >
              About Me
            </button>
          </div>
          <MenuDropdown />
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section - Full Screen with Background Image */}
        <section id="hero" className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 -z-10">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: 'url(/sunrise-bg.jpg)',
                filter: 'brightness(1.3) contrast(1.1)'
              }}
            />
            {/* Lighter overlay for better image visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12 relative z-10 px-6 md:px-12 text-center w-full max-w-7xl mx-auto"
          >
            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none group cursor-pointer"
                onClick={() => setAboutModalOpen(true)}
              >
                <span className="text-white group-hover:text-emerald-400 transition-colors drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                  Bhargav
                </span>
                <br />
                <span className="text-white group-hover:text-emerald-400 transition-colors drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                  Limbasia
                </span>
              </motion.h1>
              
              {/* Current Title/Position */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-2"
              >
                {/* <p className="text-lg sm:text-xl md:text-2xl text-emerald-400 font-semibold drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                  AI/ML Engineer & Researcher
                </p> */}
                <p className="text-base sm:text-lg md:text-xl text-slate-200 font-light drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
                  Graduate Student at USC • Aspiring AI / ML Engineer & Researcher
                </p>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl sm:text-2xl md:text-3xl text-white font-light italic drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] max-w-3xl mx-auto"
              >
                "Building production-ready machine learning systems through research and projects."
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a 
                href="#projects"
                className="inline-flex items-center gap-2 text-white hover:text-emerald-400 transition-colors text-sm sm:text-base drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              >
                <span>View Work</span>
                <span className="text-lg">↓</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>
        
        {/* Projects Section with Transition */}
        <SectionTransition id="projects" className="px-6 md:px-12 max-w-7xl mx-auto py-24">
          <SectionHeader title="Featured Work" subtitle="Projects that made it to production" />
          <ProjectGallery projects={projects} />
        </SectionTransition>
        
        {/* About Section with Transition */}
        <SectionTransition id="about" className="px-6 md:px-12 max-w-7xl mx-auto py-24">
          <AboutMe />
          
          {/* Education - Creative Design */}
          <div className="mt-24">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-12">Education</h3>
            <Education education={[
              {
                degree: 'M.S. Applied Data Science',
                school: 'University of Southern California',
                year: '2025 - 2026',
                location: 'Los Angeles, CA',
                gpa: '4.0',
                honors: 'Graduate Research Assistant'
              },
              {
                degree: 'B.Tech Computer Science & Engineering',
                school: 'Pandit Deendayal Energy University',
                year: '2020 - 2024',
                location: 'Gujarat, India',
                gpa: '3.8',
                honors: 'Dean\'s List, Research Publications'
              }
            ]} />
          </div>
        </SectionTransition>
        
        {/* Other Projects - Scroll-based overlay */}
        <section className="scroll-mt-24 py-24" id="other-projects">
          <div className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
            <SectionHeader 
              title="Other Work" 
              subtitle="Experiments, side projects, and research prototypes" 
            />
          </div>
          <ScrollProjects projects={miniProjects} />
        </section>
        
        {/* Contact Section with Transition */}
        <SectionTransition id="contact" className="px-6 md:px-12 py-32">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-black text-white mb-12">
              Let's Connect
            </h2>
            <button
              onClick={() => setContactFormOpen(true)}
              className="text-3xl md:text-5xl text-emerald-400 hover:text-emerald-300 transition-colors font-light cursor-pointer"
            >
              {contact.email}
            </button>
            
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-400">
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                LinkedIn →
              </a>
              <a href={contact.github} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                GitHub →
              </a>
              <a href={contact.githubAlt} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                GitHub Alt →
              </a>
              <a href={contact.handshake} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                Handshake →
              </a>
              <a href={contact.twitter} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                Twitter/X →
              </a>
              <a href={`tel:${contact.phone}`} className="hover:text-emerald-400 transition-colors">
                {contact.phone}
              </a>
              <span className="text-slate-500">{contact.location}</span>
            </div>
          </div>
        </SectionTransition>
      </main>
      
      {/* Footer - Simplified */}
      <footer className="relative z-10 px-6 md:px-12 py-16 border-t border-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Bhargav Limbasia</p>
            <p>Built with React + Vite</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
