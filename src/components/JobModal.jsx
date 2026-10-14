import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Briefcase, 
  Plane, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Upload, 
  Sparkles,
  Send,
  Building
} from 'lucide-react';
import { COMPANY_INFO } from '../data/skyGlobalData';

export default function JobModal({ job, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'apply'
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentCountry: '',
    experienceYears: '3-5 years',
    note: '',
    fileName: ''
  });

  if (!isOpen || !job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setSubmitted(false);
        setActiveTab('details');
        onClose();
      }, 2500);
    }, 500);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, fileName: e.target.files[0].name });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#09152b] text-white p-6 sm:p-7 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
              {job.sector || job.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
              {job.contract || job.type}
            </span>
            {job.visaSponsorship && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Visa Sponsored
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display text-white pr-8">
            {job.title}
          </h2>
          <p className="text-amber-300 font-medium text-xs sm:text-sm mt-1">
            {job.company} • <span className="text-slate-300">{job.location}</span>
          </p>

          {/* Tab selector */}
          <div className="flex items-center gap-3 mt-5 pt-3 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('details')}
              className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === 'details'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Role & Requirements
            </button>
            <button
              onClick={() => setActiveTab('apply')}
              className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === 'apply'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Apply Online
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'details' ? (
            <>
              {/* Highlight Box */}
              <div className="bg-amber-50/80 rounded-2xl p-4 sm:p-5 border border-amber-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-800 block mb-0.5">
                    Package / Remuneration
                  </span>
                  <span className="text-xl font-extrabold text-slate-900 font-display">
                    {job.salary}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">Contract: {job.contract || '1 Year Renewable'}</p>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-800 block mb-0.5">
                    Destination & Sponsorship
                  </span>
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Plane className="w-4 h-4 text-amber-600 shrink-0" />
                    {job.location} ({job.country})
                  </span>
                  <p className="text-xs text-slate-500 mt-1">Managed by Sky Global HR Consultancy</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Job Description
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              {/* Requirements */}
              {job.requirements && (
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Role Requirements & Qualifications
                  </h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && (
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Relocation, Visa & Perks
                  </h4>
                  <ul className="space-y-2">
                    {job.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Skills & Key Competencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.tags?.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Application Tab */
            submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  Application Received!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you! Our overseas recruitment desk at Sky Global HR Consultancy ({COMPANY_INFO.address}) will review your application and contact you directly.
                </p>
                <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                  Reference: SKG-APPLY-{Math.floor(10000 + Math.random() * 90000)}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 text-xs text-amber-900">
                  <span className="font-bold">Applying for:</span> {job.title} in {job.location}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Smith"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current Country of Residence *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. UAE, India, Nepal, Philippines"
                      value={formData.currentCountry}
                      onChange={(e) => setFormData({ ...formData, currentCountry: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Upload Resume / CV (PDF or Word) *
                  </label>
                  <label className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-amber-50/50 transition-colors">
                    <Upload className="w-6 h-6 text-slate-400 mb-1" />
                    <span className="text-xs font-semibold text-slate-700">
                      {formData.fileName ? formData.fileName : 'Click to upload your CV'}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">PDF or DOCX up to 10MB</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Relevant Experience & Qualifications Summary
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Briefly state your years of experience, trade licenses, or previous overseas work history."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Application to SkyGlobal HR
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Your details are processed strictly in accordance with ethical recruitment standards.
                  </p>
                </div>
              </form>
            )
          )}
        </div>

        {/* Footer Actions */}
        {activeTab === 'details' && (
          <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 flex items-center justify-between shrink-0">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Ref: {job.id}
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 flex-1 sm:flex-none text-center"
              >
                Close
              </button>
              <button
                onClick={() => setActiveTab('apply')}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md flex-1 sm:flex-none text-center flex items-center justify-center gap-1.5"
              >
                <span>Apply for this Position</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
