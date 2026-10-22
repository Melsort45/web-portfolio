import express from 'express';

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { role } = req.body;

  if (role === 'admin') {
    return res.json({
      status: 'success',
      token: 'sustain-admin-token',
      message: 'Logged in as Admin (Prof. Gabriel)'
    });
  }

  res.json({
    status: 'success',
    token: 'sustain-user-token',
    message: 'Logged in as User (Elena)'
  });
});

export default router;