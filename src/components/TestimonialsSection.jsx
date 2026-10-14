import React from 'react';
import { useCMS } from '../context/CMSContext';
import { TESTIMONIALS as DEFAULT_TESTIMONIALS } from '../data/skyGlobalData';
import { Star, Quote, CheckCircle2, Award } from 'lucide-react';

export default function TestimonialsSection() {
  const cms = useCMS();
  const list = cms?.testimonials || DEFAULT_TESTIMONIALS;
  return (
    <section id="testimonials" className="py-24 bg-slate-50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching skyglobalhr.com */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5f2f9] text-[#101a6d] border border-[#25c0f3]/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-[#101a6d]" />
            Candidate & Client Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-2">
            Hear from Our Happy Customers
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Real feedback from employers who built dependable teams and international candidates whose European & overseas visas were approved.
          </p>
        </div>

        {/* 6 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {list.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#a99410]/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#a99410] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#a99410] text-[#a99410]" />
                  ))}
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-slate-900 mb-3 group-hover:text-[#101a6d] transition-colors">
                  "{item.title}"
                </h4>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                  {item.description}
                </p>
              </div>

              <div>
                {/* Category Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#fff8d6] text-[#101a6d] text-xs font-bold mb-4 border border-[#a99410]/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#101a6d] shrink-0" />
                  <span>{item.category}</span>
                </div>

                {/* Author Info */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{item.name}</h5>
                    <p className="text-xs text-slate-500 font-medium">
                      {item.designation} • <span className="text-slate-700">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dubai Office Verified Seal */}
        <div className="rounded-2xl bg-white p-6 border border-slate-200 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Proven Track Record for Malta, Australia & UAE Visas</p>
              <p className="text-xs text-slate-500">Document preparation, embassy submission guidance & ethical compliance.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#101a6d] bg-[#fff8d6] px-3.5 py-1.5 rounded-full border border-[#a99410]/50 shrink-0">
            100% Transparency
          </span>
        </div>

      </div>
    </section>
  );
}
