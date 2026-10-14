import React from 'react';
import { VISA_DESTINATIONS } from '../data/insightsData';
import { 
  Globe2, 
  Clock, 
  CheckCircle, 
  MapPin, 
  Plane, 
  ArrowRight,
  Shield,
  FileCheck,
  Building,
  Home
} from 'lucide-react';

export default function GlobalReach({ onOpenResumeModal, onOpenHireModal }) {
  const steps = [
    {
      num: '01',
      title: 'Technical Vetting & Match',
      desc: 'Coding architecture interviews conducted by veteran staff engineers to ensure 100% seniority alignment.',
      icon: <FileCheck className="w-5 h-5 text-sky-500" />
    },
    {
      num: '02',
      title: 'Global Offer & Relocation Terms',
      desc: 'Transparent salary benchmarking, relocation allowances, flight provisions, and temporary furnished housing.',
      icon: <Building className="w-5 h-5 text-indigo-500" />
    },
    {
      num: '03',
      title: 'Expedited Visa Legal Filing',
      desc: 'In-house immigration lawyers manage work permits, EU Blue Cards, apostilles, and family dependent visas.',
      icon: <Shield className="w-5 h-5 text-emerald-500" />
    },
    {
      num: '04',
      title: 'Soft Landing & Onboarding',
      desc: 'Settling-in concierge: local tax registration, social security, bank accounts, and smooth day-one office arrival.',
      icon: <Home className="w-5 h-5 text-amber-500" />
    }
  ];

  return (
    <section id="global-reach" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-sky-100">
            <Globe2 className="w-3.5 h-3.5 text-sky-600" />
            Cross-Border Mobility Hub
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-4">
            Navigating Global Tech Relocation Without Friction
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            We partner with immigration authorities across 50+ countries to streamline high-skilled tech mobility, reducing visa cycle times from months to weeks.
          </p>
        </div>

        {/* 6 Country Hub Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {VISA_DESTINATIONS.map((dest) => (
            <div 
              key={dest.country}
              className="rounded-2xl p-6 bg-slate-50/70 border border-slate-200 hover:border-sky-500/50 hover:bg-white hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200/60">
                    {dest.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    <span>{dest.timeline}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {dest.country}
                </h3>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 mb-4">
                  Pathway: <span className="text-slate-800">{dest.visa}</span>
                </p>

                <ul className="space-y-2.5 border-t border-slate-200/80 pt-4 mb-6">
                  {dest.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onOpenResumeModal}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 group-hover:border-sky-500 group-hover:text-sky-600 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Explore {dest.country} Mandates</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* 4-Step Relocation Concierge Timeline */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
          <div className="max-w-2xl mb-12">
            <span className="text-sky-400 font-bold text-xs uppercase tracking-widest">
              End-to-End Migration Framework
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display mt-2 mb-3">
              The SkyGlobal Turnkey Mobility Experience
            </h3>
            <p className="text-slate-300 text-sm">
              We eliminate the administrative overhead for employers and the anxiety for candidates, delivering a high-touch transition from first contact to the first sprint.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <div 
                key={st.num}
                className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 relative hover:border-sky-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                    {st.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-700 font-display">
                    {st.num}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {st.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>Immigration legal panels active in Europe, APAC, Middle East & North America</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenHireModal}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-colors"
              >
                Relocate an Engineering Squad
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
