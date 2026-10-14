import React from 'react';
import { Star, Zap, TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { HOW_WE_ARE_DIFFERENT } from '../data/skyGlobalData';

export default function HowWeAreDifferent({ onOpenHireModal }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-7 h-7 text-[#101a6d] fill-[#ffd300]/30" />;
      case 'TrendingUp': return <TrendingUp className="w-7 h-7 text-[#101a6d]" />;
      case 'Users': return <Users className="w-7 h-7 text-[#101a6d]" />;
      default: return <Star className="w-7 h-7 text-[#101a6d] fill-[#ffd300]/30" />;
    }
  };

  return (
    <section id="how-we-are-different" className="py-24 bg-white text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching skyglobalhr.com */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#e5f2f9] border border-[#25c0f3]/40 text-[#101a6d]">
            <Star className="w-6 h-6 text-[#101a6d] fill-[#ffd300]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-[#101a6d] font-display mb-3">
            How Are We Different
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-[#ffd300] to-[#f9c913] mb-4" />
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
                    <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#fff8d6] border border-[#ffd300]/50 shadow-sm">
                      {getIcon(item.iconName)}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#ffd300]/60 via-[#25c0f3]/40 to-transparent" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-[#101a6d] mb-1">
                    {item.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 leading-tight mb-4">
                    {item.title}
                  </h3>
                </div>

                {/* Content Card Side */}
                <div className="flex-1 w-full">
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-[#e5f2f9]/60 p-1 shadow-lg border border-slate-200/90 hover:border-[#25c0f3]/60 hover:shadow-xl transition-all duration-300">
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
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-[#101a6d] via-[#0b1456] to-[#020024] p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 border border-[#25c0f3]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#25c0f3]/10 blur-3xl pointer-events-none" />
          <div className="max-w-2xl text-center lg:text-left relative z-10">
            <span className="text-[#ffd300] font-bold text-xs uppercase tracking-widest">
              Organizational Hiring Assistance
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display mt-2 mb-2 text-white">
              Looking to source verified talent for your organization?
            </h3>
            <p className="text-[#b6eafb] text-sm">
              We design job specifications, screen candidate skill requirements, and manage the full overseas legal and visa onboarding for employers in Europe, Australia, and the Middle East.
            </p>
          </div>
          <button
            onClick={onOpenHireModal}
            className="shrink-0 relative z-10 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#ffd300] to-[#f9c913] hover:from-[#ffdf47] hover:to-[#ffd300] text-[#020024] font-bold text-sm shadow-lg shadow-[#ffd300]/25 transition-all transform hover:scale-105"
          >
            Partner With SkyGlobal
          </button>
        </div>

      </div>
    </section>
  );
}
