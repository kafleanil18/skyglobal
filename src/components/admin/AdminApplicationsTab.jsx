import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar,
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Filter,
  Download,
  Eye,
  X,
  ExternalLink,
  Briefcase,
  Globe2,
  FileDown
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import { downloadApplicantCV } from '../../utils/cvDownloader';

export default function AdminApplicationsTab() {
  const { applications, updateApplicationStatus, deleteApplication } = useCMS();
  const { isSuperAdmin, currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [previewApp, setPreviewApp] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const statusOptions = [
    'Pending',
    'Under Review',
    'Interview Scheduled',
    'Visa Processing',
    'Approved',
    'Rejected'
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Visa Processing':
        return 'bg-[#faf8ee] text-[#020024] border-[#a99410]/50 font-bold';
      case 'Interview Scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Under Review':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Rejected':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const handleDownload = (app) => {
    downloadApplicantCV(app);
    setToastMsg(`Downloaded CV for ${app.applicantName} (${app.resumeName || 'CV Document'}).`);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleExportAll = () => {
    if (applications.length === 0) return;
    
    // Generate CSV of all applicants
    const headers = ['Applicant Name', 'Email', 'Phone', 'Current Country', 'Applied Destination', 'Position', 'Experience', 'Status', 'Applied Date', 'CV Filename', 'Notes'];
    const rows = applications.map(a => [
      `"${(a.applicantName || '').replace(/"/g, '""')}"`,
      `"${(a.email || '').replace(/"/g, '""')}"`,
      `"${(a.phone || '').replace(/"/g, '""')}"`,
      `"${(a.currentCountry || '').replace(/"/g, '""')}"`,
      `"${(a.preferredDestination || '').replace(/"/g, '""')}"`,
      `"${(a.jobTitle || '').replace(/"/g, '""')}"`,
      `"${(a.experienceYears || '').replace(/"/g, '""')}"`,
      `"${(a.status || '').replace(/"/g, '""')}"`,
      `"${(a.appliedDate || '').replace(/"/g, '""')}"`,
      `"${(a.resumeName || '').replace(/"/g, '""')}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SkyGlobal_Candidates_Export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 2000);

    setToastMsg(`Exported ${applications.length} candidate application records.`);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const filtered = applications.filter(app => {
    const matchesSearch = 
      (app.applicantName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.jobTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.currentCountry || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.preferredDestination || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              Candidate Applications & CV Pool
            </h2>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
              Staff Portal Access
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Super Admins and Admins can review, preview, and download candidate CVs uploaded via the portal.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportAll}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Export all applications to CSV"
          >
            <FileDown className="w-3.5 h-3.5 text-slate-600" />
            <span>Export CSV</span>
          </button>

          <span className="text-xs font-bold text-[#020024] bg-[#faf8ee] px-3.5 py-2 rounded-xl border border-[#a99410]/50 shadow-xs">
            {applications.length} Candidates
          </span>
        </div>
      </div>

      {/* Toast feedback */}
      {toastMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-2xl text-xs font-bold flex items-center justify-between animate-fade-in shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg('')} className="text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by candidate name, email, role, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] shadow-sm"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#a99410] shadow-sm cursor-pointer"
        >
          <option value="All">All Pipeline Stages ({applications.length})</option>
          {statusOptions.map(st => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
      </div>

      {/* Applications Cards / List */}
      <div className="space-y-4">
        {filtered.map(app => (
          <div 
            key={app.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:border-[#a99410]/50 transition-all space-y-4"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#101a6d] bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-md">
                    {app.jobTitle}
                  </span>
                  {app.preferredDestination && (
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                      <Globe2 className="w-3 h-3 text-[#a99410]" />
                      {app.preferredDestination}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {app.applicantName}
                </h3>
              </div>

              {/* Status Selector & Delete */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-400">Stage:</span>
                <select
                  value={app.status}
                  onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#a99410] ${getStatusBadge(app.status)}`}
                >
                  {statusOptions.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    if (confirm(`Remove application of ${app.applicantName}?`)) {
                      deleteApplication(app.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1 cursor-pointer"
                  title="Delete Application Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-3.5 h-3.5 text-[#101a6d] shrink-0" />
                <a href={`mailto:${app.email}`} className="truncate hover:text-[#101a6d] font-semibold hover:underline">
                  {app.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-3.5 h-3.5 text-[#101a6d] shrink-0" />
                <span>{app.phone || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-[#101a6d] shrink-0" />
                <span>Location: <strong>{app.currentCountry || 'Not Specified'}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-[#101a6d] shrink-0" />
                <span>Applied: {app.appliedDate}</span>
              </div>
            </div>

            {/* Resume File Bar & Internal Recruiter Notes */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
              
              {/* CV File Attachment with Direct Download & Preview buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
                  <FileText className="w-4 h-4 text-[#101a6d] shrink-0" />
                  <span className="font-bold text-slate-800 truncate max-w-[200px]" title={app.resumeName}>
                    {app.resumeName || 'Attached_Resume.pdf'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    ({app.experienceYears || '3-5 yrs'} exp)
                  </span>
                </div>

                {/* Preview CV Button */}
                <button
                  onClick={() => setPreviewApp(app)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  title="View applicant summary and document preview"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Preview</span>
                </button>

                {/* Download CV Button (Super Admin & Admin) */}
                <button
                  onClick={() => handleDownload(app)}
                  className="px-3.5 py-1.5 rounded-xl text-[#020024] bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] text-xs font-extrabold flex items-center gap-1.5 shadow-sm shadow-[#a99410]/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
                  title="Download candidate's uploaded CV file"
                >
                  <Download className="w-3.5 h-3.5 text-[#020024]" />
                  <span>Download CV</span>
                </button>
              </div>

              {/* Recruiter Internal Note */}
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Add recruiter status note (e.g. Interview scheduled for Tuesday)..."
                  defaultValue={app.notes || ''}
                  onBlur={(e) => updateApplicationStatus(app.id, app.status, e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#a99410]"
                />
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 text-slate-500 text-xs space-y-2">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-bold text-slate-700">No applicant profiles found</p>
            <p className="text-slate-400">Try clearing the search keywords or resetting the pipeline status filter.</p>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* MODAL: PREVIEW APPLICANT CV & DOSSIER                         */}
      {/* ============================================================ */}
      {previewApp && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-fade-in my-8 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setPreviewApp(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="border-b border-slate-100 pb-5 mb-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#101a6d] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {previewApp.jobTitle}
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${getStatusBadge(previewApp.status)}`}>
                  {previewApp.status}
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900">
                {previewApp.applicantName}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Submitted on {previewApp.appliedDate} • Target Destination: <strong>{previewApp.preferredDestination || 'Europe / Malta'}</strong>
              </p>
            </div>

            {/* Applicant Quick Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mb-5 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Email</span>
                <a href={`mailto:${previewApp.email}`} className="font-semibold text-[#101a6d] hover:underline">
                  {previewApp.email}
                </a>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Phone Number</span>
                <span className="font-semibold text-slate-800">{previewApp.phone || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Current Country</span>
                <span className="font-semibold text-slate-800">{previewApp.currentCountry || 'Not specified'}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Experience Level</span>
                <span className="font-semibold text-slate-800">{previewApp.experienceYears || '3-5 years'}</span>
              </div>
            </div>

            {/* Document Preview Box */}
            <div className="mb-6 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                Attached Candidate Document:
              </span>
              
              <div className="bg-[#faf8ee] border border-[#a99410]/40 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#a99410]/30 flex items-center justify-center text-[#101a6d]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block truncate max-w-sm">
                      {previewApp.resumeName || 'Candidate_Resume.pdf'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {previewApp.resumeDataUrl ? 'Uploaded original candidate file' : 'Generated SkyGlobal candidate profile document'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(previewApp)}
                  className="px-4 py-2 rounded-xl text-[#020024] bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] text-xs font-extrabold flex items-center gap-1.5 shadow-sm shadow-[#a99410]/25 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>

              {/* If previewApp has a PDF data URL, show iframe preview */}
              {previewApp.resumeDataUrl && previewApp.resumeDataUrl.startsWith('data:application/pdf') && (
                <div className="mt-4 h-80 rounded-2xl overflow-hidden border border-slate-200">
                  <iframe 
                    src={previewApp.resumeDataUrl} 
                    className="w-full h-full"
                    title="PDF CV Document Preview"
                  />
                </div>
              )}
            </div>

            {/* Recruiter Notes & Applicant statement */}
            <div className="mb-6 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                Candidate Qualifications & Experience Summary:
              </span>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                {previewApp.notes || 'Registered through online portal with verified trade experience and documents.'}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPreviewApp(null)}
                className="px-4 py-2.5 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownload(previewApp);
                  setPreviewApp(null);
                }}
                className="px-6 py-2.5 rounded-xl text-[#020024] bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] text-xs font-extrabold flex items-center gap-2 shadow-md shadow-[#a99410]/25 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#020024]" />
                <span>Download Candidate CV</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
