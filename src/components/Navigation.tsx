import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Menu, 
  X, 
  Sparkles, 
  Heart, 
  Compass, 
  Layers, 
  BookOpen, 
  Send, 
  Orbit,
  ArrowRight,
  Code
} from 'lucide-react';
import { BowDoodle, SparkleDoodle } from './Doodles';

interface NavigationProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Navigation({ activeSection, scrollToSection }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Story Journey', shortLabel: 'Story', id: 'storytelling', icon: Compass },
    { label: 'Projects', shortLabel: 'Projects', id: 'projects', icon: Layers },
    { label: '3D Spiral', shortLabel: '3D Spiral', id: 'spiral', icon: Orbit, isNew: true },
    { label: 'Skills & Stickers', shortLabel: 'Skills', id: 'skills', icon: Heart },
    { label: 'Interactive Lab', shortLabel: 'Lab', id: 'playground', icon: Sparkles },
    { label: 'Insights & Blog', shortLabel: 'Blog', id: 'insights', icon: BookOpen },
    { label: 'Contact', shortLabel: 'Contact', id: 'contact', icon: Send },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  const activeItem = navItems.find((item) => item.id === activeSection) || navItems[0];

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 mx-auto z-50 px-3 sm:px-4 flex flex-col items-center pointer-events-none select-none">
      {/* Liquid Glass Pill Bar Container */}
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto relative flex items-center justify-between gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 rounded-full border transition-all duration-300 max-w-6xl ${
          scrolled
            ? 'bg-white/85 backdrop-blur-md border-white/90 ring-1 ring-pink-300/50 shadow-[0_8px_30px_rgba(244,114,182,0.22),0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.95)]'
            : 'bg-white/75 backdrop-blur-md border-white/80 ring-1 ring-pink-200/50 shadow-[0_4px_20px_rgba(244,114,182,0.14),0_1px_4px_rgba(0,0,0,0.02),inset_0_1px_2px_rgba(255,255,255,0.9)]'
        }`}
      >
        {/* Specular Highlight Sheen along top rim (Liquid Glass Reflection) */}
        <div className="pointer-events-none absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/95 to-transparent rounded-full opacity-90" />
        <div className="pointer-events-none absolute inset-x-10 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-pink-300/40 to-transparent rounded-full" />

        {/* Brand Pill */}
        <button
          onClick={() => handleNavClick('hero')}
          className="group relative flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-full hover:bg-white/60 transition-all border-none bg-transparent cursor-pointer text-[#3B1C22]"
          aria-label="Home / Hero"
        >
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 text-white shadow-sm ring-1 ring-white/80 group-hover:scale-105 transition-transform">
            <BowDoodle className="w-4 h-4 text-white" />
          </div>

          <div className="flex flex-col text-left leading-tight">
            <span className="font-serif-editorial font-bold text-sm tracking-tight text-[#3B1C22] group-hover:text-pink-600 transition-colors">
              Srustisri Panda
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono-telemetry font-bold text-pink-500">
              @sru-codes
            </span>
          </div>

          {/* Soft Live Activity Dot */}
          <span className="relative flex h-2 w-2 ml-0.5" title="Available for projects">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
          </span>
        </button>

        {/* Desktop Nav Items (Fluid Pill Track) */}
        <div 
          className="hidden lg:flex items-center gap-1 px-1.5 py-1 rounded-full bg-pink-100/40 border border-pink-200/50 backdrop-blur-sm relative"
          onMouseLeave={() => setHoveredId(null)}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold font-mono-telemetry tracking-wider transition-colors z-10 cursor-pointer border-none bg-transparent whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]'
                    : 'text-[#4A202A] hover:text-pink-700'
                }`}
              >
                {/* Active Liquid Pill (Sliding with spring physics) */}
                {isActive && (
                  <motion.div
                    layoutId="liquid-nav-active-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-pink-600 to-rose-500 shadow-[0_3px_12px_rgba(244,114,182,0.5),inset_0_1px_1px_rgba(255,255,255,0.7)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  />
                )}

                {/* Hover Liquid Capsule (Glides between links) */}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="liquid-nav-hover-pill"
                    className="absolute inset-0 rounded-full bg-white/75 border border-white/90 shadow-sm"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  <item.icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-pink-500'}`} />
                  <span>{item.shortLabel}</span>
                  {item.isNew && (
                    <span
                      className={`text-[9px] font-mono-telemetry font-bold px-1.5 py-0.2 rounded-full uppercase ${
                        isActive
                          ? 'bg-white/25 text-white ring-1 ring-white/50'
                          : 'bg-pink-200 text-pink-700 ring-1 ring-pink-300'
                      }`}
                    >
                      3D
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Action: Liquid Shimmer CTA button */}
        <div className="flex items-center gap-2">
          {/* Active section preview chip on mobile */}
          <div className="lg:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-100/70 border border-pink-200 text-[11px] font-mono-telemetry font-bold text-pink-700">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
            <span className="truncate max-w-[85px]">{activeItem.shortLabel}</span>
          </div>

          {/* Liquid Shimmer GitHub CTA */}
          <a
            href="https://github.com/sru-codes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Srustisri Panda on GitHub"
            className="relative overflow-hidden hidden sm:inline-flex items-center gap-2 rounded-full border border-pink-200/90 bg-white/80 px-3.5 py-1.5 text-xs font-bold text-pink-700 hover:bg-white hover:border-pink-300 hover:text-pink-800 transition-all shadow-[0_2px_8px_rgba(244,114,182,0.15)] group"
          >
            {/* Shimmer Sweep Animation */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:animate-liquid-shimmer bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            
            <Github size={14} className="text-pink-600 transition-transform group-hover:scale-110" />
            <span className="font-mono-telemetry">GitHub</span>
            <SparkleDoodle className="w-3 h-3 text-pink-400" />
          </a>

          {/* Mobile Drawer Toggle Pill Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full bg-pink-100/60 hover:bg-pink-100 border border-pink-200/70 text-pink-700 transition-colors border-none cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Liquid Glass Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto w-full max-w-sm mt-2 p-3 rounded-3xl border border-white/80 ring-1 ring-pink-300/40 bg-white/85 backdrop-blur-2xl shadow-[0_16px_40px_rgba(244,114,182,0.28),inset_0_1px_2px_rgba(255,255,255,0.9)] flex flex-col gap-1.5"
          >
            {/* Top specular shine for mobile drawer */}
            <div className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent rounded-full opacity-90" />

            <div className="px-3 py-1.5 flex items-center justify-between text-xs font-mono-telemetry font-bold text-pink-500 border-b border-pink-100">
              <span className="flex items-center gap-1.5">
                <BowDoodle className="w-3.5 h-3.5" />
                <span>NAVIGATION</span>
              </span>
              <span className="text-[10px] text-pink-400">@sru-codes</span>
            </div>

            <div className="flex flex-col gap-1 py-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-mono-telemetry font-bold tracking-wide transition-all border-none cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
                        : 'text-[#3B1C22] hover:bg-pink-100/60 hover:text-pink-700 bg-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-pink-500'}`} />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.isNew && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                            isActive ? 'bg-white/20 text-white' : 'bg-pink-200 text-pink-700'
                          }`}
                        >
                          3D
                        </span>
                      )}
                      <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-pink-300'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile GitHub CTA & Contact Pill */}
            <div className="pt-2 border-t border-pink-100 flex flex-col gap-2">
              <a
                href="https://github.com/sru-codes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-white border border-pink-200 text-pink-700 p-2.5 text-xs font-bold font-mono-telemetry shadow-sm hover:bg-pink-50"
              >
                <Github size={15} />
                <span>Visit @sru-codes on GitHub</span>
                <SparkleDoodle className="w-3.5 h-3.5 text-pink-400" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
