import mongoose from 'mongoose';
import { Job } from './models/Job.js';
import { Application } from './models/Application.js';
import { EmployerRequest } from './models/EmployerRequest.js';
import { Country } from './models/Country.js';
import { Blog } from './models/Blog.js';
import { Testimonial } from './models/Testimonial.js';
import { CompanyInfo } from './models/CompanyInfo.js';
import { GalleryItem } from './models/GalleryItem.js';
import { User } from './models/User.js';
import { HeroSlide } from './models/HeroSlide.js';

import {
  COMPANY_INFO,
  COUNTRIES,
  JOBS_LIST,
  TESTIMONIALS,
  BLOGS,
  INITIAL_GALLERY,
  INITIAL_APPLICATIONS,
  INITIAL_EMPLOYER_REQUESTS,
  INITIAL_USERS,
  INITIAL_HERO_SLIDES
} from './defaultData.js';

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skyglobal';
  try {
    await mongoose.connect(uri);
    console.log(`[Database] MongoDB connected successfully to: ${uri}`);
    await autoSeedIfEmpty();
    return true;
  } catch (error) {
    console.error(`[Database] MongoDB connection error:`, error.message);
    return false;
  }
}

export async function autoSeedIfEmpty() {
  try {
    // Note: jobs, blogs, and gallery are kept as empty arrays [] by default.
    // They are NOT auto-seeded so the user can start with a clean slate and add their own content.

    if (INITIAL_APPLICATIONS.length > 0) {
      const appCount = await Application.countDocuments();
      if (appCount === 0) {
        console.log('[Database] Applications collection is empty. Auto-seeding sample applications...');
        await Application.insertMany(INITIAL_APPLICATIONS);
      }
    }

    if (INITIAL_EMPLOYER_REQUESTS.length > 0) {
      const empCount = await EmployerRequest.countDocuments();
      if (empCount === 0) {
        console.log('[Database] Employer requests collection is empty. Auto-seeding sample requests...');
        await EmployerRequest.insertMany(INITIAL_EMPLOYER_REQUESTS);
      }
    }

    const countryCount = await Country.countDocuments();
    if (countryCount === 0) {
      console.log('[Database] Countries collection is empty. Auto-seeding countries...');
      await Country.insertMany(COUNTRIES);
    }

    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      console.log('[Database] Testimonials collection is empty. Auto-seeding testimonials...');
      await Testimonial.insertMany(TESTIMONIALS);
    }

    const companyCount = await CompanyInfo.countDocuments();
    if (companyCount === 0) {
      console.log('[Database] CompanyInfo collection is empty. Auto-seeding company info...');
      await CompanyInfo.create(COMPANY_INFO);
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('[Database] Users collection is empty. Auto-seeding default admin accounts...');
      await User.insertMany(INITIAL_USERS);
    }

    const heroSlideCount = await HeroSlide.countDocuments();
    if (heroSlideCount === 0) {
      console.log('[Database] HeroSlides collection is empty. Auto-seeding default hero slides...');
      await HeroSlide.insertMany(INITIAL_HERO_SLIDES);
    }

    console.log('[Database] Database check/seed complete. (Jobs, Blogs, and Gallery are left empty for user content)');
  } catch (err) {
    console.error('[Database] Auto-seed error:', err);
  }
}

export async function resetDatabase() {
  console.log('[Database] Resetting all collections to clean state...');
  await Job.deleteMany({});
  await Application.deleteMany({});
  await EmployerRequest.deleteMany({});
  await Country.deleteMany({});
  await Blog.deleteMany({});
  await Testimonial.deleteMany({});
  await CompanyInfo.deleteMany({});
  await GalleryItem.deleteMany({});
  await User.deleteMany({});
  await HeroSlide.deleteMany({});

  // Jobs, Blogs, and Gallery items are intentionally kept empty []
  if (INITIAL_APPLICATIONS.length > 0) {
    await Application.insertMany(INITIAL_APPLICATIONS);
  }
  if (INITIAL_EMPLOYER_REQUESTS.length > 0) {
    await EmployerRequest.insertMany(INITIAL_EMPLOYER_REQUESTS);
  }
  await Country.insertMany(COUNTRIES);
  await Testimonial.insertMany(TESTIMONIALS);
  await CompanyInfo.create(COMPANY_INFO);
  await User.insertMany(INITIAL_USERS);
  await HeroSlide.insertMany(INITIAL_HERO_SLIDES);

  console.log('[Database] Reset complete. Jobs, blogs, and gallery items are wiped clean to empty arrays.');
  return { success: true, message: 'Collections reset to clean state (jobs, blogs, and gallery wiped clean).' };
}
