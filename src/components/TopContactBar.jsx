import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/skyGlobalData';

export default function TopContactBar() {
  return (
    <div className="bg-[#0b162c] border-b border-slate-800 text-slate-300 text-xs py-2 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-semibold text-slate-200">{COMPANY_INFO.name}</span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-400">{COMPANY_INFO.tagline}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-300">
          <a 
            href={`mailto:${COMPANY_INFO.email}`}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{COMPANY_INFO.email}</span>
          </a>

          <a 
            href="https://maps.google.com/?q=Toronto%20Building%2C%20202%202nd%20floor%20Bur%20Dubai%2C%20Dubai%2C%20United%20Arab%20Emirates" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 hover:text-amber-400 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate max-w-xs">{COMPANY_INFO.address}</span>
          </a>

          <a 
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium text-amber-300"
          >
            <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{COMPANY_INFO.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
