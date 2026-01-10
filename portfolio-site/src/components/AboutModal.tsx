import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<Props> = ({ isOpen, onClose }) => {
  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDownloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/Bhargav_Limbasia_Resume.pdf';
    link.download = 'Bhargav_Limbasia_Resume.pdf';
    link.target = '_blank'; // Add target blank as fallback
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100]"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] overflow-y-auto"
          >
            <div className="min-h-screen px-6 md:px-12 py-20">
              <div className="max-w-4xl mx-auto">
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={onClose}
                  className="fixed top-8 right-8 w-12 h-12 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 flex items-center justify-center transition-colors group"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-16"
                >
                  <h1 className="text-6xl md:text-8xl font-black text-white mb-6">
                    Professional Profile
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                    I am a Machine Learning Engineer and Researcher based in Los Angeles, focused on building 
                    production-grade AI systems for healthcare and robotics. With a passion for solving real-world 
                    problems, I help organizations transform data into intelligent solutions that ship.
                  </p>
                </motion.div>

                {/* Professional Journey */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-16 space-y-12"
                >
                  {/* Current Focus */}
                  <div>
                    <h2 className="text-3xl font-black text-white mb-4">Current Focus</h2>
                    <div className="space-y-4 text-slate-200 leading-relaxed">
                      <p>
                        Currently pursuing my <strong className="text-white">Master's in Applied Data Science at USC</strong>, 
                        where I serve as a Graduate Research Assistant working on cutting-edge pediatric brain tumor 
                        segmentation for the BraTS-PEDs 2025 challenge.
                      </p>
                      <p>
                        My research involves developing advanced 3D medical image segmentation models using nnU-Net 
                        and transformer architectures, pushing the boundaries of AI in healthcare diagnostics.
                      </p>
                    </div>
                  </div>

                  {/* Experience Highlights */}
                  <div>
                    <h2 className="text-3xl font-black text-white mb-4">Experience Highlights</h2>
                    <div className="space-y-6">
                      <div className="border-l-2 border-emerald-400 pl-6">
                        <h3 className="text-xl font-bold text-emerald-400 mb-2">Healthcare AI Research</h3>
                        <p className="text-slate-200 leading-relaxed">
                          Led development of Lumina Health's AI diagnostic system, achieving 95% accuracy on retinal 
                          disease classification. Optimized models for edge deployment, reducing inference time by 40% 
                          while maintaining clinical-grade performance.
                        </p>
                      </div>

                      <div className="border-l-2 border-cyan-400 pl-6">
                        <h3 className="text-xl font-bold text-cyan-400 mb-2">Embodied AI & Robotics</h3>
                        <p className="text-slate-200 leading-relaxed">
                          Pioneered bimanual robotic manipulation research, converting PerAct² demonstrations to 
                          vision-language prompts and implementing advanced tactile sensing for surgical robotics. 
                          Published research on human-robot collaboration frameworks.
                        </p>
                      </div>

                      <div className="border-l-2 border-purple-400 pl-6">
                        <h3 className="text-xl font-bold text-purple-400 mb-2">Production ML Systems</h3>
                        <p className="text-slate-200 leading-relaxed">
                          Built end-to-end ML pipelines for real-world applications, from data preprocessing to 
                          model deployment. Experienced in MLOps, Docker containerization, and cloud infrastructure 
                          (AWS, Azure, GCP).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Technical Philosophy */}
                  <div>
                    <h2 className="text-3xl font-black text-white mb-4">Technical Philosophy</h2>
                    <div className="space-y-4 text-slate-200 leading-relaxed">
                      <p>
                        I believe in <strong className="text-white">building AI systems that ship</strong>. Not just 
                        prototypes that achieve high accuracy in notebooks, but production-ready solutions that solve 
                        real problems for real users.
                      </p>
                      <p>
                        My approach combines rigorous research methodology with pragmatic engineering practices. I'm 
                        equally comfortable reading the latest papers on arXiv as I am optimizing Docker containers 
                        for deployment.
                      </p>
                    </div>
                  </div>

                  {/* Skills & Expertise */}
                  <div>
                    <h2 className="text-3xl font-black text-white mb-4">Skills & Expertise</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-bold text-emerald-400 mb-3">Machine Learning</h3>
                        <ul className="space-y-2 text-slate-200">
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-400 mt-1">•</span>
                            <span>Deep Learning (CNNs, Transformers, GANs)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-400 mt-1">•</span>
                            <span>Computer Vision & Medical Imaging</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-400 mt-1">•</span>
                            <span>Reinforcement Learning & Robotics</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-400 mt-1">•</span>
                            <span>LLMs & Vision-Language Models</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-cyan-400 mb-3">Engineering</h3>
                        <ul className="space-y-2 text-slate-200">
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            <span>Python (PyTorch, TensorFlow, JAX)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            <span>MLOps & Model Deployment</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            <span>Cloud Platforms (AWS, Azure, GCP)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            <span>Docker, Kubernetes, CI/CD</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Personal Interests */}
                  <div>
                    <h2 className="text-3xl font-black text-white mb-4">Beyond Work</h2>
                    <div className="space-y-4 text-slate-200 leading-relaxed">
                      <p>
                        When I'm not building ML systems, you'll find me exploring the latest research papers, 
                        contributing to open-source projects, or experimenting with new frameworks and tools.
                      </p>
                      <p>
                        I'm passionate about making AI research accessible and reproducible. I believe in sharing 
                        knowledge through technical writing, open-source contributions, and mentoring aspiring ML 
                        engineers.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-12 p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Name</h3>
                      <p className="text-white text-lg">Bhargav Limbasia</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Role</h3>
                      <p className="text-white text-lg">Data Scientist & Researcher</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Location</h3>
                      <p className="text-white text-lg">Los Angeles, CA</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Email</h3>
                      <p className="text-emerald-400 text-lg">blimbasi@usc.edu</p>
                    </div>
                  </div>
                </motion.div>

                {/* Download Resume Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-center"
                >
                  <button
                    onClick={handleDownloadResume}
                    className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-emerald-400 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:shadow-emerald-400/20"
                  >
                    <span>DOWNLOAD RESUME</span>
                    <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </motion.div>

                {/* Close hint */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center text-slate-500 text-sm mt-12"
                >
                  Press <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Esc</kbd> or click outside to close
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AboutModal;
