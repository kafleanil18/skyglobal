import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Globe2,
  Building,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO } from '../data/skyGlobalData';

export default function Footer({ onOpenHireModal, onOpenResumeModal, onOpenLoginModal }) {
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

  return (
    <footer className="bg-[#071120] text-slate-300 border-t border-slate-800 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10">
        
        {/* Main Grid matching skyglobalhr.com */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          
          {/* Column 1: Brand & Social */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-sky-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-sky-950/40">
                <Globe2 className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white font-display">
                  SKY<span className="text-sky-400">GLOBAL</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase font-bold text-amber-400">
                  HR Consultancy
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed text-justify">
              {COMPANY_INFO.description}
            </p>

            {/* Social Links from skyglobalhr.com */}
            <div className="flex items-center gap-3 pt-2">
              {/* LinkedIn */}
              <a
                href={COMPANY_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={COMPANY_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Email */}
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>

              {/* Phone */}
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                aria-label="Phone"
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition-all"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold uppercase tracking-wider text-white">
              Subscribe to get Latest Updates
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get notified of new overseas vacancies, European visa regulations, and work permit openings.
            </p>

            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-800 p-3 rounded-2xl text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! You are subscribed to SkyGlobal updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe Now</span>
                </button>
              </form>
            )}
          </div>

          {/* Column 3: Extra Links */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold uppercase tracking-wider text-white">
              Extra Links
            </h3>
            <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-400">
              <a href="#home" className="hover:text-amber-400 transition-colors">Home</a>
              <a href="#about" className="hover:text-amber-400 transition-colors">About Us</a>
              <a href="#how-we-are-different" className="hover:text-amber-400 transition-colors">Why Choose Us</a>
              <a href="#countries" className="hover:text-amber-400 transition-colors">Destinations</a>
              <a href="#sectors" className="hover:text-amber-400 transition-colors">Our Core Sectors</a>
              <a href="#jobs" className="hover:text-amber-400 transition-colors">Browse Jobs</a>
              <a href="#blogs" className="hover:text-amber-400 transition-colors">Visa Updates</a>
              <button 
                onClick={onOpenLoginModal} 
                className="text-left text-amber-400/90 hover:text-amber-300 font-semibold transition-colors"
              >
                Log In
              </button>
              <button onClick={onOpenResumeModal} className="text-left hover:text-amber-400 transition-colors">
                Submit CV
              </button>
            </div>
          </div>

        </div>

        {/* Middle Row: Office Address & Operating Hours matching skyglobalhr.com */}
        <div className="py-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          {/* Address */}
          <div className="flex items-start gap-3.5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            <Building className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Dubai Office Address
              </h4>
              <a 
                href="https://maps.google.com/?q=Toronto%20Building%2C%20202%202nd%20floor%20Bur%20Dubai%2C%20Dubai%2C%20United%20Arab%20Emirates"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-amber-400 transition-colors leading-relaxed block"
              >
                {COMPANY_INFO.address}
              </a>
              <div className="pt-1 text-slate-400 flex items-center gap-3">
                <span>Tel: <strong className="text-amber-300">{COMPANY_INFO.phone}</strong></span>
                <span>•</span>
                <span>Email: <strong className="text-amber-300">{COMPANY_INFO.email}</strong></span>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="flex items-start gap-3.5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            <Clock className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Office Hours
              </h4>
              <p className="text-slate-300">{COMPANY_INFO.officeHours.weekdays}</p>
              <p className="text-slate-500 font-semibold">{COMPANY_INFO.officeHours.sunday}</p>
              <p className="text-[11px] text-amber-400/80 pt-0.5">
                Appointments and walk-in consultations available during office hours.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching skyglobalhr.com */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p className="font-semibold text-slate-400">
            Sky Global HR Consultancy © {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Licensed Overseas Recruitment Partner</span>
            <span>•</span>
            <span>Bur Dubai, UAE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
