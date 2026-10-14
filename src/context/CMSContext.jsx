import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  COMPANY_INFO, 
  JOBS_LIST, 
  COUNTRIES, 
  SECTORS, 
  TESTIMONIALS, 
  BLOGS 
} from '../data/skyGlobalData';

const CMSContext = createContext();

const INITIAL_APPLICATIONS = [
  {
    id: 'app-101',
    jobId: 'job-mep-1',
    jobTitle: 'Electrician (Technical Trade Sector)',
    applicantName: 'Ramesh Adhikari',
    email: 'ramesh.adhikari@email.com',
    phone: '+971 52 345 6789',
    currentCountry: 'Nepal',
    experienceYears: '5 years',
    preferredDestination: 'Malta',
    appliedDate: '2026-04-10',
    status: 'Visa Processing', // Pending, Under Review, Interview Scheduled, Visa Processing, Approved, Rejected
    resumeName: 'Ramesh_Adhikari_Electrician_CV.pdf',
    notes: '5 years certified electrical wiring experience in Gulf & Nepal. Documents submitted for single work permit.'
  },
  {
    id: 'app-102',
    jobId: 'job-mep-2',
    jobTitle: 'Maintenance Technician',
    applicantName: 'Sunil Thapa',
    email: 'sunil.t@email.com',
    phone: '+971 50 882 1123',
    currentCountry: 'UAE',
    experienceYears: '4 years',
    preferredDestination: 'Malta',
    appliedDate: '2026-04-12',
    status: 'Under Review',
    resumeName: 'Sunil_Maintenance_Technician_2026.pdf',
    notes: 'Worked 3 years at hotel chain in Dubai. Hands-on HVAC and basic electrical.'
  },
  {
    id: 'app-103',
    jobId: 'job-hosp-1',
    jobTitle: 'Housekeeping Supervisor',
    applicantName: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '+971 56 771 9021',
    currentCountry: 'Philippines',
    experienceYears: '6 years',
    preferredDestination: 'Malta (Ramla Bay Resort)',
    appliedDate: '2026-04-13',
    status: 'Interview Scheduled',
    resumeName: 'Maria_Santos_Housekeeping_Sup.docx',
    notes: 'Supervisor background at 5-star resort. Excellent English.'
  }
];

const INITIAL_EMPLOYER_REQUESTS = [
  {
    id: 'req-201',
    companyName: 'Ramla Bay Resort & Hospitality',
    contactName: 'Jean M. (General Manager)',
    email: 'hr@ramlabayresort.com.mt',
    phone: '+356 2281 2281',
    industrySector: 'Hospitality & Tourism',
    headcount: '6 Candidates (Housekeeping & F&B)',
    destinationCountry: 'Malta',
    timeline: 'Immediate (Within 30 Days)',
    requestDate: '2026-04-08',
    status: 'Sourced & Screening', // New, Contacted, Sourced & Screening, Completed
    notes: 'Require 2 Housekeeping Supervisors and 4 Bartenders for summer season peak.'
  },
  {
    id: 'req-202',
    companyName: 'Apex MEP Contracting Ltd.',
    contactName: 'David Miller (Operations Dir)',
    email: 'd.miller@apex-mep.com',
    phone: '+356 2144 5590',
    industrySector: 'MEP, Electrical & Technical Trades',
    headcount: '8 Electricians & Plumbers',
    destinationCountry: 'Malta',
    timeline: 'Upcoming Quarter (1-3 Months)',
    requestDate: '2026-04-11',
    status: 'New',
    notes: 'Commercial infrastructure renovation. Sourcing certified single and 3-phase electricians.'
  }
];

function safeStorageGet(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (!saved || saved === 'undefined' || saved === 'null') return fallback;
    return JSON.parse(saved);
  } catch (e) {
    console.warn('Error reading ' + key + ' from localStorage, falling back to default:', e);
    return fallback;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Unable to persist ' + key + ' to localStorage:', e);
  }
}

export function CMSProvider({ children }) {
  // Jobs
  const [jobs, setJobs] = useState(() => safeStorageGet('skyglobal_cms_jobs', JOBS_LIST));

  // Applications
  const [applications, setApplications] = useState(() => safeStorageGet('skyglobal_cms_applications', INITIAL_APPLICATIONS));

  // Employer Requests
  const [employerRequests, setEmployerRequests] = useState(() => safeStorageGet('skyglobal_cms_employer_requests', INITIAL_EMPLOYER_REQUESTS));

  // Countries
  const [countries, setCountries] = useState(() => safeStorageGet('skyglobal_cms_countries', COUNTRIES));

  // Blogs / News
  const [blogs, setBlogs] = useState(() => safeStorageGet('skyglobal_cms_blogs', BLOGS));

  // Testimonials
  const [testimonials, setTestimonials] = useState(() => safeStorageGet('skyglobal_cms_testimonials', TESTIMONIALS));

  // Company Information
  const [companyInfo, setCompanyInfo] = useState(() => safeStorageGet('skyglobal_cms_company_info', COMPANY_INFO));

  // Persistence side-effects
  useEffect(() => {
    safeStorageSet('skyglobal_cms_jobs', jobs);
  }, [jobs]);

  useEffect(() => {
    safeStorageSet('skyglobal_cms_applications', applications);
  }, [applications]);

  useEffect(() => {
    safeStorageSet('skyglobal_cms_employer_requests', employerRequests);
  }, [employerRequests]);

  useEffect(() => {
    safeStorageSet('skyglobal_cms_countries', countries);
  }, [countries]);

  useEffect(() => {
    safeStorageSet('skyglobal_cms_blogs', blogs);
  }, [blogs]);

  useEffect(() => {
    safeStorageSet('skyglobal_cms_testimonials', testimonials);
  }, [testimonials]);

  useEffect(() => {
    safeStorageSet('skyglobal_cms_company_info', companyInfo);
  }, [companyInfo]);

  // --- Job Operations ---
  const addJob = (newJobData) => {
    const newJob = {
      id: `job-custom-${Date.now()}`,
      title: newJobData.title,
      company: newJobData.company || 'Sky Global Partner Client',
      location: newJobData.location,
      country: newJobData.country,
      sector: newJobData.sector,
      type: newJobData.type || 'Full-time',
      contract: newJobData.contract || '1 Year Renewable',
      salary: newJobData.salary,
      visaSponsorship: newJobData.visaSponsorship !== false,
      tags: Array.isArray(newJobData.tags) ? newJobData.tags : (newJobData.tags || '').split(',').map(s => s.trim()).filter(Boolean),
      description: newJobData.description,
      requirements: Array.isArray(newJobData.requirements) ? newJobData.requirements : (newJobData.requirements || '').split('\n').map(s => s.trim()).filter(Boolean),
      benefits: Array.isArray(newJobData.benefits) ? newJobData.benefits : (newJobData.benefits || '').split('\n').map(s => s.trim()).filter(Boolean)
    };
    setJobs(prev => [newJob, ...prev]);
    return newJob;
  };

  const updateJob = (jobId, updatedFields) => {
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          ...updatedFields,
          tags: Array.isArray(updatedFields.tags) 
            ? updatedFields.tags 
            : typeof updatedFields.tags === 'string'
              ? updatedFields.tags.split(',').map(s => s.trim()).filter(Boolean)
              : job.tags,
          requirements: Array.isArray(updatedFields.requirements)
            ? updatedFields.requirements
            : typeof updatedFields.requirements === 'string'
              ? updatedFields.requirements.split('\n').map(s => s.trim()).filter(Boolean)
              : job.requirements,
          benefits: Array.isArray(updatedFields.benefits)
            ? updatedFields.benefits
            : typeof updatedFields.benefits === 'string'
              ? updatedFields.benefits.split('\n').map(s => s.trim()).filter(Boolean)
              : job.benefits
        };
      }
      return job;
    }));
  };

  const deleteJob = (jobId) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
  };

  // --- Candidate Application Operations ---
  const addApplication = (appData) => {
    const newApp = {
      id: `app-${Date.now()}`,
      jobId: appData.jobId || 'general-pool',
      jobTitle: appData.jobTitle || 'General International Talent Pool',
      applicantName: appData.applicantName || appData.fullName || appData.name,
      email: appData.email,
      phone: appData.phone || '',
      currentCountry: appData.currentCountry || '',
      experienceYears: appData.experienceYears || '3-5 years',
      preferredDestination: appData.preferredDestination || 'Malta',
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      resumeName: appData.fileName || 'Attached_Resume.pdf',
      notes: appData.note || 'Online portal submission.'
    };
    setApplications(prev => [newApp, ...prev]);
    return newApp;
  };

  const updateApplicationStatus = (appId, status, adminNotes) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return { 
          ...app, 
          status, 
          adminNotes: adminNotes !== undefined ? adminNotes : app.adminNotes 
        };
      }
      return app;
    }));
  };

  const deleteApplication = (appId) => {
    setApplications(prev => prev.filter(app => app.id !== appId));
  };

  // --- Employer Request Operations ---
  const addEmployerRequest = (reqData) => {
    const newReq = {
      id: `req-${Date.now()}`,
      companyName: reqData.companyName,
      contactName: reqData.contactName,
      email: reqData.email,
      phone: reqData.phone || '',
      industrySector: reqData.industrySector || 'MEP, Electrical & Technical Trades',
      headcount: reqData.headcount || '1-5 Candidates',
      destinationCountry: reqData.destinationCountry || 'Malta',
      timeline: reqData.timeline || 'Immediate (Within 30 Days)',
      requestDate: new Date().toISOString().split('T')[0],
      status: 'New',
      notes: reqData.notes || ''
    };
    setEmployerRequests(prev => [newReq, ...prev]);
    return newReq;
  };

  const updateEmployerRequestStatus = (reqId, status) => {
    setEmployerRequests(prev => prev.map(req => {
      if (req.id === reqId) {
        return { ...req, status };
      }
      return req;
    }));
  };

  const deleteEmployerRequest = (reqId) => {
    setEmployerRequests(prev => prev.filter(req => req.id !== reqId));
  };

  // --- Country Operations ---
  const updateCountry = (countryId, updatedFields) => {
    setCountries(prev => prev.map(c => {
      if (c.id === countryId) {
        return { ...c, ...updatedFields };
      }
      return c;
    }));
  };

  // --- Blog Operations ---
  const addBlog = (blogData) => {
    const newBlog = {
      id: Date.now(),
      title: blogData.title,
      category: blogData.category || 'Visa Policy',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      image: blogData.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      summary: blogData.summary,
      content: blogData.content,
      source: blogData.source || 'SkyGlobal HR Market Intelligence'
    };
    setBlogs(prev => [newBlog, ...prev]);
    return newBlog;
  };

  const updateBlog = (blogId, updatedFields) => {
    setBlogs(prev => prev.map(b => (b.id === blogId ? { ...b, ...updatedFields } : b)));
  };

  const deleteBlog = (blogId) => {
    setBlogs(prev => prev.filter(b => b.id !== blogId));
  };

  // --- Testimonial Operations ---
  const addTestimonial = (testData) => {
    const newTest = {
      id: Date.now(),
      name: testData.name,
      designation: testData.designation,
      company: testData.company,
      title: testData.title,
      description: testData.description,
      category: testData.category || 'Candidate (Visa Approved)'
    };
    setTestimonials(prev => [newTest, ...prev]);
    return newTest;
  };

  const updateTestimonial = (id, updatedFields) => {
    setTestimonials(prev => prev.map(t => (t.id === id ? { ...t, ...updatedFields } : t)));
  };

  const deleteTestimonial = (id) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // --- Settings Operation ---
  const updateCompanyInfo = (newInfo) => {
    setCompanyInfo(prev => ({ ...prev, ...newInfo }));
  };

  // Reset to default data
  const resetAllToDefaults = () => {
    setJobs(JOBS_LIST);
    setApplications(INITIAL_APPLICATIONS);
    setEmployerRequests(INITIAL_EMPLOYER_REQUESTS);
    setCountries(COUNTRIES);
    setBlogs(BLOGS);
    setTestimonials(TESTIMONIALS);
    setCompanyInfo(COMPANY_INFO);
    localStorage.removeItem('skyglobal_cms_jobs');
    localStorage.removeItem('skyglobal_cms_applications');
    localStorage.removeItem('skyglobal_cms_employer_requests');
    localStorage.removeItem('skyglobal_cms_countries');
    localStorage.removeItem('skyglobal_cms_blogs');
    localStorage.removeItem('skyglobal_cms_testimonials');
    localStorage.removeItem('skyglobal_cms_company_info');
  };

  return (
    <CMSContext.Provider value={{
      jobs,
      addJob,
      updateJob,
      deleteJob,
      applications,
      addApplication,
      updateApplicationStatus,
      deleteApplication,
      employerRequests,
      addEmployerRequest,
      updateEmployerRequestStatus,
      deleteEmployerRequest,
      countries,
      updateCountry,
      blogs,
      addBlog,
      updateBlog,
      deleteBlog,
      testimonials,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      companyInfo,
      updateCompanyInfo,
      resetAllToDefaults
    }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
