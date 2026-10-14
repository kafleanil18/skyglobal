import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Briefcase, 
  Plane, 
  DollarSign, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Upload, 
  Sparkles,
  Send
} from 'lucide-react';

export default function JobModal({ job, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'apply'
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    currentLocation: '',
    note: '',
    fileName: ''
  });

  if (!isOpen || !job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep feedback visible for 2.5s then close
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-6 sm:p-7 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-medium">
              {job.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
              {job.workMode}
            </span>
            {job.visaSponsorship && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Visa Sponsored
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display text-white pr-8">
            {job.title}
          </h2>
          <p className="text-sky-300 font-medium text-sm mt-1">
            {job.company} • <span className="text-slate-300">{job.location}</span>
          </p>

          {/* Tab selector */}
          <div className="flex items-center gap-3 mt-5 pt-3 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('details')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'details'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Role & Relocation Details
            </button>
            <button
              onClick={() => setActiveTab('apply')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'apply'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Fast-Track Application
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'details' ? (
            <>
              {/* Compensation & Relocation Highlight Box */}
              <div className="bg-sky-50/80 rounded-2xl p-4 sm:p-5 border border-sky-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-sky-800 block mb-0.5">
                    Package Compensation
                  </span>
                  <span className="text-xl font-extrabold text-slate-900 font-display">
                    {job.salary}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">Base + Equity & Bonus options</p>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-sky-800 block mb-0.5">
                    Relocation & Legal Visa
                  </span>
                  <span className="text-sm font-bold text-sky-900 flex items-center gap-1.5">
                    <Plane className="w-4 h-4 text-sky-600 shrink-0" />
                    {job.relocationPackage || 'Full Visa Assistance'}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">100% legal fees covered</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Role Overview
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Requirements */}
              {job.requirements && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Key Technical Requirements
                  </h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits & Relocation Perks */}
              {job.benefits && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
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

              {/* Tech Stack Tags */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Required Technology Stack
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
                  Application Submitted!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you! Our international recruitment specialist for {job.location} will review your credentials and contact you within 24 hours.
                </p>
                <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                  Reference: SKG-{job.id}-{Math.floor(1000 + Math.random() * 9000)}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-sky-50/60 p-3.5 rounded-xl border border-sky-100 text-xs text-sky-900">
                  <span className="font-bold">Applying for:</span> {job.title} at {job.company} ({job.location})
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Henderson"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current City & Country *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Toronto, Canada"
                      value={formData.currentLocation}
                      onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      LinkedIn / GitHub URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/alex"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Resume Upload Box */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Upload Resume / CV (PDF or Word) *
                  </label>
                  <label className="border-2 border-dashed border-slate-300 hover:border-sky-500 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-sky-50/50 transition-colors">
                    <Upload className="w-6 h-6 text-slate-400 mb-1" />
                    <span className="text-xs font-semibold text-slate-700">
                      {formData.fileName ? formData.fileName : 'Click to upload or drag & drop'}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">PDF, DOCX up to 10MB</span>
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
                    Brief Note on Visa / Relocation Timeline (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Looking to relocate within 3 months, require EU Blue Card sponsorship."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-600/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Application & Request Visa Screening
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    SkyGlobal respects your privacy. We never share your profile without explicit written consent.
                  </p>
                </div>
              </form>
            )
          )}
        </div>

        {/* Footer Actions (Only when in details mode) */}
        {activeTab === 'details' && (
          <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 flex items-center justify-between shrink-0">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Ref: SKG-{job.id}
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
                className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 flex-1 sm:flex-none text-center flex items-center justify-center gap-1.5"
              >
                <span>Apply for this Role</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
