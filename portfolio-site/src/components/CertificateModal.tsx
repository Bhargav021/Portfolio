import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificateName: string;
  imageUrl?: string;
  credentialUrl?: string;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificateName,
  imageUrl,
  credentialUrl
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-700">
                <h3 className="text-lg md:text-xl font-bold text-white pr-8">
                  {certificateName}
                </h3>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                {imageUrl && (
                  <div className="bg-white rounded-lg p-2 md:p-4">
                    <img
                      src={imageUrl}
                      alt={certificateName}
                      className="w-full h-auto rounded"
                    />
                  </div>
                )}
                
                {credentialUrl && (
                  <div className="mt-4">
                    <iframe
                      src={credentialUrl}
                      className="w-full h-[600px] border-0 rounded-lg bg-white"
                      title={certificateName}
                    />
                    <div className="mt-4 flex gap-3">
                      <a
                        href={credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Open in New Tab
                      </a>
                    </div>
                  </div>
                )}
                
                {!imageUrl && !credentialUrl && (
                  <div className="text-center py-12 text-slate-400">
                    <p>No certificate preview available</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;
