import React, { useState } from 'react';
import { 
  Globe2, 
  Edit3, 
  CheckCircle, 
  Plane, 
  X, 
  Plus, 
  Trash2, 
  Crown, 
  ShieldCheck, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  Search,
  Filter,
  Image as ImageIcon
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';

const PRESET_DESTINATIONS = [
  { label: 'Europe (Germany)', url: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Europe (Croatia)', url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80' },
  { label: 'Europe (Poland)', url: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=800&q=80' },
  { label: 'Middle East (Saudi/Qatar)', url: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80' },
  { label: 'Asia (Japan)', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80' },
  { label: 'UK & Ireland', url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80' }
];

export default function AdminCountriesTab() {
  const { countries, addCountry, updateCountry, deleteCountry, jobs } = useCMS();
  const { isSuperAdmin, currentUser } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [msg, setMsg] = useState({ type: '', text: '' });

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const [countryToDelete, setCountryToDelete] = useState(null);

  // Add Form state
  const initialAddFormState = {
    name: '',
    status: 'Active Hiring',
    badge: 'European Hub',
    highlight: 'Authorized Work Permit & Single Permit Sponsorship',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
    overview: '',
    detailsText: `Direct employer sponsorship and authorized work permit documentation.
Comprehensive pre-departure verification and flight logistics.
Renewable 1-year contract with competitive salary and accommodation benefits.`
  };
  const [addFormData, setAddFormData] = useState(initialAddFormState);

  // Edit Form state
  const [editFormData, setEditFormData] = useState({
    name: '',
    status: '',
    badge: '',
    highlight: '',
    image: '',
    overview: '',
    detailsText: ''
  });

  // Open Edit Modal
  const handleOpenEdit = (country) => {
    setEditingCountry(country);
    setEditFormData({
      name: country.name || '',
      status: country.status || 'Active Hiring',
      badge: country.badge || '',
      highlight: country.highlight || '',
      image: country.image || '',
      overview: country.overview || '',
      detailsText: Array.isArray(country.details) 
        ? country.details.join('\n') 
        : (country.details || '')
    });
  };

  // Submit Add Country
  const handleAddCountry = (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    if (!isSuperAdmin) {
      setMsg({ 
        type: 'error', 
        text: 'Access Denied: Only Super Admins have permission to add new destination countries.' 
      });
      return;
    }

    const trimmedName = addFormData.name.trim();
    if (!trimmedName) {
      setMsg({ type: 'error', text: 'Country name is required.' });
      return;
    }

    // Check duplicate
    const isDuplicate = countries.some(
      c => c.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (isDuplicate) {
      setMsg({ 
        type: 'error', 
        text: `A destination named "${trimmedName}" already exists. Please choose a different name.` 
      });
      return;
    }

    const detailsArray = addFormData.detailsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    addCountry({
      name: trimmedName,
      status: addFormData.status,
      badge: addFormData.badge,
      highlight: addFormData.highlight,
      image: addFormData.image,
      overview: addFormData.overview,
      details: detailsArray
    });

    setIsAddModalOpen(false);
    setAddFormData(initialAddFormState);
    setMsg({ 
      type: 'success', 
      text: `Destination "${trimmedName}" has been successfully added to public listings and job filters.` 
    });
  };

  // Submit Edit Country
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingCountry) return;

    const detailsArray = editFormData.detailsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    updateCountry(editingCountry.id, {
      name: editFormData.name.trim() || editingCountry.name,
      status: editFormData.status,
      badge: editFormData.badge,
      highlight: editFormData.highlight,
      image: editFormData.image,
      overview: editFormData.overview,
      details: detailsArray
    });

    const countryName = editFormData.name || editingCountry.name;
    setEditingCountry(null);
    setMsg({ 
      type: 'success', 
      text: `Destination settings for "${countryName}" updated successfully.` 
    });
  };

  // Confirm Delete Country
  const handleConfirmDelete = () => {
    if (!countryToDelete) return;

    if (!isSuperAdmin) {
      setMsg({ 
        type: 'error', 
        text: 'Access Denied: Only Super Admins have permission to delete destination countries.' 
      });
      setCountryToDelete(null);
      return;
    }

    const deletedName = countryToDelete.name;
    deleteCountry(countryToDelete.id);
    setCountryToDelete(null);
    setMsg({ 
      type: 'success', 
      text: `Destination "${deletedName}" was successfully removed from the system.` 
    });
  };

  // Filter countries
  const filteredCountries = countries.filter(c => {
    const matchesSearch = (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.badge || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.highlight || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' ? true : (c.status === statusFilter);
    return matchesSearch && matchesStatus;
  });

  // Calculate jobs matching each country
  const getJobsCount = (countryName) => {
    if (!countryName) return 0;
    const lower = countryName.toLowerCase();
    return jobs.filter(j => 
      (j.country && j.country.toLowerCase() === lower) ||
      (j.location && j.location.toLowerCase().includes(lower))
    ).length;
  };

  return (
    <div className="space-y-6">
      
      {/* Tab Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              Manage Destination Countries
            </h2>
            {isSuperAdmin ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#faf8ee] text-[#020024] text-[10px] font-black border border-[#a99410]/50 shadow-xs">
                <Crown className="w-3 h-3 text-[#a99410]" />
                Super Admin Privilege
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold border border-slate-200">
                <ShieldCheck className="w-3 h-3 text-[#101a6d]" />
                Standard Admin (Edit Only)
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {isSuperAdmin 
              ? 'Full administrative control to add new destination countries, configure visa work-permit pathways, or permanently delete obsolete destinations.'
              : 'Configure existing country parameters, update labor demand summaries, and adjust active hiring status. (Adding and deleting requires Super Admin privileges).'}
          </p>
        </div>

        {/* Add Destination Button */}
        <div>
          {isSuperAdmin ? (
            <button
              onClick={() => {
                setMsg({ type: '', text: '' });
                setIsAddModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-[#020024] bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] shadow-md shadow-[#a99410]/25 transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4 text-[#020024]" />
              <span>Add Destination Country</span>
            </button>
          ) : (
            <button
              disabled
              title="Super Admin account required to add new countries"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed flex items-center gap-1.5 opacity-70"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Add Country (Super Admin Only)</span>
            </button>
          )}
        </div>
      </div>

      {/* Feedback Message */}
      {msg.text && (
        <div className={`p-4 rounded-2xl flex items-center justify-between text-xs font-bold transition-all shadow-sm ${
          msg.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
            : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          <div className="flex items-center gap-2">
            {msg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{msg.text}</span>
          </div>
          <button 
            onClick={() => setMsg({ type: '', text: '' })}
            className="text-slate-400 hover:text-slate-700 ml-4 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search destination name, badge, or visa highlight..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#a99410]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-semibold text-[11px] flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#a99410] cursor-pointer"
          >
            <option value="All">All Statuses ({countries.length})</option>
            <option value="Active Hiring">Active Hiring</option>
            <option value="Coming Soon!">Coming Soon!</option>
            <option value="Season Closed">Season Closed</option>
          </select>
        </div>
      </div>

      {/* Destinations Grid */}
      {filteredCountries.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center space-y-3">
          <Globe2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No destinations match your search</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords or clear the status filter to see all destination hubs.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('All');
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCountries.map(c => {
            const activeJobs = getJobsCount(c.name);

            return (
              <div 
                key={c.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#a99410]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Header */}
                  <div className="h-36 overflow-hidden relative">
                    <img 
                      src={c.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'} 
                      alt={c.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900/90 text-white backdrop-blur-xs border border-white/20">
                        {c.badge || 'Global Hub'}
                      </span>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs ${
                        (c.status || '').includes('Active') 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-gradient-to-r from-[#a99410] to-[#8e7c0c] text-[#020024]'
                      }`}>
                        {c.status || 'Active Hiring'}
                      </span>
                    </div>

                    {/* Bottom Title */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                      <h3 className="text-xl font-bold text-white font-display">
                        {c.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-200 bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-lg border border-white/20">
                        {activeJobs} {activeJobs === 1 ? 'Job' : 'Jobs'}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3 text-xs text-slate-700">
                    <div className="bg-[#e5f2f9] p-2.5 rounded-xl text-[#101a6d] font-semibold flex items-center gap-2 border border-[#25c0f3]/30">
                      <Plane className="w-3.5 h-3.5 text-[#101a6d] shrink-0" />
                      <span className="truncate">{c.highlight || 'Authorized Work Permit & Sponsorship'}</span>
                    </div>

                    <p className="line-clamp-3 text-slate-600 leading-relaxed text-[11.5px]">
                      {c.overview || 'Comprehensive overseas placement with authorized visas and career growth.'}
                    </p>

                    {/* Bullet Points Preview */}
                    {Array.isArray(c.details) && c.details.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        {c.details.slice(0, 2).map((d, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-500">
                            <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{d}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 bg-slate-50/60">
                  {/* Super Admin Delete Button */}
                  {isSuperAdmin ? (
                    <button
                      onClick={() => setCountryToDelete(c)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      title={`Permanently delete ${c.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>Delete</span>
                    </button>
                  ) : (
                    <span 
                      className="text-[10px] text-slate-400 flex items-center gap-1 cursor-default"
                      title="Only Super Admins can delete destinations"
                    >
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span>Protected Hub</span>
                    </span>
                  )}

                  {/* Edit / Configure Button */}
                  <button
                    onClick={() => handleOpenEdit(c)}
                    className="px-4 py-1.5 rounded-xl bg-white hover:bg-[#faf8ee] text-slate-800 border border-slate-200 hover:border-[#a99410] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#a99410]" />
                    <span>Configure Hub</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 1: ADD DESTINATION COUNTRY (SUPER ADMIN ONLY)          */}
      {/* ============================================================ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-fade-in my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-[#faf8ee] border border-[#a99410]/40 flex items-center justify-center text-[#a99410]">
                <Globe2 className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900">
                Add New Destination Country
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Super Admin Control: Create a new destination hub to showcase on the homepage, destination guide, and job placement forms.
            </p>

            <form onSubmit={handleAddCountry} className="space-y-4 text-xs">
              
              {/* Row 1: Country Name & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Country Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Germany, Poland, Croatia, Saudi Arabia"
                    value={addFormData.name}
                    onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Hiring Status *
                  </label>
                  <select
                    value={addFormData.status}
                    onChange={(e) => setAddFormData({ ...addFormData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410] bg-white cursor-pointer"
                  >
                    <option value="Active Hiring">Active Hiring</option>
                    <option value="Coming Soon!">Coming Soon!</option>
                    <option value="Season Closed">Season Closed</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Badge & Visa Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Regional / Hub Badge *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. European Union Hub, Schengen Member, Middle East GCC"
                    value={addFormData.badge}
                    onChange={(e) => setAddFormData({ ...addFormData, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Visa / Relocation Highlight *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. EU Blue Card & Employer Sponsorship"
                    value={addFormData.highlight}
                    onChange={(e) => setAddFormData({ ...addFormData, highlight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
                  />
                </div>
              </div>

              {/* Row 3: Image URL & Quick Presets */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Cover Photo Image URL *
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/photo-..."
                    value={addFormData.image}
                    onChange={(e) => setAddFormData({ ...addFormData, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
                  />
                </div>

                {/* Preset Chips */}
                <div className="mt-2">
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">
                    Quick Sample Photo Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_DESTINATIONS.map((preset) => (
                      <button
                        type="button"
                        key={preset.label}
                        onClick={() => setAddFormData({ ...addFormData, image: preset.url })}
                        className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-[#faf8ee] hover:border-[#a99410] border border-slate-200 text-[10px] font-semibold text-slate-700 transition-colors cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Live Preview */}
                {addFormData.image && (
                  <div className="mt-2.5 h-24 rounded-2xl overflow-hidden border border-slate-200 relative">
                    <img 
                      src={addFormData.image} 
                      alt="Cover preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <span className="absolute bottom-1.5 right-2 text-[10px] font-bold bg-slate-900/80 text-white px-2 py-0.5 rounded-md">
                      Live Preview
                    </span>
                  </div>
                )}
              </div>

              {/* Row 4: Overview Description */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Destination Overview & Labor Market Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide an overview of the country's economic modernization, key industries requiring foreign manpower, living standards, and opportunities..."
                  value={addFormData.overview}
                  onChange={(e) => setAddFormData({ ...addFormData, overview: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410]"
                />
              </div>

              {/* Row 5: Sponsorship & Placement Criteria (Bullet points) */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Sponsorship Criteria & Key Highlights (1 bullet point per line)
                </label>
                <textarea
                  rows={3}
                  placeholder={`Authorized single work permit processing with employer sponsorship.\nHigh demand across trades, engineering, and hospitality.\nTax-friendly packages with furnished accommodation.`}
                  value={addFormData.detailsText}
                  onChange={(e) => setAddFormData({ ...addFormData, detailsText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410] font-mono text-[11px]"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Each line appears as a verified bullet point in the destination guide.
                </span>
              </div>

              {/* Footer Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-[#020024] bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] font-extrabold shadow-md shadow-[#a99410]/25 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#020024]" />
                  <span>Create Destination Hub</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: EDIT / CONFIGURE DESTINATION COUNTRY               */}
      {/* ============================================================ */}
      {editingCountry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-fade-in my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingCountry(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-[#faf8ee] border border-[#a99410]/40 flex items-center justify-center text-[#a99410]">
                <Edit3 className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900">
                Configure {editingCountry.name}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Update destination status, regional badges, relocation highlights, and criteria points.
            </p>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country Name</label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#a99410]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#a99410] bg-white cursor-pointer"
                  >
                    <option value="Active Hiring">Active Hiring</option>
                    <option value="Coming Soon!">Coming Soon!</option>
                    <option value="Season Closed">Season Closed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Regional Badge</label>
                  <input
                    type="text"
                    value={editFormData.badge}
                    onChange={(e) => setEditFormData({ ...editFormData, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#a99410]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Visa / Relocation Highlight</label>
                  <input
                    type="text"
                    value={editFormData.highlight}
                    onChange={(e) => setEditFormData({ ...editFormData, highlight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#a99410]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={editFormData.image}
                  onChange={(e) => setEditFormData({ ...editFormData, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#a99410]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Overview Description</label>
                <textarea
                  rows={3}
                  value={editFormData.overview}
                  onChange={(e) => setEditFormData({ ...editFormData, overview: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#a99410]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Sponsorship Criteria & Highlights (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={editFormData.detailsText}
                  onChange={(e) => setEditFormData({ ...editFormData, detailsText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#a99410] font-mono text-[11px]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCountry(null)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-[#020024] bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] font-bold shadow-md shadow-[#a99410]/25 transition-all cursor-pointer"
                >
                  Save Hub Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: DELETE CONFIRMATION MODAL (SUPER ADMIN ONLY)         */}
      {/* ============================================================ */}
      {countryToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 text-center mb-1">
              Delete Destination: {countryToDelete.name}?
            </h3>
            
            <p className="text-xs text-slate-500 text-center mb-4 leading-relaxed">
              Are you sure you want to permanently remove <strong className="text-slate-800">{countryToDelete.name}</strong> from SkyGlobal's destination countries?
            </p>

            {getJobsCount(countryToDelete.name) > 0 && (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl mb-4 text-xs text-amber-900">
                <span className="font-bold block mb-0.5">Active Job Alert:</span>
                There are currently <strong>{getJobsCount(countryToDelete.name)} job vacancy listings</strong> referencing {countryToDelete.name}. Removing this country will remove it from candidate country filters.
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCountryToDelete(null)}
                className="flex-1 py-2.5 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl text-white bg-rose-600 hover:bg-rose-700 font-bold text-xs shadow-md shadow-rose-600/25 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
