import express from 'express';
import { Testimonial } from '../models/Testimonial.js';

const router = express.Router();

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const list = await Testimonial.find({});
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new testimonial
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newTest = new Testimonial({
      id: data.id || Date.now(),
      name: data.name,
      designation: data.designation || '',
      company: data.company || '',
      title: data.title || '',
      description: data.description || '',
      category: data.category || 'Candidate (Visa Approved)'
    });

    const saved = await newTest.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update testimonial
router.put('/:id', async (req, res) => {
  try {
    const queryId = req.params.id;
    const updated = await Testimonial.findOneAndUpdate(
      { $or: [{ id: queryId }, { id: Number(queryId) }] },
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE testimonial
router.delete('/:id', async (req, res) => {
  try {
    const queryId = req.params.id;
    const deleted = await Testimonial.findOneAndDelete({
      $or: [{ id: queryId }, { id: Number(queryId) }]
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
