// Client-side checks for the enquiry form. The backend repeats these checks
// and is the final authority - this only gives visitors quick feedback.

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  phone: { max: 20 },
  message: { min: 10, max: 2000 },
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^\+?[0-9\s\-()]+$/

export function validateEnquiry(values) {
  const errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const phone = values.phone.trim()
  const message = values.message.trim()

  if (!name) errors.name = 'Full name is required.'
  else if (name.length < LIMITS.name.min) errors.name = 'Please enter your full name.'
  else if (name.length > LIMITS.name.max) errors.name = `Name must be ${LIMITS.name.max} characters or fewer.`

  if (!email) errors.email = 'Email address is required.'
  else if (email.length > LIMITS.email.max || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  // Phone is optional.
  if (phone) {
    const digits = phone.replace(/\D/g, '')
    if (phone.length > LIMITS.phone.max || !PHONE_PATTERN.test(phone) || digits.length < 7 || digits.length > 15) {
      errors.phone = 'Please enter a valid phone number.'
    }
  }

  if (!values.service) errors.service = 'Please choose a service.'

  if (!message) errors.message = 'Message is required.'
  else if (message.length < LIMITS.message.min) {
    errors.message = `Please add a little more detail (at least ${LIMITS.message.min} characters).`
  } else if (message.length > LIMITS.message.max) {
    errors.message = `Message must be ${LIMITS.message.max} characters or fewer.`
  }

  return errors
}
