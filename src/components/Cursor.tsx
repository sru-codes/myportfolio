import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId = 0;
    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive-item')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Optimized RAF loop: direct transform updates with zero React re-renders!
    const render = () => {
      if (isVisible) {
        // Dot follows cursor immediately
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        }
        // Ring smoothly trails behind
        ringX += (mouseX - ringX) * 0.22;
        ringY += (mouseY - ringY) * 0.22;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none">
      {/* Tiny Chrome Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-pink-600 opacity-0 will-change-transform"
        style={{
          scale: clicked ? '0.7' : hovered ? '1.5' : '1',
          transition: 'scale 0.15s ease-out',
        }}
      />
      {/* Trailing Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-7 w-7 rounded-full border border-pink-400 opacity-0 will-change-transform"
        style={{
          scale: clicked ? '1.2' : hovered ? '1.8' : '1',
          backgroundColor: hovered ? 'rgba(244, 114, 182, 0.15)' : 'transparent',
          transition: 'scale 0.15s ease-out, background-color 0.15s ease-out',
        }}
      />
    </div>
  );
}
