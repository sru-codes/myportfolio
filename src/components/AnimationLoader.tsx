import { motion } from 'motion/react';
import { BowDoodle, SparkleDoodle } from './Doodles';

interface AnimationLoaderProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function AnimationLoader({
  label = 'Compiling Creativity...',
  size = 'md',
  className = '',
}: AnimationLoaderProps) {
  return (
    <div className={`inline-flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-pink-200/80 shadow-sm text-xs font-mono-telemetry font-bold text-pink-700 ${className}`}>
      {/* Morphing ring loader with liquid pink orbs */}
      <div className="relative flex items-center justify-center w-6 h-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-pink-200 border-t-pink-500"
        />
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-2 h-2 rounded-full bg-pink-500"
        />
      </div>

      <span>{label}</span>
      <SparkleDoodle className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
    </div>
  );
}
