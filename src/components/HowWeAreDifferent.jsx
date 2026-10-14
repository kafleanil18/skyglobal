import React from 'react';
import { Star, Zap, TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { HOW_WE_ARE_DIFFERENT } from '../data/skyGlobalData';

export default function HowWeAreDifferent({ onOpenHireModal }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-7 h-7 text-amber-500" />;
      case 'TrendingUp': return <TrendingUp className="w-7 h-7 text-amber-500" />;
      case 'Users': return <Users className="w-7 h-7 text-amber-500" />;
      default: return <Star className="w-7 h-7 text-amber-500" />;
    }
  };

  return (
    <section id="how-we-are-different" className="py-24 bg-white text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching skyglobalhr.com */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
            <Star className="w-6 h-6 text-blue-600 fill-blue-600/20" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-amber-700 font-display mb-3">
            How Are We Different
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-amber-500/80 mb-4" />
          <p className="text-base sm:text-lg text-slate-600">
            Setting the benchmark for ethical overseas recruitment, verified employer sponsorships, and candidate success.
          </p>
        </div>

        {/* 3 Alternating Pillar Blocks */}
        <div className="space-y-16">
          {HOW_WE_ARE_DIFFERENT.map((item, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div 
                key={item.id}
                className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 lg:gap-12`}
              >
                {/* Title & Icon Side */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="mb-4 flex items-center">
                    <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200/80 shadow-sm">
                      {getIcon(item.iconName)}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-amber-400/40 to-transparent" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                    {item.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 leading-tight mb-4">
                    {item.title}
                  </h3>
                </div>

                {/* Content Card Side */}
                <div className="flex-1 w-full">
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-sky-50/50 p-1 shadow-lg border border-slate-200/80 hover:shadow-xl transition-all duration-300">
                    <div className="rounded-2xl bg-white p-7 sm:p-9">
                      <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                        {item.description}
                      </p>

                      <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Verified SkyGlobal Standard
                        </span>
                        <span className="text-slate-400">Pillar 0{index + 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Employer Inquiry CTA Strip */}
        <div className="mt-20 rounded-3xl bg-[#09152b] p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 border border-slate-800 shadow-xl">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">
              Organizational Hiring Assistance
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display mt-2 mb-2">
              Looking to source verified talent for your organization?
            </h3>
            <p className="text-slate-300 text-sm">
              We design job specifications, screen candidate skill requirements, and manage the full overseas legal and visa onboarding for employers in Europe, Australia, and the Middle East.
            </p>
          </div>
          <button
            onClick={onOpenHireModal}
            className="shrink-0 px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/20 transition-all transform hover:scale-105"
          >
            Partner With SkyGlobal
          </button>
        </div>

      </div>
    </section>
  );
}
