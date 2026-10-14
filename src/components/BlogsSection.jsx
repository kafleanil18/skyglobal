import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { BLOGS as DEFAULT_BLOGS } from '../data/skyGlobalData';
import { 
  FileText, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  X,
  ExternalLink
} from 'lucide-react';

export default function BlogsSection() {
  const cms = useCMS();
  const blogList = cms?.blogs || DEFAULT_BLOGS;
  const [activeBlog, setActiveBlog] = useState(null);

  return (
    <section id="blogs" className="py-24 bg-white text-slate-900 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5f2f9] text-[#101a6d] border border-[#25c0f3]/30 text-xs font-bold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5 text-[#101a6d]" />
            Visa & Immigration Intelligence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-4">
            Latest Global Visa & Recruitment News
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Timely legal developments, European immigration changes, and international hiring updates curated by Sky Global HR Consultancy.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogList.map((blog) => (
            <article 
              key={blog.id}
              className="bg-slate-50/70 rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#ffd300]/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-950/80 text-[#ffd300] backdrop-blur-md">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span className="text-[#101a6d] font-bold">{blog.source}</span>
                  </div>

                  <h3 
                    onClick={() => setActiveBlog(blog)}
                    className="text-lg font-bold font-display text-slate-900 group-hover:text-[#101a6d] transition-colors cursor-pointer line-clamp-2 mb-3"
                  >
                    {blog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {blog.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveBlog(blog)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-white hover:bg-gradient-to-r hover:from-[#ffd300] hover:to-[#f9c913] hover:text-[#020024] border border-slate-200 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Read Full Update</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Modal for Full Article View */}
        {activeBlog && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-fade-in max-h-[90vh] flex flex-col">
              <div className="relative h-48 shrink-0">
                <img
                  src={activeBlog.image}
                  alt={activeBlog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
                <button
                  onClick={() => setActiveBlog(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs font-bold text-[#ffd300] uppercase tracking-wider">
                    {activeBlog.category} • {activeBlog.date}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                    {activeBlog.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-sm text-slate-700 leading-relaxed">
                <div className="bg-[#e5f2f9] p-3 rounded-xl border border-[#25c0f3]/30 text-xs font-semibold text-[#101a6d]">
                  Source: {activeBlog.source}
                </div>

                <div className="whitespace-pre-line space-y-4 text-slate-700">
                  {activeBlog.content}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
                <button
                  onClick={() => setActiveBlog(null)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-[#020024] bg-gradient-to-r from-[#ffd300] to-[#f9c913] hover:from-[#ffdf47] hover:to-[#ffd300] shadow-md shadow-[#ffd300]/25"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
