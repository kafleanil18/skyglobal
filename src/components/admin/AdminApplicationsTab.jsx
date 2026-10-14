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
  Filter
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminApplicationsTab() {
  const { applications, updateApplicationStatus, deleteApplication } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

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
        return 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
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

  const filtered = applications.filter(app => {
    const matchesSearch = 
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.currentCountry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Candidate Applications & CV Pool
          </h2>
          <p className="text-xs text-slate-500">
            Review submitted candidate credentials, manage visa pipeline stages, and update applicant notes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            Total: {applications.length} Profiles
          </span>
        </div>
      </div>

      {/* Filter and search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by candidate name, email, job, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
        >
          <option value="All">All Pipeline Stages</option>
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
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:border-amber-300 transition-all space-y-4"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  Applied for: {app.jobTitle}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {app.applicantName}
                </h3>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-400">Status:</span>
                <select
                  value={app.status}
                  onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 ${getStatusBadge(app.status)}`}
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
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-2"
                  title="Delete Application"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate">{app.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{app.phone || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Current: <strong>{app.currentCountry}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Applied: {app.appliedDate}</span>
              </div>
            </div>

            {/* Resume and Notes */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Attached CV: {app.resumeName}</span>
                <span className="text-[10px] text-slate-400 font-normal">({app.experienceYears} exp)</span>
              </div>

              {/* Internal Notes */}
              <div className="w-full sm:w-1/2">
                <input
                  type="text"
                  placeholder="Add internal recruiter note..."
                  defaultValue={app.notes || ''}
                  onBlur={(e) => updateApplicationStatus(app.id, app.status, e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-500 text-xs">
            No applicant profiles match the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
