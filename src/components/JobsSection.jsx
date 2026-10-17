import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  FileText,
  Users,
  Zap,
  Coins,
  MessageCircle
} from 'lucide-react';

export default function JobsSection({ 
  searchQuery, 
  setSearchQuery, 
  selectedCountry, 
  setSelectedCountry,
  onSelectJob,
  onApplyJob
}) {
  const { jobs, countries } = useCMS();
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [selectedPerk, setSelectedPerk] = useState('All Benefits');

  const sectorTabs = [
    'All Sectors',
    'MEP & Technical Trades',
    'Hospitality & Tourism'
  ];

  const perkTabs = [
    'All Benefits',
    'Free Accommodation',
    'Fast-track Visa',
    'Flight Ticket',
    'Overtime Eligible'
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = 
        searchQuery.trim() === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCountry = 
        selectedCountry === 'All Countries' ||
        job.country.toLowerCase().includes(selectedCountry.toLowerCase()) ||
        job.location.toLowerCase().includes(selectedCountry.toLowerCase());

      const matchesSector = 
        selectedSector === 'All Sectors' || 
        job.sector === selectedSector;

      const matchesPerk = 
        selectedPerk === 'All Benefits' ||
        (selectedPerk === 'Free Accommodation' && (
          (job.perks && job.perks.some(p => p.toLowerCase().includes('accommodation') || p.toLowerCase().includes('housing'))) ||
          job.benefits?.some(b => b.toLowerCase().includes('accommodation') || b.toLowerCase().includes('housing'))
        )) ||
        (selectedPerk === 'Fast-track Visa' && (
          (job.visaProcessing && job.visaProcessing.toLowerCase().includes('fast-track')) ||
          job.visaSponsorship
        )) ||
        (selectedPerk === 'Flight Ticket' && (
          (job.perks && job.perks.some(p => p.toLowerCase().includes('ticket') || p.toLowerCase().includes('flight'))) ||
          job.benefits?.some(b => b.toLowerCase().includes('ticket') || b.toLowerCase().includes('flight'))
        )) ||
        (selectedPerk === 'Overtime Eligible' && (
          (job.perks && job.perks.some(p => p.toLowerCase().includes('overtime'))) ||
          job.benefits?.some(b => b.toLowerCase().includes('overtime'))
        ));

      return matchesSearch && matchesCountry && matchesSector && matchesPerk;
    });
  }, [searchQuery, selectedCountry, selectedSector, selectedPerk]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCountry('All Countries');
    setSelectedSector('All Sectors');
    setSelectedPerk('All Benefits');
  };

  return (
    <section id="jobs" className="py-24 bg-slate-100/80 border-t border-slate-200 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5f2f9] text-[#101a6d] border border-[#25c0f3]/30 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#101a6d]" />
              Verified Overseas Vacancies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
              Current International Job Openings
            </h2>
            <p className="text-slate-600 text-base mt-2 max-w-2xl">
              Authentic overseas positions with employer sponsorship, visa facilitation, and full onboarding assistance by Sky Global HR Consultancy.
            </p>
          </div>

          <div className="text-sm font-semibold text-slate-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 self-start md:self-auto">
            Showing <span className="text-[#101a6d] font-black">{filteredJobs.length}</span> active vacancies
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="relative sm:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job title, skills (e.g. Electrician, Plumbing, MEP)..."
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410] focus:bg-white"
              />
            </div>

            {/* Country Dropdown */}
            <div>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410] focus:bg-white cursor-pointer"
              >
                <option value="All Countries">All Destination Countries</option>
                {countries.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sector Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
              Sector:
            </span>
            {sectorTabs.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                  selectedSector === sec
                    ? 'bg-gradient-to-r from-[#a99410] to-[#8e7c0c] text-[#020024] shadow-sm font-extrabold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Key Benefits Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
              Candidate Perks:
            </span>
            {perkTabs.map((perk) => (
              <button
                key={perk}
                onClick={() => setSelectedPerk(perk)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                  selectedPerk === perk
                    ? 'bg-[#101a6d] text-white shadow-xs font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium'
                }`}
              >
                {perk}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#a99410]/80 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
              >
                {/* Details */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-[#101a6d] bg-[#e5f2f9] px-2.5 py-1 rounded-md border border-[#25c0f3]/30">
                      {job.sector}
                    </span>
                    <span className="text-xs font-bold text-[#020024] bg-[#faf8ee] border border-[#a99410]/50 px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-xs">
                      <Users className="w-3.5 h-3.5 text-[#a99410]" />
                      <span>{job.vacancies || 1} {Number(job.vacancies) === 1 ? 'Vacancy' : 'Vacancies'}</span>
                    </span>
                    {job.status === 'Awaiting Confirmation' ? (
                      <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Awaiting Confirmation</span>
                      </span>
                    ) : job.status === 'Inactive' ? (
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                        <span>Closed / Inactive</span>
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Active Hiring</span>
                      </span>
                    )}
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Visa Sponsored
                    </span>
                    {/* Visa Processing Speed Badge */}
                    <span className="text-xs font-bold text-sky-900 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200 flex items-center gap-1 shadow-2xs">
                      <Zap className="w-3.5 h-3.5 text-sky-600 fill-sky-500" />
                      <span>{job.visaProcessing || '⚡ Fast-track 3–4 Weeks'}</span>
                    </span>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {job.contract}
                    </span>
                  </div>

                  <div>
                    <h3 
                      onClick={() => onSelectJob(job)}
                      className="text-xl sm:text-2xl font-bold font-display text-slate-900 group-hover:text-[#101a6d] transition-colors cursor-pointer"
                    >
                      {job.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                      {job.company}
                    </p>
                  </div>

                  {/* Location & Summary */}
                  <div className="flex items-center gap-2 text-xs font-bold text-[#101a6d]">
                    <MapPin className="w-4 h-4 text-[#8e7c0c] shrink-0" />
                    <span>Location: {job.location} ({job.country})</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                    {job.description}
                  </p>

                  {/* Guaranteed Inclusions / Perks Chips */}
                  {job.perks && job.perks.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] font-bold text-slate-500 mr-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#a99410]" />
                        Key Inclusions:
                      </span>
                      {job.perks.map((p, i) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#faf8ee] text-[#020024] border border-[#a99410]/40 shadow-2xs"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Remuneration & CTAs */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 gap-4 shrink-0">
                  <div className="text-left lg:text-right bg-emerald-50/90 border border-emerald-200/90 rounded-2xl p-3 sm:px-4 sm:py-2.5 shadow-xs w-full sm:w-auto">
                    <span className="text-[10px] uppercase font-extrabold text-emerald-800 block tracking-wider">
                      Salary Range
                    </span>
                    <span className="text-base sm:text-lg font-black text-emerald-950 font-display flex items-center lg:justify-end gap-1.5 mt-0.5">
                      <Coins className="w-4 h-4 text-emerald-600 shrink-0" />
                      {job.salary}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => onSelectJob(job)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex-1 sm:flex-none text-center cursor-pointer"
                    >
                      Job Details
                    </button>

                    {/* Quick WhatsApp Inquiry */}
                    <button
                      type="button"
                      onClick={() => {
                        const msg = `Hello SkyGlobal HR, I am interested in the ${job.title} vacancy in ${job.location} (${job.salary}). Could you provide more details about this opening?`;
                        window.open(`https://wa.me/97145570778?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
                      }}
                      className="px-3 py-2.5 rounded-xl text-xs font-bold text-[#075E54] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0"
                      title="Quick Inquiry on WhatsApp"
                      aria-label="Quick Inquiry on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </button>

                    {job.status === 'Inactive' ? (
                      <button
                        disabled
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed flex items-center justify-center gap-1.5 flex-1 sm:flex-none"
                      >
                        <span>Closed</span>
                      </button>
                    ) : job.status === 'Awaiting Confirmation' ? (
                      <button
                        type="button"
                        onClick={() => onApplyJob(job)}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#020024] bg-gradient-to-r from-amber-400 to-[#a99410] hover:from-amber-300 hover:to-[#bfa715] shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-none cursor-pointer"
                      >
                        <span>Pre-Register</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onApplyJob(job)}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#020024] bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] shadow-md shadow-[#a99410]/20 transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-none cursor-pointer"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-900 mb-1">No vacancies match your criteria</h4>
            <p className="text-xs text-slate-500 mb-4">Try clearing filters or search terms.</p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#020024] bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
