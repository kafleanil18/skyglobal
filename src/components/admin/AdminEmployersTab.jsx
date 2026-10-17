import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  CheckCircle2,
  Users,
  Clock
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminEmployersTab() {
  const { employerRequests, updateEmployerRequestStatus, deleteEmployerRequest } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');

  const statusOptions = ['New', 'Contacted', 'Sourced & Screening', 'Completed'];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Sourced & Screening': return 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
      case 'Contacted': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-purple-100 text-purple-800 border-purple-300 font-bold animate-pulse';
    }
  };

  const filtered = employerRequests.filter(req => 
    (req.companyName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (req.contactName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (req.industrySector || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Employer Talent Requests
          </h2>
          <p className="text-xs text-slate-500">
            Manage incoming corporate hiring requests, headcount demands, and recruitment mandates.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          Total: {employerRequests.length} Corporate Leads
        </span>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by company name, contact, or sector..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
        />
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.map(req => (
          <div
            key={req.id}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:border-amber-300 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  {req.industrySector}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {req.companyName}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Contact: <strong className="text-slate-800">{req.contactName}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-400">Status:</span>
                <select
                  value={req.status}
                  onChange={(e) => updateEmployerRequestStatus(req.id, e.target.value)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 ${getStatusBadge(req.status)}`}
                >
                  {statusOptions.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    if (confirm(`Delete employer inquiry from ${req.companyName}?`)) {
                      deleteEmployerRequest(req.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-2"
                  title="Delete Request"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate">{req.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{req.phone || 'Direct'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Headcount: <strong>{req.headcount}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Destination: <strong>{req.destinationCountry}</strong></span>
              </div>
            </div>

            {req.notes && (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs text-slate-700">
                <span className="font-semibold text-slate-900">Requirements / Notes: </span>
                {req.notes}
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-500 text-xs">
            No employer requests found.
          </div>
        )}
      </div>
    </div>
  );
}
