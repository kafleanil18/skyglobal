import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  COMPANY_INFO, 
  JOBS_LIST, 
  COUNTRIES, 
  SECTORS, 
  TESTIMONIALS, 
  BLOGS,
  INITIAL_GALLERY,
  GALLERY_CATEGORIES,
  INITIAL_HERO_SLIDES
} from '../data/skyGlobalData';
import { FALLBACK_GALLERY_IMAGE } from '../utils/imageOptimizer';
import {
  checkBackendHealth,
  fetchSyncAll,
  apiResetDatabase,
  apiAddJob,
  apiUpdateJob,
  apiDeleteJob,
  apiAddApplication,
  apiUpdateApplication,
  apiDeleteApplication,
  apiAddEmployerRequest,
  apiUpdateEmployerRequest,
  apiDeleteEmployerRequest,
  apiAddCountry,
  apiUpdateCountry,
  apiDeleteCountry,
  apiAddBlog,
  apiUpdateBlog,
  apiDeleteBlog,
  apiAddTestimonial,
  apiUpdateTestimonial,
  apiDeleteTestimonial,
  apiUpdateCompanyInfo,
  apiAddGalleryItem,
  apiUpdateGalleryItem,
  apiDeleteGalleryItem,
  apiAddHeroSlide,
  apiUpdateHeroSlide,
  apiDeleteHeroSlide
} from '../services/api';

const CMSContext = createContext();

const INITIAL_APPLICATIONS = [];

const INITIAL_EMPLOYER_REQUESTS = [];

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
  // DB Connection Status
  const [dbStatus, setDbStatus] = useState({
    isOnline: false,
    status: 'checking', // checking, connected, offline
    dbName: 'skyglobal'
  });

  // Jobs (starts empty by default so user can add custom vacancies)
  const [jobs, setJobs] = useState(() => {
    const loaded = safeStorageGet('skyglobal_cms_jobs', []);
    if (!Array.isArray(loaded)) return [];
    // Filter out legacy hardcoded demo jobs (IDs 1-8) if cached in localStorage
    const cleanList = loaded.filter(j => typeof j.id !== 'number' && !String(j.id).match(/^[1-8]$/));
    return cleanList.map((j, index) => {
      const defaultRff = j.rffNumber || `RFF-${(j.country || 'MLT').slice(0, 3).toUpperCase()}-${101 + index}`;
      return {
        ...j,
        rffNumber: j.rffNumber || defaultRff,
        vacancies: j.vacancies !== undefined ? Number(j.vacancies) : 1,
        status: j.status || 'Active',
        salary: j.salary || 'Attractive Salary Package',
        visaProcessing: j.visaProcessing || '⚡ Fast-track 3–4 Weeks',
        perks: Array.isArray(j.perks) ? j.perks : []
      };
    });
  });

  // Applications
  const [applications, setApplications] = useState(() => safeStorageGet('skyglobal_cms_applications', INITIAL_APPLICATIONS));

  // Employer Requests
  const [employerRequests, setEmployerRequests] = useState(() => safeStorageGet('skyglobal_cms_employer_requests', INITIAL_EMPLOYER_REQUESTS));

  // Countries
  const [countries, setCountries] = useState(() => safeStorageGet('skyglobal_cms_countries', COUNTRIES));

  // Blogs / News (starts empty by default so user can publish custom articles)
  const [blogs, setBlogs] = useState(() => {
    const loaded = safeStorageGet('skyglobal_cms_blogs', []);
    if (!Array.isArray(loaded)) return [];
    // Filter out legacy hardcoded demo blogs (IDs 1-3) if cached in localStorage
    return loaded.filter(b => typeof b.id !== 'number' && !String(b.id).match(/^[1-3]$/));
  });

  // Testimonials
  const [testimonials, setTestimonials] = useState(() => safeStorageGet('skyglobal_cms_testimonials', TESTIMONIALS));

  // Company Information
  const [companyInfo, setCompanyInfo] = useState(() => safeStorageGet('skyglobal_cms_company_info', COMPANY_INFO));

  // Gallery (starts empty by default so user can upload custom event albums)
  const [gallery, setGallery] = useState(() => {
    const loaded = safeStorageGet('skyglobal_cms_gallery', []);
    if (!Array.isArray(loaded)) return [];
    // Filter out legacy hardcoded demo gallery items (IDs 1-8) if cached in localStorage
    const cleanList = loaded.filter(item => typeof item.id !== 'number' && !String(item.id).match(/^[1-8]$/));
    return cleanList.map(item => {
      let images = Array.isArray(item.images) && item.images.length > 0
        ? item.images
        : item.image ? [item.image] : [];

      images = images.map(img => {
        if (!img || typeof img !== 'string') return FALLBACK_GALLERY_IMAGE;
        const trimmed = img.trim();
        if (
          trimmed.startsWith('/') || 
          trimmed.startsWith('file:') || 
          /^[a-zA-Z]:[\\/]/.test(trimmed) ||
          trimmed.length < 5
        ) {
          return FALLBACK_GALLERY_IMAGE;
        }
        return trimmed;
      });

      if (images.length === 0) {
        images = [FALLBACK_GALLERY_IMAGE];
      }

      return {
        ...item,
        images,
        image: images[0] || FALLBACK_GALLERY_IMAGE
      };
    });
  });

  // Hero Slides (Super Admin configurable photoslide)
  const [heroSlides, setHeroSlides] = useState(() => safeStorageGet('skyglobal_cms_hero_slides', INITIAL_HERO_SLIDES));

  // Hybrid Sync Function: pulls fresh state from MongoDB
  const refreshFromDatabase = useCallback(async () => {
    const health = await checkBackendHealth();
    if (health.isOnline && health.dbStatus === 'connected') {
      setDbStatus({ isOnline: true, status: 'connected', dbName: health.dbName || 'skyglobal' });
      const remoteData = await fetchSyncAll();
      if (remoteData) {
        if (Array.isArray(remoteData.jobs)) setJobs(remoteData.jobs);
        if (Array.isArray(remoteData.applications)) setApplications(remoteData.applications);
        if (Array.isArray(remoteData.employerRequests)) setEmployerRequests(remoteData.employerRequests);
        if (Array.isArray(remoteData.countries)) setCountries(remoteData.countries);
        if (Array.isArray(remoteData.blogs)) setBlogs(remoteData.blogs);
        if (Array.isArray(remoteData.testimonials)) setTestimonials(remoteData.testimonials);
        if (remoteData.companyInfo && typeof remoteData.companyInfo === 'object') setCompanyInfo(remoteData.companyInfo);
        if (Array.isArray(remoteData.gallery)) setGallery(remoteData.gallery);
        if (Array.isArray(remoteData.heroSlides)) {
          setHeroSlides(remoteData.heroSlides.sort((a, b) => (a.order || 0) - (b.order || 0)));
        }
      }
      return true;
    } else {
      setDbStatus({ isOnline: false, status: 'offline', dbName: null });
      return false;
    }
  }, []);

  // Sync on initial mount
  useEffect(() => {
    refreshFromDatabase();
  }, [refreshFromDatabase]);

  // Local storage persistence backups
  useEffect(() => { safeStorageSet('skyglobal_cms_jobs', jobs); }, [jobs]);
  useEffect(() => { safeStorageSet('skyglobal_cms_applications', applications); }, [applications]);
  useEffect(() => { safeStorageSet('skyglobal_cms_employer_requests', employerRequests); }, [employerRequests]);
  useEffect(() => { safeStorageSet('skyglobal_cms_countries', countries); }, [countries]);
  useEffect(() => { safeStorageSet('skyglobal_cms_blogs', blogs); }, [blogs]);
  useEffect(() => { safeStorageSet('skyglobal_cms_testimonials', testimonials); }, [testimonials]);
  useEffect(() => { safeStorageSet('skyglobal_cms_company_info', companyInfo); }, [companyInfo]);
  useEffect(() => { safeStorageSet('skyglobal_cms_gallery', gallery); }, [gallery]);
  useEffect(() => { safeStorageSet('skyglobal_cms_hero_slides', heroSlides); }, [heroSlides]);

  // --- Job Operations ---
  const addJob = (newJobData) => {
    const newJob = {
      id: `job-custom-${Date.now()}`,
      rffNumber: (newJobData.rffNumber || '').trim().toUpperCase() || `RFF-${(newJobData.country || 'GLB').slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      title: newJobData.title,
      company: newJobData.company || 'Sky Global Partner Client',
      location: newJobData.location,
      country: newJobData.country,
      sector: newJobData.sector,
      type: newJobData.type || 'Full-time',
      contract: newJobData.contract || '1 Year Renewable',
      salary: newJobData.salary,
      vacancies: Number(newJobData.vacancies) > 0 ? Number(newJobData.vacancies) : 1,
      status: newJobData.status || 'Active',
      visaSponsorship: newJobData.visaSponsorship !== false,
      tags: Array.isArray(newJobData.tags) ? newJobData.tags : (newJobData.tags || '').split(',').map(s => s.trim()).filter(Boolean),
      description: newJobData.description,
      requirements: Array.isArray(newJobData.requirements) ? newJobData.requirements : (newJobData.requirements || '').split('\n').map(s => s.trim()).filter(Boolean),
      benefits: Array.isArray(newJobData.benefits) ? newJobData.benefits : (newJobData.benefits || '').split('\n').map(s => s.trim()).filter(Boolean),
      visaProcessing: newJobData.visaProcessing || '⚡ Fast-track 3–4 Weeks',
      perks: Array.isArray(newJobData.perks) 
        ? newJobData.perks 
        : (typeof newJobData.perks === 'string' ? newJobData.perks.split('\n').map(s => s.trim()).filter(Boolean) : [])
    };
    setJobs(prev => [newJob, ...prev]);
    // Persist to MongoDB
    apiAddJob(newJob).catch(err => console.warn('[CMS] Remote addJob error:', err));
    return newJob;
  };

  const updateJob = (jobId, updatedFields) => {
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          ...updatedFields,
          rffNumber: updatedFields.rffNumber !== undefined ? (updatedFields.rffNumber || '').trim().toUpperCase() : (job.rffNumber || ''),
          vacancies: updatedFields.vacancies !== undefined ? Number(updatedFields.vacancies) : (job.vacancies || 1),
          status: updatedFields.status !== undefined ? updatedFields.status : (job.status || 'Active'),
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
              : job.benefits,
          perks: updatedFields.perks !== undefined
            ? (Array.isArray(updatedFields.perks)
                ? updatedFields.perks
                : typeof updatedFields.perks === 'string'
                  ? updatedFields.perks.split('\n').map(s => s.trim()).filter(Boolean)
                  : [])
            : (job.perks || [])
        };
      }
      return job;
    }));
    // Persist to MongoDB
    apiUpdateJob(jobId, updatedFields).catch(err => console.warn('[CMS] Remote updateJob error:', err));
  };

  const updateJobStatus = (jobId, status) => {
    updateJob(jobId, { status });
  };

  const deleteJob = (jobId) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
    // Persist to MongoDB
    apiDeleteJob(jobId).catch(err => console.warn('[CMS] Remote deleteJob error:', err));
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
      resumeName: appData.fileName || appData.resumeName || 'Attached_Resume.pdf',
      resumeDataUrl: appData.fileDataUrl || appData.resumeDataUrl || null,
      resumeSize: appData.fileSize || appData.resumeSize || null,
      resumeType: appData.fileType || appData.resumeType || null,
      notes: appData.note || 'Online portal submission.',
      adminNotes: ''
    };
    setApplications(prev => [newApp, ...prev]);
    // Persist to MongoDB
    apiAddApplication(newApp).catch(err => console.warn('[CMS] Remote addApplication error:', err));
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
    // Persist to MongoDB
    apiUpdateApplication(appId, { status, adminNotes }).catch(err => console.warn('[CMS] Remote updateApplication error:', err));
  };

  const deleteApplication = (appId) => {
    setApplications(prev => prev.filter(app => app.id !== appId));
    // Persist to MongoDB
    apiDeleteApplication(appId).catch(err => console.warn('[CMS] Remote deleteApplication error:', err));
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
    // Persist to MongoDB
    apiAddEmployerRequest(newReq).catch(err => console.warn('[CMS] Remote addEmployerRequest error:', err));
    return newReq;
  };

  const updateEmployerRequestStatus = (reqId, status) => {
    setEmployerRequests(prev => prev.map(req => {
      if (req.id === reqId) {
        return { ...req, status };
      }
      return req;
    }));
    // Persist to MongoDB
    apiUpdateEmployerRequest(reqId, { status }).catch(err => console.warn('[CMS] Remote updateEmployerRequest error:', err));
  };

  const deleteEmployerRequest = (reqId) => {
    setEmployerRequests(prev => prev.filter(req => req.id !== reqId));
    // Persist to MongoDB
    apiDeleteEmployerRequest(reqId).catch(err => console.warn('[CMS] Remote deleteEmployerRequest error:', err));
  };

  // --- Country Operations ---
  const addCountry = (countryData) => {
    const newCountry = {
      id: `country-${Date.now()}`,
      name: (countryData.name || '').trim(),
      status: countryData.status || 'Active Hiring',
      badge: (countryData.badge || 'International Hub').trim(),
      image: (countryData.image || '').trim() || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
      overview: (countryData.overview || '').trim(),
      highlight: (countryData.highlight || 'Authorized Work Permits & Sponsorship').trim(),
      details: Array.isArray(countryData.details)
        ? countryData.details
        : typeof countryData.details === 'string'
          ? countryData.details.split('\n').map(s => s.trim()).filter(Boolean)
          : [
              'Direct employer sponsorship and authorized work permit documentation.',
              'Pre-departure orientation, visa verification, and travel arrangements.',
              'Renewable employment contracts with competitive overseas benefits.'
            ]
    };
    setCountries(prev => [...prev, newCountry]);
    // Persist to MongoDB
    apiAddCountry(newCountry).catch(err => console.warn('[CMS] Remote addCountry error:', err));
    return newCountry;
  };

  const updateCountry = (countryId, updatedFields) => {
    setCountries(prev => prev.map(c => {
      if (c.id === countryId || String(c.id) === String(countryId)) {
        return { 
          ...c, 
          ...updatedFields,
          details: updatedFields.details !== undefined
            ? Array.isArray(updatedFields.details)
              ? updatedFields.details
              : typeof updatedFields.details === 'string'
                ? updatedFields.details.split('\n').map(s => s.trim()).filter(Boolean)
                : c.details
            : c.details
        };
      }
      return c;
    }));
    // Persist to MongoDB
    apiUpdateCountry(countryId, updatedFields).catch(err => console.warn('[CMS] Remote updateCountry error:', err));
  };

  const deleteCountry = (countryId) => {
    setCountries(prev => prev.filter(c => c.id !== countryId && String(c.id) !== String(countryId)));
    // Persist to MongoDB
    apiDeleteCountry(countryId).catch(err => console.warn('[CMS] Remote deleteCountry error:', err));
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
    // Persist to MongoDB
    apiAddBlog(newBlog).catch(err => console.warn('[CMS] Remote addBlog error:', err));
    return newBlog;
  };

  const updateBlog = (blogId, updatedFields) => {
    setBlogs(prev => prev.map(b => (b.id === blogId ? { ...b, ...updatedFields } : b)));
    // Persist to MongoDB
    apiUpdateBlog(blogId, updatedFields).catch(err => console.warn('[CMS] Remote updateBlog error:', err));
  };

  const deleteBlog = (blogId) => {
    setBlogs(prev => prev.filter(b => b.id !== blogId));
    // Persist to MongoDB
    apiDeleteBlog(blogId).catch(err => console.warn('[CMS] Remote deleteBlog error:', err));
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
    // Persist to MongoDB
    apiAddTestimonial(newTest).catch(err => console.warn('[CMS] Remote addTestimonial error:', err));
    return newTest;
  };

  const updateTestimonial = (id, updatedFields) => {
    setTestimonials(prev => prev.map(t => (t.id === id ? { ...t, ...updatedFields } : t)));
    // Persist to MongoDB
    apiUpdateTestimonial(id, updatedFields).catch(err => console.warn('[CMS] Remote updateTestimonial error:', err));
  };

  const deleteTestimonial = (id) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    // Persist to MongoDB
    apiDeleteTestimonial(id).catch(err => console.warn('[CMS] Remote deleteTestimonial error:', err));
  };

  // --- Settings Operation ---
  const updateCompanyInfo = (newInfo) => {
    setCompanyInfo(prev => ({ ...prev, ...newInfo }));
    // Persist to MongoDB
    apiUpdateCompanyInfo(newInfo).catch(err => console.warn('[CMS] Remote updateCompanyInfo error:', err));
  };

  // --- Gallery Operations ---
  const addGalleryItem = (itemData) => {
    let images = [];
    if (Array.isArray(itemData.images) && itemData.images.length > 0) {
      images = itemData.images.filter(Boolean);
    } else if (itemData.image) {
      images = [itemData.image];
    } else {
      images = ['https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80'];
    }

    const newItem = {
      id: `gal-${Date.now()}`,
      title: itemData.title || 'SkyGlobal Milestone',
      category: itemData.category || 'Visa Handovers',
      timeframe: itemData.timeframe || 'October 2026',
      date: itemData.date || new Date().toISOString().split('T')[0],
      images: images,
      image: images[0],
      location: itemData.location || 'SkyGlobal Dubai, UAE',
      description: itemData.description || '',
      tags: Array.isArray(itemData.tags)
        ? itemData.tags
        : typeof itemData.tags === 'string'
          ? itemData.tags.split(',').map(s => s.trim()).filter(Boolean)
          : [itemData.category, itemData.timeframe].filter(Boolean)
    };
    setGallery(prev => [newItem, ...prev]);
    // Persist to MongoDB
    apiAddGalleryItem(newItem).catch(err => console.warn('[CMS] Remote addGalleryItem error:', err));
    return newItem;
  };

  const updateGalleryItem = (itemId, updatedFields) => {
    setGallery(prev => prev.map(item => {
      if (item.id === itemId || String(item.id) === String(itemId)) {
        let mergedImages = item.images || (item.image ? [item.image] : []);
        if (updatedFields.images !== undefined) {
          mergedImages = Array.isArray(updatedFields.images) 
            ? updatedFields.images.filter(Boolean) 
            : [updatedFields.images].filter(Boolean);
        } else if (updatedFields.image && !mergedImages.includes(updatedFields.image)) {
          mergedImages = [updatedFields.image, ...mergedImages];
        }

        return {
          ...item,
          ...updatedFields,
          images: mergedImages,
          image: mergedImages[0] || updatedFields.image || item.image,
          tags: updatedFields.tags !== undefined
            ? Array.isArray(updatedFields.tags)
              ? updatedFields.tags
              : typeof updatedFields.tags === 'string'
                ? updatedFields.tags.split(',').map(s => s.trim()).filter(Boolean)
                : item.tags
            : item.tags
        };
      }
      return item;
    }));
    // Persist to MongoDB
    apiUpdateGalleryItem(itemId, updatedFields).catch(err => console.warn('[CMS] Remote updateGalleryItem error:', err));
  };

  const deleteGalleryItem = (itemId) => {
    setGallery(prev => prev.filter(item => item.id !== itemId && String(item.id) !== String(itemId)));
    // Persist to MongoDB
    apiDeleteGalleryItem(itemId).catch(err => console.warn('[CMS] Remote deleteGalleryItem error:', err));
  };

  // --- Hero Slides Operations (Super Admin) ---
  const addHeroSlide = (slideData) => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      url: (slideData.url || '').trim(),
      title: (slideData.title || 'Global Recruitment & Overseas Placement').trim(),
      subtitle: (slideData.subtitle || 'Connecting employers worldwide with vetted talent').trim(),
      badge: (slideData.badge || 'Talent Acquisition').trim(),
      location: (slideData.location || 'SkyGlobal Dubai HQ').trim(),
      stat: (slideData.stat || '100% Vetted Candidates').trim(),
      order: slideData.order !== undefined ? Number(slideData.order) : heroSlides.length + 1
    };
    setHeroSlides(prev => [...prev, newSlide]);
    apiAddHeroSlide(newSlide).catch(err => console.warn('[CMS] Remote addHeroSlide error:', err));
    return newSlide;
  };

  const updateHeroSlide = (slideId, updatedFields) => {
    setHeroSlides(prev => prev.map(s => {
      if (s.id === slideId || String(s.id) === String(slideId)) {
        return {
          ...s,
          ...updatedFields,
          order: updatedFields.order !== undefined ? Number(updatedFields.order) : (s.order || 0)
        };
      }
      return s;
    }));
    apiUpdateHeroSlide(slideId, updatedFields).catch(err => console.warn('[CMS] Remote updateHeroSlide error:', err));
  };

  const deleteHeroSlide = (slideId) => {
    setHeroSlides(prev => prev.filter(s => s.id !== slideId && String(s.id) !== String(slideId)));
    apiDeleteHeroSlide(slideId).catch(err => console.warn('[CMS] Remote deleteHeroSlide error:', err));
  };

  const resetHeroSlides = () => {
    setHeroSlides(INITIAL_HERO_SLIDES);
    safeStorageSet('skyglobal_cms_hero_slides', INITIAL_HERO_SLIDES);
  };

  // Reset to default data (wipes jobs, blogs, and gallery to empty arrays)
  const resetAllToDefaults = async () => {
    setJobs([]);
    setApplications(INITIAL_APPLICATIONS);
    setEmployerRequests(INITIAL_EMPLOYER_REQUESTS);
    setCountries(COUNTRIES);
    setBlogs([]);
    setTestimonials(TESTIMONIALS);
    setCompanyInfo(COMPANY_INFO);
    setGallery([]);
    setHeroSlides(INITIAL_HERO_SLIDES);
    safeStorageSet('skyglobal_cms_jobs', []);
    safeStorageSet('skyglobal_cms_blogs', []);
    safeStorageSet('skyglobal_cms_gallery', []);
    localStorage.removeItem('skyglobal_cms_applications');
    localStorage.removeItem('skyglobal_cms_employer_requests');
    localStorage.removeItem('skyglobal_cms_countries');
    localStorage.removeItem('skyglobal_cms_testimonials');
    localStorage.removeItem('skyglobal_cms_company_info');
    localStorage.removeItem('skyglobal_cms_hero_slides');

    // Reset MongoDB
    try {
      await apiResetDatabase();
    } catch (err) {
      console.warn('[CMS] Remote resetDatabase error:', err);
    }
  };

  return (
    <CMSContext.Provider value={{
      dbStatus,
      refreshFromDatabase,
      jobs,
      addJob,
      updateJob,
      updateJobStatus,
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
      addCountry,
      updateCountry,
      deleteCountry,
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
      gallery,
      galleryCategories: GALLERY_CATEGORIES,
      addGalleryItem,
      updateGalleryItem,
      deleteGalleryItem,
      heroSlides,
      addHeroSlide,
      updateHeroSlide,
      deleteHeroSlide,
      resetHeroSlides,
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
