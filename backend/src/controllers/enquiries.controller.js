const { validateEnquiry } = require('../validators/enquiry.validator');
const { sendEnquiryNotification } = require('../services/email.service');

const SUCCESS_MESSAGE = 'Thank you. Your enquiry has been received.';

async function createEnquiry(req, res) {
  const body = req.body ?? {};

  // Honeypot: real visitors never see or fill the "website" field. Bots that
  // do get a normal-looking success response and the enquiry is dropped.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return res.status(201).json({ success: true, message: SUCCESS_MESSAGE });
  }

  const { value, errors } = validateEnquiry(body);
  if (errors) {
    return res.status(400).json({
      success: false,
      message: 'Please correct the highlighted fields and try again.',
      errors,
    });
  }

  const result = await sendEnquiryNotification(value);

  // Log without personal data (no name, email, phone or message text).
  console.log(
    `[enquiry] received service="${value.service}" messageLength=${value.message.length} ` +
      `emailDelivered=${result.delivered}`
  );

  return res.status(201).json({ success: true, message: SUCCESS_MESSAGE });
}

module.exports = { createEnquiry };
