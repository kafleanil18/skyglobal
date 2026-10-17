import express from 'express';
import { Job } from '../models/Job.js';

const router = express.Router();

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new job
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newJob = new Job({
      id: data.id || `job-custom-${Date.now()}`,
      rffNumber: (data.rffNumber || '').trim().toUpperCase() || `RFF-${(data.country || 'GLB').slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      title: data.title,
      company: data.company || 'Sky Global Partner Client',
      location: data.location || 'Malta, EU',
      country: data.country || 'Malta',
      sector: data.sector || 'MEP, Electrical & Technical Trades',
      type: data.type || 'Full-time',
      contract: data.contract || '1 Year Renewable',
      salary: data.salary || '€1,400 – €1,750 / month',
      vacancies: Number(data.vacancies) > 0 ? Number(data.vacancies) : 1,
      status: data.status || 'Active',
      visaSponsorship: data.visaSponsorship !== false,
      tags: Array.isArray(data.tags) ? data.tags : (data.tags || '').split(',').map(s => s.trim()).filter(Boolean),
      description: data.description || '',
      requirements: Array.isArray(data.requirements) ? data.requirements : (data.requirements || '').split('\n').map(s => s.trim()).filter(Boolean),
      benefits: Array.isArray(data.benefits) ? data.benefits : (data.benefits || '').split('\n').map(s => s.trim()).filter(Boolean),
      visaProcessing: data.visaProcessing || '⚡ Fast-track 3–4 Weeks',
      perks: Array.isArray(data.perks) ? data.perks : (typeof data.perks === 'string' ? data.perks.split('\n').map(s => s.trim()).filter(Boolean) : [])
    });

    const saved = await newJob.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update job
router.put('/:id', async (req, res) => {
  try {
    const updated = await Job.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE job
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Job.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
