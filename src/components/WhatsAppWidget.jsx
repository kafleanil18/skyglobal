import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Briefcase, 
  Building2, 
  FileText, 
  HelpCircle, 
  ShieldCheck, 
  ArrowUpRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export function formatWhatsAppNumber(phone) {
  if (!phone) return '97145570778';
  let digits = String(phone).replace(/[^0-9]/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.startsWith('04') || digits.startsWith('05')) {
    digits = '971' + digits.slice(1);
  }
  if (digits.startsWith('9710')) {
    digits = '971' + digits.slice(4);
  }
  return digits || '97145570778';
}

// Crisp official WhatsApp SVG icon
function WhatsAppIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill={color} 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppWidget({ isModalOpen = false }) {
  const { companyInfo } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissedPill, setHasDismissedPill] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const popoverRef = useRef(null);
  const inputRef = useRef(null);

  // Phone number extraction & clean formatting
  const rawNumber = companyInfo?.whatsapp || companyInfo?.whatsappRaw || companyInfo?.phone || '+971 04 5570778';
  const targetNumber = formatWhatsAppNumber(rawNumber);

  // Auto-close popover when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleOpenWhatsApp = (text) => {
    const finalMsg = text && text.trim().length > 0 
      ? text.trim() 
      : 'Hello SkyGlobal team, I would like to inquire about your overseas recruitment services.';
    const encoded = encodeURIComponent(finalMsg);
    const url = `https://wa.me/${targetNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmitCustom = (e) => {
    e.preventDefault();
    if (!customMessage.trim()) return;
    handleOpenWhatsApp(customMessage);
    setCustomMessage('');
    setIsOpen(false);
  };

  const QUICK_TOPICS = [
    {
      id: 'job-seeker',
      icon: Briefcase,
      title: 'Overseas Job Openings',
      desc: 'Active roles in Malta, UAE & Europe',
      prompt: 'Hello SkyGlobal team, I am interested in applying for overseas job openings (UAE, Malta, Europe). Could you please guide me through active vacancies and the application procedure?'
    },
    {
      id: 'employer',
      icon: Building2,
      title: 'Hire International Talent',
      desc: 'Recruit vetted trades, MEP & hospitality staff',
      prompt: 'Hello SkyGlobal team, I represent a company/employer looking to recruit verified overseas manpower. I would like to schedule a consultation on your talent recruitment solutions.'
    },
    {
      id: 'visa',
      icon: FileText,
      title: 'Visa & Legal Processing',
      desc: 'Work permits, attestations & relocation',
      prompt: 'Hello SkyGlobal team, I have questions regarding work visa processing, labor clearances, and legal documentation requirements.'
    },
    {
      id: 'general',
      icon: HelpCircle,
      title: 'Direct HR Consultation',
      desc: 'Talk to an overseas career advisor',
      prompt: 'Hello SkyGlobal team, I would like to speak directly with an overseas recruitment consultant regarding career opportunities.'
    }
  ];

  // If a full-screen interactive modal is open, drop z-index or hide to prevent obstruction
  if (isModalOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex flex-col items-end select-none font-sans">
      
      {/* Interactive Quick-Chat Window */}
      {isOpen && (
        <div 
          ref={popoverRef}
          role="dialog"
          aria-label="WhatsApp Quick-Chat"
          className="mb-3 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl border border-slate-700/80 bg-slate-900 overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 ring-2 ring-emerald-300/40 flex items-center justify-center text-white backdrop-blur-sm overflow-hidden">
                  <WhatsAppIcon className="w-6 h-6 fill-white" color="#ffffff" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-white tracking-wide">
                    SkyGlobal Overseas HR
                  </h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                </div>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block" />
                  Online • Typically replies instantly
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 text-emerald-100 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close WhatsApp Chat"
              aria-label="Close WhatsApp Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-900/95 flex-1 max-h-[380px] overflow-y-auto space-y-3.5 border-b border-slate-800">
            {/* Timestamp badge */}
            <div className="flex justify-center">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-slate-800/80 text-slate-400 border border-slate-700/50">
                Today
              </span>
            </div>

            {/* Inbound Agent Welcome Message Bubble */}
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-[#128C7E]/30 text-emerald-400 border border-[#128C7E]/40 flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                SG
              </div>
              <div className="bg-slate-800 border border-slate-700/60 rounded-2xl rounded-tl-sm p-3 text-slate-200 text-xs shadow-md space-y-1.5 leading-relaxed max-w-[85%]">
                <p className="font-medium text-white flex items-center gap-1">
                  <span>Welcome to SkyGlobal HR!</span> 
                  <Sparkles className="w-3 h-3 text-[#a99410]" />
                </p>
                <p className="text-slate-300">
                  How can our licensed international recruitment specialists assist you today? Pick a quick topic below or send your question:
                </p>
              </div>
            </div>

            {/* Quick Inquiry Options */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                Instant Quick Inquiry:
              </p>
              
              {QUICK_TOPICS.map((topic) => {
                const IconComponent = topic.icon;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => handleOpenWhatsApp(topic.prompt)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 transition-all flex items-center justify-between group cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 flex items-center justify-center shrink-0 transition-colors">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                          {topic.title}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {topic.desc}
                        </div>
                      </div>
                    </div>

                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>

            <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1 pt-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>Office Tel: <strong className="text-slate-300">{companyInfo?.phone || '+971 04 5570778'}</strong></span>
            </div>
          </div>

          {/* Message Input Footer */}
          <form 
            onSubmit={handleSubmitCustom} 
            className="p-3 bg-slate-950 flex items-center gap-2 border-t border-slate-800"
          >
            <input
              ref={inputRef}
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Type a WhatsApp message..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400"
            />
            <button
              type="submit"
              disabled={!customMessage.trim()}
              className="w-8 h-8 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-40 disabled:hover:bg-[#25D366] text-[#020024] flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm font-bold"
              title="Send to WhatsApp"
              aria-label="Send to WhatsApp"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Row: Floating Pill Greeting + WhatsApp Round Button */}
      <div className="flex items-center gap-2.5">
        
        {/* Friendly greeting badge when popover is closed */}
        {!isOpen && !hasDismissedPill && (
          <div className="hidden sm:flex items-center gap-2 bg-[#020024]/90 backdrop-blur-md border border-emerald-500/40 text-slate-100 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xl shadow-black/40 animate-in fade-in slide-in-from-right-3">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span className="text-xs">Chat with us on WhatsApp</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setHasDismissedPill(true);
              }}
              className="text-slate-400 hover:text-slate-200 transition-colors ml-1 p-0.5 rounded cursor-pointer"
              title="Dismiss"
              aria-label="Dismiss banner"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* WhatsApp Round Floating Trigger Button */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setHasDismissedPill(true);
          }}
          className={`relative group w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${
            isOpen 
              ? 'bg-slate-800 text-white border border-slate-700 shadow-slate-900/50' 
              : 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-emerald-950/60 shadow-lg'
          }`}
          aria-label={isOpen ? "Close WhatsApp Chat" : "Open WhatsApp Quick Chat"}
          title={isOpen ? "Close WhatsApp Chat" : "Chat on WhatsApp"}
        >
          {/* Subtle pulsating outer ring when closed */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-pulse pointer-events-none" />
          )}

          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <>
              <WhatsAppIcon className="w-7 h-7 fill-white drop-shadow-sm" color="#ffffff" />
              {/* Online indicator dot */}
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-300 border-2 border-[#020024] rounded-full shadow-sm" />
            </>
          )}
        </button>
      </div>

    </div>
  );
}
