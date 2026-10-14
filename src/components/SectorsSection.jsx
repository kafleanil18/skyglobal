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
      case 'Wrench': return <Wrench className="w-6 h-6 text-amber-500" />;
      case 'Utensils': return <Utensils className="w-6 h-6 text-amber-500" />;
      case 'HardHat': return <HardHat className="w-6 h-6 text-amber-500" />;
      case 'Truck': return <Truck className="w-6 h-6 text-amber-500" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-amber-500" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-amber-500" />;
      default: return <Briefcase className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section id="sectors" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching skyglobalhr.com */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
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
              className="rounded-3xl p-7 bg-slate-50/70 border border-slate-200/90 hover:border-amber-400 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {getSectorIcon(sector.icon)}
                </div>

                <h3 className="text-xl font-bold font-display text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
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
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-white hover:bg-amber-400 hover:text-slate-950 border border-slate-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Explore Openings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Ready to explore banner */}
        <div className="mt-16 text-center rounded-3xl bg-gradient-to-r from-blue-700 via-sky-700 to-blue-800 py-10 px-6 sm:px-12 text-white shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-display mb-3">
            Ready to explore international job opportunities?
          </h3>
          <p className="text-slate-200 text-sm max-w-xl mx-auto mb-6">
            Browse our active verified roles with employer visa sponsorship across Malta, Australia, and the UAE.
          </p>
          <a
            href="#jobs"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-lg shadow-black/20 transition-all transform hover:scale-105"
          >
            <span>Browse All Vacancies</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
