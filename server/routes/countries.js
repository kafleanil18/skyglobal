import express from 'express';
import { Country } from '../models/Country.js';

const router = express.Router();

// GET all countries
router.get('/', async (req, res) => {
  try {
    const countries = await Country.find({});
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new country
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newCountry = new Country({
      id: data.id || `country-${Date.now()}`,
      name: (data.name || '').trim(),
      status: data.status || 'Active Hiring',
      badge: (data.badge || 'International Hub').trim(),
      image: (data.image || '').trim() || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
      overview: (data.overview || '').trim(),
      highlight: (data.highlight || 'Authorized Work Permits & Sponsorship').trim(),
      details: Array.isArray(data.details)
        ? data.details
        : typeof data.details === 'string'
          ? data.details.split('\n').map(s => s.trim()).filter(Boolean)
          : [
              'Direct employer sponsorship and authorized work permit documentation.',
              'Pre-departure orientation, visa verification, and travel arrangements.',
              'Renewable employment contracts with competitive overseas benefits.'
            ]
    });

    const saved = await newCountry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update country
router.put('/:id', async (req, res) => {
  try {
    const queryId = req.params.id;
    const updated = await Country.findOneAndUpdate(
      { $or: [{ id: queryId }, { id: Number(queryId) }] },
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Country not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE country
router.delete('/:id', async (req, res) => {
  try {
    const queryId = req.params.id;
    const deleted = await Country.findOneAndDelete({
      $or: [{ id: queryId }, { id: Number(queryId) }]
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Country not found' });
    }
    res.json({ success: true, message: 'Country deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
