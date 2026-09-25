import { useState } from 'react';
import { storyChapters } from '../data/portfolioData';
import TerminalToy from './TerminalToy';
import GalaxyConstellation from './GalaxyConstellation';
import Card3DViewer from './Card3DViewer';
import TelemetryDashboard from './TelemetryDashboard';
import { Terminal, Brain, Layers, Cpu, Compass, Sparkles } from 'lucide-react';
import { HeartDoodle, BowDoodle, SparkleDoodle } from './Doodles';

export default function StoryJourney() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const getChapterIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal size={16} />;
      case 'Brain':
        return <Brain size={16} />;
      case 'Layers':
        return <Layers size={16} />;
      case 'Cpu':
        return <Cpu size={16} />;
      default:
        return <Compass size={16} />;
    }
  };

  const getInteractiveComponent = (type: string) => {
    switch (type) {
      case 'terminal':
        return <TerminalToy />;
      case 'galaxy':
        return <GalaxyConstellation />;
      case 'canvas3d':
        return <Card3DViewer />;
      case 'stats':
        return <TelemetryDashboard />;
      default:
        return <GalaxyConstellation />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative text-left">
      {/* Left side: Chapters timeline explorer */}
      <div className="lg:col-span-5 space-y-4">
        <div className="space-y-1 pb-3 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-[10px] font-mono-telemetry font-bold border border-pink-200">
            <BowDoodle className="w-3.5 h-3.5 text-pink-500" />
            <span>INTERACTIVE LABORATORY DOCKS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#3B1C22] font-serif-editorial">
            Diagnostic Laboratories
          </h3>
          <p className="text-xs text-neutral-600">
            Select a developmental chapter to inspect live interactive simulators, compiler AST models, galaxy constellations, and telemetry probes.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {storyChapters.map((chapter, idx) => {
            const isActive = activeChapterIndex === idx;
            return (
              <button
                key={chapter.id}
                onClick={() => setActiveChapterIndex(idx)}
                className={`text-left p-5 rounded-3xl border-2 transition-all duration-300 relative cursor-pointer ${
                  isActive
                    ? 'border-pink-400 bg-white shadow-md -translate-y-0.5'
                    : 'border-pink-200/80 bg-white/70 hover:bg-pink-50/50 hover:border-pink-300'
                }`}
              >
                {/* Active Indicator stripe */}
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-pink-500 rounded-l-3xl" />
                )}

                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-[10px] font-mono-telemetry font-bold text-pink-400">
                    {chapter.number} /
                  </span>
                  <div className={`p-1.5 rounded-xl border ${
                    isActive 
                      ? 'border-pink-500 bg-pink-500 text-white' 
                      : 'border-pink-200 text-pink-500 bg-pink-50'
                  }`}>
                    {getChapterIcon(chapter.icon)}
                  </div>
                  <span className="text-xs font-mono-telemetry font-bold text-pink-600 uppercase tracking-wider">
                    {chapter.subtitle}
                  </span>
                </div>

                <h4 className="text-base font-serif-editorial font-bold text-pink-800 mb-1 flex items-center gap-1.5">
                  <span>{chapter.title}</span>
                  {isActive && <HeartDoodle className="w-3.5 h-3.5 text-pink-500 shrink-0" />}
                </h4>

                <p className="text-xs text-neutral-600 leading-relaxed mb-3 font-sans">
                  {chapter.description}
                </p>

                {/* Micro stats summary */}
                <div className="flex items-center gap-2 text-[10px] font-mono-telemetry text-pink-700 font-bold uppercase pt-2 border-t border-pink-100">
                  <SparkleDoodle className="w-3 h-3 text-pink-500" />
                  <span>{chapter.metric}</span>
                  <span className="text-neutral-400">({chapter.metricLabel})</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right side: Live interactive sandbox display */}
      <div className="lg:col-span-7 sticky top-24">
        <div className="rounded-3xl border-2 border-pink-200 bg-white/95 p-6 shadow-md backdrop-blur-md">
          <div className="flex items-center justify-between border-b-2 border-pink-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-xs font-mono-telemetry font-bold text-pink-700 uppercase tracking-wider">
                LIVE SANDBOX: {storyChapters[activeChapterIndex].title}
              </span>
            </div>
            <span className="text-[10px] font-mono-telemetry font-bold px-3 py-1 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
              {storyChapters[activeChapterIndex].badge}
            </span>
          </div>

          {/* Active Interactive Component */}
          {getInteractiveComponent(storyChapters[activeChapterIndex].interactiveType)}
        </div>
      </div>
    </div>
  );
}
