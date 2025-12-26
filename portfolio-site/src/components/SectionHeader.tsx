import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-slate-300">
          {subtitle}
        </p>
      )}
      <div className="mt-4 w-16 h-1 bg-emerald-400 rounded-full" />
    </motion.div>
  );
}
