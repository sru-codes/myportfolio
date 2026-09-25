import { useState } from 'react';
import { Project, projects } from '../data/portfolioData';
import { ExternalLink, Github, X, Sparkles, Star } from 'lucide-react';
import { HeartDoodle, BowDoodle, SparkleDoodle } from './Doodles';

export default function ProjectExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'AI/ML' | 'Web Creative' | 'Interactive' | 'System'>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories: ('All' | 'AI/ML' | 'Web Creative' | 'Interactive' | 'System')[] = [
    'All',
    'AI/ML',
    'Web Creative',
    'Interactive',
    'System',
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8 text-left">
      {/* Dynamic Segmented Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-pink-100/60 rounded-2xl max-w-xl mx-auto border-2 border-pink-200">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer border-none ${
                isSelected
                  ? 'bg-pink-500 text-white shadow-md scale-102'
                  : 'text-pink-800 hover:text-pink-600 hover:bg-pink-200/50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Grid / Bento Inspired Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((proj, idx) => {
          const isWide = idx === 0 || idx === 3;
          return (
            <div
              key={proj.id}
              className={`group relative overflow-hidden rounded-3xl border-2 border-pink-200 bg-white shadow-sm hover:shadow-md hover:border-pink-400 transition-all duration-300 flex flex-col justify-between ${
                isWide ? 'md:col-span-2' : 'md:col-span-1'
              }`}
            >
              {/* Project Image & Header */}
              <div 
                onClick={() => setActiveProject(proj)}
                className="relative aspect-[16/9] md:aspect-auto md:h-52 overflow-hidden bg-pink-50 cursor-pointer"
              >
                {proj.image ? (
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-pink-100">
                    <span className="text-pink-500 text-xs font-mono-telemetry font-bold">Project Snapshot 🌸</span>
                  </div>
                )}
                
                {/* Badges on top */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 text-[10px] font-mono-telemetry tracking-wider bg-pink-500 text-white rounded-full uppercase font-bold flex items-center gap-1 shadow-sm">
                    <HeartDoodle className="w-3 h-3 text-white inline" />
                    <span>{proj.category}</span>
                  </span>
                  {proj.highlightBadge && (
                    <span className="px-3 py-1 text-[10px] font-mono-telemetry tracking-wider bg-white/95 text-pink-700 rounded-full font-bold shadow-sm border border-pink-200">
                      {proj.highlightBadge}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Description Container */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <h3 
                      onClick={() => setActiveProject(proj)}
                      className="text-xl sm:text-2xl font-serif-editorial font-bold text-[#3B1C22] group-hover:text-pink-600 transition-colors cursor-pointer"
                    >
                      {proj.title}
                    </h3>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${proj.title} on GitHub`}
                        className="p-2 rounded-xl text-pink-500 hover:bg-pink-100 transition-colors shrink-0"
                      >
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                    {proj.tagline}
                  </p>
                </div>

                {/* Tech stack badges */}
                <div className="space-y-3 pt-2 border-t border-pink-100">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech) => (
                      <span key={tech} className="text-[10px] font-mono-telemetry font-bold px-2 py-0.5 rounded-md bg-pink-50 text-pink-700 border border-pink-200">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setActiveProject(proj)}
                      className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1 cursor-pointer border-none bg-transparent"
                    >
                      <span>Explore Project Story</span>
                      <Sparkles size={12} className="text-pink-500" />
                    </button>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-neutral-500 hover:text-pink-600 flex items-center gap-1"
                      >
                        <span>GitHub Repo</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Detail Modal Overlay */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/40 backdrop-blur-sm"
          onClick={() => setActiveProject(null)}
        >
          <div
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border-2 border-pink-300 bg-white p-6 sm:p-8 shadow-2xl relative text-left"
          >
            {/* Close button */}
            <button
              onClick={() => setActiveProject(null)}
              aria-label="Close project modal"
              className="absolute top-5 right-5 p-2 rounded-full text-pink-600 hover:bg-pink-100 transition-colors border-none cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-[10px] font-mono-telemetry font-bold border border-pink-200">
                  {activeProject.category}
                </span>
                {activeProject.highlightBadge && (
                  <span className="px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-[10px] font-mono-telemetry font-bold border border-pink-200">
                    {activeProject.highlightBadge}
                  </span>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-[#3B1C22]">
                {activeProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-pink-700 font-sans font-semibold">
                {activeProject.tagline}
              </p>
            </div>

            {/* Project Image Banner */}
            {activeProject.image && (
              <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6 border border-pink-200 bg-pink-50">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Long Description */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-mono-telemetry font-bold text-pink-600 uppercase tracking-wider">
                ARCHITECTURAL BRIEF
              </h4>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                {activeProject.longDescription}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {activeProject.metrics.map((metric, i) => (
                <div key={i} className="p-3 rounded-2xl bg-pink-50/80 border border-pink-200 text-center">
                  <span className="block text-[9px] font-mono-telemetry text-pink-600 uppercase font-bold">
                    {metric.label}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-pink-800">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-mono-telemetry font-bold text-pink-600 uppercase tracking-wider">
                COMPONENTS & TECHNOLOGIES
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeProject.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-xl bg-pink-100 text-pink-800 text-xs font-mono-telemetry font-bold border border-pink-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-pink-200">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-2xl bg-pink-500 hover:bg-pink-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition-colors"
                >
                  <Github size={16} />
                  <span>Inspect Code on GitHub</span>
                </a>
              )}
              <button
                onClick={() => setActiveProject(null)}
                className="px-6 py-3 rounded-2xl border-2 border-pink-200 text-pink-700 font-bold text-xs hover:bg-pink-50 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
