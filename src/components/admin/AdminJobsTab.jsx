import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  X,
  FileCheck,
  Plane,
  Users,
  Clock,
  AlertCircle,
  Filter,
  CheckCircle2,
  Crown,
  Hash,
  Sparkles,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import { SECTORS } from '../../data/skyGlobalData';

export default function AdminJobsTab() {
  const { jobs, addJob, updateJob, deleteJob, countries } = useCMS();
  const { isSuperAdmin } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [toastMsg, setToastMsg] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  
  const initialFormState = {
    rffNumber: '',
    title: '',
    company: 'Sky Global Partner Client',
    location: 'Malta',
    country: 'Malta',
    sector: 'MEP & Technical Trades',
    contract: '1 Year Renewable',
    salary: 'Attractive Salary Package',
    visaProcessing: '⚡ Fast-track 3–4 Weeks',
    perks: '',
    vacancies: 4,
    status: 'Active',
    visaSponsorship: true,
    tags: '',
    description: '',
    requirements: '',
    benefits: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  // Helper: Auto-generate an available, guaranteed-unique RFF code
  const generateUniqueRFF = (countryName) => {
    const prefix = (countryName || formData.country || 'MLT').slice(0, 3).toUpperCase();
    let num = 101;
    let candidate = `RFF-${prefix}-${num}`;
    while (jobs.some(j => 
      ((j.rffNumber || '').trim().toUpperCase() === candidate || 
       (j.id || '').trim().toUpperCase() === candidate) &&
      (!editingJobId || j.id !== editingJobId)
    )) {
      num++;
      candidate = `RFF-${prefix}-${num}`;
    }
    return candidate;
  };

  // Instant Keystroke Validation: Checks RFF uniqueness on every typed character
  const rffValidation = useMemo(() => {
    const raw = (formData.rffNumber || '').trim();
    if (!raw) {
      return {
        status: 'empty',
        message: 'Unique RFF reference number is required.',
        isDuplicate: false,
        conflictingJob: null
      };
    }

    const normalized = raw.toUpperCase();

    // Check if any other job in the system already uses this RFF number or ID
    const conflictingJob = jobs.find(j => {
      // Exclude current job being edited
      if (editingJobId && j.id === editingJobId) return false;

      const otherRff = (j.rffNumber || '').trim().toUpperCase();
      const otherId = (j.id || '').trim().toUpperCase();

      return otherRff === normalized || otherId === normalized;
    });

    if (conflictingJob) {
      return {
        status: 'duplicate',
        message: `RFF "${raw}" is already assigned to "${conflictingJob.title}" (${conflictingJob.country || conflictingJob.location}).`,
        isDuplicate: true,
        conflictingJob
      };
    }

    return {
      status: 'valid',
      message: `RFF "${raw}" is unique and available.`,
      isDuplicate: false,
      conflictingJob: null
    };
  }, [formData.rffNumber, jobs, editingJobId]);

  const handleOpenAdd = () => {
    setEditingJobId(null);
    setFormData({
      ...initialFormState,
      rffNumber: generateUniqueRFF('Malta'),
      perks: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setEditingJobId(job.id);
    setFormData({
      rffNumber: job.rffNumber || job.id || '',
      title: job.title || '',
      company: job.company || 'Sky Global Partner Client',
      location: job.location || '',
      country: job.country || (countries[0]?.name || 'Malta'),
      sector: job.sector || 'MEP & Technical Trades',
      contract: job.contract || '1 Year Renewable',
      salary: job.salary || 'Attractive Salary Package',
      visaProcessing: job.visaProcessing || '⚡ Fast-track 3–4 Weeks',
      perks: Array.isArray(job.perks) ? job.perks.join('\n') : (job.perks || ''),
      vacancies: job.vacancies !== undefined ? Number(job.vacancies) : 1,
      status: job.status || 'Active',
      visaSponsorship: job.visaSponsorship !== false,
      tags: Array.isArray(job.tags) ? job.tags.join(', ') : (job.tags || ''),
      description: job.description || '',
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : (job.requirements || ''),
      benefits: Array.isArray(job.benefits) ? job.benefits.join('\n') : (job.benefits || '')
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rffValidation.isDuplicate || !formData.rffNumber.trim()) {
      setToastMsg('Cannot publish vacancy: Please resolve the duplicate RFF reference number.');
      return;
    }

    const payload = {
      ...formData,
      rffNumber: formData.rffNumber.trim().toUpperCase(),
      vacancies: Math.max(1, parseInt(formData.vacancies, 10) || 1),
      perks: formData.perks ? formData.perks.split('\n').map(s => s.trim()).filter(Boolean) : [],
      visaProcessing: formData.visaProcessing || '⚡ Fast-track 3–4 Weeks'
    };

    if (editingJobId) {
      updateJob(editingJobId, payload);
      setToastMsg(`Updated vacancy "${formData.title}" (${payload.rffNumber}).`);
    } else {
      addJob(payload);
      setToastMsg(`Published new vacancy "${formData.title}" (${payload.rffNumber}) with ${payload.vacancies} openings.`);
    }
    setIsModalOpen(false);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleQuickStatusChange = (job, newStatus) => {
    updateJob(job.id, { status: newStatus });
    setToastMsg(`Vacancy "${job.title}" status changed to ${newStatus}.`);
    setTimeout(() => setToastMsg(''), 3500);
  };

  // Metrics calculations
  const totalVacanciesCount = jobs.reduce((acc, j) => acc + (Number(j.vacancies) || 1), 0);
  const activeJobsCount = jobs.filter(j => (j.status || 'Active') === 'Active').length;
  const awaitingJobsCount = jobs.filter(j => j.status === 'Awaiting Confirmation').length;
  const inactiveJobsCount = jobs.filter(j => j.status === 'Inactive').length;

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300 font-black';
      case 'Awaiting Confirmation':
        return 'bg-amber-50 text-amber-900 border-amber-300 font-black';
      case 'Inactive':
        return 'bg-slate-100 text-slate-600 border-slate-300 font-bold';
      default:
        return 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold';
    }
  };

  const filtered = jobs.filter(job => {
    const matchesSearch = 
      (job.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.rffNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.id || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountryFilter === 'All' || job.country === selectedCountryFilter;
    const matchesStatus = selectedStatusFilter === 'All' || (job.status || 'Active') === selectedStatusFilter;
    return matchesSearch && matchesCountry && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              Manage Vacancies & Job Postings
            </h2>
            {isSuperAdmin && (
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#020024] bg-[#faf8ee] border border-[#a99410]/50 px-2.5 py-0.5 rounded-full shadow-xs">
                <Crown className="w-3 h-3 text-[#a99410]" />
                Super Admin Control
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Manage open job quotas, set the number of vacancies available per role, and update position statuses (Active, Awaiting Confirmation, or Inactive).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] text-[#020024] font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#a99410]/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4 text-[#020024]" />
          <span>Post New Vacancy</span>
        </button>
      </div>

      {/* Vacancies & Status Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm text-xs">
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Total Roles
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 font-display">
            {jobs.length}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">Job Titles</span>
        </div>

        <div className="bg-[#faf8ee] p-3.5 rounded-2xl border border-[#a99410]/40">
          <span className="text-[10px] font-bold text-[#a99410] uppercase tracking-wider block mb-1 flex items-center gap-1">
            <Users className="w-3 h-3 text-[#a99410]" />
            Total Vacancy Openings
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#020024] font-display">
            {totalVacanciesCount}
          </span>
          <span className="text-[11px] text-[#8e7c0c] font-semibold block mt-0.5">Open Candidate Seats</span>
        </div>

        <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200">
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Active Hiring
          </span>
          <span className="text-xl sm:text-2xl font-black text-emerald-800 font-display">
            {activeJobsCount}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">Live On Board</span>
        </div>

        <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200">
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-600" />
            Awaiting Confirmation
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-900 font-display">
            {awaitingJobsCount}
          </span>
          <span className="text-[11px] text-amber-700 font-semibold block mt-0.5">Quota Review ({inactiveJobsCount} Closed)</span>
        </div>
      </div>

      {/* Toast Feedback */}
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

      {/* Filter and search toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by job title, company, or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410]"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Country filter */}
          <select
            value={selectedCountryFilter}
            onChange={(e) => setSelectedCountryFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#a99410] cursor-pointer"
          >
            <option value="All">All Countries</option>
            {countries.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#a99410] cursor-pointer"
          >
            <option value="All">All Statuses ({jobs.length})</option>
            <option value="Active">Active ({activeJobsCount})</option>
            <option value="Awaiting Confirmation">Awaiting Confirmation ({awaitingJobsCount})</option>
            <option value="Inactive">Inactive ({inactiveJobsCount})</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[11px] tracking-wider">
                <th className="py-3.5 px-4">Position & Role</th>
                <th className="py-3.5 px-4">Destination</th>
                <th className="py-3.5 px-4">Vacancies</th>
                <th className="py-3.5 px-4">Vacancy Status</th>
                <th className="py-3.5 px-4">Sector</th>
                <th className="py-3.5 px-4">Compensation</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(job => (
                <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Position & Role */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-slate-900 text-[13px]">{job.title}</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black bg-[#101a6d] text-white tracking-wider font-mono shadow-2xs">
                        <Hash className="w-2.5 h-2.5 text-[#25c0f3]" />
                        <span>{job.rffNumber || job.id}</span>
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{job.company}</div>
                  </td>

                  {/* Destination */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-[#a99410]" />
                      {job.location}
                    </span>
                  </td>

                  {/* Number of Vacancies Open */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#faf8ee] text-[#020024] font-black border border-[#a99410]/50 shadow-xs">
                      <Users className="w-3.5 h-3.5 text-[#a99410]" />
                      <span>{job.vacancies || 1} {job.vacancies === 1 ? 'Seat' : 'Seats'}</span>
                    </span>
                  </td>

                  {/* Interactive Vacancy Status Selector (Super Admin & Admin) */}
                  <td className="py-3.5 px-4">
                    <select
                      value={job.status || 'Active'}
                      onChange={(e) => handleQuickStatusChange(job, e.target.value)}
                      className={`text-xs font-black px-2.5 py-1 rounded-xl border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#a99410] shadow-xs transition-colors ${getStatusBadgeClass(job.status || 'Active')}`}
                      title="Change vacancy status"
                    >
                      <option value="Active">● Active</option>
                      <option value="Awaiting Confirmation">⧗ Awaiting Confirmation</option>
                      <option value="Inactive">○ Inactive</option>
                    </select>
                  </td>

                  {/* Sector */}
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 border border-blue-100 font-semibold text-[11px]">
                      {job.sector}
                    </span>
                  </td>

                  {/* Compensation */}
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {job.salary}
                  </td>

                  {/* Action buttons */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(job)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-[#101a6d] hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Edit Job Vacancy"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Permanently delete vacancy "${job.title}"?`)) {
                            deleteJob(job.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Job Vacancy"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="p-12 text-center text-slate-500 text-xs space-y-2">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700">No vacancies match your filter</p>
              <p className="text-slate-400">Try adjusting your search keywords or resetting the status and country filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODAL: POST / EDIT JOB VACANCY                               */}
      {/* ============================================================ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto relative animate-fade-in my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-display text-slate-900 mb-1">
              {editingJobId ? 'Edit Job Vacancy' : 'Post New Job Vacancy'}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Specify the number of available vacancies and publish the role to candidates.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* RFF Reference Number (Real-Time Keystroke Uniqueness Detection) */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-[#101a6d]" />
                    <span>RFF Reference Number *</span>
                    <span className="text-[10px] font-normal text-slate-400">(Must be globally unique)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const generated = generateUniqueRFF(formData.country);
                      setFormData(prev => ({ ...prev, rffNumber: generated }));
                    }}
                    className="text-[11px] font-bold text-[#101a6d] hover:text-[#a99410] flex items-center gap-1 cursor-pointer transition-colors"
                    title="Generate an available unique RFF number"
                  >
                    <Sparkles className="w-3 h-3 text-[#a99410]" />
                    <span>Auto-Generate Available RFF</span>
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. RFF-MLT-101 or RFF-2026-904"
                    value={formData.rffNumber}
                    onChange={(e) => setFormData({ ...formData, rffNumber: e.target.value.toUpperCase() })}
                    className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl border text-xs font-mono font-bold tracking-wider uppercase transition-all outline-none ${
                      rffValidation.status === 'duplicate'
                        ? 'border-rose-500 bg-rose-50/60 text-rose-950 focus:ring-2 focus:ring-rose-500'
                        : rffValidation.status === 'valid'
                        ? 'border-emerald-500 bg-emerald-50/40 text-emerald-950 focus:ring-2 focus:ring-emerald-500'
                        : 'border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#a99410]'
                    }`}
                  />

                  {/* Live Status Icon */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    {rffValidation.status === 'duplicate' && (
                      <XCircle className="w-4 h-4 text-rose-600 animate-pulse" />
                    )}
                    {rffValidation.status === 'valid' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                    {rffValidation.status === 'empty' && (
                      <span className="text-[10px] text-slate-400 font-bold">REQ</span>
                    )}
                  </div>
                </div>

                {/* Real-time Inline Detection Message */}
                {rffValidation.status === 'duplicate' && (
                  <div className="p-2.5 rounded-xl bg-rose-100 border border-rose-300 text-rose-900 flex items-start gap-2 text-[11px] animate-fadeIn">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-black">Duplicate RFF Detected!</strong>
                      <span>{rffValidation.message}</span>
                    </div>
                  </div>
                )}

                {rffValidation.status === 'valid' && (
                  <div className="p-2 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold">{rffValidation.message}</span>
                  </div>
                )}

                {rffValidation.status === 'empty' && (
                  <span className="text-[10px] text-slate-400 block">
                    Type any RFF number — the system instantly detects uniqueness across all vacancies as you type.
                  </span>
                )}
              </div>

              {/* Position Title */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Position Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Electrician / Maintenance Supervisor"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-[#a99410]"
                />
              </div>

              {/* Vacancies Count & Status (Highlighted Super Admin Controls) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-[#faf8ee] p-4 rounded-2xl border border-[#a99410]/40">
                <div>
                  <label className="block font-bold text-[#020024] mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#a99410]" />
                    Number of Vacancies / Openings *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="999"
                      required
                      placeholder="e.g. 5"
                      value={formData.vacancies}
                      onChange={(e) => setFormData({ ...formData, vacancies: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                      className="w-full pl-3.5 pr-14 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs font-bold focus:ring-2 focus:ring-[#a99410] bg-white"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 font-bold pointer-events-none">
                      Seats
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Total headcount quotas required for this role.
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-[#020024] mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#a99410]" />
                    Vacancy Hiring Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-extrabold focus:ring-2 focus:ring-[#a99410] bg-white cursor-pointer"
                  >
                    <option value="Active">● Active (Open for applications)</option>
                    <option value="Awaiting Confirmation">⧗ Awaiting Confirmation (Employer/Quota review)</option>
                    <option value="Inactive">○ Inactive (Closed / Filled)</option>
                  </select>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Public visibility and applicant intake status.
                  </span>
                </div>
              </div>

              {/* Country & Sector */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Destination Country *</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-[#a99410] bg-white cursor-pointer"
                  >
                    {countries.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Industry Sector *</label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-[#a99410] bg-white cursor-pointer"
                  >
                    <option>MEP & Technical Trades</option>
                    <option>Hospitality & Tourism</option>
                    <option>Construction & Civil Engineering</option>
                    <option>Manufacturing & Logistics</option>
                    <option>Healthcare & Medical Support</option>
                    <option>Professional Services & IT</option>
                  </select>
                </div>
              </div>

              {/* Salary & Contract */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Salary / Remuneration *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Attractive European Salary Package"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-[#a99410]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contract Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Year, Renewable"
                    value={formData.contract}
                    onChange={(e) => setFormData({ ...formData, contract: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-[#a99410]"
                  />
                </div>
              </div>

              {/* Skills Tags */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Skills Tags (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="Wiring, Testing, Single-Phase, Blueprint Reading"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-[#a99410]"
                />
              </div>

              {/* Job Description */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Role Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed summary of day-to-day duties, facility environment, and client expectations..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-[#a99410]"
                />
              </div>

              {/* Key Inclusions & Candidate Perks (Manual Admin Entry) */}
              <div className="bg-[#faf8ee] p-4 rounded-2xl border border-[#a99410]/40 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="block font-bold text-[#020024] text-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#a99410]" />
                    <span>Key Inclusions & Candidate Perks (Manual Entry)</span>
                  </label>
                  <span className="text-[10px] text-slate-500 font-medium">
                    (1 perk per line • Leave empty if no specific inclusions)
                  </span>
                </div>

                <p className="text-[11px] text-slate-600">
                  Enter the exact contract inclusions for this position. Only inclusions entered here will be displayed to candidates on the website.
                </p>

                {/* Quick Add Helper Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 mr-1 uppercase tracking-wider">
                    Quick Add:
                  </span>
                  {[
                    '🏠 Free Accommodation',
                    '✈️ Return Air Ticket',
                    '🏥 Medical Insurance',
                    '⚡ Overtime Pay',
                    '🍽️ Duty Meals Provided',
                    '🚗 Transport Included',
                    '💰 Tax-Free Tips'
                  ].map(perk => (
                    <button
                      key={perk}
                      type="button"
                      onClick={() => {
                        const current = formData.perks ? formData.perks.trim().split('\n') : [];
                        if (!current.includes(perk)) {
                          const updated = [...current, perk].join('\n');
                          setFormData({ ...formData, perks: updated });
                        }
                      }}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-white text-slate-700 border border-slate-200 hover:border-[#a99410] hover:text-[#020024] transition-colors cursor-pointer shadow-2xs"
                    >
                      + {perk}
                    </button>
                  ))}
                  {formData.perks && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, perks: '' })}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer ml-auto"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <textarea
                  rows={3}
                  placeholder="🏠 Free Accommodation&#10;✈️ Return Air Ticket&#10;🏥 Medical Insurance&#10;⚡ Overtime Pay"
                  value={formData.perks}
                  onChange={(e) => setFormData({ ...formData, perks: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-[#a99410]"
                />
              </div>

              {/* Visa Processing Speed Tag */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Visa Processing Speed Tag</label>
                <input
                  type="text"
                  placeholder="e.g. ⚡ Fast-track 3–4 Weeks"
                  value={formData.visaProcessing}
                  onChange={(e) => setFormData({ ...formData, visaProcessing: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-[#a99410]"
                />
              </div>

              {/* Requirements & Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Requirements (1 per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Valid trade license&#10;3+ years experience&#10;English conversational ability"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-[#a99410] font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Benefits (1 per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Work permit & visa sponsorship&#10;Accommodation support&#10;Overtime pay eligibility"
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-[#a99410] font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={rffValidation.isDuplicate || !formData.rffNumber.trim()}
                  className={`px-6 py-2.5 rounded-xl font-extrabold shadow-md transition-all flex items-center gap-1.5 ${
                    rffValidation.isDuplicate || !formData.rffNumber.trim()
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] text-[#020024] shadow-[#a99410]/25 cursor-pointer'
                  }`}
                  title={
                    rffValidation.isDuplicate
                      ? 'Cannot save: RFF number is already assigned to another vacancy'
                      : !formData.rffNumber.trim()
                      ? 'Cannot save: Unique RFF number is required'
                      : editingJobId ? 'Save Vacancy Changes' : 'Publish Job Vacancy'
                  }
                >
                  <CheckCircle className={`w-4 h-4 ${rffValidation.isDuplicate || !formData.rffNumber.trim() ? 'text-slate-400' : 'text-[#020024]'}`} />
                  <span>{editingJobId ? 'Save Vacancy Changes' : 'Publish Job Vacancy'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
