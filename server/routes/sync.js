import express from 'express';
import { Job } from '../models/Job.js';
import { Application } from '../models/Application.js';
import { EmployerRequest } from '../models/EmployerRequest.js';
import { Country } from '../models/Country.js';
import { Blog } from '../models/Blog.js';
import { Testimonial } from '../models/Testimonial.js';
import { CompanyInfo } from '../models/CompanyInfo.js';
import { GalleryItem } from '../models/GalleryItem.js';
import { User } from '../models/User.js';
import { HeroSlide } from '../models/HeroSlide.js';
import { resetDatabase } from '../db.js';

const router = express.Router();

// GET all collections in one shot for initial app hydration
router.get('/all', async (req, res) => {
  try {
    const [
      jobs,
      applications,
      employerRequests,
      countries,
      blogs,
      testimonials,
      companyInfo,
      gallery,
      users,
      heroSlides
    ] = await Promise.all([
      Job.find({}).sort({ createdAt: -1 }),
      Application.find({}).sort({ createdAt: -1 }),
      EmployerRequest.find({}).sort({ createdAt: -1 }),
      Country.find({}),
      Blog.find({}).sort({ createdAt: -1 }),
      Testimonial.find({}),
      CompanyInfo.findOne({}),
      GalleryItem.find({}).sort({ createdAt: -1 }),
      User.find({}, '-password'),
      HeroSlide.find({}).sort({ order: 1, createdAt: 1 })
    ]);

    res.json({
      success: true,
      data: {
        jobs,
        applications,
        employerRequests,
        countries,
        blogs,
        testimonials,
        companyInfo,
        gallery,
        users,
        heroSlides
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST reset to factory defaults
router.post('/reset', async (req, res) => {
  try {
    const result = await resetDatabase();
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
