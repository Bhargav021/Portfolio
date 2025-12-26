import { motion } from 'framer-motion';

export default function AboutMe() {
  const journey = [
    { year: '2020', event: 'Started B.Tech', emoji: '🎓', detail: 'Where I learned that "bug-free code" is a myth' },
    { year: '2023', event: 'Built production apps', emoji: '🚀', detail: '300+ users, 4.5★ rating (the other 0.5★ still haunts me)' },
    { year: '2024', event: 'Graduated & Joined USC', emoji: '🎯', detail: 'Because one degree wasn\'t enough stress' },
    { year: '2025', event: 'Research & Projects', emoji: '🧠', detail: 'Teaching computers to see tumors (they\'re getting good at it)' }
  ];

  const principles = [
    { title: 'Ship > Perfect', desc: 'A model in production beats a perfect model in a notebook' },
    { title: 'Data > Architecture', desc: 'Clean data with a simple model wins every time' },
    { title: 'Impact > Metrics', desc: '96% accuracy means nothing if it doesn\'t help anyone' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Quick Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-slate-50">
          The TL;DR
        </h2>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          I turn messy data into working systems. Started with backend dev, fell in love with ML, 
          now obsessed with making models that actually work <span className="italic">(shocking, I know)</span>.
        </p>
      </motion.div>

      {/* Journey Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="relative"
      >
        <h3 className="text-2xl font-bold mb-8 text-slate-50">The Journey So Far</h3>
        <div className="space-y-6">
          {journey.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-6 items-start group"
            >
              <div className="flex-shrink-0 w-20 text-right">
                <span className="text-sm font-mono text-emerald-400 font-bold">{item.year}</span>
              </div>
              <div className="flex-shrink-0 text-3xl">{item.emoji}</div>
              <div className="flex-1 pb-6 border-l-2 border-slate-800 pl-6 -ml-4 group-last:border-transparent">
                <h4 className="font-semibold text-slate-50 mb-1">{item.event}</h4>
                <p className="text-sm text-slate-400">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Core Principles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <h3 className="text-2xl font-bold text-slate-50">What I Believe In</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((p, i) => {
            const colors = ['from-cyan-400 to-emerald-400', 'from-orange-400 to-pink-400', 'from-yellow-400 to-orange-400'];
            const textColors = ['text-cyan-400', 'text-orange-400', 'text-yellow-400'];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-lg hover:shadow-2xl transition-all border border-slate-700/50"
              >
                <h4 className={`text-lg font-bold ${textColors[i]} mb-2`}>{p.title}</h4>
                <p className="text-sm text-slate-200 leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Current Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center rounded-xl border border-slate-800/50"
      >
        <p className="text-base text-slate-300 leading-relaxed">
          Currently at <span className="font-semibold text-emerald-400">USC</span> for my MS in Applied Data Science, 
          working on bimanual robotics and brain tumor segmentation research, and looking for roles where I can 
          <span className="font-semibold"> build ML systems that people actually use</span>. 
          <br /><br />
          <span className="text-sm text-slate-400 italic">
            {/* (Preferably systems that don't break at 2 AM) */}
          </span>
        </p>
      </motion.div>
    </div>
  );
}
