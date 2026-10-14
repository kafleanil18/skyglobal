import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { COUNTRIES as DEFAULT_COUNTRIES } from '../data/skyGlobalData';
import { 
  Globe2, 
  MapPin, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  Plane, 
  X 
} from 'lucide-react';

export default function CountriesSection({ onSelectCountryJobs, onOpenResumeModal }) {
  const cms = useCMS();
  const countriesList = cms?.countries || DEFAULT_COUNTRIES;
  const [activeModalCountry, setActiveModalCountry] = useState(null);

  return (
    <section id="countries" className="py-24 bg-slate-50 text-slate-900 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Globe2 className="w-3.5 h-3.5 text-amber-600" />
            Global Destinations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-4">
            Destination Countries We Serve
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Connecting candidates with verified employers and authorized work permits in premier global destinations.
          </p>
        </div>

        {/* 6 Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countriesList.map((country) => (
            <div
              key={country.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/20">
                      {country.badge}
                    </span>
                    <span 
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        country.status.includes('Active')
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : 'bg-amber-500 text-slate-950 font-extrabold'
                      }`}
                    >
                      {country.status}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4">
                    <h3 className="text-2xl font-bold font-display text-white">
                      {country.name}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-3 mb-4 text-xs font-semibold text-amber-900 flex items-center gap-2">
                    <Plane className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{country.highlight}</span>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {country.overview}
                  </p>

                  <ul className="space-y-2 border-t border-slate-100 pt-4 mb-2">
                    {country.details.slice(0, 2).map((det, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{det}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => setActiveModalCountry(country)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex-1 text-center"
                >
                  Country Guide
                </button>
                <button
                  onClick={() => onSelectCountryJobs(country.name)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-sm transition-all flex items-center justify-center gap-1.5 flex-1"
                >
                  <span>View Jobs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Country Details */}
        {activeModalCountry && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-fade-in">
              <div className="relative h-56">
                <img
                  src={activeModalCountry.image}
                  alt={activeModalCountry.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                <button
                  onClick={() => setActiveModalCountry(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-5 left-6 right-6">
                  <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                    {activeModalCountry.badge}
                  </span>
                  <h3 className="text-3xl font-extrabold text-white font-display">
                    {activeModalCountry.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                  <span className="text-xs font-bold text-amber-800 uppercase block mb-1">
                    Work Authorization Pathway
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {activeModalCountry.highlight}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                    Country Overview & Labor Landscape
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {activeModalCountry.overview}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                    Sponsorship & Placement Criteria
                  </h4>
                  <ul className="space-y-2">
                    {activeModalCountry.details.map((d, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setActiveModalCountry(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const cName = activeModalCountry.name;
                      setActiveModalCountry(null);
                      onSelectCountryJobs(cName);
                    }}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-md"
                  >
                    View Open Positions in {activeModalCountry.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
