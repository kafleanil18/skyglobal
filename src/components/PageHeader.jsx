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
    <div className="pt-32 pb-16 bg-gradient-to-b from-[#020024] via-[#101a6d] to-[#08103d] border-b border-[#182a98]/60 text-slate-100 relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ffd300]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#25c0f3]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb & Back button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <nav className="flex items-center gap-2 text-xs font-medium text-[#b6eafb]/70">
            <button 
              onClick={onBackToHome}
              className="flex items-center gap-1.5 hover:text-[#ffd300] transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-[#ffd300]" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[#ffd300] font-bold">{title}</span>
          </nav>

          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#101a6d]/90 hover:bg-[#182a98] text-[#b6eafb] hover:text-white border border-[#25c0f3]/40 hover:border-[#ffd300] text-xs font-bold transition-all shadow-sm group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#ffd300] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Title area */}
        <div className="max-w-3xl">
          {badge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd300]/15 border border-[#ffd300]/30 text-[#ffd300] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              {Icon && <Icon className="w-3.5 h-3.5 text-[#ffd300]" />}
              <span>{badge}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
            {title}
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg text-[#b6eafb]/90 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
