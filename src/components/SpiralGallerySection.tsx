import { useState } from 'react';
import InfiniteSpiral, { type InfiniteSpiralItem } from './InfiniteSpiral';
import { BowDoodle, SparkleDoodle, HeartDoodle, WashiTape } from './Doodles';
import { Sparkles, MoveVertical, MousePointer, Compass, RotateCw } from 'lucide-react';
import orcaImage from '../assets/images/orca_marine_ai_1790246033300.jpg';
import galaxyImage from '../assets/images/galaxy_constellation_1790246051954.jpg';
import deskImage from '../assets/images/cute_coding_desk_1790246066149.jpg';
import avatarImage from '../assets/images/srustisri_chibi_avatar_1790242888033.jpg';
import mascotImage from '../assets/images/cute_cyber_mascot_1790246079615.jpg';
import neuralImage from '../assets/images/neural_artwork_1790238748488.jpg';
import backdropImage from '../assets/images/story_backdrop_1790238763038.jpg';
import profileImage from '../assets/images/sru_avatar_1790238734576.jpg';

const spiralItems: InfiniteSpiralItem[] = [
  {
    id: 'orca',
    src: orcaImage,
    alt: 'ORCA Marine Intelligence SIH 2026',
    label: 'ORCA AI (SIH 2026) 🌊',
    href: 'https://github.com/sru-codes/ORCA-Marine-Intelligence',
    target: '_blank',
  },
  {
    id: 'galaxy',
    src: galaxyImage,
    alt: 'Galaxy Telemetry & Constellation Generator',
    label: 'Galaxy Constellations 🌌',
    href: 'https://github.com/sru-codes/sru-codes',
    target: '_blank',
  },
  {
    id: 'desk',
    src: deskImage,
    alt: 'Cute Developer Workspace',
    label: 'Pastel Dev Lab 🌸',
    href: 'https://github.com/sru-codes',
    target: '_blank',
  },
  {
    id: 'chibi',
    src: avatarImage,
    alt: 'Srustisri Panda Chibi Avatar',
    label: 'Srustisri @sru-codes 🎀',
    href: 'https://github.com/sru-codes',
    target: '_blank',
  },
  {
    id: 'mascot',
    src: mascotImage,
    alt: 'Autonomous AI Swarm Mascot',
    label: 'Agent Swarm Bot 🤖',
    href: 'https://github.com/sru-codes',
    target: '_blank',
  },
  {
    id: 'neural',
    src: neuralImage,
    alt: 'Neural Network & Machine Learning Models',
    label: 'ML Classifiers & NLP 🧠',
    href: 'https://github.com/sru-codes',
    target: '_blank',
  },
  {
    id: 'backdrop',
    src: backdropImage,
    alt: 'Storytelling Journey & Milestones',
    label: 'Story Journey 📜',
    href: 'https://github.com/sru-codes',
    target: '_blank',
  },
  {
    id: 'profile',
    src: profileImage,
    alt: 'GIET University B.Tech CSE',
    label: 'GIET Odisha 🎓',
    href: 'https://www.linkedin.com/in/srustisri-panda/',
    target: '_blank',
  },
];

export default function SpiralGallerySection() {
  const [animationMode, setAnimationMode] = useState<'all' | 'auto' | 'drag' | 'scroll'>('all');
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [speed, setSpeed] = useState<number>(0.55);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-mono-telemetry font-bold border border-pink-200 shadow-sm">
          <BowDoodle className="w-4 h-4 text-pink-500" />
          <span>REACT BITS · 3D INFINITE SPIRAL</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif-editorial text-[#3B1C22]">
          Infinite 3D Project Spiral
        </h2>

        <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
          An interactive 3D cylindrical helix powered by <span className="font-bold text-pink-600">React Bits</span> and synchronized with <span className="font-bold text-pink-600">Lenis smooth scrolling</span>. Drag with pointer, scroll the page, or let it auto-revolve!
        </p>
      </div>

      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono-telemetry font-bold">
        {/* Interaction Mode */}
        <div className="flex items-center rounded-2xl bg-white border-2 border-pink-200 p-1 shadow-sm">
          <span className="px-2.5 py-1 text-[11px] text-pink-500 uppercase tracking-wider hidden sm:inline-block">Mode:</span>
          {(['all', 'auto', 'drag', 'scroll'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setAnimationMode(mode)}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all cursor-pointer border-none text-xs font-bold ${
                animationMode === mode
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'text-pink-700 hover:bg-pink-50 bg-transparent'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Direction toggle */}
        <button
          onClick={() => setDirection((prev) => (prev === 'up' ? 'down' : 'up'))}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white border-2 border-pink-200 text-pink-700 hover:bg-pink-50 transition-all cursor-pointer shadow-sm text-xs font-bold"
        >
          <RotateCw size={13} className={direction === 'down' ? 'rotate-180 transition-transform' : 'transition-transform'} />
          <span>Direction: {direction.toUpperCase()}</span>
        </button>

        {/* Speed presets */}
        <div className="flex items-center rounded-2xl bg-white border-2 border-pink-200 p-1 shadow-sm">
          <span className="px-2 py-1 text-[11px] text-pink-500 uppercase tracking-wider hidden sm:inline-block">Speed:</span>
          {[
            { label: 'Gentle', val: 0.35 },
            { label: 'Normal', val: 0.55 },
            { label: 'Fast', val: 0.95 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => setSpeed(preset.val)}
              className={`px-2.5 py-1.5 rounded-xl transition-all cursor-pointer border-none text-xs font-bold ${
                speed === preset.val
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'text-pink-700 hover:bg-pink-50 bg-transparent'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Spiral Stage Container */}
      <div className="relative mx-auto max-w-5xl rounded-[36px] border-4 border-pink-200/90 bg-gradient-to-b from-[#FFF5F8] via-[#FFEBF1] to-[#FFF0F4] shadow-xl overflow-hidden p-2 sm:p-4">
        <WashiTape text="REACT BITS // 3D HELIX STAGE" className="absolute top-4 left-6 z-20" />

        {/* Floating guidance hints */}
        <div className="absolute top-4 right-6 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-pink-300 text-[11px] font-mono-telemetry font-bold text-pink-700 shadow-sm">
          <MousePointer size={12} className="text-pink-500" />
          <span>Drag to spin</span>
          <span className="text-pink-300">·</span>
          <MoveVertical size={12} className="text-pink-500" />
          <span>Scroll page (Lenis)</span>
          <span className="text-pink-300">·</span>
          <Sparkles size={12} className="text-pink-500" />
          <span>Hover to pause</span>
        </div>

        {/* Infinite Spiral Component */}
        <div className="h-[480px] sm:h-[580px] w-full relative overflow-hidden">
          <InfiniteSpiral
            items={spiralItems}
            animationMode={animationMode}
            speed={speed}
            direction={direction}
            radius={190}
            cardWidth={115}
            cardHeight={115}
            verticalSpacing={65}
            perspective={1000}
            cardRadius={14}
            centerScale={1.22}
            edgeBlur={0}
            cardsPerTurn={7}
            pauseOnHover
            className="w-full h-full"
          />
        </div>

        {/* Bottom Status bar */}
        <div className="border-t border-pink-200/80 bg-white/70 backdrop-blur-sm px-4 py-2.5 rounded-b-[28px] flex flex-wrap items-center justify-between text-[11px] font-mono-telemetry text-pink-700">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            <span className="font-bold">Active 3D Cylinder: 8 Multi-Turn Cards</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartDoodle className="w-3.5 h-3.5 text-pink-500" />
            <span>Interactive WebGL-Free CSS 3D Stage</span>
          </div>
        </div>
      </div>
    </div>
  );
}
