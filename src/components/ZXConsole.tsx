import { useState, useEffect, useRef } from 'react';

export default function ZXConsole() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(120);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Game Variables
  const playerX = useRef(60);
  const blockY = useRef(0);
  const blockX = useRef(30);

  // Start mini game
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    playerX.current = 65;
    blockY.current = 0;
    blockX.current = Math.random() * 110 + 10;
  };

  const handleAction = (dir: 'left' | 'right') => {
    if (gameState !== 'playing') return;
    if (dir === 'left') {
      playerX.current = Math.max(10, playerX.current - 15);
    } else {
      playerX.current = Math.min(120, playerX.current + 15);
    }
  };

  // Main interactive render loops
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains('dark');

      // LCD Screen retro styling (cute soft-pink bg)
      ctx.fillStyle = isDark ? '#1C0D10' : '#FFF5F6'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw pixel scanlines for tech texture
      ctx.strokeStyle = isDark ? 'rgba(255, 182, 193, 0.05)' : 'rgba(239, 110, 143, 0.05)';
      ctx.lineWidth = 1;
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const textColor = isDark ? '#FFF0F2' : '#2E181C';
      const labelColor = isDark ? '#FFB6C1' : '#E96E8F';

      if (gameState === 'idle') {
        ctx.fillStyle = textColor;
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('ZX-POCKET v2.0 🌸', canvas.width / 2, 45);
        ctx.font = '6px monospace';
        ctx.fillStyle = labelColor;
        ctx.fillText('PRESS [START] TO PLAY', canvas.width / 2, 65);
        ctx.fillText('DODGE FALLING BLOCKS', canvas.width / 2, 75);
      } else if (gameState === 'gameover') {
        ctx.fillStyle = '#E11D48'; // Cute rose red
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SYSTEM COLLISION! 💔', canvas.width / 2, 45);
        ctx.fillStyle = textColor;
        ctx.font = '8px monospace';
        ctx.fillText(`SCORE: ${score}`, canvas.width / 2, 65);
        ctx.font = '6px monospace';
        ctx.fillStyle = labelColor;
        ctx.fillText('TAP [START] TO RETRY', canvas.width / 2, 85);
      } else if (gameState === 'playing') {
        // Falling obstacle block (represented as cute hot pink square)
        ctx.fillStyle = '#FF69B4'; 
        ctx.beginPath();
        ctx.roundRect(blockX.current, blockY.current, 12, 12, 4);
        ctx.fill();

        // Player ship / cute chibi bubble block
        ctx.fillStyle = '#FF1493'; 
        ctx.beginPath();
        ctx.roundRect(playerX.current, 105, 14, 10, 3);
        ctx.fill();

        // Eye glimmers on user ship
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(playerX.current + 3, 107, 2, 2);
        ctx.fillRect(playerX.current + 9, 107, 2, 2);

        // Update physics
        blockY.current += 3.2;

        // Collide boundaries or pass
        if (blockY.current > 120) {
          blockY.current = 0;
          blockX.current = Math.random() * 110 + 10;
          setScore((s) => {
            const next = s + 10;
            if (next > highScore) setHighScore(next);
            return next;
          });
        }

        // Collision detection math
        const playerBox = { x: playerX.current, y: 105, w: 14, h: 10 };
        const blockBox = { x: blockX.current, y: blockY.current, w: 12, h: 12 };

        if (
          blockBox.x < playerBox.x + playerBox.w &&
          blockBox.x + blockBox.w > playerBox.x &&
          blockBox.y < playerBox.y + playerBox.h &&
          blockBox.y + blockBox.h > playerBox.y
        ) {
          setGameState('gameover');
        }

        // Display scores inside screen overlay
        ctx.fillStyle = textColor;
        ctx.font = 'bold 6px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`SCORE: ${score}`, 6, 12);
        ctx.textAlign = 'right';
        ctx.fillText(`BEST: ${highScore}`, canvas.width - 6, 12);
      }

      animId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [gameState, score, highScore]);

  return (
    <div className="w-[280px] mx-auto rounded-[2.5rem] border-2 border-pink-200 bg-white p-5 shadow-xl flex flex-col gap-4 dark:border-pink-900 dark:bg-[#1E1013]">
      {/* Dynamic Screen viewport */}
      <div className="relative rounded-2xl border-4 border-pink-200 dark:border-pink-900 bg-white overflow-hidden h-[130px] w-full">
        <canvas
          ref={canvasRef}
          width={150}
          height={125}
          className="w-full h-full block"
        />
        {/* Soft glass red LED indicator */}
        <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-pink-500 animate-ping" />
      </div>

      {/* Handheld Game Controls Layout */}
      <div className="grid grid-cols-12 items-center gap-3">
        {/* Left: Direction D-pad */}
        <div className="col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-16 h-16 bg-pink-50 dark:bg-pink-950/20 rounded-full flex items-center justify-center border-2 border-pink-100 dark:border-pink-900">
            <button
              onClick={() => handleAction('left')}
              aria-label="Move left"
              className="interactive-item absolute left-1 w-5 h-5 bg-pink-500 hover:bg-pink-400 rounded-lg text-white font-bold flex items-center justify-center text-[10px] active:scale-95 cursor-pointer border-none"
            >
              ◀
            </button>
            <button
              onClick={() => handleAction('right')}
              aria-label="Move right"
              className="interactive-item absolute right-1 w-5 h-5 bg-pink-500 hover:bg-pink-400 rounded-lg text-white font-bold flex items-center justify-center text-[10px] active:scale-95 cursor-pointer border-none"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Center: Brand badge */}
        <div className="col-span-2 text-center flex flex-col justify-center items-center">
          <span className="block text-[8px] font-bold text-pink-500 dark:text-pink-400 tracking-widest font-serif-editorial">ZX</span>
          <span className="block text-[5px] text-pink-400 font-bold uppercase">POCKET🌸</span>
        </div>

        {/* Right: Functional Action Trigger buttons */}
        <div className="col-span-5 flex justify-end gap-3 pr-1">
          <button
            onClick={gameState === 'playing' ? () => setGameState('idle') : startGame}
            className="interactive-item w-11 h-11 rounded-full bg-pink-500 hover:bg-pink-400 text-white font-bold shadow flex items-center justify-center text-[8px] hover:scale-105 active:scale-95 transition-transform cursor-pointer border-none"
          >
            {gameState === 'playing' ? 'STOP' : 'START'}
          </button>
        </div>
      </div>
    </div>
  );
}
