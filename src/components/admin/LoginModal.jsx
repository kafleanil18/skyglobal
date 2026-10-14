import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Crown, 
  ArrowRight, 
  AlertCircle,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success) {
        onClose();
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setError(res.message);
      }
    }, 300);
  };

  const handleQuickFill = (fillEmail, fillPass) => {
    setEmail(fillEmail);
    setPassword(fillPass);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#071328] text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2 border border-amber-500/30">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            Portal Log In
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Log In to SkyGlobal CMS
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Access the content management system to manage jobs, applicants, destination hubs, and portal settings.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Fill Buttons */}
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Quick Test Accounts (Click to Fill):
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('superadmin@skyglobalhr.com', 'admin123')}
                className="py-2 px-3 rounded-xl bg-amber-50 border border-amber-300 hover:bg-amber-100 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Crown className="w-3.5 h-3.5 text-amber-600" />
                  <span>Super Admin</span>
                </div>
                <span className="text-[10px] text-amber-700 block truncate">Full System Rights</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('admin@skyglobalhr.com', 'admin123')}
                className="py-2 px-3 rounded-xl bg-sky-50 border border-sky-300 hover:bg-sky-100 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                  <span>Admin</span>
                </div>
                <span className="text-[10px] text-sky-700 block truncate">Content & Jobs</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@skyglobalhr.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Role Comparison Note */}
          <div className="pt-2 text-[11px] text-slate-500 space-y-1 border-t border-slate-100">
            <p><strong>Super Admin:</strong> Full CMS control, Staff User Management, System Configuration.</p>
            <p><strong>Admin:</strong> Job postings, applicant status management, blog updates.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
