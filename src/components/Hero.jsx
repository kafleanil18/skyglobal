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
import { COMPANY_INFO } from '../data/skyGlobalData';
import { useCMS } from '../context/CMSContext';

export default function Hero({ 
  searchQuery, 
  setSearchQuery, 
  selectedCountry, 
  setSelectedCountry,
  onSearchSubmit,
  onOpenHireModal,
  onOpenResumeModal
}) {
  const { countries } = useCMS();
  const trendingSearches = ['Electrician (Malta)', 'Maintenance Tech', 'Plumber', 'MEP Project Manager', 'Housekeeping', 'Australia Subclass 407'];

  return (
    <section id="home" className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-to-b from-[#101a6d] via-[#09113d] to-[#020024] text-white">
      {/* Background gradients matching SkyGlobal logo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_85%_at_50%_-15%,rgba(37,192,243,0.22),rgba(16,26,109,0.7),transparent)] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 211, 0, 0.45) 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101a6d]/90 border border-[#a99410]/50 text-[#a99410] text-xs font-bold uppercase tracking-wider mb-6 shadow-lg shadow-[#101a6d]/50">
            <span className="flex h-2 w-2 rounded-full bg-[#a99410] animate-ping" />
            <Globe className="w-3.5 h-3.5 text-[#a99410]" />
            <span>Licensed Overseas Recruitment • Bur Dubai, UAE</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-display leading-[1.2] mb-3">
            <span className="text-[#a99410]">Your Talent.</span>{' '}
            <span className="text-[#0ca7da]">Our Platform.</span>{' '}
            <span className="text-[#111e6c] bg-[#e5f2f9] px-3.5 py-0.5 rounded-2xl border border-[#25c0f3]/40 shadow-md inline-block">
              Boundless Possibilities.
            </span>
          </h1>

          {/* Tagline from skyglobalhr.com */}
          <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0ca7da] tracking-tight mb-8 md:mb-10 drop-shadow-sm">
            Your journey starts here.
          </p>

          {/* Integrated Search Engine */}
          <div className="bg-[#0b1448]/90 backdrop-blur-xl p-3.5 rounded-2xl border border-[#25c0f3]/40 shadow-2xl max-w-3xl mx-auto mb-6">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                onSearchSubmit();
              }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
            >
              {/* Job Title / Role */}
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-[#b6eafb]/70 ml-3.5 absolute pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job position (e.g. Electrician, MEP, Plumber, Server)..."
                  className="w-full pl-11 pr-3 py-3 rounded-xl bg-[#101a6d]/90 text-white placeholder-[#b6eafb]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#a99410] border border-[#25c0f3]/30"
                />
              </div>

              {/* Destination Country */}
              <div className="relative sm:w-56 flex items-center">
                <MapPin className="w-4 h-4 text-[#a99410] ml-3.5 absolute pointer-events-none" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 rounded-xl bg-[#101a6d]/90 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#a99410] border border-[#25c0f3]/30 appearance-none cursor-pointer"
                >
                  <option value="All Countries">All Destination Countries</option>
                  {countries.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#b6eafb]/70">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>

              {/* Find Button */}
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#a99410] via-[#bfa715] to-[#8e7c0c] hover:from-[#cbb218] hover:to-[#a99410] text-[#020024] font-extrabold text-sm shadow-lg shadow-[#a99410]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Find Jobs</span>
                <ArrowRight className="w-4 h-4 text-[#020024]" />
              </button>
            </form>
          </div>

          {/* Trending Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300 mb-12">
            <span className="font-semibold text-[#a99410]">Popular Opportunities:</span>
            {trendingSearches.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag.split(' ')[0]);
                  onSearchSubmit();
                }}
                className="px-2.5 py-1 rounded-md bg-[#101a6d]/80 hover:bg-[#182a98] text-[#b6eafb] hover:text-[#a99410] border border-[#25c0f3]/30 hover:border-[#a99410] transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-[#182a98]/60">
            {COMPANY_INFO.stats.map((st) => (
              <div key={st.label} className="bg-[#101a6d]/60 border border-[#25c0f3]/30 hover:border-[#a99410] transition-colors rounded-2xl p-4 text-left">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#a99410] font-display block">
                  {st.value}
                </span>
                <span className="text-xs font-bold text-white block mt-0.5">
                  {st.label}
                </span>
                <span className="text-[11px] text-[#b6eafb]/80 block mt-0.5">
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
