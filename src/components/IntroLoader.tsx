import { useEffect, useState } from 'react';
import AnimationLoader from './AnimationLoader';
import { BowDoodle, FlowerBlossomDoodle, SmileyDoodle, SparkleDoodle } from './Doodles';

const CHAPTERS = [
  { from: 0, title: 'Opening the studio', detail: 'Preparing the first frame.' },
  { from: 25, title: 'Tuning the details', detail: 'Settling the type, color, and rhythm.' },
  { from: 50, title: 'Connecting the story', detail: 'Bringing the selected work into focus.' },
  { from: 75, title: 'Adding the final polish', detail: 'Checking every detail before the handoff.' },
  { from: 100, title: 'Welcome to Sru Codes', detail: 'Your portfolio tour is ready.' },
] as const;

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reducedMotion ? 180 : 2800;
    const startedAt = performance.now();
    let frame = 0;
    let completionTimer = 0;

    document.body.style.overflow = 'hidden';

    const update = (now: number) => {
      const nextProgress = Math.min(100, Math.round(((now - startedAt) / duration) * 100));
      setProgress(nextProgress);

      if (nextProgress < 100) {
        frame = requestAnimationFrame(update);
      } else {
        completionTimer = window.setTimeout(onComplete, reducedMotion ? 0 : 900);
      }
    };

    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(completionTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  const chapter = CHAPTERS.reduce(
    (current, item) => (progress >= item.from ? item : current),
    CHAPTERS[0],
  );

  return (
    <div
      className="intro-shell fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-[#FFF7F9] px-5"
      data-finishing={progress === 100 ? 'true' : undefined}
      aria-label="Loading Sru Codes portfolio"
    >
      <div className="intro-orb intro-orb-one pointer-events-none absolute left-[8%] top-[16%] h-20 w-20 rounded-full border border-pink-200 bg-pink-100/60" />
      <div className="intro-orb intro-orb-two pointer-events-none absolute bottom-[14%] right-[10%] h-28 w-28 rounded-full border-2 border-rose-100 bg-pink-50" />
      <SparkleDoodle className="pointer-events-none absolute left-[14%] bottom-[22%] h-7 w-7 text-pink-300 motion-reduce:animate-none" />
      <BowDoodle className="pointer-events-none absolute right-[14%] top-[20%] h-9 w-9 text-pink-300 motion-reduce:animate-none" />

      <div className="intro-card relative w-full max-w-xl rounded-[2rem] border-2 border-pink-200 bg-white px-6 py-8 shadow-[0_24px_80px_rgba(190,75,115,0.16)] sm:px-10 sm:py-10">
        <FlowerBlossomDoodle className="absolute -left-5 -top-5 h-12 w-12 rotate-[-12deg] text-pink-200" />
        <SmileyDoodle className="absolute -bottom-6 -right-4 hidden h-20 w-20 text-pink-200 sm:block" />

        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full border border-pink-200 bg-pink-50 px-3 py-1.5 font-mono-telemetry text-[10px] font-bold uppercase tracking-[0.2em] text-pink-600">
            SRU // Portfolio
          </span>
          <span className="flex items-center gap-2 font-mono-telemetry text-[10px] font-bold uppercase tracking-[0.16em] text-pink-400">
            <span className="h-2 w-2 rounded-full bg-pink-400 motion-safe:animate-ping" />
            Loading
          </span>
        </div>

        <div className="mt-10 flex items-end justify-between gap-6">
          <p
            key={chapter.title}
            className="intro-scene-copy max-w-[15rem] font-serif-editorial text-2xl font-bold leading-tight text-[#3B1C22] sm:text-3xl"
            aria-live="polite"
          >
            {chapter.title}
          </p>
          <span
            className="font-mono-telemetry text-[clamp(4.5rem,18vw,8rem)] font-bold leading-[0.8] tracking-[-0.08em] text-pink-500"
            aria-hidden="true"
          >
            {progress}
          </span>
        </div>

        <div
          className="mt-8 h-2.5 overflow-hidden rounded-full bg-pink-100"
          role="progressbar"
          aria-label="Portfolio introduction progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-valuetext={`${progress}% — ${chapter.title}`}
        >
          <div
            className="h-full rounded-full bg-pink-500 transition-[width] duration-75 ease-out motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-neutral-500">{chapter.detail}</p>
          <AnimationLoader
            className="shrink-0 px-3 py-2"
            label={progress === 100 ? 'Ready to explore' : `${progress}% complete`}
          />
        </div>
      </div>
    </div>
  );
}
