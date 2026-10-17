import express from 'express';
import { User } from '../models/User.js';

const router = express.Router();

// POST login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: trimmedEmail });

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email address or password. Try superadmin@skyglobalhr.com / admin123'
      });
    }

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department
    };

    res.json({ success: true, user: sessionUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add admin user
router.post('/users', async (req, res) => {
  try {
    const data = req.body;
    const email = (data.email || '').trim().toLowerCase();
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'A user with this email address already exists.' });
    }

    const newUser = new User({
      id: data.id || `user-${Date.now()}`,
      name: data.name,
      email,
      password: data.password || 'admin123',
      role: data.role || 'admin',
      department: data.department || 'General Administration',
      createdAt: new Date().toISOString().split('T')[0]
    });

    const saved = await newUser.save();
    const safeUser = {
      id: saved.id,
      name: saved.name,
      email: saved.email,
      role: saved.role,
      department: saved.department,
      createdAt: saved.createdAt
    };
    res.status(201).json({ success: true, user: safeUser });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE admin user
router.delete('/users/:id', async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
