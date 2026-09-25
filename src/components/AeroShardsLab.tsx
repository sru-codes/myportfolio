import { useState, useRef, useEffect } from 'react';
import AeroShards from './AeroShards';
import AsciiCanvasFlow from './AsciiCanvasFlow';
import TextMotion from './TextMotion';
import { 
  Sparkles, 
  Wind, 
  Orbit, 
  Waves, 
  Palette, 
  Terminal, 
  Cpu, 
  Play, 
  Pause, 
  MousePointer, 
  Fingerprint
} from 'lucide-react';
import { BowDoodle } from './Doodles';

type FlowMode = 'stream' | 'vortex' | 'ribbon';
type EffectMode = 'none' | 'ascii' | 'dither';
type MaterialMode = 'pearl' | 'chrome' | 'satin';

interface ColorPreset {
  name: string;
  badge: string;
  bg: string;
  shard: string;
  accent: string;
  isDark: boolean;
}

const COLOR_PRESETS: ColorPreset[] = [
  {
    name: 'Sakura Pearl',
    badge: '🌸 Pastel',
    bg: '#FFF0F5',
    shard: '#F472B6',
    accent: '#FB7185',
    isDark: false,
  },
  {
    name: 'Cosmic Amethyst',
    badge: '🌌 Galaxy',
    bg: '#120F17',
    shard: '#896ABD',
    accent: '#A855F7',
    isDark: true,
  },
  {
    name: 'Cyber Marine',
    badge: '🌊 ORCA',
    bg: '#0F172A',
    shard: '#38BDF8',
    accent: '#818CF8',
    isDark: true,
  },
];

export default function AeroShardsLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [flow, setFlow] = useState<FlowMode>('stream');
  const [effect, setEffect] = useState<EffectMode>('ascii');
  const [material, setMaterial] = useState<MaterialMode>('pearl');
  const [presetIndex, setPresetIndex] = useState(0);
  const [interaction, setInteraction] = useState<'repel' | 'attract'>('repel');
  const [webGpuError, setWebGpuError] = useState(false);

  const currentPreset = COLOR_PRESETS[presetIndex];

  // Pause GPU rendering completely whenever this section is off-screen!
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative rounded-3xl border-2 border-pink-200 bg-white/95 p-6 sm:p-8 shadow-sm space-y-6 overflow-hidden text-left"
    >
      {/* Top Header with Kinetic TextMotion */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-pink-100 pb-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-mono-telemetry font-bold border border-pink-200">
            <BowDoodle className="w-3.5 h-3.5 text-pink-500" />
            <span>REACT BITS · VGPU PROCEDURAL SHADER</span>
            <span className={`w-1.5 h-1.5 rounded-full ${inView && !isPaused ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#3B1C22]">
            <TextMotion text="AeroShards & ASCII FlowTrail" highlightWords={['ASCII', 'FlowTrail']} />
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl">
            Real-time WebGPU wind sculpture with analytic AA, fluid mechanics, and shape-matched ASCII trail rendering. Click or drag to sculpt the flow!
          </p>
        </div>

        {/* Live Status & Play/Pause Badge */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-pink-100/70 hover:bg-pink-200/80 border border-pink-300 text-[11px] font-mono-telemetry font-bold text-pink-800 transition-colors cursor-pointer"
            title={isPaused ? 'Resume wind sculpture' : 'Pause wind sculpture'}
          >
            {isPaused ? <Play size={13} className="text-pink-600 fill-pink-600" /> : <Pause size={13} className="text-pink-600 fill-pink-600" />}
            <span>{isPaused ? 'Paused' : 'Active'}</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-pink-50 border border-pink-200 text-[11px] font-mono-telemetry font-bold text-pink-700">
            <Cpu size={14} className="text-pink-500" />
            <span>{webGpuError ? 'Canvas Mode' : 'WebGPU vgpu'}</span>
          </div>
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono-telemetry">
        {/* Effect Mode: ASCII vs 3D vs Dither */}
        <div className="flex items-center gap-1 bg-pink-50 p-1 rounded-2xl border border-pink-200/80">
          <span className="text-[10px] text-pink-500 font-bold px-2">Render:</span>
          {(['ascii', 'none', 'dither'] as EffectMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setEffect(m)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border-none ${
                effect === m
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'bg-transparent text-pink-800 hover:bg-pink-100'
              }`}
            >
              {m === 'ascii' ? 'ASCII Trail ✧' : m === 'none' ? '3D Pearl Shards' : 'Matrix Dither'}
            </button>
          ))}
        </div>

        {/* Flow Morphology */}
        <div className="flex items-center gap-1 bg-pink-50 p-1 rounded-2xl border border-pink-200/80">
          <span className="text-[10px] text-pink-500 font-bold px-2">Flow:</span>
          {(['stream', 'vortex', 'ribbon'] as FlowMode[]).map((f) => (
            <button
              key={f}
              onClick={() => setFlow(f)}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer border-none ${
                flow === f
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'bg-transparent text-pink-800 hover:bg-pink-100'
              }`}
            >
              {f === 'stream' && <Wind size={12} className="inline mr-1" />}
              {f === 'vortex' && <Orbit size={12} className="inline mr-1" />}
              {f === 'ribbon' && <Waves size={12} className="inline mr-1" />}
              {f}
            </button>
          ))}
        </div>

        {/* Color Palette Switcher */}
        <div className="flex items-center gap-1.5 bg-pink-50 p-1 rounded-2xl border border-pink-200/80">
          <Palette size={13} className="text-pink-500 ml-1.5" />
          <span className="text-[10px] text-pink-500 font-bold">Palette:</span>
          {COLOR_PRESETS.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => setPresetIndex(idx)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer border-none flex items-center gap-1 ${
                presetIndex === idx
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'bg-transparent text-pink-800 hover:bg-pink-100'
              }`}
            >
              <span>{p.badge}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main AeroShards Stage Container */}
      <div 
        className="relative h-[440px] w-full rounded-2xl overflow-hidden border-2 border-pink-200/80 shadow-inner group select-none transition-colors duration-500"
        style={{ backgroundColor: currentPreset.bg }}
      >
        {/* Render WebGPU AeroShards or Fallback (Only active when in view) */}
        {!webGpuError ? (
          <AeroShards
            backgroundColor={currentPreset.bg}
            shardColor={currentPreset.shard}
            accentColor={currentPreset.accent}
            placement="full"
            flow={flow}
            material={material}
            detail="balanced"
            effect={effect}
            scale={1.0}
            spread={1}
            depth={1.0}
            speed={1}
            spin={1}
            interaction={interaction}
            density={0.9}
            shardSize={1.0}
            stretch={1.0}
            turbulence={0.8}
            glow={1.0}
            edgeSoftness={1}
            bloom={0.25}
            grain={0.015}
            chromaticAberration={0.004}
            holdToGather={true}
            rippleIntensity={1.0}
            paused={!inView || isPaused}
            onError={() => setWebGpuError(true)}
            className="w-full h-full"
          />
        ) : (
          <AsciiCanvasFlow
            flow={flow}
            accentColor={currentPreset.accent}
            className="w-full h-full"
          />
        )}

        {/* Ambient Overlay Hint & Instructions */}
        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between text-[11px] font-mono-telemetry font-bold">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 dark:bg-black/70 backdrop-blur-md border border-white/60 text-pink-700 shadow-sm">
            <Fingerprint size={14} className="text-pink-500 animate-pulse" />
            <span>Click &amp; hold anywhere to gather swirling vortex · Release to unfurl</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 dark:bg-black/70 backdrop-blur-md border border-white/60 text-pink-700 shadow-sm">
            <Sparkles size={13} className="text-amber-400" />
            <span>Auto-pauses when offscreen (0% GPU)</span>
          </div>
        </div>

        {/* Top-Right Quick Toggle Pill */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
          <button
            onClick={() => setInteraction(interaction === 'repel' ? 'attract' : 'repel')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 text-[11px] font-mono-telemetry font-bold text-pink-800 shadow-sm hover:bg-white cursor-pointer"
          >
            <MousePointer size={12} className="text-pink-500" />
            <span>Cursor: <strong className="uppercase text-pink-600">{interaction}</strong></span>
          </button>
        </div>
      </div>

      {/* Footer Specs Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono-telemetry">
        <div className="p-3 rounded-2xl bg-pink-50/70 border border-pink-200/60 text-left">
          <span className="block text-[9px] text-pink-500 uppercase font-bold">Effect Shader</span>
          <span className="font-bold text-[#3B1C22]">
            {effect === 'ascii' ? 'Glyph-Matched ASCII' : effect === 'none' ? 'Analytic AA Shards' : 'Bayer Matrix Dither'}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-pink-50/70 border border-pink-200/60 text-left">
          <span className="block text-[9px] text-pink-500 uppercase font-bold">Morphology</span>
          <span className="font-bold text-[#3B1C22] capitalize">
            {flow} Wind Helix
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-pink-50/70 border border-pink-200/60 text-left">
          <span className="block text-[9px] text-pink-500 uppercase font-bold">Surface Finish</span>
          <span className="font-bold text-[#3B1C22] capitalize">
            {material} Gloss Reflect
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-pink-50/70 border border-pink-200/60 text-left">
          <span className="block text-[9px] text-pink-500 uppercase font-bold">GPU State</span>
          <span className="font-bold text-pink-600">
            {inView && !isPaused ? 'Live 60 FPS' : 'Sleeping (0% GPU)'}
          </span>
        </div>
      </div>
    </div>
  );
}
