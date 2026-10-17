import express from 'express';
import { GalleryItem } from '../models/GalleryItem.js';

const router = express.Router();

// GET all gallery items
router.get('/', async (req, res) => {
  try {
    const items = await GalleryItem.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new gallery item
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    let images = [];
    if (Array.isArray(data.images) && data.images.length > 0) {
      images = data.images.filter(Boolean);
    } else if (data.image) {
      images = [data.image];
    } else {
      images = ['https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80'];
    }

    const newItem = new GalleryItem({
      id: data.id || `gal-${Date.now()}`,
      title: data.title || 'SkyGlobal Milestone',
      category: data.category || 'Visa Handovers',
      timeframe: data.timeframe || 'October 2026',
      date: data.date || new Date().toISOString().split('T')[0],
      images: images,
      image: images[0],
      location: data.location || 'SkyGlobal Dubai, UAE',
      description: data.description || '',
      tags: Array.isArray(data.tags)
        ? data.tags
        : typeof data.tags === 'string'
          ? data.tags.split(',').map(s => s.trim()).filter(Boolean)
          : [data.category, data.timeframe].filter(Boolean)
    });

    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update gallery item
router.put('/:id', async (req, res) => {
  try {
    const updated = await GalleryItem.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE gallery item
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await GalleryItem.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
