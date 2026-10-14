import React, { useState } from 'react';
import { 
  Globe2, 
  MapPin, 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export default function Footer({ onOpenHireModal, onOpenResumeModal }) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  const offices = [
    { city: 'London', address: '1 Canada Square, Canary Wharf', region: 'United Kingdom' },
    { city: 'Berlin', address: 'Friedrichstraße 68, Mitte', region: 'Germany' },
    { city: 'Singapore', address: 'Marina Bay Financial Centre Tower 1', region: 'Singapore' },
    { city: 'San Francisco', address: '555 California Street, Financial Dist.', region: 'United States' },
    { city: 'Dubai', address: 'DIFC Gate Precinct 4', region: 'United Arab Emirates' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-sky-500/25">
                <Globe2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white font-display">
                  SKY<span className="text-sky-400">GLOBAL</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-sky-200/70 -mt-1">
                  Tech & Engineering Staffing
                </span>
              </div>
            </a>
            
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              SkyGlobal is the premier cross-border recruitment and mobility partner for high-growth technology companies and top-echelon engineering talent worldwide.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a href="#" aria-label="X (Twitter)" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" aria-label="GitHub" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Candidates Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              For Candidates
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#jobs" className="hover:text-white transition-colors">Explore All Jobs</a>
              </li>
              <li>
                <button onClick={onOpenResumeModal} className="hover:text-white transition-colors text-left">
                  Submit CV to Global Pool
                </button>
              </li>
              <li>
                <a href="#global-reach" className="hover:text-white transition-colors">EU Blue Card Guide</a>
              </li>
              <li>
                <a href="#global-reach" className="hover:text-white transition-colors">Singapore COMPASS Guide</a>
              </li>
              <li>
                <a href="#salary-guide" className="hover:text-white transition-colors">2026 Tech Salary Calculator</a>
              </li>
            </ul>
          </div>

          {/* Employers Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              For Employers
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={onOpenHireModal} className="hover:text-white transition-colors text-left">
                  Hire Tech Talent
                </button>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Squad Relocation Solutions</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Global EOR & Payroll</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Executive Tech Search</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">Enterprise Case Studies</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Global Job Alerts
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Receive a weekly curated digest of verified visa-sponsored tech roles and relocation insights.
            </p>
            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-400 p-2.5 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="your.email@tech.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Global Hubs Grid */}
        <div className="py-10 border-b border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-5 text-center sm:text-left">
            Global Hubs & Licensed Operating Centers
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {offices.map((office) => (
              <div key={office.city} className="bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl">
                <div className="flex items-center gap-1.5 text-white font-bold text-xs mb-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>{office.city}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight mb-1">{office.address}</p>
                <span className="text-[10px] font-semibold text-sky-400/80">{office.region}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SkyGlobal Recruitment Solutions Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">GDPR Compliance</a>
            <a href="#" className="hover:text-slate-300">Equal Opportunity Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
