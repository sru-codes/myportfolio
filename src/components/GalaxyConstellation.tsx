import { useState, useEffect, useRef } from 'react';
import { Sparkles, Compass, Star, Eye } from 'lucide-react';
import { SparkleDoodle, HeartDoodle } from './Doodles';

interface CelestialNode {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  pulseSpeed: number;
  description: string;
  stars: number;
}

export default function GalaxyConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<CelestialNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<CelestialNode | null>(null);
  const [constellationCount, setConstellationCount] = useState(6);
  const [isRotating, setIsRotating] = useState(true);

  const nodes = useRef<CelestialNode[]>([
    { id: 'orca', name: 'ORCA Intelligence', category: 'SIH 2026', x: 160, y: 65, radius: 8, color: '#FF69B4', pulseSpeed: 0.03, description: 'SIH 2026 Marine multi-agent ecosystem reasoning', stars: 24 },
    { id: 'galaxy', name: 'Galaxy Generator', category: 'Celestial Engine', x: 250, y: 110, radius: 9, color: '#EC4899', pulseSpeed: 0.04, description: 'Automated GitHub SVG telemetry & constellation builder', stars: 48 },
    { id: 'zyrix', name: 'Zyrix Studio', category: '3D Web Creative', x: 80, y: 120, radius: 7, color: '#F43F5E', pulseSpeed: 0.02, description: 'Interactive 3D developer studio and micro-interactions', stars: 19 },
    { id: 'spam', name: 'Spam Classifier', category: 'NLP Machine Learning', x: 130, y: 170, radius: 6, color: '#FB7185', pulseSpeed: 0.035, description: 'NLP text preprocessor with TF-IDF vectorization', stars: 12 },
    { id: 'laptop', name: 'Price Predictor', category: 'Data Science ML', x: 230, y: 180, radius: 6, color: '#FDA4AF', pulseSpeed: 0.025, description: 'Hardware multi-variable regression estimation model', stars: 15 },
    { id: 'giet', name: 'GIET Core', category: 'B.Tech CSE Origin', x: 175, y: 125, radius: 11, color: '#FF1493', pulseSpeed: 0.05, description: 'Academic root in Khordha, Odisha: Python, DSA & Systems', stars: 120 }
  ]);

  // Ambient background dust stars
  const dustStars = useRef<{ x: number; y: number; size: number; alpha: number; speed: number }[]>([]);

  useEffect(() => {
    // Generate 60 tiny ambient twinkling stars
    const stars = [];
    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * 320,
        y: Math.random() * 220,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.02 + 0.01
      });
    }
    dustStars.current = stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cute Baby Pink Galaxy background gradient
      const bgGrad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 10,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.5
      );
      bgGrad.addColorStop(0, '#FFF5F8');
      bgGrad.addColorStop(0.7, '#FFE8EE');
      bgGrad.addColorStop(1, '#FFDEE6');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Twinkling ambient dust particles
      dustStars.current.forEach((st) => {
        st.alpha += Math.sin(angle * 2 + st.x) * 0.015;
        const currentAlpha = Math.max(0.1, Math.min(0.9, st.alpha));
        ctx.fillStyle = `rgba(244, 63, 94, ${currentAlpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw constellation connective lines
      const ns = nodes.current;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);

      // Connect constellation lines: GIET to all, and surrounding loops
      const connections: [number, number][] = [
        [5, 0], [5, 1], [5, 2], [5, 3], [5, 4],
        [0, 1], [1, 4], [4, 3], [3, 2], [2, 0]
      ];

      connections.forEach(([i, j]) => {
        const n1 = ns[i];
        const n2 = ns[j];
        const lineGrad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
        lineGrad.addColorStop(0, 'rgba(255, 105, 180, 0.45)');
        lineGrad.addColorStop(1, 'rgba(236, 72, 153, 0.45)');

        ctx.strokeStyle = lineGrad;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
      });

      ctx.setLineDash([]);

      // Draw nodes
      ns.forEach((node) => {
        const isHovered = hoveredNode?.id === node.id;
        const isSelected = selectedNode?.id === node.id;
        const pulse = Math.sin(angle * 3 + node.radius) * 2;

        // Outer glow aura
        ctx.shadowColor = '#FF69B4';
        ctx.shadowBlur = isHovered || isSelected ? 16 : 8;

        // Outer ring for central or selected node
        if (node.id === 'giet' || isSelected) {
          ctx.strokeStyle = 'rgba(255, 20, 147, 0.5)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 6 + pulse, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Star Core
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (isHovered ? 2 : 0), 0, Math.PI * 2);
        ctx.fill();

        // Inner white glimmer
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(node.x - node.radius / 3, node.y - node.radius / 3, node.radius / 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        // Text label
        ctx.font = 'bold 9px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#831843'; // rich deep rose
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + node.radius + 12);
      });

      angle += 0.02;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [hoveredNode, selectedNode]);

  // Click & hover detection on canvas
  const handleCanvasInteraction = (e: React.MouseEvent<HTMLCanvasElement>, isClick = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const hit = nodes.current.find((n) => {
      const dist = Math.hypot(n.x - x, n.y - y);
      return dist <= n.radius + 12;
    });

    if (isClick) {
      if (hit) setSelectedNode(hit);
    } else {
      setHoveredNode(hit || null);
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-3xl border-2 border-pink-200 bg-white/95 p-4 shadow-sm font-mono-telemetry text-xs text-[#3B1C22]">
      {/* Canvas viewport */}
      <div className="relative rounded-2xl border-2 border-pink-200 bg-[#FFF5F8] overflow-hidden h-[210px] w-full cursor-pointer">
        <canvas
          ref={canvasRef}
          width={320}
          height={210}
          className="w-full h-full block"
          onMouseMove={(e) => handleCanvasInteraction(e, false)}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={(e) => handleCanvasInteraction(e, true)}
        />

        {/* Floating Top Badge */}
        <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-xl bg-white/90 border border-pink-300 text-pink-600 text-[10px] font-bold tracking-wider flex items-center gap-1.5 shadow-sm">
          <SparkleDoodle className="w-3 h-3 text-pink-500" />
          <span>SRU GALAXY CONSTELLATIONS 🌌</span>
        </div>

        {/* Instructions pill */}
        <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-pink-500/90 text-white text-[9px] font-bold flex items-center gap-1 shadow-sm">
          <Eye size={10} />
          <span>Click any star to inspect node</span>
        </div>
      </div>

      {/* Selected Node Details or Overview */}
      {selectedNode ? (
        <div className="p-3 rounded-2xl bg-pink-50/80 border border-pink-200 flex flex-col gap-1 transition-all">
          <div className="flex items-center justify-between">
            <span className="font-bold text-pink-700 text-sm">{selectedNode.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-200 text-pink-800 font-bold">
              {selectedNode.category}
            </span>
          </div>
          <p className="text-[11px] text-neutral-600 font-sans">{selectedNode.description}</p>
          <div className="flex items-center gap-3 text-[10px] text-pink-600 font-bold pt-1">
            <span className="flex items-center gap-1">
              <Star size={10} fill="currentColor" />
              <span>{selectedNode.stars} telemetry stars</span>
            </span>
            <span>·</span>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-pink-500 underline hover:text-pink-700 cursor-pointer"
            >
              Reset view
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-pink-50/60 p-2 border border-pink-100">
            <span className="block text-[9px] text-pink-500 font-bold uppercase">Constellation</span>
            <span className="text-xs font-bold text-pink-800">6 Repos</span>
          </div>
          <div className="rounded-2xl bg-pink-50/60 p-2 border border-pink-100">
            <span className="block text-[9px] text-pink-500 font-bold uppercase">Telemetry Stars</span>
            <span className="text-xs font-bold text-pink-800">228 Nodes</span>
          </div>
          <div className="rounded-2xl bg-pink-50/60 p-2 border border-pink-100">
            <span className="block text-[9px] text-pink-500 font-bold uppercase">GIET Orbit</span>
            <span className="text-xs font-bold text-pink-800">Odisha Hub</span>
          </div>
        </div>
      )}
    </div>
  );
}
