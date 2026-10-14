import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CMSProvider, useCMS } from './context/CMSContext';

import Navbar from './components/Navbar';
import PageHeader from './components/PageHeader';
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
import { 
  Crown, 
  ShieldCheck, 
  LayoutDashboard, 
  Globe2, 
  Layers, 
  Briefcase, 
  FileText, 
  Info 
} from 'lucide-react';

function MainWebsite() {
  const { currentUser, isSuperAdmin, isAuthenticated } = useAuth();
  const { jobs, countries, companyInfo } = useCMS();

  // Page Routing State ('home' | 'about' | 'countries' | 'sectors' | 'jobs' | 'blogs')
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const valid = ['home', 'about', 'countries', 'sectors', 'jobs', 'blogs'];
    return valid.includes(hash) ? hash : 'home';
  });

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

  // Synchronize hash with browser navigation (back/forward)
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const valid = ['home', 'about', 'countries', 'sectors', 'jobs', 'blogs'];
      if (valid.includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to jobs or navigate to Jobs page
  const handleScrollToJobs = () => {
    if (currentPage === 'home') {
      const jobSection = document.getElementById('jobs');
      if (jobSection) {
        jobSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigateTo('jobs');
    }
  };

  const handleSelectCountryJobs = (countryName) => {
    setSelectedCountry(countryName);
    navigateTo('jobs');
  };

  const handleSelectSectorJobs = (sectorTitle) => {
    setSearchQuery(sectorTitle.split(',')[0]);
    navigateTo('jobs');
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
            className="px-3 py-1 rounded-lg bg-slate-950 text-amber-300 hover:bg-slate-900 transition-colors flex items-center gap-1.5 font-bold shadow-sm cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Open CMS Dashboard</span>
          </button>
        </div>
      )}

      {/* Navigation & Header */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenHireModal={() => setIsHireModalOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenDashboard={() => setIsViewingAdminDashboard(true)}
      />

      {/* Main Content Body - Dedicated Pages */}
      <main className="flex-1">
        {/* 1. HOME PAGE: Only Hero, "Find Job" section, How We Are Different, Blogs, and Testimonials */}
        {currentPage === 'home' && (
          <>
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

            {/* "Find Job" Section */}
            <JobsSection 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              onSelectJob={handleSelectJob}
              onApplyJob={handleApplyJob}
            />

            {/* How We Are Different (From skyglobalhr.com) */}
            <HowWeAreDifferent 
              onOpenHireModal={() => setIsHireModalOpen(true)}
            />

            {/* Latest Visa News & Immigration Blogs */}
            <BlogsSection />

            {/* Verified Customer & Candidate Testimonials */}
            <TestimonialsSection />
          </>
        )}

        {/* 2. DEDICATED ABOUT PAGE */}
        {currentPage === 'about' && (
          <div>
            <PageHeader 
              badge="About SkyGlobal HR Consultancy"
              icon={Info}
              title="About SkyGlobal"
              subtitle="Your trusted licensed partner in global recruitment, ethical workforce solutions, and international career placement."
              onBackToHome={() => navigateTo('home')}
            />
            <AboutSection 
              onOpenHireModal={() => setIsHireModalOpen(true)}
              onOpenResumeModal={() => setIsResumeModalOpen(true)}
            />
          </div>
        )}

        {/* 3. DEDICATED DESTINATION COUNTRIES PAGE */}
        {currentPage === 'countries' && (
          <div>
            <PageHeader 
              badge="Destination Countries"
              icon={Globe2}
              title="Global Destination Hubs"
              subtitle="Explore authorized work permit pathways, employer sponsorship, and living standards across our premier placement countries."
              onBackToHome={() => navigateTo('home')}
            />
            <CountriesSection 
              onSelectCountryJobs={handleSelectCountryJobs}
              onOpenResumeModal={() => setIsResumeModalOpen(true)}
            />
          </div>
        )}

        {/* 4. DEDICATED CORE SECTORS PAGE */}
        {currentPage === 'sectors' && (
          <div>
            <PageHeader 
              badge="Core Practice Sectors"
              icon={Layers}
              title="Our Industry Sectors"
              subtitle="Specialized recruitment across high-demand MEP trades, hospitality, construction, manufacturing, healthcare, and IT."
              onBackToHome={() => navigateTo('home')}
            />
            <SectorsSection 
              onSelectSectorJobs={handleSelectSectorJobs}
              onOpenHireModal={() => setIsHireModalOpen(true)}
            />
          </div>
        )}

        {/* 5. DEDICATED FIND JOBS PAGE */}
        {currentPage === 'jobs' && (
          <div>
            <PageHeader 
              badge="Current Vacancies"
              icon={Briefcase}
              title="Explore International Jobs"
              subtitle="Find verified positions with work visa sponsorship across Malta, Australia, UAE, Bulgaria, Romania, and Greece."
              onBackToHome={() => navigateTo('home')}
            />
            <JobsSection 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              onSelectJob={handleSelectJob}
              onApplyJob={handleApplyJob}
            />
          </div>
        )}

        {/* 6. DEDICATED VISA UPDATES & BLOGS PAGE */}
        {currentPage === 'blogs' && (
          <div>
            <PageHeader 
              badge="Visa Intelligence & News"
              icon={FileText}
              title="Visa Updates & Immigration News"
              subtitle="Timely legal developments, European immigration changes, and international hiring updates curated by Sky Global HR Consultancy."
              onBackToHome={() => navigateTo('home')}
            />
            <BlogsSection />
          </div>
        )}
      </main>

      {/* Official Footer with Dubai Office details & links */}
      <Footer 
        onNavigate={navigateTo}
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
