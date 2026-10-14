import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Building2, 
  Globe2, 
  Newspaper, 
  Users, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Crown, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  Clock,
  ArrowRight,
  Download
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCMS } from '../../context/CMSContext';
import { downloadApplicantCV } from '../../utils/cvDownloader';
import skyGlobalLogo from '../../assets/SkyGlobalLogo.png';

import AdminJobsTab from './AdminJobsTab';
import AdminApplicationsTab from './AdminApplicationsTab';
import AdminEmployersTab from './AdminEmployersTab';
import AdminCountriesTab from './AdminCountriesTab';
import AdminBlogsTab from './AdminBlogsTab';
import AdminUsersTab from './AdminUsersTab';
import AdminSettingsTab from './AdminSettingsTab';

export default function AdminDashboard({ onExitDashboard }) {
  const { currentUser, logout, isSuperAdmin } = useAuth();
  const { jobs, applications, employerRequests, blogs, countries } = useCMS();
  const [activeTab, setActiveTab] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'jobs', label: 'Job Vacancies', icon: Briefcase, count: jobs.length },
    { id: 'applications', label: 'Candidate CVs', icon: FileText, count: applications.length },
    { id: 'employers', label: 'Employer Leads', icon: Building2, count: employerRequests.length },
    { id: 'countries', label: 'Destinations', icon: Globe2, count: countries.length },
    { id: 'blogs', label: 'Visa News', icon: Newspaper, count: blogs.length },
    ...(isSuperAdmin ? [
      { id: 'users', label: 'Staff Management', icon: Users },
      { id: 'settings', label: 'Portal Settings', icon: Settings }
    ] : [])
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* Top Bar */}
      <header className="bg-gradient-to-r from-[#101a6d] via-[#0b1456] to-[#020024] text-white border-b border-[#25c0f3]/20 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="h-10 px-2 py-1 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center">
            <img 
              src={skyGlobalLogo} 
              alt="SkyGlobal HR Consultancy" 
              className="h-7 w-auto object-contain brightness-0 invert"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight font-display text-white">
                SKYGLOBAL <span className="text-[#a99410]">CMS</span>
              </span>
              {isSuperAdmin ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#020024] bg-gradient-to-r from-[#a99410] to-[#8e7c0c] px-2 py-0.5 rounded-full shadow-sm">
                  <Crown className="w-3 h-3 text-[#020024]" />
                  Super Admin
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#101a6d] bg-[#e5f2f9] border border-[#25c0f3]/40 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-[#101a6d]" />
                  Admin
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#b6eafb] block -mt-0.5">
              Logged in as: {currentUser?.name} ({currentUser?.department})
            </span>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExitDashboard}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#a99410]" />
            <span className="hidden sm:inline">View Public Website</span>
          </button>

          <button
            onClick={() => {
              logout();
              onExitDashboard();
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-300 hover:text-white hover:bg-rose-900/40 border border-rose-900/60 transition-all flex items-center gap-1.5"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0 bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1.5 h-fit sticky md:top-24">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#101a6d]">
            Content & Operations
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#a99410] to-[#8e7c0c] text-[#020024] shadow-sm font-black'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#020024]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-md text-[10px] ${
                    isActive ? 'bg-[#020024] text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Tab Content Area */}
        <main className="flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
                    <span className="font-bold uppercase tracking-wider">Active Jobs</span>
                    <Briefcase className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-900 font-display">
                    {jobs.length}
                  </span>
                  <span className="text-[11px] text-emerald-600 block mt-1 font-semibold">
                    Live across portal
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
                    <span className="font-bold uppercase tracking-wider">Candidate CVs</span>
                    <FileText className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-900 font-display">
                    {applications.length}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Registered applicants
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
                    <span className="font-bold uppercase tracking-wider">Employer Leads</span>
                    <Building2 className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-900 font-display">
                    {employerRequests.length}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Corporate inquiries
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
                    <span className="font-bold uppercase tracking-wider">Destinations</span>
                    <Globe2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-900 font-display">
                    {countries.length}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Global recruitment hubs
                  </span>
                </div>
              </div>

              {/* Recent Applications Feed */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Recent Candidate Applications
                    </h3>
                    <p className="text-xs text-slate-500">
                      Latest submissions from the portal application forms.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {applications.slice(0, 4).map(app => (
                    <div key={app.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-bold text-slate-900 text-sm block">
                          {app.applicantName}
                        </span>
                        <span className="text-slate-500">
                          {app.jobTitle} • {app.currentCountry}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400 text-[11px]">
                          {app.appliedDate}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-amber-100 text-amber-800">
                          {app.status}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadApplicantCV(app);
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#faf8ee] hover:text-[#020024] text-slate-600 transition-colors cursor-pointer"
                          title={`Download CV for ${app.applicantName}`}
                        >
                          <Download className="w-3.5 h-3.5 text-[#a99410]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('jobs')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 shadow-sm text-left transition-all group"
                >
                  <Briefcase className="w-5 h-5 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-slate-900">Post New Vacancy</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Publish positions for Malta, UAE or Australia.</p>
                </button>

                <button
                  onClick={() => setActiveTab('employers')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 shadow-sm text-left transition-all group"
                >
                  <Building2 className="w-5 h-5 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-slate-900">Review Employer Leads</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Check corporate inquiries and headcount needs.</p>
                </button>

                <button
                  onClick={() => setActiveTab('blogs')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 shadow-sm text-left transition-all group"
                >
                  <Newspaper className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-slate-900">Publish Visa Update</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Share immigration and labor policy news.</p>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && <AdminJobsTab />}
          {activeTab === 'applications' && <AdminApplicationsTab />}
          {activeTab === 'employers' && <AdminEmployersTab />}
          {activeTab === 'countries' && <AdminCountriesTab />}
          {activeTab === 'blogs' && <AdminBlogsTab />}
          {activeTab === 'users' && isSuperAdmin && <AdminUsersTab />}
          {activeTab === 'settings' && isSuperAdmin && <AdminSettingsTab />}
        </main>

      </div>
    </div>
  );
}
