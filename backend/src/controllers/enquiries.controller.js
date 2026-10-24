const { validateEnquiry } = require('../validators/enquiry.validator');
const { sendEnquiryNotification, isEmailConfigured } = require('../services/email.service');

const SUCCESS_MESSAGE = 'Thank you. Your enquiry has been received.';
const UNAVAILABLE_MESSAGE =
  'Sorry, we could not send your enquiry just now. Please try again in a few minutes, or contact us by phone or email.';

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

  // Enquiries are not stored anywhere else yet, so in production a missing
  // email setup must fail loudly rather than silently drop the enquiry.
  if (process.env.NODE_ENV === 'production' && !isEmailConfigured()) {
    console.error('[enquiry] email is not configured - enquiry could not be delivered');
    return res.status(503).json({ success: false, message: UNAVAILABLE_MESSAGE });
  }

  let result;
  try {
    result = await sendEnquiryNotification(value);
  } catch (err) {
    // Log the provider error without personal data.
    console.error(`[enquiry] email delivery failed: ${err.code || 'ERROR'} ${err.responseCode || ''}`.trim());
    return res.status(503).json({ success: false, message: UNAVAILABLE_MESSAGE });
  }

  // Log without personal data (no name, email, phone or message text).
  console.log(
    `[enquiry] received service="${value.service}" messageLength=${value.message.length} ` +
      `emailDelivered=${result.delivered}`
  );

  return res.status(201).json({ success: true, message: SUCCESS_MESSAGE });
}

module.exports = { createEnquiry };
