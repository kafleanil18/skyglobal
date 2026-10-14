import React, { useState } from 'react';
import { Globe2, Edit3, CheckCircle, Plane, X } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminCountriesTab() {
  const { countries, updateCountry } = useCMS();
  const [editingCountry, setEditingCountry] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
    badge: '',
    highlight: '',
    overview: ''
  });

  const handleOpenEdit = (country) => {
    setEditingCountry(country);
    setFormData({
      status: country.status,
      badge: country.badge,
      highlight: country.highlight,
      overview: country.overview
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingCountry) {
      updateCountry(editingCountry.id, formData);
      setEditingCountry(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold font-display text-slate-900">
          Manage Destination Countries
        </h2>
        <p className="text-xs text-slate-500">
          Update country status (Active Hiring vs Coming Soon), visa pathway highlights, and labor market summaries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map(c => (
          <div 
            key={c.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="h-32 overflow-hidden relative">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/40" />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900/90 text-white">
                  {c.badge}
                </span>
                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  c.status.includes('Active') ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-slate-950 font-extrabold'
                }`}>
                  {c.status}
                </span>
                <h3 className="absolute bottom-3 left-3 text-xl font-bold text-white font-display">
                  {c.name}
                </h3>
              </div>

              <div className="p-4 space-y-2.5 text-xs text-slate-700">
                <div className="bg-amber-50 p-2 rounded-lg text-amber-900 font-semibold flex items-center gap-1.5 text-[11px]">
                  <Plane className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{c.highlight}</span>
                </div>
                <p className="line-clamp-3 text-slate-600 leading-relaxed">
                  {c.overview}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => handleOpenEdit(c)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Configure Hub</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingCountry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-fade-in">
            <button
              onClick={() => setEditingCountry(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Configure {editingCountry.name}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Update status, badges, and overview text.
            </p>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Active Hiring">Active Hiring</option>
                    <option value="Coming Soon!">Coming Soon!</option>
                    <option value="Season Closed">Season Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Regional Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Visa / Relocation Highlight</label>
                <input
                  type="text"
                  value={formData.highlight}
                  onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Overview Description</label>
                <textarea
                  rows={4}
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCountry(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-[#020024] bg-gradient-to-r from-[#ffd300] to-[#f9c913] hover:from-[#ffdf47] hover:to-[#ffd300] font-bold shadow-md shadow-[#ffd300]/25"
                >
                  Save Hub Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
