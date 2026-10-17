// Local API Client for SkyGlobal Backend (MongoDB + Express)
// Operates in hybrid mode: syncs with MongoDB when server is running,
// and gracefully falls back to localStorage if backend is offline.

const API_BASE = (typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port === '5173')
  ? '/api'
  : (import.meta.env?.VITE_API_URL || 'http://localhost:5001/api');

// Quick health check to test if local backend & MongoDB are active
export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE}/health`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return {
        isOnline: true,
        dbStatus: data.database,
        dbName: data.dbName || 'skyglobal'
      };
    }
  } catch (e) {
    // Backend offline or unreachable
  }
  return {
    isOnline: false,
    dbStatus: 'disconnected',
    dbName: null
  };
}

// Fetch all collections in one shot for initial app hydration
export async function fetchSyncAll() {
  try {
    const res = await fetch(`${API_BASE}/sync/all`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn('[API] Could not sync from local database, falling back to local cache:', err);
  }
  return null;
}

// Reset database
export async function apiResetDatabase() {
  try {
    const res = await fetch(`${API_BASE}/sync/reset`, { method: 'POST' });
    return await res.json();
  } catch (err) {
    console.error('[API] Reset failed:', err);
    return { success: false, error: err.message };
  }
}

// Jobs
export async function apiAddJob(jobData) {
  try {
    const res = await fetch(`${API_BASE}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to persist job to MongoDB:', err);
  }
  return null;
}

export async function apiUpdateJob(id, fields) {
  try {
    const res = await fetch(`${API_BASE}/jobs/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to update job in MongoDB:', err);
  }
  return null;
}

export async function apiDeleteJob(id) {
  try {
    const res = await fetch(`${API_BASE}/jobs/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.warn('[API] Failed to delete job from MongoDB:', err);
    return false;
  }
}

// Applications
export async function apiAddApplication(appData) {
  try {
    const res = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appData)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to persist application to MongoDB:', err);
  }
  return null;
}

export async function apiUpdateApplication(id, fields) {
  try {
    const res = await fetch(`${API_BASE}/applications/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to update application in MongoDB:', err);
  }
  return null;
}

export async function apiDeleteApplication(id) {
  try {
    const res = await fetch(`${API_BASE}/applications/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.warn('[API] Failed to delete application from MongoDB:', err);
    return false;
  }
}

// Employer Requests
export async function apiAddEmployerRequest(reqData) {
  try {
    const res = await fetch(`${API_BASE}/employer-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqData)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to persist employer request to MongoDB:', err);
  }
  return null;
}

export async function apiUpdateEmployerRequest(id, fields) {
  try {
    const res = await fetch(`${API_BASE}/employer-requests/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to update employer request in MongoDB:', err);
  }
  return null;
}

export async function apiDeleteEmployerRequest(id) {
  try {
    const res = await fetch(`${API_BASE}/employer-requests/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.warn('[API] Failed to delete employer request from MongoDB:', err);
    return false;
  }
}

// Countries
export async function apiAddCountry(countryData) {
  try {
    const res = await fetch(`${API_BASE}/countries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(countryData)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to persist country to MongoDB:', err);
  }
  return null;
}

export async function apiUpdateCountry(id, fields) {
  try {
    const res = await fetch(`${API_BASE}/countries/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to update country in MongoDB:', err);
  }
  return null;
}

export async function apiDeleteCountry(id) {
  try {
    const res = await fetch(`${API_BASE}/countries/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.warn('[API] Failed to delete country from MongoDB:', err);
    return false;
  }
}

// Blogs
export async function apiAddBlog(blogData) {
  try {
    const res = await fetch(`${API_BASE}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to persist blog to MongoDB:', err);
  }
  return null;
}

export async function apiUpdateBlog(id, fields) {
  try {
    const res = await fetch(`${API_BASE}/blogs/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to update blog in MongoDB:', err);
  }
  return null;
}

export async function apiDeleteBlog(id) {
  try {
    const res = await fetch(`${API_BASE}/blogs/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.warn('[API] Failed to delete blog from MongoDB:', err);
    return false;
  }
}

// Testimonials
export async function apiAddTestimonial(testData) {
  try {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to persist testimonial to MongoDB:', err);
  }
  return null;
}

export async function apiUpdateTestimonial(id, fields) {
  try {
    const res = await fetch(`${API_BASE}/testimonials/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to update testimonial in MongoDB:', err);
  }
  return null;
}

export async function apiDeleteTestimonial(id) {
  try {
    const res = await fetch(`${API_BASE}/testimonials/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.warn('[API] Failed to delete testimonial from MongoDB:', err);
    return false;
  }
}

// Company Info
export async function apiUpdateCompanyInfo(infoData) {
  try {
    const res = await fetch(`${API_BASE}/company-info`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(infoData)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to update company info in MongoDB:', err);
  }
  return null;
}

// Gallery
export async function apiAddGalleryItem(itemData) {
  try {
    const res = await fetch(`${API_BASE}/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to persist gallery item to MongoDB:', err);
  }
  return null;
}

export async function apiUpdateGalleryItem(id, fields) {
  try {
    const res = await fetch(`${API_BASE}/gallery/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to update gallery item in MongoDB:', err);
  }
  return null;
}

export async function apiDeleteGalleryItem(id) {
  try {
    const res = await fetch(`${API_BASE}/gallery/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.warn('[API] Failed to delete gallery item from MongoDB:', err);
    return false;
  }
}

// Auth & Users
export async function apiLogin(email, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Backend unreachable: ' + err.message };
  }
}

export async function apiFetchUsers() {
  try {
    const res = await fetch(`${API_BASE}/auth/users`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to fetch admin users from MongoDB:', err);
  }
  return null;
}

export async function apiAddUser(userData) {
  try {
    const res = await fetch(`${API_BASE}/auth/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function apiDeleteUser(id) {
  try {
    const res = await fetch(`${API_BASE}/auth/users/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
}

// Hero Slides (Super Admin)
export async function apiAddHeroSlide(slideData) {
  try {
    const res = await fetch(`${API_BASE}/hero-slides`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slideData)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to persist hero slide to MongoDB:', err);
  }
  return null;
}

export async function apiUpdateHeroSlide(id, fields) {
  try {
    const res = await fetch(`${API_BASE}/hero-slides/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] Failed to update hero slide in MongoDB:', err);
  }
  return null;
}

export async function apiDeleteHeroSlide(id) {
  try {
    const res = await fetch(`${API_BASE}/hero-slides/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.warn('[API] Failed to delete hero slide from MongoDB:', err);
    return false;
  }
}

