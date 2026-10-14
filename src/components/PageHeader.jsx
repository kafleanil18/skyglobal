import React from 'react';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';

export default function PageHeader({ 
  badge, 
  title, 
  subtitle, 
  onBackToHome, 
  icon: Icon 
}) {
  return (
    <div className="pt-32 pb-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 border-b border-slate-800 text-slate-100 relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb & Back button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <button 
              onClick={onBackToHome}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-300 font-semibold">{title}</span>
          </nav>

          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold transition-all shadow-sm group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Title area */}
        <div className="max-w-3xl">
          {badge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
              {Icon && <Icon className="w-3.5 h-3.5 text-amber-400" />}
              <span>{badge}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
            {title}
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
