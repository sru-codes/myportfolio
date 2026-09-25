import React from 'react';

export const ScribbleUnderline: React.FC<{ className?: string }> = ({ className = "text-pink-400" }) => (
  <svg className={`absolute -bottom-2.5 left-0 w-full h-3 ${className}`} viewBox="0 0 100 10" preserveAspectRatio="none">
    <path 
      d="M2,7 Q25,2 50,7 T98,7" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round"
      className="scribble-doodle" 
    />
  </svg>
);

export const StarDoodle: React.FC<{ className?: string }> = ({ className = "text-pink-400" }) => (
  <svg className={`cute-hover-wiggle ${className}`} width="26" height="26" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const HeartDoodle: React.FC<{ className?: string }> = ({ className = "text-pink-400" }) => (
  <svg className={`cute-hover-wiggle ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const SwirlDoodle: React.FC<{ className?: string }> = ({ className = "text-pink-300" }) => (
  <svg className={`pointer-events-none opacity-40 ${className}`} width="64" height="64" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M24,24 C28,20 28,16 24,14 C20,12 16,16 18,20 C20,24 26,26 28,22 C30,18 26,12 20,14 C14,16 12,24 16,28 C20,32 30,30 32,22 C34,14 26,8 18,12 C10,16 8,28 14,34 C20,40 34,36 36,24" />
  </svg>
);

export const BowDoodle: React.FC<{ className?: string }> = ({ className = "text-pink-400" }) => (
  <svg className={`cute-hover-wiggle ${className}`} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12c-2-2-6-3-8-1s-1 6 2 6 6-3 6-5z" fill="currentColor" fillOpacity="0.2" />
    <path d="M12 12c2-2 6-3 8-1s1 6-2 6-6-3-6-5z" fill="currentColor" fillOpacity="0.2" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    <path d="M10 14l-3 6" />
    <path d="M14 14l3 6" />
  </svg>
);

export const CloudDoodle: React.FC<{ className?: string }> = ({ className = "text-pink-300" }) => (
  <svg className={`cute-hover-wiggle ${className}`} width="36" height="36" viewBox="0 0 24 24" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    <path d="M10 13c.5.5 1.5.5 2 0" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="9" cy="11" r="0.8" fill="currentColor" />
    <circle cx="13" cy="11" r="0.8" fill="currentColor" />
  </svg>
);

export const SparkleDoodle: React.FC<{ className?: string }> = ({ className = "text-pink-400" }) => (
  <svg className={`animate-pulse ${className}`} width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

export const FlowerBlossomDoodle: React.FC<{ className?: string }> = ({ className = "text-pink-400" }) => (
  <svg className={`cute-hover-wiggle ${className}`} width="26" height="26" viewBox="0 0 24 24" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="7" r="3" />
    <circle cx="17" cy="10" r="3" />
    <circle cx="15" cy="16" r="3" />
    <circle cx="9" cy="16" r="3" />
    <circle cx="7" cy="10" r="3" />
    <circle cx="12" cy="12" r="2.5" fill="#FFB6C1" />
  </svg>
);

export const SmileyDoodle: React.FC<{ className?: string }> = ({ className = "text-pink-400" }) => (
  <svg className={`cute-hover-wiggle ${className}`} width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 33c8.284 0 15-6.716 15-15S26.284 3 18 3 3 9.716 3 18s6.716 15 15 15z" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M11 14 Q13 11 15 14" />
    <path d="M21 14 Q23 11 25 14" />
    <path d="M4 18 L9 19" />
    <path d="M4 21 L9 20" />
    <path d="M32 18 L27 19" />
    <path d="M32 21 L27 20" />
    <path d="M15 19 Q18 21 18 19 Q18 21 21 19" />
  </svg>
);

export const ArrowDoodle: React.FC<{ className?: string }> = ({ className = "text-pink-400" }) => (
  <svg className={`pointer-events-none ${className}`} width="50" height="50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M10,20 Q40,10 60,40 T90,80" strokeDasharray="5 5" />
    <path d="M78,80 L90,80 L88,68" />
  </svg>
);

export const SpeechBubbleDoodle: React.FC<{ text: string; className?: string; onClick?: () => void }> = ({ text, className = "text-pink-500", onClick }) => (
  <div 
    onClick={onClick}
    className={`relative ${className} font-mono-telemetry text-[11px] font-bold text-pink-700 bg-white/95 p-3 rounded-2xl border-2 border-pink-300 shadow-md cursor-pointer hover:scale-105 transition-transform`}
  >
    <div className="flex items-center gap-1.5">
      <span>{text}</span>
      <SparkleDoodle className="w-3.5 h-3.5 text-pink-400 shrink-0" />
    </div>
    <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-r-2 border-b-2 border-pink-300 rotate-45" />
  </div>
);

export const WashiTape: React.FC<{ className?: string; text?: string }> = ({ className = "", text }) => (
  <div className={`px-4 py-1 bg-pink-200/80 text-pink-800 text-[10px] font-bold font-mono-telemetry uppercase tracking-wider rounded-sm shadow-sm border-t border-b border-pink-300/60 backdrop-blur-sm -rotate-2 ${className}`}>
    {text || 'SRU-CODES // VERIFIED'}
  </div>
);
