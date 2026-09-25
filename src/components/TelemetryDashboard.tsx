import { useState, useEffect } from 'react';
import { Cpu, Wifi, HardDrive, ShieldCheck } from 'lucide-react';
import { HeartDoodle } from './Doodles';

export default function TelemetryDashboard() {
  const [latency, setLatency] = useState(1.1);
  const [activeNodes, setActiveNodes] = useState(842);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [uptime, setUptime] = useState(0);

  // Measure scrolling depth dynamically
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.round(progress));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update real-time metric variations
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(+(Math.random() * 1.5 + 0.8).toFixed(1));
      setActiveNodes(840 + Math.floor(Math.random() * 8));
      setUptime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4 rounded-3xl border-2 border-pink-100 bg-white/95 dark:border-pink-900/60 dark:bg-[#1E1013]/95 p-5 shadow-sm font-mono-telemetry text-xs text-[#2E181C] dark:text-[#FFF0F2]">
      <div className="grid grid-cols-2 gap-2">
        {/* Core Latency */}
        <div className="rounded-2xl border-2 border-pink-100 dark:border-pink-950 bg-[#FFF5F6] dark:bg-pink-950/20 p-3.5 flex flex-col justify-between h-[80px] text-left">
          <div className="flex items-center justify-between text-[10px] text-pink-500 dark:text-pink-400 font-bold uppercase">
            <span>Core Latency</span>
            <Cpu size={12} className="text-pink-400 animate-pulse" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold tracking-tight text-pink-700 dark:text-pink-300">{latency}</span>
            <span className="text-[10px] text-pink-400 font-bold uppercase">ms</span>
          </div>
        </div>

        {/* DOM node status */}
        <div className="rounded-2xl border-2 border-pink-100 dark:border-pink-950 bg-[#FFF5F6] dark:bg-pink-950/20 p-3.5 flex flex-col justify-between h-[80px] text-left">
          <div className="flex items-center justify-between text-[10px] text-pink-500 dark:text-pink-400 font-bold uppercase">
            <span>DOM Nodes</span>
            <Wifi size={12} className="text-pink-500 animate-ping" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold tracking-tight text-pink-700 dark:text-pink-300">{activeNodes}</span>
            <span className="text-[10px] text-pink-400 font-bold uppercase">Nodes</span>
          </div>
        </div>

        {/* Scroll Progress depth */}
        <div className="rounded-2xl border-2 border-pink-100 dark:border-pink-950 bg-[#FFF5F6] dark:bg-pink-950/20 p-3.5 flex flex-col justify-between h-[80px] text-left">
          <div className="flex items-center justify-between text-[10px] text-pink-500 dark:text-pink-400 font-bold uppercase">
            <span>Scroll Depth</span>
            <HardDrive size={12} className="text-pink-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold tracking-tight text-pink-700 dark:text-pink-300">{scrollProgress}</span>
            <span className="text-[10px] text-pink-400 font-bold uppercase">%</span>
          </div>
        </div>

        {/* Uptime clock */}
        <div className="rounded-2xl border-2 border-pink-100 dark:border-pink-950 bg-[#FFF5F6] dark:bg-pink-950/20 p-3.5 flex flex-col justify-between h-[80px] text-left">
          <div className="flex items-center justify-between text-[10px] text-pink-500 dark:text-pink-400 font-bold uppercase">
            <span>Uptime Session</span>
            <ShieldCheck size={12} className="text-pink-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold tracking-tight text-pink-700 dark:text-pink-300">{uptime}</span>
            <span className="text-[10px] text-pink-400 font-bold uppercase">Sec</span>
          </div>
        </div>
      </div>

      {/* Visual System load line */}
      <div className="space-y-1.5 py-2 border-t border-pink-100 dark:border-pink-900/40">
        <div className="flex justify-between text-[9px] text-pink-500 dark:text-pink-400 font-bold uppercase">
          <span>Active scroll load balance</span>
          <span className="flex items-center gap-1">
            <HeartDoodle className="w-3 h-3 text-pink-500" />
            <span>99.9% 🌸</span>
          </span>
        </div>
        <div className="w-full bg-pink-100 dark:bg-pink-950 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-pink-500 h-full rounded-full transition-all duration-500" 
            style={{ width: `${Math.max(10, Math.min(100, scrollProgress))}%` }} 
          />
        </div>
      </div>
    </div>
  );
}
