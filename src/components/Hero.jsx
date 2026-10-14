import React from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  ArrowRight, 
  ShieldCheck, 
  PlaneTakeoff, 
  Cpu, 
  Sparkles,
  Users,
  CheckCircle2
} from 'lucide-react';
import { REGIONS } from '../data/jobsData';

export default function Hero({ 
  searchQuery, 
  setSearchQuery, 
  selectedRegion, 
  setSelectedRegion,
  onSearchSubmit,
  onOpenHireModal
}) {
  const popularKeywords = ['Rust', 'Distributed Systems', 'LLM Architect', 'Kubernetes', 'Robotics', 'C/C++'];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950 text-white">
      {/* Background radial gradients & grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.25),rgba(255,255,255,0))] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Floating accent orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/70 border border-sky-800/60 text-sky-300 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm backdrop-blur-sm animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-ping" />
            <PlaneTakeoff className="w-3.5 h-3.5 text-sky-400" />
            <span>Global Tech & Engineering Talent Mobility</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display leading-[1.1] mb-6">
            Connecting Elite Tech Minds with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
              Borderless Opportunities
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            SkyGlobal bridges world-class software engineers, AI architects, and technical leaders with premier international enterprises—backed by comprehensive cross-border visa sponsorship and relocation support.
          </p>

          {/* Interactive Fast Search Bar */}
          <div className="bg-slate-900/90 backdrop-blur-xl p-2.5 sm:p-3 rounded-2xl border border-slate-700/80 shadow-2xl shadow-sky-950/50 max-w-3xl mx-auto mb-6">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                onSearchSubmit();
              }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
            >
              {/* Role / Skill Input */}
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-slate-400 ml-3 absolute pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title, tech stack (e.g. Go, MLOps, Robotics)..."
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-800/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 border border-slate-700/60"
                />
              </div>

              {/* Region Selector */}
              <div className="relative sm:w-48 flex items-center">
                <MapPin className="w-4 h-4 text-slate-400 ml-3 absolute pointer-events-none" />
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full pl-9 pr-8 py-3 rounded-xl bg-slate-800/80 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 border border-slate-700/60 appearance-none cursor-pointer"
                >
                  {REGIONS.map((region) => (
                    <option key={region} value={region} className="bg-slate-900 text-white">
                      {region}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
              >
                <span>Find Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Quick Keyword Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 mb-10">
            <span className="font-medium text-slate-500">Trending Tech Searches:</span>
            {popularKeywords.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                  onSearchSubmit();
                }}
                className="px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-sky-900/40 text-slate-300 hover:text-sky-300 border border-slate-700/40 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* 3 Core Trust Pill Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-sky-900/50 flex items-center justify-center text-sky-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Full Visa Legal Coverage</p>
                <p className="text-slate-400 text-[11px]">EU Blue Card, GSS, COMPASS & HSP</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-sky-900/50 flex items-center justify-center text-sky-400 shrink-0">
                <PlaneTakeoff className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Turnkey Relocation</p>
                <p className="text-slate-400 text-[11px]">Flights, housing & family support</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-sky-900/50 flex items-center justify-center text-sky-400 shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Technical Deep Screening</p>
                <p className="text-slate-400 text-[11px]">Vetted by ex-FAANG senior engineers</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
