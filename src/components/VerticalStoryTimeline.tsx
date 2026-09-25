import { useState } from 'react';
import { storyChapters, sruProfile } from '../data/portfolioData';
import { StarDoodle, HeartDoodle, BowDoodle, SparkleDoodle, CloudDoodle, ScribbleUnderline } from './Doodles';
import { ArrowRight, Sparkles, MapPin, GraduationCap, Cpu, Code2, Award, Terminal } from 'lucide-react';

export default function VerticalStoryTimeline() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const icons = [GraduationCap, Code2, Award, Sparkles];

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8 px-4">
      {/* Top Cute Heading */}
      <div className="text-center space-y-3 mb-12 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-600 text-xs font-bold uppercase tracking-wider shadow-sm">
          <BowDoodle className="w-4 h-4 text-pink-500" />
          <span>The Odyssey of Srustisri Panda</span>
          <SparkleDoodle className="w-3.5 h-3.5 text-pink-500" />
        </div>

        <h3 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#3B1C22]">
          Vertical Narrative Journey
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto">
          Scroll through the real milestones, philosophies, and hackathon triumphs shaping Sru's software engineering path.
        </p>

        {/* Floating background clouds */}
        <CloudDoodle className="absolute -top-6 left-4 text-pink-200 pointer-events-none hidden sm:block" />
        <CloudDoodle className="absolute top-2 right-6 text-pink-200 pointer-events-none hidden sm:block" />
      </div>

      {/* Vertical Animated Thread Container */}
      <div className="relative">
        {/* Animated Pink Thread Line */}
        <div className="absolute left-6 sm:left-1/2 top-4 bottom-8 w-1 -translate-x-1/2 bg-gradient-to-b from-pink-300 via-pink-400 to-rose-300 rounded-full shadow-sm" />

        {/* Story Nodes */}
        <div className="space-y-12 sm:space-y-16">
          {storyChapters.map((chapter, idx) => {
            const IconComponent = icons[idx % icons.length];
            const isLeft = idx % 2 === 0;
            const isSelected = activeChapterIndex === idx;

            return (
              <div 
                key={chapter.id}
                onClick={() => setActiveChapterIndex(idx)}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 cursor-pointer group transition-all duration-300 ${
                  isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Central Node Badge */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 shadow-md ${
                    isSelected 
                      ? 'bg-pink-500 text-white border-white scale-110 shadow-pink-300' 
                      : 'bg-white text-pink-600 border-pink-300 group-hover:scale-105 group-hover:bg-pink-50'
                  }`}>
                    <IconComponent size={20} />
                  </div>
                  {/* Subtle pulsing indicator ring */}
                  {isSelected && (
                    <span className="absolute -inset-1 rounded-2xl bg-pink-400 opacity-40 animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Content Card (Alternating Sides on Desktop) */}
                <div className={`w-full sm:w-[calc(50%-2.5rem)] pl-16 sm:pl-0 ${
                  isLeft ? 'sm:text-right sm:pr-4' : 'sm:text-left sm:pl-4'
                }`}>
                  <div className={`p-6 rounded-3xl border-2 transition-all duration-300 bg-white/95 shadow-sm hover:shadow-md ${
                    isSelected 
                      ? 'border-pink-400 bg-gradient-to-br from-white via-pink-50/40 to-pink-100/30 -translate-y-1' 
                      : 'border-pink-200/80 hover:border-pink-300'
                  }`}>
                    {/* Chapter Tag & Badge */}
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'sm:justify-end' : 'sm:justify-start'}`}>
                      <span className="text-[10px] font-bold font-mono-telemetry px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                        {chapter.badge}
                      </span>
                      <span className="text-xs font-bold text-pink-400 font-mono-telemetry">
                        CH.{chapter.number}
                      </span>
                    </div>

                    {/* Headline */}
                    <h4 className="text-lg sm:text-xl font-bold font-serif-editorial text-[#3B1C22] mb-1">
                      {chapter.title}
                    </h4>

                    {/* Subtitle */}
                    <span className="block text-[10px] font-bold tracking-wider uppercase text-pink-500 mb-3 font-mono-telemetry">
                      {chapter.subtitle}
                    </span>

                    {/* Description */}
                    <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                      {chapter.description}
                    </p>

                    {/* Quote Highlight if present */}
                    {chapter.quote && (
                      <div className={`p-3 rounded-2xl bg-pink-50 border-l-4 border-pink-400 text-[11px] italic font-serif-editorial text-pink-800 mb-3 ${
                        isLeft ? 'sm:text-right' : 'sm:text-left'
                      }`}>
                        {chapter.quote}
                      </div>
                    )}

                    {/* Footer Metric Pill */}
                    <div className={`flex items-center gap-2 text-[10px] font-mono-telemetry font-bold text-pink-600 pt-2 border-t border-pink-100 ${
                      isLeft ? 'sm:justify-end' : 'sm:justify-start'
                    }`}>
                      <HeartDoodle className="w-3.5 h-3.5 text-pink-400" />
                      <span>{chapter.metric}</span>
                      <span className="text-neutral-400">({chapter.metricLabel})</span>
                    </div>
                  </div>
                </div>

                {/* Empty side placeholder for alignment */}
                <div className="hidden sm:block w-[calc(50%-2.5rem)]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
