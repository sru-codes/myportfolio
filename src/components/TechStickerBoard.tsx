import { useState } from 'react';
import { techStackCategories } from '../data/portfolioData';
import { BowDoodle, SparkleDoodle, HeartDoodle, FlowerBlossomDoodle } from './Doodles';

export default function TechStickerBoard() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 text-left">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-mono-telemetry font-bold border border-pink-200">
          <FlowerBlossomDoodle className="w-4 h-4 text-pink-500" />
          <span>SRU'S TOOLBOX & CAPABILITIES</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#3B1C22]">
          Cute Tech Stack Sticker Board
        </h3>
        <p className="text-xs text-neutral-600 max-w-md mx-auto">
          Hover over stickers to view proficiency details and architectural focus areas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {techStackCategories.map((cat, idx) => (
          <div 
            key={cat.category}
            className="p-6 rounded-3xl border-2 border-pink-200 bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-pink-100">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h4 className="font-serif-editorial font-bold text-base text-[#3B1C22]">
                    {cat.category}
                  </h4>
                  <span className="text-[10px] font-mono-telemetry text-pink-500 font-bold uppercase">
                    GROUP {idx + 1}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => {
                  const isSelected = selectedTech === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onClick={() => setSelectedTech(isSelected ? null : skill.name)}
                      className={`px-3 py-2 rounded-2xl border-2 text-xs font-mono-telemetry font-bold transition-all cursor-pointer cute-hover-wiggle flex items-center gap-1.5 ${
                        isSelected 
                          ? 'border-pink-500 bg-pink-500 text-white scale-105 shadow-sm'
                          : `${skill.cuteColor} hover:scale-105`
                      }`}
                    >
                      <SparkleDoodle className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-pink-400'}`} />
                      <span>{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-[10px] font-mono-telemetry text-pink-600 font-bold">
              <span>{cat.skills.length} TECHNOLOGIES</span>
              <HeartDoodle className="w-3 h-3 text-pink-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
