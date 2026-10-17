import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './db.js';

import jobsRouter from './routes/jobs.js';
import applicationsRouter from './routes/applications.js';
import employerRequestsRouter from './routes/employerRequests.js';
import countriesRouter from './routes/countries.js';
import blogsRouter from './routes/blogs.js';
import testimonialsRouter from './routes/testimonials.js';
import companyInfoRouter from './routes/companyInfo.js';
import galleryRouter from './routes/gallery.js';
import authRouter from './routes/auth.js';
import syncRouter from './routes/sync.js';
import heroSlidesRouter from './routes/heroSlides.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));

// Allow up to 50MB for resume PDFs and image attachments
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.json({
    status: 'ok',
    database: isDbConnected ? 'connected' : 'disconnected',
    dbName: mongoose.connection.name || 'skyglobal',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/jobs', jobsRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/employer-requests', employerRequestsRouter);
app.use('/api/countries', countriesRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/company-info', companyInfoRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/auth', authRouter);
app.use('/api/sync', syncRouter);
app.use('/api/hero-slides', heroSlidesRouter);

// Start server and connect to MongoDB
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  🚀 SkyGlobal Local API Server running on port ${PORT} `);
    console.log(`  📊 Health endpoint: http://localhost:${PORT}/api/health `);
    console.log(`  🗄️ Database: MongoDB (mongodb://127.0.0.1:27017/skyglobal)`);
    console.log(`=======================================================`);
  });
}

startServer();
