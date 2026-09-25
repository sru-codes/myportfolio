import { motion } from 'motion/react';
import React from 'react';

interface TextMotionProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  highlightWords?: string[];
  highlightClassName?: string;
}

export default function TextMotion({
  text,
  className = '',
  delay = 0,
  stagger = 0.035,
  highlightWords = [],
  highlightClassName = 'text-pink-500 font-extrabold',
}: TextMotionProps) {
  const words = text.split(' ');

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, wordIdx) => {
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
        );
        return (
          <span key={wordIdx} className="inline-flex whitespace-nowrap overflow-hidden py-0.5">
            {word.split('').map((char, charIdx) => {
              const charGlobalIdx = wordIdx * 8 + charIdx;
              return (
                <motion.span
                  key={charIdx}
                  initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: delay + charGlobalIdx * stagger,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block ${isHighlighted ? highlightClassName : ''}`}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
