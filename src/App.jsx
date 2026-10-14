import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowWeAreDifferent from './components/HowWeAreDifferent';
import CountriesSection from './components/CountriesSection';
import SectorsSection from './components/SectorsSection';
import JobsSection from './components/JobsSection';
import BlogsSection from './components/BlogsSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import JobModal from './components/JobModal';
import HireTalentModal from './components/HireTalentModal';
import SubmitResumeModal from './components/SubmitResumeModal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  
  // Modals state
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Navigation & Header */}
      <Navbar 
        onOpenHireModal={() => setIsHireModalOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
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
      />

      {/* Modals */}
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
