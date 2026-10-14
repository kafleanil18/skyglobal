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
  Zap
} from 'lucide-react';

export default function HireTalentModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    roleCategory: 'Software & Distributed Systems',
    headcount: '1-2 Specialists',
    targetLocation: 'Europe (EU Blue Card)',
    timeline: 'Immediate (Within 30 Days)',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2800);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold mb-2 border border-sky-500/30">
            <Zap className="w-3.5 h-3.5 text-sky-400" />
            Employer Talent Request
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Hire World-Class Tech & Engineering Talent
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Receive pre-vetted candidate shortlists within 72 hours, with complete visa and relocation handling.
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
                Talent Request Received!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Thank you! Our Senior Technical Account Partner will reach out to you within 4 hours to review your profile requirements and schedule initial talent previews.
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                Ref: SKG-REQ-{Math.floor(10000 + Math.random() * 90000)}
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
                    placeholder="e.g. Acme Tech Labs"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Name & Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins, VP Eng"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@acme.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Domain / Stack *
                  </label>
                  <select
                    value={formData.roleCategory}
                    onChange={(e) => setFormData({ ...formData, roleCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                  >
                    <option>Software & Distributed Systems</option>
                    <option>AI, LLM & Machine Learning</option>
                    <option>DevOps, SRE & Cloud Security</option>
                    <option>Robotics, Embedded & Hardware</option>
                    <option>Executive Search (CTO / VP)</option>
                    <option>Full Engineering Squad Relocation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Location & Visa Need
                  </label>
                  <select
                    value={formData.targetLocation}
                    onChange={(e) => setFormData({ ...formData, targetLocation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                  >
                    <option>Europe (Germany / Netherlands / Ireland)</option>
                    <option>United Kingdom (London tech hub)</option>
                    <option>Singapore / APAC regional center</option>
                    <option>Japan (Tokyo / Robotics)</option>
                    <option>UAE / Dubai (Tax-free hub)</option>
                    <option>North America (US / Canada GSS)</option>
                    <option>Global Remote (EOR Payroll Needed)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hiring Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                  >
                    <option>Immediate (Within 30 Days)</option>
                    <option>Upcoming Quarter (1-3 Months)</option>
                    <option>Strategic Pipeline / Exploration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Stack Requirements or Hiring Goals
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Looking for 2 Staff Go/K8s engineers with distributed tracing experience willing to relocate to Munich."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Trust Callout */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  <strong>SkyGlobal Guarantee:</strong> All candidates undergo thorough technical coding assessments. 90-day free replacement guarantee on all placements.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-600/25 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Request Candidate Shortlist
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
