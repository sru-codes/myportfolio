import { useState } from 'react';
import FlipCard, { FlipCardAxis } from './FlipCard';
import { Layers, RotateCcw, Sparkles, ExternalLink, Github, Code, Compass } from 'lucide-react';
import { HeartDoodle, BowDoodle, SparkleDoodle } from './Doodles';

export default function Card3DViewer() {
  const [axis, setAxis] = useState<FlipCardAxis>('y');
  const [isFlipped, setIsFlipped] = useState(false);
  const [tiltEnabled, setTiltEnabled] = useState(true);
  const [glareEnabled, setGlareEnabled] = useState(true);

  return (
    <div className="flex flex-col gap-5 rounded-3xl border-2 border-pink-200 bg-white/90 p-5 shadow-sm text-xs text-[#2E181C]">
      {/* Header controls & badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pink-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
            <Layers size={16} />
          </div>
          <div className="text-left">
            <div className="font-serif-editorial font-bold text-sm text-[#3B1C22]">
              Holographic Engineer ID
            </div>
            <div className="font-mono-telemetry text-[10px] text-pink-500 font-bold">
              React Bits &lt;FlipCard /&gt; · 3D Physics
            </div>
          </div>
        </div>

        {/* Axis & Mode Toggles */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setAxis(axis === 'y' ? 'x' : 'y')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-200 hover:bg-pink-100 text-[10px] font-mono-telemetry font-bold text-pink-700 transition-colors cursor-pointer"
            title="Toggle flip axis"
          >
            <span>Axis:</span>
            <span className="text-pink-600 uppercase font-extrabold">{axis}</span>
          </button>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-xs hover:opacity-90 text-[10px] font-mono-telemetry font-bold transition-all cursor-pointer border-none"
          >
            <RotateCcw size={10} className={isFlipped ? 'rotate-180 transition-transform' : 'transition-transform'} />
            <span>Flip</span>
          </button>
        </div>
      </div>

      {/* 3D FlipCard Stage */}
      <div className="relative flex items-center justify-center py-4 bg-gradient-to-b from-[#FFF5F8] to-[#FFEBF0]/40 rounded-2xl border border-pink-100 min-h-[360px] overflow-hidden">
        {/* Subtle background ambient rings */}
        <div className="pointer-events-none absolute w-72 h-72 rounded-full border border-pink-200/50 opacity-40 animate-pulse" />
        <div className="pointer-events-none absolute w-96 h-96 rounded-full border border-pink-200/30 opacity-30" />

        <FlipCard
          width={280}
          height={330}
          radius={20}
          axis={axis}
          flipped={isFlipped}
          onFlipChange={(f) => setIsFlipped(f)}
          tilt={tiltEnabled}
          tiltMax={14}
          glare={glareEnabled}
          glareOpacity={0.28}
          hoverScale={1.03}
          perspective={1000}
          stiffness={180}
          damping={18}
          background="linear-gradient(135deg, #FF6B97 0%, #F43F5E 50%, #BE123C 100%)"
          color="#ffffff"
          shadow
          shadowColor="#fda4af"
          shadowOpacity={0.5}
          className="cursor-grab active:cursor-grabbing"
          front={
            <div className="relative h-full w-full p-5 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white select-none">
              {/* Card Holographic Circuit Background */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="pointer-events-none absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-white/10 blur-xl" />

              {/* Top Row: System Status & Logo */}
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-300 animate-ping" />
                    <span className="text-[9px] font-mono-telemetry font-bold tracking-widest uppercase text-pink-100">
                      SYS_ID // ONLINE
                    </span>
                  </div>
                  <div className="text-base font-serif-editorial font-bold mt-1 tracking-tight text-white">
                    Srustisri Panda
                  </div>
                  <div className="text-[10px] font-mono-telemetry text-pink-200">
                    @sru-codes
                  </div>
                </div>

                <div className="h-8 w-8 rounded-xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center font-bold text-xs shadow-sm">
                  <BowDoodle className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Center: Holographic Chip / Protocol */}
              <div className="relative z-10 my-auto py-2">
                <div className="p-3 rounded-xl bg-black/15 backdrop-blur-sm border border-white/20 space-y-1.5 text-left">
                  <div className="flex items-center justify-between text-[9px] font-mono-telemetry text-pink-200">
                    <span>PROTOCOL</span>
                    <span className="text-white font-bold">GIET_CSE_2026</span>
                  </div>
                  <div className="text-xs font-bold font-serif-editorial text-white flex items-center gap-1.5">
                    <Sparkles size={12} className="text-amber-200 shrink-0" />
                    <span>Spatial &amp; Multi-Agent Intelligence</span>
                  </div>
                  <div className="text-[10px] text-pink-100/90 leading-tight">
                    "I break code so I can learn how to fix it"
                  </div>
                </div>
              </div>

              {/* Bottom: Card Specs & Flip Hint */}
              <div className="relative z-10 flex items-end justify-between pt-2 border-t border-white/20">
                <div className="text-left font-mono-telemetry">
                  <span className="block text-[8px] uppercase tracking-wider text-pink-200">BADGE ID</span>
                  <span className="text-[10px] font-bold text-white">SRU-CORE-984</span>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 text-[9px] font-mono-telemetry font-bold backdrop-blur-xs">
                  <span>Drag to turn</span>
                  <RotateCcw size={10} />
                </div>
              </div>
            </div>
          }
          back={
            <div className="relative h-full w-full p-5 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#2D121B] via-[#431A26] to-[#1E0B12] text-white select-none">
              {/* Back Pattern */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#FFF_1px,transparent_1px),linear-gradient(to_bottom,#FFF_1px,transparent_1px)] bg-[size:14px_14px]" />

              {/* Back Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-pink-900/60 pb-2">
                <div className="flex items-center gap-1.5">
                  <SparkleDoodle className="w-4 h-4 text-pink-400" />
                  <span className="text-[10px] font-mono-telemetry font-bold text-pink-300 uppercase tracking-wider">
                    SPECIFICATIONS
                  </span>
                </div>
                <span className="text-[9px] font-mono-telemetry text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded-full border border-pink-800/40">
                  REVERSE FACE
                </span>
              </div>

              {/* Back Content Details */}
              <div className="relative z-10 space-y-2.5 py-1 text-left">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono-telemetry text-pink-400 uppercase font-bold block">
                    Focus &amp; Engineering
                  </span>
                  <p className="text-[11px] text-pink-100 leading-snug">
                    Backend architecture, multi-agent AI ecosystems, Smart India Hackathon (SIH 2026), and cozy developer experiences.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono-telemetry">
                  <div className="p-2 rounded-lg bg-pink-950/40 border border-pink-900/50">
                    <span className="block text-[8px] text-pink-400">INSTITUTION</span>
                    <span className="font-bold text-pink-100">GIET Odisha</span>
                  </div>
                  <div className="p-2 rounded-lg bg-pink-950/40 border border-pink-900/50">
                    <span className="block text-[8px] text-pink-400">SIH PROBLEM</span>
                    <span className="font-bold text-pink-100">PS 26176</span>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-pink-950/40 border border-pink-900/50 text-[10px] font-mono-telemetry flex items-center justify-between">
                  <span className="text-pink-300">CORE STACK</span>
                  <span className="text-pink-100 font-bold">Python · Node · ML</span>
                </div>
              </div>

              {/* Back Action */}
              <div className="relative z-10 pt-2 border-t border-pink-900/60 flex items-center justify-between">
                <a
                  href="https://github.com/sru-codes"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[10px] font-mono-telemetry font-bold text-pink-300 hover:text-white transition-colors"
                >
                  <Github size={12} />
                  <span>github.com/sru-codes</span>
                </a>

                <span className="text-[9px] font-mono-telemetry text-pink-400 flex items-center gap-1">
                  <span>Click to flip</span>
                  <RotateCcw size={9} />
                </span>
              </div>
            </div>
          }
        />
      </div>

      {/* Interactive Controls & Instructions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 border-t border-pink-100 text-[10px] font-mono-telemetry">
        <label className="flex items-center gap-2 cursor-pointer select-none bg-pink-50/70 p-2 rounded-xl border border-pink-200/60">
          <input
            type="checkbox"
            checked={tiltEnabled}
            onChange={(e) => setTiltEnabled(e.target.checked)}
            className="accent-pink-500 rounded"
          />
          <span className="font-bold text-pink-800">3D Tilt on Hover</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer select-none bg-pink-50/70 p-2 rounded-xl border border-pink-200/60">
          <input
            type="checkbox"
            checked={glareEnabled}
            onChange={(e) => setGlareEnabled(e.target.checked)}
            className="accent-pink-500 rounded"
          />
          <span className="font-bold text-pink-800">Specular Glare</span>
        </label>

        <div className="col-span-2 sm:col-span-1 flex items-center justify-center p-2 rounded-xl bg-pink-100/60 text-pink-700 font-bold text-[10px]">
          <span>💡 Drag or flick to spin!</span>
        </div>
      </div>
    </div>
  );
}
