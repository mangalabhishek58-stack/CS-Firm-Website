const express = require('express');
const { createEnquiry } = require('../controllers/enquiries.controller');
const { createRateLimiter } = require('../middleware/rateLimit');

const router = express.Router();

const enquiryLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.ENQUIRY_RATE_LIMIT_MAX) || 5,
});

router.post('/', enquiryLimiter, createEnquiry);

module.exports = router;
