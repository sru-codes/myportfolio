import { useState, useRef, useEffect } from 'react';
import { Play, Terminal } from 'lucide-react';
import { HeartDoodle } from './Doodles';

interface LogLine {
  type: 'input' | 'output' | 'system' | 'error';
  text: string;
}

export default function TerminalToy() {
  const [history, setHistory] = useState<LogLine[]>([
    { type: 'system', text: 'Sru-Codes Terminal [OS Version CozyPink.4.20] 🌸' },
    { type: 'system', text: 'Initializing happy little neural pathways... Success!' },
    { type: 'output', text: 'Type "/help" or click one of the quick commands below to explore.' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const presets = [
    { command: '/about', label: 'Who is Sru? ✨' },
    { command: '/skills', label: 'Core Skills 🛠️' },
    { command: '/motto', label: 'Dev Motto 🎨' },
    { command: '/secret', label: 'Unlock Secret 🔑' },
  ];

  const handleCommand = (commandText: string) => {
    const trimmed = commandText.trim();
    if (!trimmed) return;

    const newLines: LogLine[] = [{ type: 'input', text: trimmed }];

    const lowerCmd = trimmed.toLowerCase();

    if (lowerCmd === '/help') {
      newLines.push({
        type: 'output',
        text: 'Available commands: /about, /skills, /motto, /secret, /clear, /time',
      });
    } else if (lowerCmd === '/about') {
      newLines.push({
        type: 'output',
        text: 'Srujan (Sru) is a creative developer building Spatially-Enhanced Recurrent deep networks (SRU), immersive design constitutions, and cute pastel visual sandboxes.',
      });
    } else if (lowerCmd === '/skills') {
      newLines.push({
        type: 'output',
        text: '🌸 Deep Learning (PyTorch, Reinforcement Learning) · Web Design (Framer Motion, GSAP, WebGL) · React Engine · Typescript/Node · Cozy Doodling.',
      });
    } else if (lowerCmd === '/motto') {
      newLines.push({
        type: 'output',
        text: '💖 "Math provides the integrity, design provides the soul, code makes it alive."',
      });
    } else if (lowerCmd === '/secret') {
      newLines.push({
        type: 'output',
        text: '🐰 [DECODED]: Sru once trained a pathfinding robot that was supposed to map a room, but it fell in love with a spinning 3D pink cat model and just kept orbiting it! True story.',
      });
    } else if (lowerCmd === '/time') {
      newLines.push({
        type: 'output',
        text: `📅 Local Timeline: ${new Date().toLocaleTimeString()} - Cozy Standard Time.`,
      });
    } else if (lowerCmd === '/clear') {
      setHistory([]);
      setInputValue('');
      return;
    } else {
      newLines.push({
        type: 'error',
        text: `Command not found: "${trimmed}". Try typing "/help" for help.`,
      });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputValue('');
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="flex flex-col h-full rounded-3xl border-2 border-pink-100 bg-white/95 dark:border-pink-900/60 dark:bg-[#1E1013]/95 p-5 shadow-sm font-mono-telemetry text-xs text-[#2E181C] dark:text-[#FFF0F2]">
      {/* Top Console Bar */}
      <div className="flex items-center justify-between border-b border-pink-100 pb-3 dark:border-pink-900/60">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-pink-300 animate-pulse" />
          <span className="h-2.5 w-2.5 rounded-full bg-pink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-pink-100" />
          <span className="ml-2 text-[10px] font-bold tracking-wide text-pink-600 dark:text-pink-400 uppercase">srujan_shell.sh 🌸</span>
        </div>
        <div className="flex items-center gap-1.5 text-pink-500 font-bold">
          <Terminal size={14} />
          <span className="text-[10px]">COZY LINK</span>
        </div>
      </div>

      {/* History scroll window */}
      <div data-lenis-prevent className="flex-1 overflow-y-auto py-3 space-y-2.5 min-h-[160px] max-h-[220px] scrollbar-thin text-left">
        {history.map((line, idx) => (
          <div key={idx} className="leading-relaxed">
            {line.type === 'input' && (
              <p className="font-bold text-pink-600 dark:text-pink-300">
                <span className="text-pink-400 mr-1.5 font-bold">&gt;</span> {line.text}
              </p>
            )}
            {line.type === 'output' && (
              <p className="text-neutral-700 dark:text-neutral-200 flex items-start gap-1.5">
                <HeartDoodle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-pink-400" />
                <span>{line.text}</span>
              </p>
            )}
            {line.type === 'system' && (
              <p className="text-pink-400/80 font-semibold italic">
                {line.text}
              </p>
            )}
            {line.type === 'error' && (
              <p className="text-rose-500 dark:text-rose-400 font-semibold bg-rose-50 dark:bg-rose-950/20 px-2 py-1 rounded-lg">
                ⚠️ {line.text}
              </p>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Action presets */}
      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-pink-100 dark:border-pink-900/40">
        {presets.map((p) => (
          <button
            key={p.command}
            onClick={() => handleCommand(p.command)}
            className="interactive-item px-3 py-1.5 text-[10px] font-bold rounded-xl border-2 border-pink-100 bg-pink-50/50 hover:bg-pink-100 text-pink-600 dark:border-pink-950 dark:bg-pink-950/20 dark:text-pink-300 dark:hover:bg-pink-900/50 transition-colors cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input submission bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(inputValue);
        }}
        className="mt-3 flex items-center gap-2"
      >
        <span className="text-pink-500 font-bold">&gt;</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type command (e.g., /help)..."
          className="flex-1 bg-pink-50/50 dark:bg-[#1E1013]/50 border-2 border-pink-100 dark:border-pink-900 rounded-xl px-3 py-1.5 text-xs font-mono-telemetry text-pink-700 dark:text-pink-300 outline-none focus:border-pink-400"
        />
        <button
          type="submit"
          className="interactive-item p-2 rounded-xl bg-pink-500 hover:bg-pink-400 text-white flex items-center justify-center transition-colors border-none cursor-pointer"
          aria-label="Submit command"
        >
          <Play size={12} fill="currentColor" />
        </button>
      </form>
    </div>
  );
}
