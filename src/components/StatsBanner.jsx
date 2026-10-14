import React from 'react';
import { STATS, PARTNER_LOGOS } from '../data/insightsData';
import { TrendingUp, Award, Clock, Globe } from 'lucide-react';

export default function StatsBanner() {
  const getIcon = (index) => {
    switch (index) {
      case 0: return <Globe className="w-5 h-5 text-sky-400" />;
      case 1: return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 2: return <Award className="w-5 h-5 text-amber-400" />;
      case 3: return <Clock className="w-5 h-5 text-indigo-400" />;
      default: return null;
    }
  };

  return (
    <section className="bg-slate-900 border-y border-slate-800 py-12 relative overflow-hidden">
      {/* Background glow subtle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Numerical Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-10 border-b border-slate-800">
          {STATS.map((stat, idx) => (
            <div 
              key={stat.label} 
              className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all hover:translate-y-[-2px] group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                  {stat.value}
                </span>
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getIcon(idx)}
                </div>
              </div>
              <h4 className="text-sm font-semibold text-slate-200 mb-1">{stat.label}</h4>
              <p className="text-xs text-slate-400">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Partners strip */}
        <div className="pt-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
            Trusted by fast-growing hyper-scalers, autonomous labs & financial institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-75">
            {PARTNER_LOGOS.map((name) => (
              <div 
                key={name}
                className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-800 text-slate-300 font-semibold tracking-wide text-xs sm:text-sm hover:text-white hover:border-sky-500/40 hover:bg-slate-800 transition-all"
              >
                <span className="text-sky-400 mr-1.5 font-bold">▲</span>
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
