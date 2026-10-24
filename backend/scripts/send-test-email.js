// Sends a sample enquiry notification using the SMTP settings in backend/.env.
// Usage: npm run email:test
require('dotenv').config({ quiet: true });

const { sendEnquiryNotification, isEmailConfigured } = require('../src/services/email.service');

async function main() {
  if (!isEmailConfigured()) {
    console.error(
      'Email is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, EMAIL_FROM and ENQUIRY_NOTIFY_TO in backend/.env.'
    );
    process.exitCode = 1;
    return;
  }

  try {
    await sendEnquiryNotification({
      name: 'Test Visitor',
      email: process.env.SMTP_USER,
      phone: '',
      service: 'General enquiry / not sure',
      message: 'This is a test enquiry sent by "npm run email:test". No action is needed.',
    });
    console.log(`Test email sent to ${process.env.ENQUIRY_NOTIFY_TO}. Check that inbox (and spam folder).`);
  } catch (err) {
    console.error(`Sending failed: ${err.message}`);
    console.error('Check the SMTP settings. For Gmail, SMTP_PASS must be an App Password.');
    process.exitCode = 1;
  }
}

main();
