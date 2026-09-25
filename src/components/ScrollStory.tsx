import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Brain, Layers, Cpu, ArrowRight, Award, Sparkles, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { StarDoodle, HeartDoodle, SmileyDoodle, SwirlDoodle, BowDoodle, SparkleDoodle, CloudDoodle, ScribbleUnderline } from './Doodles';
import { sruProfile } from '../data/portfolioData';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // For diagnostic logs in panel 1
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '🌸 SYSTEM BOOT: SRU_CODES v2026.4',
    'NAME: Srustisri Panda (@sru-codes)',
    'COLLEGE: B.Tech CSE @ GIET University, Odisha',
    'LOCATION: Khordha, Odisha, India',
    'MOTTO: "I break code so I can learn how to fix it 🤯✨"',
    'STATUS: READY // EXPLORING BACKEND & AI/ML',
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  // Panel 2 interactive bug fix state
  const [bugFixed, setBugFixed] = useState(false);
  const [bugCount, setBugCount] = useState(1);

  // Panel 3 agent ping simulation
  const [activeAgent, setActiveAgent] = useState<'sensing' | 'toxicity' | 'coral' | 'coord'>('sensing');

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.toLowerCase().trim();
    let response = `COMMAND NOT FOUND: ${cmd}. TYPE 'help', 'skills', 'sih', 'motto'.`;
    
    if (cmd === 'help') {
      response = "COMMANDS: about, skills, college, sih, motto, clear";
    } else if (cmd === 'about' || cmd === 'whoami') {
      response = "I'm Srustisri Panda! B.Tech CSE @ GIET University. Exploring Backend, AI/ML & Cloud.";
    } else if (cmd === 'college') {
      response = "GIET University, Odisha, India (B.Tech Computer Science & Engineering)";
    } else if (cmd === 'skills') {
      response = "TECH STACK: Python, React, JavaScript, Node.js, Express, Docker, AWS, Git, C++ DSA";
    } else if (cmd === 'sih' || cmd === 'orca') {
      response = "ORCA (SIH 2026 PS 26176): Marine Ecosystem Reasoning with Collaborative Autonomous Agents.";
    } else if (cmd === 'motto') {
      response = '"I break code so I can learn how to fix it" 🤯✨';
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    }

    setTerminalHistory(prev => [...prev, `> ${terminalInput}`, response]);
    setTerminalInput('');
  };

  useEffect(() => {
    const section = scrollSectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const panels = gsap.utils.toArray('.story-panel');
    const totalPanels = panels.length;

    // Horizontal Scroll Timeline using GSAP ScrollTrigger
    const scrollTween = gsap.to(section, {
      x: () => -(section.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${section.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const current = Math.min(
            Math.floor(progress * totalPanels * 0.99),
            totalPanels - 1
          );
          setActiveSlide(current);
        },
      },
    });

    return () => {
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
    };
  }, []);

  const slideIndicatorData = [
    { title: 'The Genesis', icon: <Terminal size={14} /> },
    { title: 'Break to Fix', icon: <Layers size={14} /> },
    { title: 'SIH 2026 ORCA', icon: <Brain size={14} /> },
    { title: 'Galaxy Frontiers', icon: <Cpu size={14} /> },
  ];

  return (
    <div
      ref={containerRef}
      id="scrolling-chronicles"
      className="relative bg-[#FFF0F4] text-[#3B1C22] overflow-hidden select-none border-b-2 border-pink-200"
    >
      {/* Background Subtle Tech Matrix Grid */}
      <div className="absolute inset-0 blueprint-grid-light opacity-60 pointer-events-none" />

      {/* Top Fixed Cute Title Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 border-b border-pink-200/80 flex items-center justify-between px-6 z-30 bg-[#FFF0F4]/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <BowDoodle className="w-5 h-5 text-pink-500" />
          <span className="text-[11px] font-mono-telemetry tracking-[0.2em] text-pink-700 uppercase font-bold">
            HORIZONTAL CHRONICLES // SRUSTISRI PANDA
          </span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold border border-pink-200">
            @sru-codes
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono-telemetry text-pink-600 font-bold bg-white/90 px-3 py-1.5 rounded-full border border-pink-200 shadow-sm">
          <span>SCROLL DOWN TO GLIDE HORIZONTALLY</span>
          <ArrowRight size={12} className="animate-pulse text-pink-500" />
        </div>
      </div>

      {/* Main Horizontal Panels Scroll Wrapper */}
      <div
        ref={scrollSectionRef}
        className="flex h-screen w-[400vw] items-stretch relative"
      >
        {/* PANEL 1: Introduction to Srustisri Panda @ GIET */}
        <div className="story-panel w-screen h-screen flex-shrink-0 flex items-center px-6 md:px-16 lg:px-28 relative">
          <SwirlDoodle className="absolute top-24 left-1/4" />
          <CloudDoodle className="absolute top-28 right-1/4 text-pink-200" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto pt-16">
            <div className="lg:col-span-6 space-y-5 text-left relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-[10px] font-mono-telemetry font-bold border border-pink-200">
                <SparkleDoodle className="w-3 h-3 text-pink-500" />
                <span>CHAPTER 01 // GENESIS & IDENTITY</span>
              </div>
              
              <div className="flex items-center gap-3">
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-serif-editorial text-[#3B1C22] leading-none">
                  Who is Srustisri Panda?
                </h2>
                <SmileyDoodle className="w-8 h-8 text-pink-500 shrink-0" />
              </div>

              <p className="text-sm md:text-base text-neutral-700 font-sans leading-relaxed max-w-lg">
                Known as <span className="font-bold text-pink-700">Sru</span> on GitHub, Srustisri is a B.Tech Computer Science & Engineering student at <span className="font-bold text-pink-700">GIET University</span> in Khordha, Odisha. Driven by insatiable curiosity, she builds backend microservices, explores collaborative AI agents, and creates delightful web experiences.
              </p>

              <div className="border-l-4 border-pink-400 pl-4 py-1 space-y-2 text-xs font-mono-telemetry text-pink-800 bg-pink-50/60 rounded-r-2xl">
                <p className="italic font-serif-editorial text-sm text-pink-900">"{sruProfile.motto}"</p>
                <div className="flex items-center gap-2 text-[11px] font-bold">
                  <span className="w-2 h-2 bg-pink-500 rounded-full" />
                  <span>B.Tech CSE @ GIET University, Odisha, India</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold">
                  <span className="w-2 h-2 bg-pink-500 rounded-full" />
                  <span>Python · DSA · Backend · AI/ML · Cloud</span>
                </div>
              </div>
            </div>

            {/* Right Interactive: Terminal simulation */}
            <div className="lg:col-span-6">
              <div className="border-2 border-pink-300 rounded-3xl bg-white/95 p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-pink-200 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-pink-300 flex items-center justify-center text-[7px] text-pink-800">×</span>
                    <span className="w-3 h-3 rounded-full bg-pink-200 flex items-center justify-center text-[7px] text-pink-800">−</span>
                    <span className="text-[10px] font-mono-telemetry tracking-widest text-pink-700 uppercase font-bold">
                      SRU_RETRO_TERMINAL 🌸
                    </span>
                  </div>
                  <span className="text-[9px] font-mono-telemetry text-pink-500 font-bold uppercase">LIVE SESSION</span>
                </div>

                <div data-lenis-prevent className="h-44 overflow-y-auto text-left font-mono-telemetry text-[11px] space-y-1.5 text-[#3B1C22] scrollbar-none pr-2">
                  {terminalHistory.map((log, index) => (
                    <div key={index} className="leading-relaxed">
                      {log.startsWith('>') ? (
                        <span className="text-pink-600 font-bold">{log}</span>
                      ) : (
                        <span className="text-neutral-700 whitespace-pre-wrap">{log}</span>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleTerminalSubmit} className="mt-4 pt-3 border-t border-pink-200 flex gap-2">
                  <span className="font-mono-telemetry text-xs text-pink-500 font-bold select-none">{`>`}</span>
                  <input
                    type="text"
                    placeholder="Try 'sih', 'motto', 'college', 'skills'..."
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    className="flex-1 bg-transparent border-none text-xs font-mono-telemetry text-pink-800 outline-none placeholder-pink-300 font-bold"
                  />
                  <button type="submit" className="text-[10px] font-mono-telemetry bg-pink-500 px-3 py-1.5 text-white hover:bg-pink-400 transition-colors rounded-xl font-bold border-none cursor-pointer">
                    RUN
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 2: "I Break Code to Fix It" & DSA / Backend Journey */}
        <div className="story-panel w-screen h-screen flex-shrink-0 flex items-center px-6 md:px-16 lg:px-28 bg-[#FFEBF0]/70 border-l-2 border-pink-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto pt-16">
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-[10px] font-mono-telemetry font-bold border border-pink-200">
                <HeartDoodle className="w-3 h-3 text-pink-500" />
                <span>CHAPTER 02 // PHILOSOPHY & MASTERY</span>
              </div>
              
              <div className="flex items-center gap-3">
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-serif-editorial text-[#3B1C22] leading-none">
                  "I Break Code to Fix It"
                </h2>
                <BowDoodle className="w-8 h-8 text-pink-500 shrink-0" />
              </div>

              <p className="text-sm md:text-base text-neutral-700 font-sans leading-relaxed max-w-lg">
                Instead of being intimidated by stack traces, Srustisri embraces them. By deliberately breaking code, testing boundary edge cases, and constructing mental models from the ground up, she conquered Python, Data Structures & Algorithms, Node.js, and containerization.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 border-2 border-pink-200 rounded-2xl bg-white shadow-sm">
                  <span className="text-[9px] font-mono-telemetry text-pink-600 block mb-1 font-bold">PYTHON & DSA</span>
                  <h4 className="font-serif-editorial text-sm font-bold text-pink-800">Algorithmic Problem Solving</h4>
                  <p className="text-[11px] text-neutral-600 font-sans mt-1">Practicing daily recursion, dynamic programming, and data structures.</p>
                </div>
                <div className="p-4 border-2 border-pink-200 rounded-2xl bg-white shadow-sm">
                  <span className="text-[9px] font-mono-telemetry text-pink-600 block mb-1 font-bold">BACKEND & DOCKER</span>
                  <h4 className="font-serif-editorial text-sm font-bold text-pink-800">Resilient Web Architectures</h4>
                  <p className="text-[11px] text-neutral-600 font-sans mt-1">Building Express microservices, API validation, and container pipelines.</p>
                </div>
              </div>
            </div>

            {/* Right Interactive: Bug Buster Interactive Simulator */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-[360px] rounded-3xl border-2 border-pink-300 bg-white p-6 flex flex-col justify-between relative shadow-lg text-left">
                <div className="flex items-center justify-between pb-3 border-b border-pink-100">
                  <span className="text-[10px] font-mono-telemetry text-pink-600 font-bold uppercase">
                    INTERACTIVE BUG REPAIR SANDBOX 🛠️
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-bold">
                    Bugs Solved: {bugCount}
                  </span>
                </div>

                <div className="my-4 p-4 rounded-2xl bg-pink-50/70 border border-pink-200 font-mono-telemetry text-xs space-y-2">
                  <div className="text-neutral-500 text-[10px]">// Sru's Python & Async Sandbox</div>
                  <div className="text-pink-800 font-bold">def resolve_pipeline(bug_id):</div>
                  <div className="pl-4 text-neutral-700">try:</div>
                  <div className={`pl-8 py-1 rounded transition-colors ${bugFixed ? 'bg-pink-100 text-pink-700' : 'bg-rose-100 text-rose-800'}`}>
                    {bugFixed ? '✓ status = "ALL_SYSTEMS_OPERATIONAL_🌸"' : '⚠ NullReferenceException: Pointer broken!'}
                  </div>
                  <div className="pl-4 text-neutral-700">return status</div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-pink-700">
                    {bugFixed ? (
                      <>
                        <CheckCircle2 size={14} className="text-pink-600" />
                        <span>Code Repaired & Tested!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={14} className="text-rose-500 animate-bounce" />
                        <span>1 Intentional Bug Injected</span>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setBugFixed(!bugFixed);
                      if (!bugFixed) setBugCount(c => c + 1);
                    }}
                    className="px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-400 text-white font-bold text-xs shadow cursor-pointer border-none flex items-center gap-1.5"
                  >
                    <RefreshCw size={12} className={bugFixed ? 'rotate-180' : ''} />
                    <span>{bugFixed ? 'Break Code Again' : 'Fix & Compile'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 3: ORCA — SIH 2026 Marine Intelligence Multi-Agent System */}
        <div className="story-panel w-screen h-screen flex-shrink-0 flex items-center px-6 md:px-16 lg:px-28 bg-[#FFF5F8] border-l-2 border-pink-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto pt-16">
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-[10px] font-mono-telemetry font-bold border border-pink-200">
                <Sparkles size={12} className="text-pink-500" />
                <span>CHAPTER 03 // HACKATHON TRIUMPH (SIH 2026)</span>
              </div>
              
              <div className="flex items-center gap-3">
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-serif-editorial text-[#3B1C22] leading-none">
                  ORCA Marine Intelligence
                </h2>
                <span className="text-2xl">🌊</span>
              </div>

              <p className="text-sm md:text-base text-neutral-700 font-sans leading-relaxed max-w-lg">
                For the prestigious <span className="font-bold text-pink-700">Smart India Hackathon 2026</span> (Problem Statement 26176), Srustisri developed ORCA: an autonomous multi-agent ecosystem that reasons over marine sensor streams to safeguard oceans and coral reefs.
              </p>

              <div className="space-y-2 border-t border-pink-200 pt-3 text-xs font-mono-telemetry text-pink-800">
                <div className="flex items-center justify-between py-1 border-b border-pink-100">
                  <span>Track: SIH 2026 PS 26176</span>
                  <span className="font-bold text-pink-600">Collaborative Swarm</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-pink-100">
                  <span>Reasoning Accuracy</span>
                  <span className="font-bold text-pink-600">96.2% Precision</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Repository</span>
                  <a href="https://github.com/sru-codes/ORCA-Marine-Intelligence" target="_blank" rel="noreferrer" className="text-pink-600 font-bold underline">
                    github.com/sru-codes/ORCA
                  </a>
                </div>
              </div>
            </div>

            {/* Right Interactive: ORCA Multi-Agent Communication Swarm Simulator */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-[380px] rounded-3xl border-2 border-pink-300 bg-white p-6 shadow-lg space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-telemetry font-bold text-pink-700 uppercase">
                    ORCA AGENT SWARM TELEMETRY 🐬
                  </span>
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'sensing', label: 'Sensor Agent', val: 'pH: 8.1 / 24°C', emoji: '🌡️' },
                    { id: 'toxicity', label: 'Toxicity Agent', val: 'Low Contamination', emoji: '🧪' },
                    { id: 'coral', label: 'Reef Guardian', val: 'Bleaching: Normal', emoji: '🪸' },
                    { id: 'coord', label: 'Coordinator Agent', val: 'Broadcast Synced', emoji: '📡' },
                  ].map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => setActiveAgent(agent.id as any)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        activeAgent === agent.id
                          ? 'border-pink-500 bg-pink-100/80 shadow-sm scale-102'
                          : 'border-pink-200 bg-pink-50/50 hover:bg-pink-100/40'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-pink-800">{agent.label}</span>
                        <span>{agent.emoji}</span>
                      </div>
                      <div className="text-[10px] font-mono-telemetry text-neutral-600">{agent.val}</div>
                    </button>
                  ))}
                </div>

                <div className="p-3 rounded-2xl bg-pink-50 border border-pink-200 text-xs font-mono-telemetry text-pink-900">
                  <span className="font-bold block mb-1">Active Swarm Log:</span>
                  <p className="text-[11px] text-neutral-700">
                    {activeAgent === 'sensing' && 'Agent-01 normalized marine telemetry across 12 buoy nodes.'}
                    {activeAgent === 'toxicity' && 'Agent-02 verified water purity metrics within safety tolerance.'}
                    {activeAgent === 'coral' && 'Agent-03 detected zero acute thermal bleaching anomalies.'}
                    {activeAgent === 'coord' && 'Coordinator compiled unified report for maritime researchers.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 4: Galaxy Telemetry & Creative Frontiers */}
        <div className="story-panel w-screen h-screen flex-shrink-0 flex items-center px-6 md:px-16 lg:px-28 bg-[#FFEBF0]/60 border-l-2 border-pink-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto pt-16">
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-[10px] font-mono-telemetry font-bold border border-pink-200">
                <StarDoodle className="w-3 h-3 text-pink-500" />
                <span>CHAPTER 04 // CELESTIAL CODE & CREATIVE TOOLS</span>
              </div>
              
              <div className="flex items-center gap-3">
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-serif-editorial text-[#3B1C22] leading-none">
                  Galaxy Constellations
                </h2>
                <SparkleDoodle className="w-7 h-7 text-pink-500 shrink-0" />
              </div>

              <p className="text-sm md:text-base text-neutral-700 font-sans leading-relaxed max-w-lg">
                Why should code be dull and gray? Srustisri built the Galaxy Generator for GitHub, turning commit histories into glowing celestial constellations. She pairs mathematical rigor with charming, baby-pink aesthetics.
              </p>

              <div className="p-4 rounded-2xl bg-white border-2 border-pink-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-pink-700 font-mono-telemetry">
                  <BowDoodle className="w-4 h-4 text-pink-500" />
                  <span>CONTINUOUSLY EXPANDING REPOSITORIES</span>
                </div>
                <p className="text-xs text-neutral-600 font-sans">
                  "I build one repository at a time — experimenting, learning, and sharing open source tools with the global builder community."
                </p>
              </div>
            </div>

            {/* Right Graphics: Constellation Star Card */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-[360px] rounded-3xl border-2 border-pink-300 bg-white p-6 flex flex-col justify-between shadow-lg text-left relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-pink-200">
                  <span className="text-[10px] font-mono-telemetry text-pink-600 font-bold uppercase">
                    GALAXY CONSTELLATION MAPPER 🌌
                  </span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                    228 Stars
                  </span>
                </div>

                <div className="my-6 relative flex flex-col items-center justify-center h-44 rounded-2xl bg-[#FFF5F8] border border-pink-200 overflow-hidden">
                  {/* Glowing center star */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-pink-300 animate-pulse">
                      GIET
                    </div>
                    <span className="absolute -inset-2 rounded-full bg-pink-400 opacity-30 animate-ping" />
                  </div>

                  {/* Satellite orbit tags */}
                  <div className="absolute top-3 left-4 px-2.5 py-1 rounded-xl bg-white border border-pink-200 text-[10px] font-bold text-pink-700 shadow-sm">
                    ORCA SIH 🌊
                  </div>
                  <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-xl bg-white border border-pink-200 text-[10px] font-bold text-pink-700 shadow-sm">
                    Galaxy Telemetry ✨
                  </div>
                  <div className="absolute bottom-3 left-4 px-2.5 py-1 rounded-xl bg-white border border-pink-200 text-[10px] font-bold text-pink-700 shadow-sm">
                    ML Predictor 💻
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono-telemetry text-pink-700 font-bold">
                  <span>STATUS: CELESTIAL ORBIT LOCKED</span>
                  <span>100% CUTE 🌸</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Pinned Mini Navigator Indicators */}
      <div className="absolute bottom-6 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-white/95 px-4 py-2 rounded-2xl border-2 border-pink-200 shadow-md">
          {slideIndicatorData.map((indicator, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono-telemetry transition-all ${
                activeSlide === idx
                  ? 'bg-pink-500 text-white font-bold shadow-sm'
                  : 'text-neutral-500 hover:text-pink-600'
              }`}
            >
              <span>{indicator.icon}</span>
              <span className="hidden sm:inline">{indicator.title}</span>
            </div>
          ))}
        </div>

        <div className="pointer-events-auto bg-white/95 px-4 py-2 rounded-2xl border-2 border-pink-200 text-xs font-mono-telemetry text-pink-700 font-bold shadow-md flex items-center gap-2">
          <HeartDoodle className="w-3.5 h-3.5 text-pink-500" />
          <span>CHAPTER {activeSlide + 1} OF 4</span>
        </div>
      </div>
    </div>
  );
}
