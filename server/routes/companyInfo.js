import express from 'express';
import { CompanyInfo } from '../models/CompanyInfo.js';
import { COMPANY_INFO } from '../defaultData.js';

const router = express.Router();

// GET company info
router.get('/', async (req, res) => {
  try {
    let info = await CompanyInfo.findOne({});
    if (!info) {
      info = await CompanyInfo.create(COMPANY_INFO);
    }
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update company info
router.put('/', async (req, res) => {
  try {
    let info = await CompanyInfo.findOne({});
    if (!info) {
      info = new CompanyInfo(req.body);
    } else {
      Object.assign(info, req.body);
    }
    const saved = await info.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
