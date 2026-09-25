import { useState } from 'react';
import { BlogPost, blogPosts } from '../data/portfolioData';
import { Search, ArrowLeft, BookOpen } from 'lucide-react';
import { HeartDoodle, SparkleDoodle, BowDoodle } from './Doodles';

export default function BlogReader() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  // Filter posts by search term & selected tag
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-8 text-left">
      {activePost ? (
        /* Full Blog Post Detail View */
        <article className="space-y-6 max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border-2 border-pink-200 shadow-sm">
          {/* Back Action Header */}
          <button
            onClick={() => setActivePost(null)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-pink-600 hover:text-pink-500 transition-colors cursor-pointer border-none bg-transparent"
          >
            <ArrowLeft size={14} />
            <span>Back to Insights Index</span>
          </button>

          {/* Post Title & Editorial Metadata */}
          <div className="space-y-3 border-b-2 border-pink-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{activePost.emoji}</span>
              <span className="text-xs font-mono-telemetry font-bold px-3 py-1 rounded-full bg-pink-100 text-pink-700">
                {activePost.category}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#3B1C22] leading-tight">
              {activePost.title}
            </h3>
            
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono-telemetry uppercase tracking-wider font-semibold">
              <span>{activePost.date}</span>
              <span aria-hidden="true">·</span>
              <span>{activePost.readTime}</span>
            </div>
          </div>

          {/* Markdown simulated text contents */}
          <div className="prose max-w-none text-neutral-700 text-sm leading-relaxed space-y-5 font-sans">
            {activePost.content.split('\n\n').map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('### ')) {
                return (
                  <h4 key={index} className="text-xl font-bold font-serif-editorial text-pink-800 pt-3">
                    {trimmed.replace('### ', '')}
                  </h4>
                );
              }
              if (trimmed.startsWith('#### ')) {
                return (
                  <h5 key={index} className="text-base font-bold font-mono-telemetry text-pink-700 pt-2">
                    {trimmed.replace('#### ', '')}
                  </h5>
                );
              }

              if (trimmed.startsWith('* ')) {
                return (
                  <ul key={index} className="list-disc pl-5 space-y-1.5 text-neutral-700">
                    {trimmed.split('\n').map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet.replace('* ', '')}</li>
                    ))}
                  </ul>
                );
              }

              if (trimmed.startsWith('`')) {
                return (
                  <pre data-lenis-prevent key={index} className="bg-pink-50 p-4 rounded-2xl border border-pink-200 font-mono-telemetry text-xs overflow-x-auto text-pink-900 max-h-[300px]">
                    <code>{trimmed.replaceAll('`', '')}</code>
                  </pre>
                );
              }

              return <p key={index}>{trimmed}</p>;
            })}
          </div>

          {/* Article Footer with associated tags */}
          <div className="pt-6 border-t-2 border-pink-100 flex flex-wrap gap-2 items-center">
            <span className="text-[11px] text-pink-600 font-mono-telemetry uppercase font-bold">Topic Index:</span>
            {activePost.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono-telemetry text-pink-700 bg-pink-100 px-2 py-0.5 rounded-md font-bold"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>
      ) : (
        /* Blog Index / List View */
        <div className="space-y-6">
          {/* Search bar & Tag filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-pink-400" />
              <input
                type="text"
                placeholder="Search articles & tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl border-2 border-pink-200 bg-white text-[#3B1C22] outline-none focus:border-pink-400 transition-colors shadow-sm font-bold"
              />
            </div>

            {/* Filter buttons for tags */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                  selectedTag === null
                    ? 'bg-pink-500 text-white border-pink-500 shadow-sm'
                    : 'bg-white text-pink-700 border-pink-200 hover:border-pink-300'
                }`}
              >
                All Topics
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-pink-500 text-white border-pink-500 shadow-sm'
                      : 'bg-white text-pink-700 border-pink-200 hover:border-pink-300'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Blog posts list */}
          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => setActivePost(post)}
                  className="group p-6 rounded-3xl border-2 border-pink-200 bg-white hover:border-pink-400 hover:shadow-md cursor-pointer transition-all duration-300 shadow-sm"
                >
                  <div className="space-y-2 text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-mono-telemetry text-pink-600 uppercase tracking-wider font-bold">
                        <span>{post.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <span className="text-xl group-hover:scale-125 transition-transform">{post.emoji}</span>
                    </div>

                    <h3 className="text-xl font-bold font-serif-editorial text-[#3B1C22] group-hover:text-pink-600 flex items-center gap-2">
                      <HeartDoodle className="w-4 h-4 text-pink-400 shrink-0" />
                      <span>{post.title}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-2 font-sans">
                      {post.summary}
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-12 rounded-3xl border-2 border-dashed border-pink-200 bg-white/50">
                <span className="block text-xs font-mono-telemetry text-pink-400 font-bold">
                  No matching tutorials found in archives. 🌸
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
