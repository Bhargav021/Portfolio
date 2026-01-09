import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

const SectionTransition: React.FC<Props> = ({ children, id, className = '' }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      style={{ opacity, scale }}
      className={`scroll-mt-24 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default SectionTransition;
