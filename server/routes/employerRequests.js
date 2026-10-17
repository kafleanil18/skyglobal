import express from 'express';
import { EmployerRequest } from '../models/EmployerRequest.js';

const router = express.Router();

// GET all employer requests
router.get('/', async (req, res) => {
  try {
    const requests = await EmployerRequest.find({}).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new employer talent request
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newReq = new EmployerRequest({
      id: data.id || `req-${Date.now()}`,
      companyName: data.companyName,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone || '',
      industrySector: data.industrySector || 'MEP, Electrical & Technical Trades',
      headcount: data.headcount || '1-5 Candidates',
      destinationCountry: data.destinationCountry || 'Malta',
      timeline: data.timeline || 'Immediate (Within 30 Days)',
      requestDate: data.requestDate || new Date().toISOString().split('T')[0],
      status: data.status || 'New',
      notes: data.notes || ''
    });

    const saved = await newReq.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update request
router.put('/:id', async (req, res) => {
  try {
    const updated = await EmployerRequest.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Employer request not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE request
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await EmployerRequest.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ error: 'Employer request not found' });
    }
    res.json({ success: true, message: 'Employer request deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
