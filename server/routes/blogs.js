import express from 'express';
import { Blog } from '../models/Blog.js';

const router = express.Router();

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new blog
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newBlog = new Blog({
      id: data.id || Date.now(),
      title: data.title,
      category: data.category || 'Visa Policy',
      date: data.date || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      image: data.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      summary: data.summary || '',
      content: data.content || '',
      source: data.source || 'SkyGlobal HR Market Intelligence'
    });

    const saved = await newBlog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update blog
router.put('/:id', async (req, res) => {
  try {
    const queryId = req.params.id;
    const updated = await Blog.findOneAndUpdate(
      { $or: [{ id: queryId }, { id: Number(queryId) }] },
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE blog
router.delete('/:id', async (req, res) => {
  try {
    const queryId = req.params.id;
    const deleted = await Blog.findOneAndDelete({
      $or: [{ id: queryId }, { id: Number(queryId) }]
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
