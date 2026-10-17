import express from 'express';
import { Application } from '../models/Application.js';

const router = express.Router();

// GET all applications
router.get('/', async (req, res) => {
  try {
    const apps = await Application.find({}).sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST submit candidate application
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newApp = new Application({
      id: data.id || `app-${Date.now()}`,
      jobId: data.jobId || 'general-pool',
      jobTitle: data.jobTitle || 'General International Talent Pool',
      applicantName: data.applicantName || data.fullName || data.name,
      email: data.email,
      phone: data.phone || '',
      currentCountry: data.currentCountry || '',
      experienceYears: data.experienceYears || '3-5 years',
      preferredDestination: data.preferredDestination || 'Malta',
      appliedDate: data.appliedDate || new Date().toISOString().split('T')[0],
      status: data.status || 'Pending',
      resumeName: data.fileName || data.resumeName || 'Attached_Resume.pdf',
      resumeDataUrl: data.fileDataUrl || data.resumeDataUrl || null,
      resumeSize: data.fileSize || data.resumeSize || null,
      resumeType: data.fileType || data.resumeType || null,
      notes: data.note || data.notes || 'Online portal submission.',
      adminNotes: data.adminNotes || ''
    });

    const saved = await newApp.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update status / admin notes
router.put('/:id', async (req, res) => {
  try {
    const updated = await Application.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE application
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Application.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
