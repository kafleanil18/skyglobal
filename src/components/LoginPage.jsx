import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  ShieldCheck, 
  Crown, 
  ArrowRight, 
  AlertCircle,
  KeyRound,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  LayoutDashboard,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import skyGlobalLogo from '../assets/SkyGlobalLogo.png';

export default function LoginPage({ onNavigate, onLoginSuccess }) {
  const { currentUser, isSuperAdmin, isAuthenticated, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success) {
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-[#a99410] selection:text-[#020024]">
      {/* Top Bar with Logo and Back Button */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="h-10 px-2 py-1 rounded-xl bg-white flex items-center justify-center shadow-md">
            <img 
              src={skyGlobalLogo} 
              alt="SkyGlobal HR Consultancy" 
              className="h-8 w-auto object-contain"
            />
          </div>
          <div>
            <div className="text-sm font-black tracking-tight text-white group-hover:text-[#a99410] transition-colors">
              SKYGLOBAL <span className="text-[#a99410]">HR</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              Administrative & Staff Portal
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('home')}
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#a99410]" />
          <span>Back to Website</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#101a6d] via-[#0b1456] to-[#020024] text-white p-6 sm:p-7 relative border-b border-[#25c0f3]/20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a99410]/20 text-[#a99410] text-xs font-bold mb-2.5 border border-[#a99410]/30">
              <Lock className="w-3.5 h-3.5 text-[#a99410]" />
              Staff Authentication
            </div>

            <h1 className="text-2xl font-bold font-display text-white">
              SkyGlobal Staff Portal
            </h1>
            <p className="text-[#b6eafb] text-xs sm:text-sm mt-1">
              Authorized access to CMS, applicant submissions, job listings, and portal administration.
            </p>
          </div>

          <div className="p-6 sm:p-7 space-y-5">
            {/* If user is ALREADY authenticated */}
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-emerald-900">
                      Already signed in as {currentUser?.name}
                    </p>
                    <p className="text-emerald-700 mt-0.5">
                      Role: <strong className="capitalize">{isSuperAdmin ? 'Super Administrator' : 'Administrator'}</strong> ({currentUser?.email})
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={onLoginSuccess}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#cbb218] hover:to-[#a99410] text-[#020024] font-bold text-sm shadow-md shadow-[#a99410]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Open CMS Dashboard</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onNavigate('home')}
                      className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Website</span>
                    </button>

                    <button
                      onClick={logout}
                      className="py-2.5 px-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* If user is NOT authenticated: show Login Form */
              <>
                {error && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-start gap-2 animate-shake">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Quick Test Accounts for Instant Testing */}
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Quick Test Accounts (Click to autofill):
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickFill('superadmin@skyglobalhr.com', 'admin123')}
                      className="py-2 px-3 rounded-xl bg-[#fff8d6] border border-[#a99410]/60 hover:bg-[#fef9c3] text-left transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#101a6d]">
                        <Crown className="w-3.5 h-3.5 text-[#101a6d]" />
                        <span>Super Admin</span>
                      </div>
                      <span className="text-[10px] text-slate-600 block truncate">Full System Rights</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickFill('admin@skyglobalhr.com', 'admin123')}
                      className="py-2 px-3 rounded-xl bg-[#e5f2f9] border border-[#25c0f3]/40 hover:bg-[#d6ecf7] text-left transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#101a6d]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#101a6d]" />
                        <span>Admin</span>
                      </div>
                      <span className="text-[10px] text-slate-600 block truncate">Content & Jobs</span>
                    </button>
                  </div>
                </div>

                {/* Login Form */}
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
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410] transition-colors"
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
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#a99410] focus:border-[#a99410] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#cbb218] hover:to-[#a99410] text-[#020024] font-bold text-sm shadow-md shadow-[#a99410]/25 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span>Verifying credentials...</span>
                    ) : (
                      <>
                        <span>Sign In to Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100 flex items-center justify-center gap-1.5 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Authorized Personnel Only. Restricted Administrative Access.</span>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-900">
        &copy; {new Date().getFullYear()} SkyGlobal HR Consultancy LLC. All Rights Reserved.
      </footer>
    </div>
  );
}
