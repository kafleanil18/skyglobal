import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Crown, 
  Trash2, 
  Mail, 
  Calendar, 
  Briefcase,
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminUsersTab() {
  const { users, addAdminUser, deleteAdminUser, currentUser, isSuperAdmin } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: 'admin123',
    role: 'admin',
    department: 'Overseas Talent Operations'
  });
  const [msg, setMsg] = useState({ type: '', text: '' });

  const handleCreateUser = (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    const res = addAdminUser(formData);
    if (res.success) {
      setMsg({ type: 'success', text: `Created admin account for ${formData.name}.` });
      setIsModalOpen(false);
      setFormData({
        name: '',
        email: '',
        password: 'admin123',
        role: 'admin',
        department: 'Overseas Talent Operations'
      });
    } else {
      setMsg({ type: 'error', text: res.message });
    }
  };

  const handleDelete = (userId, userName) => {
    if (!confirm(`Revoke administrative access for ${userName}?`)) return;
    const res = deleteAdminUser(userId);
    if (res.success) {
      setMsg({ type: 'success', text: `Access revoked for ${userName}.` });
    } else {
      setMsg({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-display text-slate-900">
              Staff & Role Management
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#fff8d6] text-[#101a6d] text-[10px] font-bold border border-[#a99410]/50">
              Super Admin Privilege
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Create administrative accounts, assign CMS access privileges, and manage role security.
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] text-[#020024] font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Staff Account</span>
          </button>
        )}
      </div>

      {msg.text && (
        <div className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
          msg.type === 'success' 
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
            : 'bg-rose-50 border border-rose-200 text-rose-800'
        }`}>
          {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
          <span>{msg.text}</span>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[11px] tracking-wider">
                <th className="py-3.5 px-4">Staff Member</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Assigned Role</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Active Since</th>
                <th className="py-3.5 px-4 text-right">Access Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {users.map(u => {
                const isCurrent = u.id === currentUser?.id;
                return (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{u.name}</span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                            You
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                      {u.email}
                    </td>
                    <td className="py-3.5 px-4">
                      {u.role === 'super_admin' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                          <Crown className="w-3 h-3 text-amber-600" />
                          Super Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-900 bg-sky-100 border border-sky-300 px-2.5 py-0.5 rounded-full">
                          <ShieldCheck className="w-3 h-3 text-sky-600" />
                          Admin
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {u.department}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {u.createdAt}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isSuperAdmin && !isCurrent ? (
                        <button
                          onClick={() => handleDelete(u.id, u.name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Revoke Admin Access"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Protected</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80">
          <div className="flex items-center gap-1.5 text-amber-900 font-bold mb-1">
            <Crown className="w-4 h-4 text-amber-600" />
            <span>Super Admin Privileges</span>
          </div>
          <p className="text-slate-600">
            Has complete control over all CMS sections: manages job postings, reviews candidate CVs, handles employer leads, creates staff accounts, and edits global contact info.
          </p>
        </div>

        <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200/80">
          <div className="flex items-center gap-1.5 text-sky-900 font-bold mb-1">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Admin Privileges</span>
          </div>
          <p className="text-slate-600">
            Can post and manage vacancies, update candidate pipeline stages (Under Review, Interview, Visa Processing), review employer inquiries, and publish blogs.
          </p>
        </div>
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-fade-in">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Add New Administrative User
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter staff credentials and assign administrative role.
            </p>

            <form onSubmit={handleCreateUser} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Staff Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Al Mansoor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Staff Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="tariq@skyglobalhr.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Initial Password *</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role Permission *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  placeholder="e.g. European Recruitment Desk"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400"
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
                  className="px-6 py-2 rounded-xl text-[#020024] bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] font-bold shadow-md shadow-[#a99410]/25"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
