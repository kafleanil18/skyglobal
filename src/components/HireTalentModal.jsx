import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  Building2, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Send,
  Users,
  ShieldCheck,
  Zap,
  Phone
} from 'lucide-react';
import { COMPANY_INFO, COUNTRIES } from '../data/skyGlobalData';
import { useCMS } from '../context/CMSContext';

export default function HireTalentModal({ isOpen, onClose }) {
  const { addEmployerRequest } = useCMS();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    industrySector: 'MEP, Electrical & Technical Trades',
    headcount: '1-5 Candidates',
    destinationCountry: 'Malta',
    timeline: 'Immediate (Within 30 Days)',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployerRequest({
      companyName: formData.companyName,
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      industrySector: formData.industrySector,
      headcount: formData.headcount,
      destinationCountry: formData.destinationCountry,
      timeline: formData.timeline,
      notes: formData.notes
    });
    setSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2800);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#101a6d] via-[#0b1456] to-[#020024] border-b border-[#25c0f3]/20 text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a99410]/20 text-[#a99410] text-xs font-bold mb-2 border border-[#a99410]/30">
            <Zap className="w-3.5 h-3.5 text-[#a99410]" />
            Employer Recruitment Request
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Partner with Sky Global HR Consultancy
          </h2>
          <p className="text-[#b6eafb] text-xs sm:text-sm mt-1">
            Let our Dubai recruitment specialists source, screen, and legally mobilize skilled personnel for your projects worldwide.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                Recruitment Request Received!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Thank you! Our corporate recruitment manager at our Dubai headquarters will contact you within 4 business hours.
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                Ref: SG-REQ-{Math.floor(10000 + Math.random() * 90000)}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramla Bay Resort / MEP Ltd"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Person & Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Miller, Operations Dir"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="david@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 4 557 0778"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Industry / Sector *
                  </label>
                  <select
                    value={formData.industrySector}
                    onChange={(e) => setFormData({ ...formData, industrySector: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410] bg-white"
                  >
                    <option>MEP, Electrical & Technical Trades</option>
                    <option>Hospitality, Resorts & Tourism</option>
                    <option>Construction & Civil Engineering</option>
                    <option>Manufacturing & Logistics</option>
                    <option>Healthcare & Nursing Support</option>
                    <option>Professional Services & IT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Destination Work Location *
                  </label>
                  <select
                    value={formData.destinationCountry}
                    onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410] bg-white"
                  >
                    {COUNTRIES.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Required Profiles, Headcount & Job Descriptions
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Sourcing 4 licensed Electricians and 2 Plumbers for resort refurbishment project in Malta starting next month."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
                />
              </div>

              <div className="p-3 bg-[#e5f2f9] rounded-xl border border-[#25c0f3]/30 text-xs text-[#101a6d] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#101a6d] shrink-0 mt-0.5" />
                <span>
                  <strong>Ethical Recruitment Commitment:</strong> Sky Global adheres to transparent, compliant international labor and visa procedures.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] text-[#020024] font-bold text-sm shadow-md shadow-[#a99410]/25 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Request Talent Shortlist
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
