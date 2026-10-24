/**
 * Email delivery for enquiry notifications.
 *
 * No provider is wired up yet, so this reports delivered: false and the API
 * never claims an email was sent. When a provider is chosen, implement
 * delivery here and read its credentials from environment variables
 * (see .env.example) - never hard-code them.
 */
async function sendEnquiryNotification(enquiry) {
  return { delivered: false };
}

module.exports = { sendEnquiryNotification };
