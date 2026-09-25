import { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import Cursor from './components/Cursor';
import ScrollStory from './components/ScrollStory';
import VerticalStoryTimeline from './components/VerticalStoryTimeline';
import StoryJourney from './components/StoryJourney';
import ProjectExplorer from './components/ProjectExplorer';
import TechStickerBoard from './components/TechStickerBoard';
import ZXConsole from './components/ZXConsole';
import BlogReader from './components/BlogReader';
import ClickSparkles from './components/ClickSparkles';
import FloatingHeartsBackground from './components/FloatingHeartsBackground';
import SpiralGallerySection from './components/SpiralGallerySection';
import PhysicsFolderNotes from './components/PhysicsFolderNotes';
import AeroShardsLab from './components/AeroShardsLab';
import TextMotion from './components/TextMotion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ScribbleUnderline, 
  StarDoodle, 
  HeartDoodle, 
  SwirlDoodle, 
  SpeechBubbleDoodle, 
  ArrowDoodle, 
  BowDoodle, 
  SparkleDoodle, 
  CloudDoodle, 
  FlowerBlossomDoodle,
  WashiTape 
} from './components/Doodles';
import { 
  ArrowDown, 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  Send, 
  Sparkles, 
  ExternalLink, 
  GraduationCap, 
  Heart,
  Compass,
  Layers,
  CheckCircle2,
  Download
} from 'lucide-react';
import { sruProfile } from './data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [storyMode, setStoryMode] = useState<'both' | 'horizontal' | 'vertical'>('both');
  
  // Interactive Chibi avatar speech quotes
  const quotes = [
    "Hi! I'm Srustisri Panda 🌸 Welcome to my creative portfolio!",
    "I break code so I can learn how to fix it! 🤯✨",
    "B.Tech CSE student @ GIET University, Odisha, India 🎓",
    "SIH 2026: Built ORCA Marine Multi-Agent Intelligence 🌊",
    "Automated a Galaxy Generator to map GitHub constellations 🌌",
    "Exploring Backend microservices, AI/ML, and cozy web tools 💻",
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Connect Form State
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Initialize Lenis globally for smooth scrolling (single RAF ticker)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // ORIGINAL (preserved, not deleted — disabled by comment):
    // let rafId = 0;
    // function raf(time: number) {
    //   lenis.raf(time);
    //   rafId = requestAnimationFrame(raf);
    // }
    // rafId = requestAnimationFrame(raf);

    return () => {
      gsap.ticker.remove(update);
      // cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = id === 'hero' ? 0 : -85;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: yOffset });
      } else {
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        // ORIGINAL (preserved, not deleted — disabled by comment): window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        window.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
      }
      setActiveSection(id);
    }
  };

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0);
    } else {
      // ORIGINAL (preserved, not deleted — disabled by comment): window.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  // Throttled scroll listener to track active navbar selection without layout thrashing
  useEffect(() => {
    const sections = ['hero', 'storytelling', 'projects', 'spiral', 'skills', 'playground', 'insights', 'contact'];
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 140;
          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const top = el.offsetTop - 90;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !senderMessage) return;
    setFormSubmitted(true);
    setSenderName('');
    setSenderEmail('');
    setSenderMessage('');
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FFF0F4] text-[#3B1C22] selection:bg-pink-300 selection:text-pink-900 transition-colors duration-300 relative overflow-x-hidden font-sans">
      {/* Small floating hearts particle background */}
      <FloatingHeartsBackground />

      {/* Interactive Cute Click Sparkles */}
      <ClickSparkles />

      {/* Custom Kawaii Cursor */}
      <Cursor />

      {/* Floating Background Doodles for Dreamy Baby Pink Vibe */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <CloudDoodle className="absolute top-12 left-10 text-pink-300" />
        <CloudDoodle className="absolute top-1/3 right-12 text-pink-300" />
        <CloudDoodle className="absolute top-2/3 left-16 text-pink-300" />
        <SwirlDoodle className="absolute top-40 right-1/4 text-pink-300" />
        <SwirlDoodle className="absolute bottom-40 left-1/4 text-pink-300" />
        <StarDoodle className="absolute top-96 left-8 text-pink-400" />
        <HeartDoodle className="absolute top-1/2 right-8 text-pink-400" />
      </div>

      {/* Top Navigation */}
      <Navigation
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <main className="relative z-10">
        {/* ========================================================================= */}
        {/* HERO SECTION                                                             */}
        {/* ========================================================================= */}
        <section
          id="hero"
          className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-8 pt-24 sm:pt-28 pb-16 border-b-2 border-pink-200"
        >
          <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headline & Persona */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Cute Announcement Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border-2 border-pink-300 shadow-sm text-xs font-mono-telemetry font-bold text-pink-700">
                <BowDoodle className="w-4 h-4 text-pink-500" />
                <span>B.Tech CSE @ GIET University, Odisha</span>
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
              </div>

              {/* Main Name & Title */}
              <div className="space-y-2 relative">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-serif-editorial text-[#3B1C22] leading-[1.08]">
                  Srustisri Panda
                </h1>
                <div className="relative inline-block">
                  <TextMotion
                    text="&ldquo;I break code so I can learn how to fix it&rdquo;"
                    className="text-2xl sm:text-4xl font-serif-editorial italic text-pink-600 font-medium"
                    highlightWords={['break', 'fix']}
                  />
                  <ScribbleUnderline className="text-pink-400" />
                </div>
              </div>

              {/* Bio & Focus */}
              <p className="text-sm sm:text-base text-neutral-700 max-w-xl leading-relaxed">
                Hi, I'm <span className="font-bold text-pink-700">Sru</span>! 🎓 B.Tech Computer Science & Engineering student at GIET University in Khordha, Odisha. Exploring, experimenting, and evolving — building one repository at a time. I engineer backend microservices, explore collaborative AI swarms (SIH 2026), and build celestial galaxy generators with adorable baby-pink aesthetics.
              </p>

              {/* Quick Telemetry Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/90 border-2 border-pink-200 shadow-sm text-center">
                  <span className="block text-[10px] font-mono-telemetry text-pink-500 uppercase font-bold">University</span>
                  <span className="text-xs sm:text-sm font-bold text-pink-900">GIET Odisha</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/90 border-2 border-pink-200 shadow-sm text-center">
                  <span className="block text-[10px] font-mono-telemetry text-pink-500 uppercase font-bold">Hackathon</span>
                  <span className="text-xs sm:text-sm font-bold text-pink-900">SIH 2026 PS 26176</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/90 border-2 border-pink-200 shadow-sm text-center">
                  <span className="block text-[10px] font-mono-telemetry text-pink-500 uppercase font-bold">GitHub Hub</span>
                  <span className="text-xs sm:text-sm font-bold text-pink-900">@sru-codes</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/90 border-2 border-pink-200 shadow-sm text-center">
                  <span className="block text-[10px] font-mono-telemetry text-pink-500 uppercase font-bold">Aesthetic</span>
                  <span className="text-xs sm:text-sm font-bold text-pink-900">100% Baby Pink</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => scrollToSection('storytelling')}
                  className="px-6 py-3.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs sm:text-sm font-mono-telemetry shadow-md transition-all hover:scale-102 flex items-center gap-2 cursor-pointer border-none"
                >
                  <Sparkles size={16} />
                  <span>Begin Story Journey</span>
                  <ArrowDown size={14} className="animate-bounce" />
                </button>

                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-5 py-3.5 rounded-2xl bg-white hover:bg-pink-50 text-pink-700 font-bold text-xs sm:text-sm font-mono-telemetry border-2 border-pink-300 shadow-sm transition-all hover:scale-102 flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <HeartDoodle className="w-3.5 h-3.5 text-pink-500" />
                </button>

                <a
                  href="/srustisri-panda-cv.pdf"
                  download="Srustisri-Panda-CV.pdf"
                  className="px-5 py-3.5 rounded-2xl bg-white hover:bg-pink-50 text-pink-700 font-bold text-xs sm:text-sm font-mono-telemetry border-2 border-pink-300 shadow-sm transition-all hover:scale-102 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-200"
                >
                  <Download size={15} />
                  <span>Download CV</span>
                </a>

                <a
                  href="https://github.com/sru-codes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white hover:bg-pink-50 text-pink-700 border-2 border-pink-300 shadow-sm transition-all hover:scale-105 flex items-center justify-center"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} />
                </a>

                <a
                  href="https://www.linkedin.com/in/srustisri-panda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white hover:bg-pink-50 text-pink-700 border-2 border-pink-300 shadow-sm transition-all hover:scale-105 flex items-center justify-center"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Right Column: Chibi Avatar & Interactive Speech Bubble */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              {/* Interactive Speech Bubble */}
              <div className="w-full max-w-sm mb-4">
                <SpeechBubbleDoodle
                  text={quotes[quoteIndex]}
                  className="animate-pulse cursor-pointer select-none"
                  onClick={() => setQuoteIndex((prev) => (prev + 1) % quotes.length)}
                />
                <span className="block text-[9px] font-mono-telemetry text-pink-500 text-center mt-1">
                  (Tap speech bubble to cycle thoughts 💬)
                </span>
              </div>

              {/* Avatar Frame with Doodles */}
              <div className="relative group">
                {/* Cute Washi Tape Decor */}
                <WashiTape text="SRU // GIET ODISHA" className="absolute -top-3 left-6 z-20" />

                {/* Soft glow background */}
                <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-pink-300 via-rose-200 to-pink-200 opacity-60 blur-xl group-hover:opacity-80 transition-opacity" />

                {/* Avatar Card */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[36px] overflow-hidden border-4 border-white shadow-2xl bg-[#FFE4E9]">
                  <img
                    src="/src/assets/images/srustisri_chibi_avatar_1790242888033.jpg"
                    alt="Srustisri Panda Chibi Avatar"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Bottom cute tag overlay */}
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-pink-200 flex items-center justify-between shadow-sm">
                    <span className="text-[11px] font-bold text-pink-800 font-mono-telemetry">
                      Srustisri Panda
                    </span>
                    <span className="text-[10px] font-bold text-pink-500 font-mono-telemetry">
                      @sru-codes 🌸
                    </span>
                  </div>
                </div>

                {/* Floating sticker icons */}
                <div className="absolute -bottom-4 -left-4 p-2.5 rounded-2xl bg-white border-2 border-pink-300 shadow-md">
                  <StarDoodle className="w-6 h-6 text-pink-500" />
                </div>
                <div className="absolute -top-4 -right-4 p-2.5 rounded-2xl bg-white border-2 border-pink-300 shadow-md">
                  <BowDoodle className="w-6 h-6 text-pink-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STORYTELLING SECTION (DUAL: HORIZONTAL GLIDER & VERTICAL TIMELINE)        */}
        {/* ========================================================================= */}
        <section id="storytelling" className="relative py-12 border-b-2 border-pink-200">
          {/* Mode Switcher Header */}
          <div className="max-w-4xl mx-auto px-4 mb-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-xs font-mono-telemetry font-bold">
              <SparkleDoodle className="w-3.5 h-3.5 text-pink-500" />
              <span>IMMERSIVE STORYTELLING EXPERIENCE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-serif-editorial text-[#3B1C22]">
              Scroll Through My Development Process
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
              Choose your preferred journey style or experience both: glide horizontally through developmental epochs or explore the vertical chronological timeline.
            </p>

            {/* Toggle tabs */}
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-white border-2 border-pink-200 shadow-sm gap-2">
              <button
                onClick={() => setStoryMode('both')}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono-telemetry transition-all cursor-pointer border-none ${
                  storyMode === 'both' ? 'bg-pink-500 text-white shadow-sm' : 'text-pink-700 hover:bg-pink-50'
                }`}
              >
                ✨ Both Experiences
              </button>
              <button
                onClick={() => setStoryMode('horizontal')}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono-telemetry transition-all cursor-pointer border-none ${
                  storyMode === 'horizontal' ? 'bg-pink-500 text-white shadow-sm' : 'text-pink-700 hover:bg-pink-50'
                }`}
              >
                🎠 Horizontal Glider
              </button>
              <button
                onClick={() => setStoryMode('vertical')}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono-telemetry transition-all cursor-pointer border-none ${
                  storyMode === 'vertical' ? 'bg-pink-500 text-white shadow-sm' : 'text-pink-700 hover:bg-pink-50'
                }`}
              >
                📜 Vertical Timeline
              </button>
            </div>
          </div>

          {/* Horizontal Scroll Storytelling Component */}
          {(storyMode === 'both' || storyMode === 'horizontal') && (
            <div className="mb-12">
              <ScrollStory />
            </div>
          )}

          {/* Vertical Storytelling Component */}
          {(storyMode === 'both' || storyMode === 'vertical') && (
            <div className="py-6">
              <VerticalStoryTimeline />
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE DIAGNOSTIC LABORATORIES                                      */}
        {/* ========================================================================= */}
        <section id="story-docks" className="py-20 px-4 sm:px-8 border-b-2 border-pink-200 bg-[#FFF5F8]">
          <div className="max-w-7xl mx-auto space-y-12">
            <StoryJourney />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* DYNAMIC PROJECTS SECTION                                                 */}
        {/* ========================================================================= */}
        <section id="projects" className="py-20 px-4 sm:px-8 border-b-2 border-pink-200">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-mono-telemetry font-bold border border-pink-200">
                <HeartDoodle className="w-3.5 h-3.5 text-pink-500" />
                <span>GITHUB REPOSITORIES & EXPERIMENTS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold font-serif-editorial text-[#3B1C22]">
                Featured Projects
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto">
                Explore real projects authored by Srustisri Panda, spanning Smart India Hackathon multi-agent AI, celestial telemetry engines, and data science models.
              </p>
            </div>

            <ProjectExplorer />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* REACT BITS INFINITE SPIRAL 3D GALLERY                                    */}
        {/* ========================================================================= */}
        <section id="spiral" className="py-20 px-4 sm:px-8 border-b-2 border-pink-200 bg-[#FFF5F8]">
          <div className="max-w-7xl mx-auto">
            <SpiralGallerySection />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CUTE TECH STACK STICKER BOARD                                            */}
        {/* ========================================================================= */}
        <section id="skills" className="py-20 px-4 sm:px-8 border-b-2 border-pink-200 bg-[#FFEBF0]/50">
          <TechStickerBoard />
        </section>

        {/* ========================================================================= */}
        {/* COZY INTERACTIVE PLAYROOM: PHYSICS, SHADERS & ARCADE TOYS                 */}
        {/* ========================================================================= */}
        <section id="playground" className="py-20 px-4 sm:px-8 border-b-2 border-pink-200 bg-gradient-to-b from-[#FFF0F4] to-[#FFEBF0]/30">
          <div className="max-w-6xl mx-auto text-center space-y-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-mono-telemetry font-bold border border-pink-200">
                <BowDoodle className="w-4 h-4 text-pink-500" />
                <span>COZY INTERACTIVE PLAYROOM</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold font-serif-editorial text-[#3B1C22]">
                Interactive Toys &amp; Shaders
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto">
                Take a cheerful break! Sculpt 3D AeroShards and ASCII FlowTrails with WebGPU, toss notes in zero gravity with Matter.js physics, or dodge blocks in the retro ZX-Pocket arcade.
              </p>
            </div>

            {/* Featured: AeroShards & ASCII FlowTrail WebGPU Wind Sculpture */}
            <div>
              <AeroShardsLab />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Zero-Gravity Physics Folder */}
              <div className="lg:col-span-7">
                <PhysicsFolderNotes />
              </div>

              {/* Right Column: Retro ZX-Pocket Arcade Mini Game */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl border-2 border-pink-200 bg-white/90 shadow-sm space-y-4">
                <div className="text-center space-y-1">
                  <div className="text-xs font-mono-telemetry font-bold text-pink-600 uppercase tracking-wider">
                    RETRO CANVASES
                  </div>
                  <h3 className="text-xl font-bold font-serif-editorial text-[#3B1C22]">
                    ZX-Pocket Arcade
                  </h3>
                  <p className="text-[11px] text-neutral-600 max-w-xs">
                    Use arrow keys or touch buttons to guide your pink ship through the meteor field.
                  </p>
                </div>
                <ZXConsole />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTEGRATED TECHNICAL BLOG & INSIGHTS                                     */}
        {/* ========================================================================= */}
        <section id="insights" className="py-20 px-4 sm:px-8 border-b-2 border-pink-200 bg-[#FFF5F8]">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-mono-telemetry font-bold border border-pink-200">
                <SparkleDoodle className="w-3.5 h-3.5 text-pink-500" />
                <span>ARTICLES & TUTORIALS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold font-serif-editorial text-[#3B1C22]">
                Technical Insights
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto">
                Articles, architecture breakdowns, and learnings from GIET University, SIH Hackathons, and open source telemetry builders.
              </p>
            </div>

            <BlogReader />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CONTACT & PERSONAL STATEMENT                                             */}
        {/* ========================================================================= */}
        <section id="contact" className="py-20 px-4 sm:px-8 bg-white/70">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
            {/* Left Column: Personal Statement & Links */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-mono-telemetry font-bold border border-pink-200">
                <HeartDoodle className="w-3.5 h-3.5 text-pink-500" />
                <span>LET'S CONNECT & BUILD TOGETHER</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold font-serif-editorial text-[#3B1C22]">
                Get In Touch
              </h2>

              <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                Whether you want to discuss collaborative AI agents, ocean telemetry, open source development, or just want to chat about code and cute designs, my inbox is always open!
              </p>

              <div className="space-y-3 pt-2 text-xs font-mono-telemetry text-pink-900">
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-pink-50 border border-pink-200">
                  <MapPin size={18} className="text-pink-500 shrink-0" />
                  <div>
                    <span className="block font-bold">Location</span>
                    <span className="text-neutral-600">Khordha, Odisha, India</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-pink-50 border border-pink-200">
                  <GraduationCap size={18} className="text-pink-500 shrink-0" />
                  <div>
                    <span className="block font-bold">College</span>
                    <span className="text-neutral-600">GIET University, Odisha (B.Tech CSE)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-pink-50 border border-pink-200">
                  <Github size={18} className="text-pink-500 shrink-0" />
                  <div>
                    <span className="block font-bold">GitHub</span>
                    <a href="https://github.com/sru-codes" target="_blank" rel="noreferrer" className="text-pink-700 underline font-bold">
                      github.com/sru-codes
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-pink-50 border border-pink-200">
                  <Linkedin size={18} className="text-pink-500 shrink-0" />
                  <div>
                    <span className="block font-bold">LinkedIn</span>
                    <a href="https://www.linkedin.com/in/srustisri-panda/" target="_blank" rel="noreferrer" className="text-pink-700 underline font-bold">
                      linkedin.com/in/srustisri-panda
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Message Box */}
            <div className="lg:col-span-6">
              <div className="p-8 rounded-3xl border-2 border-pink-300 bg-white shadow-xl relative">
                <WashiTape text="DIRECT DISPATCH // TO SRU" className="absolute -top-3 right-6" />

                <h3 className="text-2xl font-serif-editorial font-bold text-[#3B1C22] mb-1">
                  Send a Cute Message 💌
                </h3>
                <p className="text-xs text-neutral-600 mb-6 font-sans">
                  Drop a note, question, or encouragement directly to Srustisri.
                </p>

                {formSubmitted ? (
                  <div className="p-6 rounded-2xl bg-pink-100 text-pink-800 border-2 border-pink-300 text-center space-y-2">
                    <CheckCircle2 size={32} className="text-pink-600 mx-auto" />
                    <h4 className="font-bold text-sm">Message Sent With Love! 🌸</h4>
                    <p className="text-xs text-neutral-700">
                      Thank you for reaching out! Sru will reply to your note promptly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono-telemetry font-bold text-pink-700 mb-1 uppercase">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-pink-200 focus:border-pink-500 outline-none text-xs font-mono-telemetry font-bold bg-[#FFF5F8]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-telemetry font-bold text-pink-700 mb-1 uppercase">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@example.com"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-pink-200 focus:border-pink-500 outline-none text-xs font-mono-telemetry font-bold bg-[#FFF5F8]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-telemetry font-bold text-pink-700 mb-1 uppercase">
                        Your Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Say hello or share a fun project idea..."
                        value={senderMessage}
                        onChange={(e) => setSenderMessage(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-pink-200 focus:border-pink-500 outline-none text-xs font-mono-telemetry bg-[#FFF5F8] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs font-mono-telemetry uppercase tracking-wider shadow-md transition-all cursor-pointer border-none flex items-center justify-center gap-2"
                    >
                      <Send size={14} />
                      <span>Send Dispatch to Sru</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <footer className="border-t-2 border-pink-200 bg-[#FFF0F4] py-10 px-4 text-center text-xs font-mono-telemetry text-pink-800">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-pink-600 font-bold">
            <BowDoodle className="w-4 h-4 text-pink-500" />
            <span>Srustisri Panda (@sru-codes)</span>
            <span>·</span>
            <span>GIET University, Odisha, India</span>
          </div>
          <p className="text-neutral-500 text-[11px]">
            Designed with 💖, strawberry milk pastel aesthetics, cute doodles, and high-performance interactive code.
          </p>
          <div className="flex items-center justify-center gap-4 text-pink-600 pt-2 font-bold">
            <a href="https://github.com/sru-codes" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
            <span>·</span>
            <a href="https://www.linkedin.com/in/srustisri-panda/" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
            <span>·</span>
            <button onClick={scrollToTop} className="hover:underline bg-transparent border-none cursor-pointer text-pink-600 font-bold">Back to Top ↑</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
