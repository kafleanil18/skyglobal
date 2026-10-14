import React from 'react';
import { TESTIMONIALS } from '../data/insightsData';
import { Star, Quote, CheckCircle2, Award, Sparkles } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-sky-600" />
            Verified Case Studies
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-4">
            Proven Across Borders & Critical Milestones
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Hear from engineering leaders who scaled their squads and candidates who successfully relocated across the globe.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {TESTIMONIALS.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div>
                {/* Placement badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-50 text-sky-800 text-xs font-semibold mb-5 border border-sky-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>{item.placement}</span>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                  <img
                    src={item.image}
                    alt={item.author}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-sky-100"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {item.author}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {item.role} • <span className="text-slate-700">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Satisfaction Bar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">4.9/5 Average Employer & Candidate Satisfaction</h4>
              <p className="text-xs text-slate-500">Based on 1,400+ post-relocation reviews across Europe, APAC and North America</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              100% Legal Compliance Record
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
