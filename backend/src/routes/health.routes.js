const express = require('express');
const { isEmailConfigured } = require('../services/email.service');

const router = express.Router();
const startedAt = new Date().toISOString();

router.get('/', (req, res) => {
  const body = { success: true, message: 'CS Firm API is running' };

  // Development-only details that help spot a stale or misconfigured server
  // (e.g. an old process still holding the port). Hidden in production.
  if (process.env.NODE_ENV !== 'production') {
    body.dev = { pid: process.pid, startedAt, emailConfigured: isEmailConfigured() };
  }

  res.json(body);
});

module.exports = router;
