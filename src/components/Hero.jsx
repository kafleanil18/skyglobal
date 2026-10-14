import React from 'react';
import { 
  Search, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle, 
  Globe, 
  Building2, 
  Briefcase,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { COMPANY_INFO, COUNTRIES } from '../data/skyGlobalData';

export default function Hero({ 
  searchQuery, 
  setSearchQuery, 
  selectedCountry, 
  setSelectedCountry,
  onSearchSubmit,
  onOpenHireModal,
  onOpenResumeModal
}) {
  const trendingSearches = ['Electrician (Malta)', 'Maintenance Tech', 'Plumber', 'MEP Project Manager', 'Housekeeping', 'Australia Subclass 407'];

  return (
    <section id="home" className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-slate-950 text-white">
      {/* Background gradients & subtle geometric pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(2,132,199,0.22),rgba(11,22,44,0.98))] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(245, 158, 11, 0.4) 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-lg shadow-amber-500/5">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Licensed Overseas Recruitment • Bur Dubai, UAE</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display leading-[1.15] mb-6">
            Connecting World Talent with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-sky-300">
              International Careers
            </span>
          </h1>

          {/* Subtitle from skyglobalhr.com */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            {COMPANY_INFO.description} Specializing in verified overseas placements across 
            <span className="text-amber-300 font-semibold"> Malta, Australia, UAE, Bulgaria, Romania, and Greece</span>.
          </p>

          {/* Integrated Search Engine */}
          <div className="bg-slate-900/90 backdrop-blur-xl p-3 rounded-2xl border border-slate-700/80 shadow-2xl max-w-3xl mx-auto mb-6">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                onSearchSubmit();
              }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
            >
              {/* Job Title / Role */}
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-slate-400 ml-3.5 absolute pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job position (e.g. Electrician, MEP, Plumber, Server)..."
                  className="w-full pl-11 pr-3 py-3 rounded-xl bg-slate-800 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 border border-slate-700/80"
                />
              </div>

              {/* Destination Country */}
              <div className="relative sm:w-56 flex items-center">
                <MapPin className="w-4 h-4 text-amber-400 ml-3.5 absolute pointer-events-none" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 rounded-xl bg-slate-800 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 border border-slate-700/80 appearance-none cursor-pointer"
                >
                  <option value="All Countries">All Destination Countries</option>
                  {COUNTRIES.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>

              {/* Find Button */}
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <span>Find Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Trending Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 mb-12">
            <span className="font-semibold text-slate-500">Popular Opportunities:</span>
            {trendingSearches.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag.split(' ')[0]);
                  onSearchSubmit();
                }}
                className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-700/60 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800">
            {COMPANY_INFO.stats.map((st) => (
              <div key={st.label} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-left">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display block">
                  {st.value}
                </span>
                <span className="text-xs font-bold text-white block mt-0.5">
                  {st.label}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {st.sub}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
