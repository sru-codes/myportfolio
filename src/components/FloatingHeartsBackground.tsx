import { useEffect, useRef } from 'react';

interface HeartParticle {
  x: number;
  y: number;
  baseX: number;
  size: number;
  speedY: number;
  swaySpeed: number;
  swayDistance: number;
  swayPhase: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  baseAlpha: number;
}

const BABY_PINK_PALETTE = [
  '#FFB6C1', // Light pink
  '#FFC0CB', // Classic soft pink
  '#F472B6', // Warm rose pink
  '#FB7185', // Strawberry rose
  '#FDA4AF', // Marshmallow pink
];

export default function FloatingHeartsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // SVG Heart path centered around (12, 12)
    const heartPath = new Path2D(
      'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
    );

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let isRunning = true;

    const createParticle = (spawnAnywhere = false): HeartParticle => {
      const size = Math.random() * 10 + 10; // 10px to 20px
      const baseX = Math.random() * (width || window.innerWidth);
      return {
        x: baseX,
        y: spawnAnywhere ? Math.random() * (height || window.innerHeight) : (height || window.innerHeight) + Math.random() * 30 + 10,
        baseX,
        size,
        speedY: Math.random() * 0.5 + 0.35,
        swaySpeed: Math.random() * 0.015 + 0.008,
        swayDistance: Math.random() * 20 + 8,
        swayPhase: Math.random() * Math.PI * 2,
        rotation: (Math.random() - 0.5) * 0.25,
        rotationSpeed: (Math.random() - 0.5) * 0.006,
        color: BABY_PINK_PALETTE[Math.floor(Math.random() * BABY_PINK_PALETTE.length)],
        baseAlpha: Math.random() * 0.25 + 0.25,
      };
    };

    let particles: HeartParticle[] = [];

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Keep particle count lean (max 22 particles) for ultra-lightweight rendering
      const targetCount = Math.min(22, Math.max(12, Math.floor(width / 60)));
      if (particles.length === 0) {
        particles = Array.from({ length: targetCount }, () => createParticle(true));
      } else if (particles.length < targetCount) {
        while (particles.length < targetCount) {
          particles.push(createParticle(true));
        }
      } else {
        particles = particles.slice(0, targetCount);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isRunning = true;
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      // Fast, un-shadowed batch drawing
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.swayPhase += p.swaySpeed;
        p.rotation += p.rotationSpeed;
        p.x = p.baseX + Math.sin(p.swayPhase) * p.swayDistance;
        p.y -= p.speedY;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const scale = p.size / 24;
        ctx.scale(scale, scale);
        ctx.translate(-12, -12);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.fill(heartPath);

        ctx.restore();

        // Wrap around when heart drifts above top of viewport
        if (p.y < -30) {
          p.y = height + Math.random() * 20 + 10;
          p.baseX = Math.random() * width;
          p.x = p.baseX;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full will-change-transform"
      style={{ opacity: 0.8 }}
    />
  );
}
