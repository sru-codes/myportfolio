import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  symbol: string;
}

export default function ClickSparkles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const cuteSymbols = ['🌸', '✨', '💖', '⭐', '🎀', '🫧', '🐾'];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        symbol: cuteSymbols[Math.floor(Math.random() * cuteSymbols.length)],
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute text-lg select-none animate-float-fade"
          style={{
            left: `${p.x - 12}px`,
            top: `${p.y - 12}px`,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}
