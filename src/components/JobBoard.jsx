import React, { useState, useMemo } from 'react';
import { 
  JOBS_DATA, 
  JOB_CATEGORIES, 
  REGIONS, 
  WORK_MODES 
} from '../data/jobsData';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Plane, 
  CheckCircle, 
  Filter, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

export default function JobBoard({ 
  searchQuery, 
  setSearchQuery, 
  selectedRegion, 
  setSelectedRegion,
  onSelectJob,
  onApplyJob
}) {
  const [selectedCategory, setSelectedCategory] = useState('All Sectors');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All Modes');
  const [visaOnly, setVisaOnly] = useState(false);

  // Filter jobs logic
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      // Search text filter
      const matchesSearch = 
        searchQuery.trim() === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = 
        selectedCategory === 'All Sectors' || 
        job.category === selectedCategory;

      // Region filter
      const matchesRegion = 
        selectedRegion === 'All Regions' || 
        job.region === selectedRegion;

      // Work mode filter
      const matchesWorkMode = 
        selectedWorkMode === 'All Modes' || 
        job.workMode.toLowerCase().includes(selectedWorkMode.toLowerCase());

      // Visa sponsor filter
      const matchesVisa = !visaOnly || job.visaSponsorship === true;

      return matchesSearch && matchesCategory && matchesRegion && matchesWorkMode && matchesVisa;
    });
  }, [searchQuery, selectedCategory, selectedRegion, selectedWorkMode, visaOnly]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Sectors');
    setSelectedRegion('All Regions');
    setSelectedWorkMode('All Modes');
    setVisaOnly(false);
  };

  return (
    <section id="jobs" className="py-24 bg-slate-100/70 border-t border-slate-200 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Active Opportunities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
              International Tech & Engineering Jobs
            </h2>
            <p className="text-slate-600 text-base mt-2 max-w-xl">
              Pre-negotiated compensation packages featuring verified international visa sponsorship and relocation support.
            </p>
          </div>

          <div className="text-sm font-semibold text-slate-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 self-start md:self-auto">
            Showing <span className="text-sky-600 font-bold">{filteredJobs.length}</span> verified roles
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/90 mb-8 space-y-4">
          
          {/* Top Row: Search and Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, tech stack..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
              />
            </div>

            {/* Region Dropdown */}
            <div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white cursor-pointer"
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Work Mode Dropdown */}
            <div>
              <select
                value={selectedWorkMode}
                onChange={(e) => setSelectedWorkMode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white cursor-pointer"
              >
                {WORK_MODES.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Visa Toggle */}
            <label className="flex items-center justify-between sm:justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors">
              <span className="flex items-center gap-1.5 font-medium text-xs sm:text-sm">
                <Plane className="w-4 h-4 text-sky-600" />
                Visa Sponsorship
              </span>
              <input
                type="checkbox"
                checked={visaOnly}
                onChange={(e) => setVisaOnly(e.target.checked)}
                className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500 cursor-pointer"
              />
            </label>
          </div>

          {/* Bottom Row: Sector Category Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline">
              Sector:
            </span>
            {JOB_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List Grid */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-sky-400 transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
              >
                {/* Left Section: Info */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                      {job.category}
                    </span>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {job.workMode}
                    </span>
                    {job.visaSponsorship && (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        Visa Sponsored
                      </span>
                    )}
                    <span className="text-xs text-slate-400 ml-auto">
                      {job.postedAt}
                    </span>
                  </div>

                  <div>
                    <h3 
                      onClick={() => onSelectJob(job)}
                      className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors cursor-pointer"
                    >
                      {job.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-600 mt-0.5">
                      {job.company}
                    </p>
                  </div>

                  {/* Location & Relocation */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1 font-medium text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>{job.location} ({job.region})</span>
                    </div>
                    <div className="flex items-center gap-1 text-sky-700 font-medium">
                      <Plane className="w-3.5 h-3.5 text-sky-500" />
                      <span>{job.relocationPackage}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Section: Salary & CTAs */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 gap-4 shrink-0">
                  <div className="text-left lg:text-right">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">
                      Target Compensation
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                      {job.salary}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => onSelectJob(job)}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex-1 sm:flex-none text-center"
                    >
                      Job Details
                    </button>
                    <button
                      onClick={() => onApplyJob(job)}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-none group/apply"
                    >
                      <span>Quick Apply</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/apply:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No matching positions found</h3>
            <p className="text-sm text-slate-500 mb-6">
              We couldn't find any opportunities matching your current search parameters.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        )}

        {/* Can't find role CTA */}
        <div className="mt-12 text-center bg-white rounded-2xl p-6 border border-slate-200 max-w-2xl mx-auto shadow-sm">
          <h4 className="text-base font-bold text-slate-900 mb-1">
            Don't see your specific stack or destination?
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 mb-4">
            We partner on unadvertised confidential leadership searches and bespoke engineering squad placements worldwide.
          </p>
          <button
            onClick={() => onApplyJob({ title: 'Confidential / Custom Global Placement', company: 'SkyGlobal Talent Pool' })}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 underline underline-offset-4"
          >
            Submit your resume to our confidential global talent pool &rarr;
          </button>
        </div>

      </div>
    </section>
  );
}
