import React, { useState } from 'react';
import { 
  Building, 
  Phone, 
  Mail, 
  Clock, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle,
  Crown
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';

export default function AdminSettingsTab() {
  const { companyInfo, updateCompanyInfo, resetAllToDefaults } = useCMS();
  const { isSuperAdmin } = useAuth();

  const [formData, setFormData] = useState({
    name: companyInfo.name,
    tagline: companyInfo.tagline,
    description: companyInfo.description,
    address: companyInfo.address,
    phone: companyInfo.phone,
    email: companyInfo.email,
    weekdays: companyInfo.officeHours.weekdays,
    sunday: companyInfo.officeHours.sunday
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCompanyInfo({
      name: formData.name,
      tagline: formData.tagline,
      description: formData.description,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      officeHours: {
        weekdays: formData.weekdays,
        sunday: formData.sunday
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all CMS jobs, applications, and blogs back to original demo values? This will wipe recent mock submissions.')) {
      resetAllToDefaults();
      alert('All CMS records have been reset to original values.');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-display text-slate-900">
              Company & Portal Configuration
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#fff8d6] text-[#101a6d] text-[10px] font-bold border border-[#ffd300]/50">
              Super Admin Privilege
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage official headquarters details, contact numbers, and office hours rendered across the website.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings Saved Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Company Legal Name</label>
            <input
              type="text"
              required
              disabled={!isSuperAdmin}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-amber-400 disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Official Tagline</label>
            <input
              type="text"
              required
              disabled={!isSuperAdmin}
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-amber-400 disabled:bg-slate-100"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Mission / Company Description</label>
          <textarea
            rows={3}
            disabled={!isSuperAdmin}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-amber-400 disabled:bg-slate-100"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Dubai Headquarters Address</label>
            <input
              type="text"
              required
              disabled={!isSuperAdmin}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-amber-400 disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Office Telephone</label>
            <input
              type="text"
              required
              disabled={!isSuperAdmin}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-amber-400 disabled:bg-slate-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Public Inquiries Email</label>
            <input
              type="email"
              required
              disabled={!isSuperAdmin}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-amber-400 disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Weekday Office Hours</label>
            <input
              type="text"
              required
              disabled={!isSuperAdmin}
              value={formData.weekdays}
              onChange={(e) => setFormData({ ...formData, weekdays: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-amber-400 disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Sunday Schedule</label>
            <input
              type="text"
              required
              disabled={!isSuperAdmin}
              value={formData.sunday}
              onChange={(e) => setFormData({ ...formData, sunday: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-amber-400 disabled:bg-slate-100"
            />
          </div>
        </div>

        {isSuperAdmin && (
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">
              Changes take effect immediately across all website sections.
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd300] to-[#f9c913] hover:from-[#ffdf47] hover:to-[#ffd300] text-[#020024] font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#ffd300]/25"
            >
              <Save className="w-4 h-4" />
              <span>Save Portal Settings</span>
            </button>
          </div>
        )}
      </form>

      {/* Danger Zone */}
      {isSuperAdmin && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>System Reset & Storage Flush</span>
            </div>
            <p className="text-xs text-rose-700">
              Restore all jobs, sample applications, blogs, and settings to original state.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-white border border-rose-300 text-rose-700 hover:bg-rose-100 font-bold text-xs flex items-center gap-1.5 shrink-0"
          >
            <RotateCcw className="w-4 h-4 text-rose-600" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      )}
    </div>
  );
}
