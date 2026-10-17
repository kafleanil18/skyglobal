import express from 'express';
import { HeroSlide } from '../models/HeroSlide.js';

const router = express.Router();

// GET all hero slides
router.get('/', async (req, res) => {
  try {
    const slides = await HeroSlide.find({}).sort({ order: 1, createdAt: 1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new hero slide (Super Admin privilege)
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const totalCount = await HeroSlide.countDocuments();
    const newSlide = new HeroSlide({
      id: data.id || `slide-${Date.now()}`,
      url: (data.url || '').trim(),
      title: (data.title || 'Global Recruitment & Overseas Placement').trim(),
      subtitle: (data.subtitle || 'Connecting employers worldwide with vetted talent').trim(),
      badge: (data.badge || 'Talent Acquisition').trim(),
      location: (data.location || 'SkyGlobal Dubai HQ').trim(),
      stat: (data.stat || '100% Vetted Candidates').trim(),
      order: data.order !== undefined ? Number(data.order) : totalCount + 1
    });

    const saved = await newSlide.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update hero slide (Super Admin privilege)
router.put('/:id', async (req, res) => {
  try {
    const updated = await HeroSlide.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Hero slide not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE hero slide (Super Admin privilege)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await HeroSlide.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ error: 'Hero slide not found' });
    }
    res.json({ success: true, message: 'Hero slide deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
