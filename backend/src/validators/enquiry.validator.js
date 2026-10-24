// Server-side enquiry validation. Mirrors frontend/src/utils/validateEnquiry.js,
// but this is the one that counts - never rely on browser checks alone.

const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  phone: { max: 20 },
  service: { max: 100 },
  message: { min: 10, max: 2000 },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9\s\-()]+$/;

// Returns the trimmed string, '' when missing, or null when not a string.
function readString(input, field) {
  const raw = input[field];
  if (raw === undefined || raw === null) return '';
  if (typeof raw !== 'string') return null;
  return raw.trim();
}

/**
 * Validates and normalises an enquiry payload.
 * Returns { value } on success or { errors } keyed by field name.
 */
function validateEnquiry(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { errors: { form: 'Invalid request body.' } };
  }

  const errors = {};
  const name = readString(input, 'name');
  const email = readString(input, 'email');
  const phone = readString(input, 'phone');
  const service = readString(input, 'service');
  const message = readString(input, 'message');

  if (!name) errors.name = 'Full name is required.';
  else if (name.length < LIMITS.name.min) errors.name = 'Please enter your full name.';
  else if (name.length > LIMITS.name.max) errors.name = `Name must be ${LIMITS.name.max} characters or fewer.`;

  if (!email) errors.email = 'Email address is required.';
  else if (email.length > LIMITS.email.max || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  // Phone is optional.
  if (phone === null) errors.phone = 'Please enter a valid phone number.';
  else if (phone) {
    const digits = phone.replace(/\D/g, '');
    if (phone.length > LIMITS.phone.max || !PHONE_PATTERN.test(phone) || digits.length < 7 || digits.length > 15) {
      errors.phone = 'Please enter a valid phone number.';
    }
  }

  if (!service) errors.service = 'Please choose a service.';
  else if (service.length > LIMITS.service.max) errors.service = 'Please choose a valid service.';

  if (!message) errors.message = 'Message is required.';
  else if (message.length < LIMITS.message.min) {
    errors.message = `Please add a little more detail (at least ${LIMITS.message.min} characters).`;
  } else if (message.length > LIMITS.message.max) {
    errors.message = `Message must be ${LIMITS.message.max} characters or fewer.`;
  }

  if (Object.keys(errors).length > 0) return { errors };

  return { value: { name, email: email.toLowerCase(), phone, service, message } };
}

module.exports = { validateEnquiry, LIMITS };
