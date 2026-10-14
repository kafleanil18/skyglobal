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
import { useCMS } from '../context/CMSContext';

export default function JobModal({ job, isOpen, onClose }) {
  const { addApplication } = useCMS();
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
    addApplication({
      jobId: job.id,
      jobTitle: job.title,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      currentCountry: formData.currentCountry,
      experienceYears: formData.experienceYears,
      preferredDestination: job.country || job.location,
      note: formData.note,
      fileName: formData.fileName || 'Applicant_Resume.pdf'
    });
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
        <div className="bg-gradient-to-r from-[#101a6d] via-[#0b1456] to-[#020024] border-b border-[#25c0f3]/20 text-white p-6 sm:p-7 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-[#a99410]/20 text-[#a99410] border border-[#a99410]/30 font-semibold">
              {job.sector || job.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 font-medium">
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
          <p className="text-[#a99410] font-semibold text-xs sm:text-sm mt-1">
            {job.company} • <span className="text-[#b6eafb]">{job.location}</span>
          </p>

          {/* Tab selector */}
          <div className="flex items-center gap-3 mt-5 pt-3 border-t border-white/10">
            <button
              onClick={() => setActiveTab('details')}
              className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'details'
                  ? 'bg-gradient-to-r from-[#a99410] to-[#8e7c0c] text-[#020024] shadow-sm font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Role & Requirements
            </button>
            <button
              onClick={() => setActiveTab('apply')}
              className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'apply'
                  ? 'bg-gradient-to-r from-[#a99410] to-[#8e7c0c] text-[#020024] shadow-sm font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
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
              <div className="bg-[#e5f2f9] rounded-2xl p-4 sm:p-5 border border-[#25c0f3]/30 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#101a6d] block mb-0.5">
                    Package / Remuneration
                  </span>
                  <span className="text-xl font-black text-slate-900 font-display">
                    {job.salary}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">Contract: {job.contract || '1 Year Renewable'}</p>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#101a6d] block mb-0.5">
                    Destination & Sponsorship
                  </span>
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Plane className="w-4 h-4 text-[#101a6d] shrink-0" />
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
                        <CheckCircle2 className="w-4 h-4 text-[#101a6d] shrink-0 mt-0.5" />
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
                <div className="bg-[#e5f2f9] p-3 rounded-xl border border-[#25c0f3]/30 text-xs text-[#101a6d]">
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Upload Resume / CV (PDF or Word) *
                  </label>
                  <label className="border-2 border-dashed border-slate-300 hover:border-[#a99410] rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-[#fff8d6]/50 transition-colors">
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
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] text-[#020024] font-bold text-sm shadow-md shadow-[#a99410]/25 transition-all flex items-center justify-center gap-2"
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
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-[#020024] bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] shadow-md shadow-[#a99410]/25 flex-1 sm:flex-none text-center flex items-center justify-center gap-1.5"
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
