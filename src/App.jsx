import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBanner from './components/StatsBanner';
import Services from './components/Services';
import JobBoard from './components/JobBoard';
import GlobalReach from './components/GlobalReach';
import SalaryGuide from './components/SalaryGuide';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import JobModal from './components/JobModal';
import HireTalentModal from './components/HireTalentModal';
import SubmitResumeModal from './components/SubmitResumeModal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  
  // Modals state
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Handle Hero search submission -> scroll to #jobs
  const handleHeroSearchSubmit = () => {
    const jobSection = document.getElementById('jobs');
    if (jobSection) {
      jobSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  const handleApplyJob = (job) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Navigation */}
      <Navbar 
        onOpenHireModal={() => setIsHireModalOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Hero with live Search sync */}
      <main className="flex-1">
        <Hero 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          onSearchSubmit={handleHeroSearchSubmit}
          onOpenHireModal={() => setIsHireModalOpen(true)}
        />

        {/* Dynamic Metric & Partner Banner */}
        <StatsBanner />

        {/* Core Practice Areas & Specializations */}
        <Services 
          onOpenHireModal={() => setIsHireModalOpen(true)}
        />

        {/* Interactive Job Board with Filters */}
        <JobBoard 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          onSelectJob={handleSelectJob}
          onApplyJob={handleApplyJob}
        />

        {/* Global Reach & Relocation Concierge */}
        <GlobalReach 
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onOpenHireModal={() => setIsHireModalOpen(true)}
        />

        {/* 2026/2027 Salary Benchmarks & PDF download */}
        <SalaryGuide />

        {/* Client & Candidate Testimonials */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer 
        onOpenHireModal={() => setIsHireModalOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
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
    </div>
  );
}
