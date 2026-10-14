import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function TopContactBar() {
  const { companyInfo } = useCMS();
  return (
    <div className="bg-gradient-to-r from-[#101a6d] via-[#0c1650] to-[#020024] border-b border-[#182a98]/60 text-[#b6eafb] text-xs py-2 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="inline-block w-2 h-2 rounded-full bg-[#ffd300] animate-pulse" />
          <span className="font-bold text-white">{companyInfo.name}</span>
          <span className="hidden sm:inline text-sky-400/60">•</span>
          <span className="hidden sm:inline text-[#b6eafb]/90">{companyInfo.tagline}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-200">
          <a 
            href={`mailto:${companyInfo.email}`}
            className="flex items-center gap-1.5 hover:text-[#ffd300] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#ffd300] shrink-0" />
            <span>{companyInfo.email}</span>
          </a>

          <a 
            href="https://maps.google.com/?q=Toronto%20Building%2C%20202%202nd%20floor%20Bur%20Dubai%2C%20Dubai%2C%20United%20Arab%20Emirates" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 hover:text-[#ffd300] transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#ffd300] shrink-0" />
            <span className="truncate max-w-xs">{companyInfo.address}</span>
          </a>

          <a 
            href={`tel:${companyInfo.phone}`}
            className="flex items-center gap-1.5 hover:text-[#ffd300] transition-colors font-semibold text-[#ffd300]"
          >
            <Phone className="w-3.5 h-3.5 text-[#ffd300] shrink-0" />
            <span>{companyInfo.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
