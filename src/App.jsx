import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CMSProvider, useCMS } from './context/CMSContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import HowWeAreDifferent from './components/HowWeAreDifferent';
import CountriesSection from './components/CountriesSection';
import SectorsSection from './components/SectorsSection';
import JobsSection from './components/JobsSection';
import BlogsSection from './components/BlogsSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

// Modals
import JobModal from './components/JobModal';
import HireTalentModal from './components/HireTalentModal';
import SubmitResumeModal from './components/SubmitResumeModal';
import LoginModal from './components/admin/LoginModal';

// CMS Dashboard
import AdminDashboard from './components/admin/AdminDashboard';
import { Crown, ShieldCheck, LayoutDashboard } from 'lucide-react';

function MainWebsite() {
  const { currentUser, isSuperAdmin, isAuthenticated } = useAuth();
  const { jobs, countries, companyInfo } = useCMS();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  
  // Modals state
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // CMS Dashboard view mode
  const [isViewingAdminDashboard, setIsViewingAdminDashboard] = useState(false);

  // Scroll to jobs section helper
  const handleScrollToJobs = () => {
    const jobSection = document.getElementById('jobs');
    if (jobSection) {
      jobSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCountryJobs = (countryName) => {
    setSelectedCountry(countryName);
    handleScrollToJobs();
  };

  const handleSelectSectorJobs = (sectorTitle) => {
    setSearchQuery(sectorTitle.split(',')[0]);
    handleScrollToJobs();
  };

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  const handleApplyJob = (job) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  // If in CMS Dashboard mode
  if (isViewingAdminDashboard) {
    return (
      <AdminDashboard onExitDashboard={() => setIsViewingAdminDashboard(false)} />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Sticky Staff Quick Access Bar when authenticated */}
      {isAuthenticated && (
        <div className="bg-amber-400 text-slate-950 py-1.5 px-4 sm:px-8 text-xs font-bold flex items-center justify-between sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-2">
            {isSuperAdmin ? (
              <Crown className="w-4 h-4 text-slate-950" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-slate-950" />
            )}
            <span>
              Signed in as <strong>{currentUser?.name}</strong> ({isSuperAdmin ? 'Super Admin' : 'Admin'})
            </span>
          </div>

          <button
            onClick={() => setIsViewingAdminDashboard(true)}
            className="px-3 py-1 rounded-lg bg-slate-950 text-amber-300 hover:bg-slate-900 transition-colors flex items-center gap-1.5 font-bold shadow-sm"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Open CMS Dashboard</span>
          </button>
        </div>
      )}

      {/* Navigation & Header */}
      <Navbar 
        onOpenHireModal={() => setIsHireModalOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenDashboard={() => setIsViewingAdminDashboard(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          onSearchSubmit={handleScrollToJobs}
          onOpenHireModal={() => setIsHireModalOpen(true)}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />

        {/* About SkyGlobal HR Consultancy (From skyglobalhr.com/about) */}
        <AboutSection 
          onOpenHireModal={() => setIsHireModalOpen(true)}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />

        {/* How We Are Different (From skyglobalhr.com) */}
        <HowWeAreDifferent 
          onOpenHireModal={() => setIsHireModalOpen(true)}
        />

        {/* Destination Countries We Serve (Malta, Australia, UAE, Bulgaria, Greece, Romania) */}
        <CountriesSection 
          onSelectCountryJobs={handleSelectCountryJobs}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />

        {/* Practice Sectors (MEP, Hospitality, Construction, Manufacturing, Healthcare, IT) */}
        <SectorsSection 
          onSelectSectorJobs={handleSelectSectorJobs}
          onOpenHireModal={() => setIsHireModalOpen(true)}
        />

        {/* Active Job Openings with live search & filters */}
        <JobsSection 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          onSelectJob={handleSelectJob}
          onApplyJob={handleApplyJob}
        />

        {/* Latest Visa News & Immigration Blogs */}
        <BlogsSection />

        {/* Verified Customer & Candidate Testimonials */}
        <TestimonialsSection />
      </main>

      {/* Official Footer with Dubai Office details & links */}
      <Footer 
        onOpenHireModal={() => setIsHireModalOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenLoginModal={() => {
          if (isAuthenticated) {
            setIsViewingAdminDashboard(true);
          } else {
            setIsLoginModalOpen(true);
          }
        }}
      />

      {/* Interactive Modals */}
      <JobModal 
        job={selectedJob}
        isOpen={isJobModalOpen}
        onClose={() => {
          setIsJobModalOpen(false);
          setSelectedJob(null);
        }}
      />

      <HireTalentModal 
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
      />

      <SubmitResumeModal 
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => setIsViewingAdminDashboard(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <MainWebsite />
      </CMSProvider>
    </AuthProvider>
  );
}
