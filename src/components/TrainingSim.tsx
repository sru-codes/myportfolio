import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw, Trophy, Brain } from 'lucide-react';

export default function TrainingSim() {
  const [isRunning, setIsRunning] = useState(false);
  const [epochs, setEpochs] = useState(140);
  const [loss, setLoss] = useState(0.245);
  const [accuracy, setAccuracy] = useState(94.2);
  const [lossHistory, setLossHistory] = useState<number[]>([
    0.85, 0.72, 0.61, 0.53, 0.45, 0.38, 0.31, 0.28, 0.25, 0.245,
  ]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const agentPos = useRef({ x: 100, y: 100 });
  const targetPos = useRef({ x: 220, y: 80 });
  const agentAngle = useRef(0);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; color: string; life: number }[]>([]);

  // Toggle simulation
  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  const resetSimulation = () => {
    setEpochs(0);
    setLoss(0.95);
    setAccuracy(42.1);
    setLossHistory([0.95]);
    agentPos.current = { x: 50, y: 100 };
    targetPos.current = { x: 240, y: 70 };
  };

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains('dark');

      // Grid Backdrop
      ctx.strokeStyle = isDark ? 'rgba(255, 182, 1 light_pink)' : 'rgba(255, 105, 180, 0.05)';
      ctx.strokeStyle = isDark ? 'rgba(255, 182, 193, 0.06)' : 'rgba(255, 105, 180, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Obstacles
      ctx.fillStyle = isDark ? 'rgba(255, 182, 193, 0.12)' : 'rgba(255, 105, 180, 0.08)';
      ctx.beginPath();
      ctx.arc(150, 100, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isDark ? '#FFA4B6' : '#FF69B4';
      ctx.stroke();
      ctx.fillStyle = isDark ? '#FFF0F2' : '#2E181C';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Obstacle', 150, 103);

      // Target (Cute Pink Star / Crystal)
      ctx.fillStyle = isDark ? '#FFA4B6' : '#FF69B4';
      ctx.shadowColor = '#FF69B4';
      ctx.shadowBlur = isRunning ? 10 : 0;
      ctx.beginPath();
      const tp = targetPos.current;
      ctx.arc(tp.x, tp.y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Path Line (Implicit spatial memory projection)
      ctx.strokeStyle = isDark ? 'rgba(255, 105, 180, 0.25)' : 'rgba(255, 105, 180, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(agentPos.current.x, agentPos.current.y);
      // Path around obstacle curve
      ctx.quadraticCurveTo(150, 40, tp.x, tp.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Agent (Chibi robotic quadruped with 4 cute joints)
      const ap = agentPos.current;
      ctx.save();
      ctx.translate(ap.x, ap.y);
      ctx.rotate(agentAngle.current);

      // Cybernetic legs
      ctx.strokeStyle = isDark ? '#FFA4B6' : '#FF69B4';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      
      const bounce = Math.sin(Date.now() / 150) * 4;
      
      // Leg 1
      ctx.beginPath();
      ctx.moveTo(-8, 5);
      ctx.lineTo(-14, 12 + (isRunning ? bounce : 0));
      ctx.stroke();
      // Leg 2
      ctx.beginPath();
      ctx.moveTo(8, 5);
      ctx.lineTo(14, 12 + (isRunning ? -bounce : 0));
      ctx.stroke();
      // Leg 3
      ctx.beginPath();
      ctx.moveTo(-8, -5);
      ctx.lineTo(-14, -12 + (isRunning ? -bounce : 0));
      ctx.stroke();
      // Leg 4
      ctx.beginPath();
      ctx.moveTo(8, -5);
      ctx.lineTo(14, -12 + (isRunning ? bounce : 0));
      ctx.stroke();

      // Body (Chibi rounded metallic body)
      ctx.fillStyle = isDark ? '#2D1519' : '#FFF0F2';
      ctx.strokeStyle = isDark ? '#FFA4B6' : '#FF69B4';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(-12, -8, 24, 16, 6);
      ctx.fill();
      ctx.stroke();

      // Glowing Eyes
      ctx.fillStyle = isDark ? '#FFF0F2' : '#FF1493';
      ctx.beginPath();
      ctx.arc(8, -3, 2, 0, Math.PI * 2);
      ctx.arc(8, 3, 2, 0, Math.PI * 2);
      ctx.fill();

      // Antenna
      ctx.strokeStyle = isDark ? '#FFA4B6' : '#FF69B4';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-4, -14);
      ctx.stroke();
      ctx.fillStyle = '#FF69B4';
      ctx.beginPath();
      ctx.arc(-4, -14, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Particle update
      particles.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        if (p.life <= 0) {
          particles.current.splice(idx, 1);
        }
      });

      // Update simulation physics when running
      if (isRunning) {
        const dx = tp.x - ap.x;
        const dy = tp.y - ap.y;
        const dist = Math.hypot(dx, dy);

        // Turn towards target (avoiding obstacle in center)
        let targetAngle = Math.atan2(dy, dx);
        
        // Push agent away from center obstacle
        const distToObstacle = Math.hypot(150 - ap.x, 100 - ap.y);
        if (distToObstacle < 55) {
          // Avoidance steering
          targetAngle += 0.5;
        }

        const angleDiff = targetAngle - agentAngle.current;
        agentAngle.current += Math.sin(angleDiff) * 0.12;

        // Move forward
        const speed = 1.8;
        ap.x += Math.cos(agentAngle.current) * speed;
        ap.y += Math.sin(agentAngle.current) * speed;

        // Bounds constrain
        ap.x = Math.max(15, Math.min(canvas.width - 15, ap.x));
        ap.y = Math.max(15, Math.min(canvas.height - 15, ap.y));

        // Reach target
        if (dist < 12) {
          // Explode with beautiful pink sparkles
          for (let i = 0; i < 15; i++) {
            particles.current.push({
              x: tp.x,
              y: tp.y,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              color: isDark ? '#FFA4B6' : '#FF69B4',
              life: 30,
            });
          }
          // Teleport target
          targetPos.current = {
            x: Math.random() * (canvas.width - 60) + 30,
            y: Math.random() * (canvas.height - 60) + 30,
          };
          
          // Boost learning stats
          setEpochs((prev) => prev + 12);
          setAccuracy((prev) => Math.min(99.8, +(prev + 0.15).toFixed(2)));
          setLoss((prev) => Math.max(0.01, +(prev * 0.95).toFixed(4)));
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isRunning]);

  // Periodic incremental charts update
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setLossHistory((prev) => {
        const next = [...prev];
        if (next.length > 25) next.shift();
        next.push(loss);
        return next;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isRunning, loss]);

  return (
    <div className="flex flex-col gap-4 rounded-3xl border-2 border-pink-100 bg-white/95 dark:border-pink-900/60 dark:bg-[#1E1013]/95 p-5 shadow-sm font-mono-telemetry text-xs text-[#2E181C] dark:text-[#FFF0F2]">
      {/* Visual Simulation Display */}
      <div className="relative rounded-2xl border border-pink-100 dark:border-pink-900 bg-[#FFF5F6] dark:bg-pink-950/20 overflow-hidden h-[180px]">
        <canvas
          ref={canvasRef}
          width={320}
          height={180}
          className="w-full h-full block"
        />
        <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-xl bg-pink-500 text-white text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 shadow-sm">
          <Brain size={10} className="text-white animate-pulse" />
          <span>SERN MAPLESS NAVIGATION SIM 🌸</span>
        </div>
      </div>

      {/* Realtime stats tracker grid */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl bg-pink-50/50 dark:bg-pink-950/20 p-2.5 border border-pink-100 dark:border-pink-900/40">
          <span className="block text-[9px] text-pink-500 dark:text-pink-400 font-bold uppercase tracking-wider">Epochs Run</span>
          <span className="text-sm font-bold text-pink-700 dark:text-pink-300">{epochs}</span>
        </div>
        <div className="rounded-2xl bg-pink-50/50 dark:bg-pink-950/20 p-2.5 border border-pink-100 dark:border-pink-900/40">
          <span className="block text-[9px] text-pink-500 dark:text-pink-400 font-bold uppercase tracking-wider">Loss Matrix</span>
          <span className="text-sm font-bold text-pink-700 dark:text-pink-300">{loss.toFixed(4)}</span>
        </div>
        <div className="rounded-2xl bg-pink-50/50 dark:bg-pink-950/20 p-2.5 border border-pink-100 dark:border-pink-900/40">
          <span className="block text-[9px] text-pink-500 dark:text-pink-400 font-bold uppercase tracking-wider">RL Accuracy</span>
          <span className="text-sm font-bold text-pink-700 dark:text-pink-300">{accuracy.toFixed(1)}%</span>
        </div>
      </div>

      {/* Mini Sparkline Loss History Chart */}
      <div className="h-10 px-1 border-t border-b border-pink-100 dark:border-pink-900/40 py-1.5 flex flex-col justify-end">
        <div className="flex items-end justify-between gap-0.5 h-full">
          {lossHistory.map((val, idx) => {
            const heightPct = Math.max(10, Math.min(100, (1 - val) * 100));
            return (
              <div
                key={idx}
                className="w-full bg-pink-300 dark:bg-pink-800 rounded-t transition-all duration-300 hover:bg-pink-400"
                style={{ height: `${heightPct}%` }}
                title={`Loss: ${val.toFixed(3)}`}
              />
            );
          })}
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex justify-between items-center mt-1">
        <div className="flex gap-2">
          <button
            onClick={toggleSimulation}
            className={`interactive-item px-4 py-2 rounded-xl font-bold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer border-none text-white ${
              isRunning
                ? 'bg-pink-400 dark:bg-pink-600'
                : 'bg-pink-500 hover:bg-pink-400'
            }`}
          >
            {isRunning ? <Pause size={12} /> : <Play size={12} fill="currentColor" />}
            <span>{isRunning ? 'Pause Sim' : 'Resume Sim'}</span>
          </button>
          <button
            onClick={resetSimulation}
            aria-label="Reset simulation"
            className="interactive-item p-2 rounded-xl border-2 border-pink-100 text-pink-500 dark:border-pink-900 dark:text-pink-300 hover:bg-pink-50/50 transition-colors cursor-pointer"
          >
            <RefreshCw size={12} />
          </button>
        </div>
        <div className="text-[10px] text-pink-500 dark:text-pink-400 flex items-center gap-1 font-bold uppercase">
          <Trophy size={11} className="text-pink-400" />
          <span>RL convergence active 🌸</span>
        </div>
      </div>
    </div>
  );
}
