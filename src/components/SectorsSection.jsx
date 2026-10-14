import React from 'react';
import { SECTORS } from '../data/skyGlobalData';
import { 
  Wrench, 
  Utensils, 
  HardHat, 
  Truck, 
  HeartPulse, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function SectorsSection({ onSelectSectorJobs, onOpenHireModal }) {
  const getSectorIcon = (iconName) => {
    switch (iconName) {
      case 'Wrench': return <Wrench className="w-6 h-6 text-[#101a6d]" />;
      case 'Utensils': return <Utensils className="w-6 h-6 text-[#101a6d]" />;
      case 'HardHat': return <HardHat className="w-6 h-6 text-[#101a6d]" />;
      case 'Truck': return <Truck className="w-6 h-6 text-[#101a6d]" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-[#101a6d]" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-[#101a6d]" />;
      default: return <Briefcase className="w-6 h-6 text-[#101a6d]" />;
    }
  };

  return (
    <section id="sectors" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching skyglobalhr.com */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5f2f9] text-[#101a6d] border border-[#25c0f3]/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#101a6d]" />
            Core Practice Sectors
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-4">
            Our Expertise Across Industries
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Explore the diverse sectors we specialize in, delivering tailored overseas recruitment solutions for organizations and job seekers.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SECTORS.map((sector) => (
            <div
              key={sector.id}
              className="rounded-3xl p-7 bg-slate-50/70 border border-slate-200/90 hover:border-[#ffd300]/80 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#fff8d6] border border-[#ffd300]/50 shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {getSectorIcon(sector.icon)}
                </div>

                <h3 className="text-xl font-bold font-display text-slate-900 mb-3 group-hover:text-[#101a6d] transition-colors">
                  {sector.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {sector.description}
                </p>

                <div className="border-t border-slate-200/70 pt-4 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Key Placed Roles
                  </span>
                  <ul className="space-y-1.5">
                    {sector.roles.map((r) => (
                      <li key={r} className="text-xs text-slate-700 font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => onSelectSectorJobs(sector.title)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-white hover:bg-gradient-to-r hover:from-[#ffd300] hover:to-[#f9c913] hover:text-[#020024] border border-slate-200 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Explore Openings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Ready to explore banner */}
        <div className="mt-16 text-center rounded-3xl bg-gradient-to-r from-[#101a6d] via-[#0b1456] to-[#020024] py-10 px-6 sm:px-12 text-white border border-[#25c0f3]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#25c0f3]/10 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#ffd300] font-display mb-3">
              Ready to explore international job opportunities?
            </h3>
            <p className="text-[#b6eafb] text-sm max-w-xl mx-auto mb-6">
              Browse our active verified roles with employer visa sponsorship across Malta, Australia, and the UAE.
            </p>
            <a
              href="#jobs"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ffd300] to-[#f9c913] hover:from-[#ffdf47] hover:to-[#ffd300] text-[#020024] font-extrabold text-sm shadow-lg shadow-[#ffd300]/25 transition-all transform hover:scale-105"
            >
              <span>Browse All Vacancies</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
