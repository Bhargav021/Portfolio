import React, { useState } from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import CertificateModal from './CertificateModal';
import { CertificationItem } from '../data/resume';

interface Props { 
  list: CertificationItem[] 
}

const Certifications: React.FC<Props> = ({ list }: Props) => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const certColors = [
    'bg-yellow-500/20 text-yellow-300 border-yellow-500/40', 
    'bg-purple-500/20 text-purple-300 border-purple-500/40', 
    'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
  ];
  
  const handleCertClick = (cert: CertificationItem) => {
    if (cert.imageUrl || cert.credentialUrl) {
      setSelectedCert(cert);
    }
  };
  
  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3 mb-8">
        <AcademicCapIcon className="w-8 h-8 text-yellow-400" />
        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Certifications</span>
      </h2>
      <ul className="grid md:grid-cols-3 gap-6">
        {list.map((cert: CertificationItem, i: number) => {
          const hasPreview = cert.imageUrl || cert.credentialUrl;
          return (
            <motion.li 
              key={cert.name} 
              initial={{ opacity:0, scale:0.9 }} 
              whileInView={{ opacity:1, scale:1 }} 
              viewport={{ once:true }} 
              transition={{ delay: i*0.05 }}
              whileHover={{ scale: hasPreview ? 1.05 : 1.02 }}
              onClick={() => handleCertClick(cert)}
              className={`p-5 rounded-xl text-sm font-medium shadow-md hover:shadow-xl transition-all border ${certColors[i % 3]} ${
                hasPreview ? 'cursor-pointer' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <span className="inline-block mr-2 text-lg">🏆</span>
                  {cert.name}
                  {cert.issuer && (
                    <div className="text-xs opacity-75 mt-1">{cert.issuer}</div>
                  )}
                </div>
                {hasPreview && (
                  <svg className="w-5 h-5 flex-shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </div>
            </motion.li>
          );
        })}
      </ul>
      
      <CertificateModal
        isOpen={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
        certificateName={selectedCert?.name || ''}
        imageUrl={selectedCert?.imageUrl}
        credentialUrl={selectedCert?.credentialUrl}
      />
    </section>
  );
};

export default Certifications;
