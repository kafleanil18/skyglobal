import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Menu, 
  X, 
  FileText, 
  UserCheck, 
  ChevronRight, 
  Lock,
  Crown,
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';
import { COMPANY_INFO } from '../data/skyGlobalData';
import TopContactBar from './TopContactBar';
import { useAuth } from '../context/AuthContext';
import skyGlobalLogo from '../assets/SkyGlobalLogo.png';

export default function Navbar({ 
  currentPage = 'home',
  onNavigate,
  onOpenHireModal, 
  onOpenResumeModal, 
  onOpenLoginModal, 
  onOpenDashboard 
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, isSuperAdmin, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'countries', label: 'Destinations' },
    { id: 'sectors', label: 'Sectors' },
    { id: 'jobs', label: 'Find Jobs' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blogs', label: 'Visa News' },
  ];

  const handleNavClick = (pageId, e) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate(pageId);
    } else {
      window.location.hash = pageId;
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Contact Header Bar */}
      <TopContactBar />

      {/* Main Navbar */}
      <div 
        className={`transition-all duration-300 ${
          scrolled 
            ? 'bg-gradient-to-r from-[#101a6d]/98 via-[#0b144d]/98 to-[#020024]/98 backdrop-blur-md shadow-xl border-b border-[#182a98]/60 py-3' 
            : 'bg-gradient-to-r from-[#101a6d]/92 via-[#0b144d]/92 to-[#020024]/92 backdrop-blur-sm py-3.5 border-b border-[#182a98]/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => handleNavClick('home', e)}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg shadow-[#101a6d]/60 group-hover:scale-105 transition-transform overflow-hidden border border-[#25c0f3]/40">
                <img 
                  src={skyGlobalLogo} 
                  alt="SkyGlobal HR Consultancy Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-white font-display">
                    SKY<span className="text-[#25c0f3]">GLOBAL</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#a99410]/20 text-[#a99410] border border-[#a99410]/30">
                    HR Consultancy
                  </span>
                </div>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-[#b6eafb]/80 -mt-0.5">
                  Dubai • Worldwide Staffing
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={(e) => handleNavClick(link.id, e)}
                    className={`text-xs uppercase tracking-wider font-semibold transition-colors py-1 relative group cursor-pointer ${
                      isActive ? 'text-[#a99410] font-bold' : 'text-slate-200 hover:text-[#a99410]'
                    }`}
                  >
                    {link.label}
                    <span 
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#a99410] transition-all duration-200 ${
                        isActive ? 'w-full shadow-sm shadow-[#a99410]' : 'w-0 group-hover:w-full'
                      }`} 
                    />
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons & Log In */}
            <div className="hidden sm:flex items-center gap-2.5">
              {isAuthenticated ? (
                <button
                  onClick={onOpenDashboard}
                  className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl text-[#020024] bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#cbb218] hover:to-[#a99410] shadow-md shadow-[#a99410]/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {isSuperAdmin ? (
                    <Crown className="w-3.5 h-3.5 text-[#020024]" />
                  ) : (
                    <ShieldCheck className="w-3.5 h-3.5 text-[#020024]" />
                  )}
                  <span>CMS Dashboard</span>
                </button>
              ) : (
                <button
                  onClick={onOpenLoginModal}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl text-[#a99410] hover:text-white bg-[#101a6d]/90 hover:bg-[#182a98] border border-[#a99410]/40 hover:border-[#a99410] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  title="Log In to Portal"
                >
                  <Lock className="w-3.5 h-3.5 text-[#a99410]" />
                  <span>Log In</span>
                </button>
              )}

              <button
                onClick={onOpenResumeModal}
                className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl text-slate-100 bg-[#182a98]/80 hover:bg-[#1e3a8a] border border-[#25c0f3]/40 hover:border-[#25c0f3] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#25c0f3]" />
                <span>Submit CV</span>
              </button>

              <button
                onClick={onOpenHireModal}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl text-[#020024] bg-gradient-to-r from-[#a99410] via-[#bfa715] to-[#8e7c0c] hover:from-[#cbb218] hover:to-[#a99410] shadow-md shadow-[#a99410]/25 transition-all flex items-center gap-1.5 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#020024]" />
                <span>Hire Talent</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="xl:hidden flex items-center gap-2">
              {isAuthenticated ? (
                <button
                  onClick={onOpenDashboard}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg text-slate-900 bg-amber-400 flex items-center gap-1"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>CMS</span>
                </button>
              ) : (
                <button
                  onClick={onOpenLoginModal}
                  className="px-2.5 py-1.5 text-xs font-semibold rounded-lg text-amber-300 bg-slate-800 border border-slate-700"
                >
                  Log In
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900/98 backdrop-blur-xl border-b border-slate-800 px-5 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={(e) => handleNavClick(link.id, e)}
                  className={`w-full px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between text-left transition-colors ${
                    isActive 
                      ? 'bg-amber-400/10 text-amber-300 font-bold border border-amber-400/30' 
                      : 'text-slate-200 hover:bg-slate-800 hover:text-amber-400'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDashboard();
                }}
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-xl text-center text-slate-950 bg-amber-400 shadow-md flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Open Staff CMS Dashboard
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLoginModal();
                }}
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-xl text-center text-amber-300 bg-slate-800 border border-slate-700 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                Log In (Admin / Super Admin)
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-xl text-center text-slate-200 bg-slate-800 border border-slate-700 flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              Submit Your CV (Job Seekers)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHireModal();
              }}
              className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-xl text-center text-slate-900 bg-amber-400 shadow-md flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              Hire Global Talent (Employers)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
