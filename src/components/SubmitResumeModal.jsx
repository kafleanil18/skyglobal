import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Plane, 
  Send,
  Lock,
  Globe
} from 'lucide-react';
import { COMPANY_INFO } from '../data/skyGlobalData';
import { useCMS } from '../context/CMSContext';

export default function SubmitResumeModal({ isOpen, onClose }) {
  const { addApplication, countries } = useCMS();
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentCountry: '',
    preferredDestination: countries[0]?.name || 'Malta',
    profession: '',
    experienceYears: '3-5 years'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addApplication({
      jobId: 'general-cv-pool',
      jobTitle: `General Pool (${formData.profession || 'Skilled Talent'})`,
      applicantName: formData.name,
      email: formData.email,
      phone: formData.phone,
      currentCountry: formData.currentCountry,
      experienceYears: formData.experienceYears,
      preferredDestination: formData.preferredDestination,
      note: `Profession: ${formData.profession || 'Not specified'}. Registered through Fast-Track CV drop.`,
      fileName: fileName || 'Candidate_CV.pdf'
    });
    setSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setSubmitted(false);
        setFileName('');
        onClose();
      }, 2800);
    }, 500);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
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
            <Globe className="w-3.5 h-3.5 text-[#a99410]" />
            International Career Registration
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Submit Your CV to SkyGlobal HR
          </h2>
          <p className="text-[#b6eafb] text-xs sm:text-sm mt-1">
            Register your profile with our Dubai recruitment team for upcoming opportunities in Malta, Australia, UAE, Bulgaria, Romania, and Greece.
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
                CV Successfully Submitted!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Thank you! Our recruitment team at Sky Global HR Consultancy will review your qualifications against active overseas vacancies and reach out to you directly.
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                Candidate ID: SG-CAND-{Math.floor(100000 + Math.random() * 900000)}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michael Fernando"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    placeholder="michael@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
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
                    placeholder="e.g. UAE, Nepal, India, Philippines"
                    value={formData.currentCountry}
                    onChange={(e) => setFormData({ ...formData, currentCountry: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Trade / Profession *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Electrician, Plumber, F&B Server"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Desired Destination *
                  </label>
                  <select
                    value={formData.preferredDestination}
                    onChange={(e) => setFormData({ ...formData, preferredDestination: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410] bg-white"
                  >
                    {countries.map(c => (
                      <option key={c.id || c.name} value={c.name}>
                        {c.name} {c.badge ? `(${c.badge})` : ''}
                      </option>
                    ))}
                    <option value="Any suitable overseas opportunity">Any suitable overseas opportunity</option>
                  </select>
                </div>
              </div>

              {/* Upload CV */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upload Resume / CV *
                </label>
                <label className="border-2 border-dashed border-slate-300 hover:border-[#a99410] rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-[#fff8d6]/50 transition-colors">
                  <Upload className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-xs font-semibold text-slate-700">
                    {fileName ? fileName : 'Click to choose PDF or DOCX file'}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">Maximum file size 10MB</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>We respect your privacy. Profiles are treated with strict confidentiality.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] text-[#020024] font-bold text-sm shadow-md shadow-[#a99410]/25 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit CV to SkyGlobal Pool
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
