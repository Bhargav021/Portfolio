import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';

interface ContactInfo {
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  handshake: string;
  github: string;
}
interface Props { contact: ContactInfo }

const ContactSection: React.FC<Props> = ({ contact }: Props) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">
            Let's Talk
          </h2>
          <p className="text-lg text-slate-400 mb-6 leading-relaxed">
            Open to full-time roles, research collaborations, or just chatting about ML.
            <br />
            <span className="text-sm">(Bonus points if you bring coffee)</span>
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg dark:bg-slate-900 bg-slate-100 text-sm text-emerald-400 font-medium border dark:border-slate-800 border-slate-200">
            <span>📍</span>
            <span>{contact.location}</span>
          </div>
        </motion.div>
      </div>
      
      <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="grid md:grid-cols-3 gap-6">
        <a 
          href={`mailto:${contact.email}`}
          className="glass p-6 rounded-lg hover:shadow-lg transition-all text-center group"
        >
          <span className="text-3xl block mb-2">✉️</span>
          <p className="text-sm font-medium text-slate-50 mb-1">Email</p>
          <p className="text-xs text-slate-400 group-hover:text-emerald-400 transition">{contact.email}</p>
        </a>

        <a 
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className="glass p-6 rounded-lg hover:shadow-lg transition-all text-center group"
        >
          <span className="text-3xl block mb-2">💼</span>
          <p className="text-sm font-medium text-slate-50 mb-1">LinkedIn</p>
          <p className="text-xs text-slate-400 group-hover:text-emerald-400 transition">Let's connect</p>
        </a>

        <a 
          href={contact.github}
          target="_blank"
          rel="noreferrer"
          className="glass p-6 rounded-lg hover:shadow-lg transition-all text-center group"
        >
          <span className="text-3xl block mb-2">💻</span>
          <p className="text-sm font-medium text-slate-50 mb-1">GitHub</p>
          <p className="text-xs text-slate-400 group-hover:text-emerald-400 transition">Check my code</p>
        </a>
      </motion.div>
    </div>
  );
};
export default ContactSection;
