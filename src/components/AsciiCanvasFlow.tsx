import { useEffect, useRef } from 'react';

interface AsciiCanvasFlowProps {
  className?: string;
  flow?: 'stream' | 'vortex' | 'ribbon';
  accentColor?: string;
}

const GLYPHS = ['·', ':', '+', '*', 'x', '%', '#', '@', '✧', '✦', '✿'];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  glyph: string;
}

export default function AsciiCanvasFlow({
  className = '',
  flow = 'stream',
  accentColor = '#EC4899',
}: AsciiCanvasFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    const particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onPointerLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mouseleave', onPointerLeave);

    const spawn = () => {
      if (particles.length > 250) return;
      const w = canvas.width || 400;
      const h = canvas.height || 300;

      let x = 0;
      let y = 0;
      let vx = 0;
      let vy = 0;

      if (flow === 'vortex') {
        const angle = Math.random() * Math.PI * 2;
        const rad = 20 + Math.random() * (Math.min(w, h) * 0.4);
        x = w / 2 + Math.cos(angle) * rad;
        y = h / 2 + Math.sin(angle) * rad;
        vx = -Math.sin(angle) * (1.2 + Math.random() * 2);
        vy = Math.cos(angle) * (1.2 + Math.random() * 2);
      } else if (flow === 'ribbon') {
        x = Math.random() * w;
        y = h / 2 + Math.sin(x * 0.02) * 50;
        vx = 1.5 + Math.random();
        vy = Math.cos(x * 0.02) * 1.5;
      } else {
        // stream
        x = -10;
        y = Math.random() * h;
        vx = 2 + Math.random() * 3;
        vy = (Math.random() - 0.5) * 1.2;
      }

      particles.push({
        x,
        y,
        vx,
        vy,
        age: 0,
        life: 120 + Math.random() * 100,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      });
    };

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (tick % 2 === 0) {
        spawn();
        spawn();
      }

      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age++;
        if (p.age >= p.life || p.x > canvas.width + 50 || p.y > canvas.height + 50) {
          particles.splice(i, 1);
          continue;
        }

        // Mouse attraction or repulsion
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120 && dist > 5) {
            p.vx += (dx / dist) * 0.25;
            p.vy += (dy / dist) * 0.25;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        const progress = p.age / p.life;
        const alpha = Math.sin(progress * Math.PI) * 0.85;

        ctx.fillStyle = `color-mix(in srgb, ${accentColor} ${Math.round(alpha * 100)}%, transparent)`;
        ctx.fillText(p.glyph, p.x, p.y);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onPointerMove);
      canvas.removeEventListener('mouseleave', onPointerLeave);
    };
  }, [flow, accentColor]);

  return <canvas ref={canvasRef} className={`w-full h-full block ${className}`} />;
}
