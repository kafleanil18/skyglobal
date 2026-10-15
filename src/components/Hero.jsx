import React, { useState, useEffect } from 'react';
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
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  Users,
  Award,
  Check
} from 'lucide-react';
import { COMPANY_INFO } from '../data/skyGlobalData';
import { useCMS } from '../context/CMSContext';
import { FALLBACK_GALLERY_IMAGE } from '../utils/imageOptimizer';

// Curated verified dynamic recruitment & talent acquisition slides
const DYNAMIC_RECRUITMENT_SLIDES = [
  {
    id: 'interview',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    title: 'Global Talent Acquisition & Screening',
    subtitle: 'Direct employer interviews & skill vetting in Dubai HQ',
    badge: 'Talent Acquisition',
    location: 'Bur Dubai HQ',
    stat: '100% Vetted Candidates'
  },
  {
    id: 'handshake',
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
    title: 'Executive Matching & Direct Hiring',
    subtitle: 'Connecting employers in Europe & UAE with top professionals',
    badge: 'Employer Partnership',
    location: 'Malta & UAE Placements',
    stat: '500+ Hired Monthly'
  },
  {
    id: 'contract',
    url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
    title: 'Placement Agreements & Offer Letters',
    subtitle: 'Verified bilateral employment contracts & Schengen work permits',
    badge: 'Offer & Visa Stamping',
    location: 'Schengen & Australia',
    stat: '98.4% Visa Success'
  },
  {
    id: 'deployment',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    title: 'Overseas Workforce Mobilization',
    subtitle: 'Pre-departure orientation, ticketing & smooth airport deployment',
    badge: 'Deployment Ready',
    location: 'International Flights',
    stat: '24/7 Travel Assistance'
  }
];

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

  // Dynamic image carousel state
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 5 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % DYNAMIC_RECRUITMENT_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + DYNAMIC_RECRUITMENT_SLIDES.length) % DYNAMIC_RECRUITMENT_SLIDES.length);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % DYNAMIC_RECRUITMENT_SLIDES.length);
  };

  const currentSlide = DYNAMIC_RECRUITMENT_SLIDES[activeSlide];

  return (
    <section id="home" className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-white text-slate-900 border-b border-slate-200/60">
      {/* Subtle modern geometric background texture */}
      <div 
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      {/* Soft ambient lighting gradient behind right showcase */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#14B2E3]/10 via-[#a99410]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid: Content on Left, Dynamic Image Showcase on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Column: Headlines & Search (7 Cols) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 text-[#101a6d] text-xs font-bold uppercase tracking-wider mb-5 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#a99410] animate-ping" />
              <Globe className="w-3.5 h-3.5 text-[#a99410]" />
              <span>Licensed Overseas Recruitment • Bur Dubai, UAE</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.18] mb-3 text-slate-900">
              <span className="text-[#a99410]">Your Talent.</span>{' '}
              <span className="text-[#101a6d]">Our Platform.</span>{' '}
              <span className="text-[#0ca7da] bg-sky-50 px-3.5 py-0.5 rounded-2xl border border-sky-200 shadow-xs inline-block whitespace-nowrap">
                Boundless Possibilities.
              </span>
            </h1>

            {/* Tagline from skyglobalhr.com */}
            <p className="text-xl sm:text-2xl font-bold text-slate-600 tracking-tight mb-6">
              Your journey starts here.
            </p>

            {/* Integrated Search Engine */}
            <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 mb-4">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  onSearchSubmit();
                }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
              >
                {/* Job Title / Role */}
                <div className="relative flex-1 flex items-center">
                  <Search className="w-4 h-4 text-slate-400 ml-3.5 absolute pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Job position (e.g. Electrician, MEP, Plumber, Server)..."
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#101a6d] focus:bg-white border border-slate-200 transition-all"
                  />
                </div>

                {/* Destination Country */}
                <div className="relative sm:w-48 flex items-center">
                  <MapPin className="w-4 h-4 text-[#a99410] ml-3.5 absolute pointer-events-none" />
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full pl-9 pr-7 py-3 rounded-xl bg-slate-50 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#101a6d] focus:bg-white border border-slate-200 appearance-none cursor-pointer transition-all"
                  >
                    <option value="All Countries">All Destination Countries</option>
                    {countries.map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                    <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>

                {/* Find Button */}
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#101a6d] via-[#14227e] to-[#182a98] hover:from-[#182a98] hover:to-[#101a6d] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#101a6d]/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                >
                  <span>Find Jobs</span>
                  <ArrowRight className="w-4 h-4 text-[#a99410]" />
                </button>
              </form>
            </div>

            {/* Trending Searches */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
              <span className="font-bold text-slate-700">Popular Opportunities:</span>
              {trendingSearches.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag.split(' ')[0]);
                    onSearchSubmit();
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-[#101a6d] text-slate-700 hover:text-white border border-slate-200 hover:border-[#101a6d] transition-all cursor-pointer text-[11px] shadow-2xs"
                >
                  {tag}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Dynamic Recruitment & Talent Acquisition Visual Showcase (5 Cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#14B2E3]/20 via-[#a99410]/20 to-[#101a6d]/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

            {/* Main Interactive Showcase Container */}
            <div 
              className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-300/70 bg-slate-950 group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Dynamic Image with Crossfade Transition */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] overflow-hidden bg-slate-950">
                {DYNAMIC_RECRUITMENT_SLIDES.map((slide, idx) => (
                  <img 
                    key={slide.id}
                    src={slide.url} 
                    alt={slide.title} 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_GALLERY_IMAGE;
                    }}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                      idx === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  />
                ))}

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020024] via-black/25 to-black/35 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none z-10">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#020024] bg-[#faf8ee] px-3 py-1 rounded-full border border-[#a99410]/60 shadow-lg backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{currentSlide.badge}</span>
                  </span>

                  <span className="text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    {activeSlide + 1} / {DYNAMIC_RECRUITMENT_SLIDES.length}
                  </span>
                </div>

                {/* Prev / Next Slide Arrows (Hover Trigger) */}
                <button
                  type="button"
                  onClick={prevSlide}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-[#a99410] hover:text-[#020024] text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-20 backdrop-blur-xs shadow-md"
                  title="Previous recruitment photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-[#a99410] hover:text-[#020024] text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-20 backdrop-blur-xs shadow-md"
                  title="Next recruitment photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Bottom Overlay Info Card */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-[#09113d]/90 backdrop-blur-md border border-[#25c0f3]/40 shadow-xl space-y-1 z-10 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight line-clamp-1">
                      {currentSlide.title}
                    </h3>
                    <span className="text-[10px] text-[#a99410] font-extrabold shrink-0 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-[#a99410]" />
                      {currentSlide.stat}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#b6eafb]/80 line-clamp-1">
                    {currentSlide.subtitle}
                  </p>

                  {/* Interactive Slide Dots & Location */}
                  <div className="pt-2 flex items-center justify-between border-t border-white/10">
                    <div className="flex items-center gap-1.5">
                      {DYNAMIC_RECRUITMENT_SLIDES.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveSlide(i)}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            i === activeSlide ? 'w-6 bg-[#a99410]' : 'w-2 bg-white/30 hover:bg-white/60'
                          }`}
                          title={`Slide ${i + 1}`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-300 font-medium">
                      {currentSlide.location}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Trust Pill */}
            <div className="hidden sm:flex items-center gap-2.5 absolute -bottom-5 -right-2 bg-white text-[#020024] px-3.5 py-2 rounded-2xl shadow-2xl border border-slate-200 z-20">
              <div className="w-7 h-7 rounded-xl bg-[#faf8ee] border border-[#a99410]/50 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-[#a99410]" />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-black text-slate-900 block leading-tight">
                  100% Ethical Recruitment
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  Licensed Overseas Placement Agency
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Quick Metrics Bar across full width */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto pt-10 mt-10 border-t border-slate-200">
          {COMPANY_INFO.stats.map((st) => (
            <div key={st.label} className="bg-slate-50/80 hover:bg-white border border-slate-200/90 hover:border-[#14B2E3] transition-all rounded-2xl p-4 text-left shadow-xs hover:shadow-md hover:-translate-y-0.5 group">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#101a6d] group-hover:text-[#0ca7da] font-display block transition-colors">
                {st.value}
              </span>
              <span className="text-xs font-bold text-slate-800 block mt-0.5">
                {st.label}
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                {st.sub}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
