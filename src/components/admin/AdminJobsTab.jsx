import React, { useState } from 'react';
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
  Plane
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { COUNTRIES, SECTORS } from '../../data/skyGlobalData';

export default function AdminJobsTab() {
  const { jobs, addJob, updateJob, deleteJob } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState('All');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  
  const initialFormState = {
    title: '',
    company: 'Sky Global Partner Client',
    location: 'Malta',
    country: 'Malta',
    sector: 'MEP & Technical Trades',
    contract: '1 Year Renewable',
    salary: 'Attractive Salary Package',
    visaSponsorship: true,
    tags: '',
    description: '',
    requirements: '',
    benefits: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenAdd = () => {
    setEditingJobId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setEditingJobId(job.id);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      country: job.country,
      sector: job.sector,
      contract: job.contract,
      salary: job.salary,
      visaSponsorship: job.visaSponsorship,
      tags: job.tags ? job.tags.join(', ') : '',
      description: job.description,
      requirements: job.requirements ? job.requirements.join('\n') : '',
      benefits: job.benefits ? job.benefits.join('\n') : ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingJobId) {
      updateJob(editingJobId, formData);
    } else {
      addJob(formData);
    }
    setIsModalOpen(false);
  };

  const filtered = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountryFilter === 'All' || job.country === selectedCountryFilter;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Manage Vacancies & Job Postings
          </h2>
          <p className="text-xs text-slate-500">
            Add, update, or remove active job opportunities displayed across the public portal.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd300] to-[#f9c913] hover:from-[#ffdf47] hover:to-[#ffd300] text-[#020024] font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Vacancy</span>
        </button>
      </div>

      {/* Filter and search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by job title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ffd300] shadow-sm"
          />
        </div>

        <select
          value={selectedCountryFilter}
          onChange={(e) => setSelectedCountryFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ffd300] shadow-sm"
        >
          <option value="All">All Destination Countries</option>
          {COUNTRIES.map(c => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[11px] tracking-wider">
                <th className="py-3.5 px-4">Position & Role</th>
                <th className="py-3.5 px-4">Destination</th>
                <th className="py-3.5 px-4">Sector</th>
                <th className="py-3.5 px-4">Compensation</th>
                <th className="py-3.5 px-4">Visa Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(job => (
                <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{job.title}</div>
                    <div className="text-[11px] text-slate-500">{job.company}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      {job.location}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 border border-blue-100 font-medium">
                      {job.sector}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {job.salary}
                  </td>
                  <td className="py-3.5 px-4">
                    {job.visaSponsorship ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle className="w-3 h-3" />
                        Sponsored
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">Direct</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(job)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit Job"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete vacancy "${job.title}"?`)) {
                            deleteJob(job.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Job"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto relative animate-fade-in">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-display text-slate-900 mb-1">
              {editingJobId ? 'Edit Job Posting' : 'Post New Vacancy'}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Fill in the role details to publish to the public job board.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Position Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Electrician"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Destination Country *</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-amber-400"
                  >
                    {COUNTRIES.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Industry Sector *</label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-amber-400"
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Salary / Remuneration *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Attractive European Salary Package"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contract Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Year, Renewable"
                    value={formData.contract}
                    onChange={(e) => setFormData({ ...formData, contract: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Skills Tags (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="Wiring, Testing, Single-Phase, Blueprint"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Job Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Comprehensive description of the vacancy..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Key Requirements (One per line)</label>
                <textarea
                  rows={3}
                  placeholder="3+ years technical experience&#10;Certified license or diploma&#10;Conversational English"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Visa & Benefits (One per line)</label>
                <textarea
                  rows={2}
                  placeholder="Full visa sponsorship&#10;Accommodation allowance&#10;Health insurance"
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-[#020024] bg-gradient-to-r from-[#ffd300] to-[#f9c913] hover:from-[#ffdf47] hover:to-[#ffd300] font-bold shadow-md shadow-[#ffd300]/25"
                >
                  {editingJobId ? 'Save Changes' : 'Publish Vacancy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
