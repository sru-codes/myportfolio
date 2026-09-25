import { useState } from 'react';
import FolderFloat from './FolderFloat';
import { Sparkles, Folder, Hand, Compass, Heart } from 'lucide-react';
import { BowDoodle, SparkleDoodle, HeartDoodle } from './Doodles';

export default function PhysicsFolderNotes() {
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [triggerMode, setTriggerMode] = useState<'hover' | 'click'>('click');

  const notes = [
    { label: 'SIH 2026 Finalist 🌊', value: 'SIH 2026 Finalist: Built ORCA collaborative AI agents for ocean preservation.' },
    { label: 'B.Tech CSE @ GIET 🎓', value: 'Pursuing Computer Science & Engineering at GIET University in Odisha, India.' },
    { label: 'ORCA Marine AI 🐬', value: 'Specialized autonomous reasoning and multi-agent workflows for environmental monitoring.' },
    { label: 'Python & Node.js ⚡', value: 'Developing robust microservices, async APIs, and distributed systems.' },
    { label: 'Galaxy Constellations 🌌', value: 'Turned GitHub commit streams into dynamic procedural star maps.' },
    { label: 'Break Code to Fix It 🤯', value: 'My core engineering motto — fearless debugging and curious experimentation.' },
    { label: 'Kawaii Pastel UI 🎀', value: 'Who says developer tools have to look boring? Warm, cozy interfaces spark joy.' },
    { label: 'Open for Collabs 💌', value: 'Always excited to connect with fellow builders, designers, and researchers!' },
  ];

  const handleSelect = (val: string) => {
    setSelectedNote(val);
  };

  return (
    <div className="relative rounded-3xl border-2 border-pink-200 bg-white/90 p-6 sm:p-8 shadow-sm text-center space-y-6 overflow-visible">
      {/* Header */}
      <div className="space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-mono-telemetry font-bold border border-pink-200">
          <BowDoodle className="w-3.5 h-3.5 text-pink-500" />
          <span>REACT BITS · MATTER-JS ZERO GRAVITY</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#3B1C22]">
          Zero-Gravity Idea Folder
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600">
          Open the folder to launch floating physics notes into a zero-gravity Matter.js world. Drag, flick, toss, and collide them in mid-air!
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs font-mono-telemetry text-pink-700 font-bold">Trigger:</span>
        <button
          onClick={() => setTriggerMode('click')}
          className={`px-3 py-1 text-xs font-mono-telemetry font-bold rounded-xl transition-all cursor-pointer border-none ${
            triggerMode === 'click'
              ? 'bg-pink-500 text-white shadow-xs'
              : 'bg-pink-100/60 text-pink-700 hover:bg-pink-200'
          }`}
        >
          Click to Open
        </button>
        <button
          onClick={() => setTriggerMode('hover')}
          className={`px-3 py-1 text-xs font-mono-telemetry font-bold rounded-xl transition-all cursor-pointer border-none ${
            triggerMode === 'hover'
              ? 'bg-pink-500 text-white shadow-xs'
              : 'bg-pink-100/60 text-pink-700 hover:bg-pink-200'
          }`}
        >
          Hover to Open
        </button>
      </div>

      {/* Matter.js Physics Folder Stage */}
      <div className="relative flex flex-col items-center justify-end min-h-[300px] pt-40 pb-6 rounded-2xl bg-gradient-to-b from-[#FFF5F8] to-[#FFEBF0]/50 border border-pink-100 overflow-visible select-none">
        {/* Soft backdrop glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
          <div className="w-72 h-72 rounded-full bg-pink-300 blur-3xl" />
        </div>

        {/* The FolderFloat Component */}
        <div className="relative z-10">
          <FolderFloat
            items={notes}
            label="Sru's Notebook 🎀"
            sublabel={`${notes.length} physics notes`}
            trigger={triggerMode}
            closeOnSelect={false}
            physics={true}
            drift={0.65}
            onSelect={handleSelect}
            folderColor="#F472B6"
            frontColor="#FB7185"
            paperColor="#FFF0F5"
            itemColor="#FFFFFF"
            itemTextColor="#831843"
            labelColor="#FFFFFF"
            width={230}
            height={155}
            radius={18}
            spread={190}
            lift={30}
            tilt={10}
            flapAngle={38}
            restAngle={16}
            openDuration={540}
            stagger={40}
            bounce={0.35}
          />
        </div>

        {/* Hint footer */}
        <div className="mt-4 text-[11px] font-mono-telemetry text-pink-600 font-bold flex items-center justify-center gap-1.5 opacity-80">
          <Hand size={13} className="text-pink-500" />
          <span>Click folder to open · Throw pills in zero-gravity · Pick a note</span>
        </div>
      </div>

      {/* Note Inspection Toast / Card */}
      {selectedNote && (
        <div className="p-4 rounded-2xl bg-pink-100/70 border-2 border-pink-300 max-w-lg mx-auto text-left shadow-sm flex items-start gap-3 transition-all animate-in fade-in zoom-in-95">
          <div className="p-2 rounded-xl bg-pink-500 text-white shrink-0">
            <Heart size={16} />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-mono-telemetry font-bold text-pink-700 uppercase tracking-wider">
              Selected Note Pill:
            </div>
            <p className="text-xs sm:text-sm text-pink-950 font-medium">
              {selectedNote}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
