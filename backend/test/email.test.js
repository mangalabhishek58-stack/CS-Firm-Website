const { test, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');

// Fake SMTP settings - a stub transport is used, so nothing is really sent.
Object.assign(process.env, {
  ENQUIRY_RATE_LIMIT_MAX: '1000',
  SMTP_HOST: 'smtp.test.invalid',
  SMTP_USER: 'website@example.com',
  SMTP_PASS: 'test-password',
  EMAIL_FROM: 'Website <website@example.com>',
  ENQUIRY_NOTIFY_TO: 'office@example.com',
});

const app = require('../src/app');
const { setTransporter, buildEnquiryEmail } = require('../src/services/email.service');

let server;
let baseUrl;
let sent;
let failNext;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

beforeEach(() => {
  sent = [];
  failNext = false;
  process.env.NODE_ENV = 'test';
  setTransporter({
    sendMail: async (mail) => {
      if (failNext) throw Object.assign(new Error('Connection timeout'), { code: 'ETIMEDOUT' });
      sent.push(mail);
      return { messageId: 'test' };
    },
  });
});

const enquiry = {
  name: 'Asha <b>Verma</b>',
  email: 'asha@example.com',
  phone: '',
  service: 'Secretarial Audit',
  message: 'Line one\n<script>alert(1)</script>',
};

const post = (body) =>
  fetch(`${baseUrl}/api/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

test('sends a notification email for a valid enquiry', async () => {
  const res = await post(enquiry);
  assert.equal(res.status, 201);
  assert.equal(sent.length, 1);

  const mail = sent[0];
  assert.equal(mail.to, 'office@example.com');
  assert.equal(mail.from, 'Website <website@example.com>');
  assert.deepEqual(mail.replyTo, { name: 'Asha <b>Verma</b>', address: 'asha@example.com' });
  assert.match(mail.subject, /Secretarial Audit/);
  assert.match(mail.text, /Phone: Not provided/);
});

test('escapes visitor input in the HTML email', () => {
  const { html } = buildEnquiryEmail(enquiry);
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(html.includes('Asha &lt;b&gt;Verma&lt;/b&gt;'));
});

test('keeps the subject on one line', () => {
  const { subject } = buildEnquiryEmail({ ...enquiry, name: 'Asha\r\nBcc: someone@example.com' });
  assert.ok(!/[\r\n]/.test(subject));
});

test('does not send email for invalid or honeypot submissions', async () => {
  assert.equal((await post({ ...enquiry, email: 'bad' })).status, 400);
  assert.equal((await post({ ...enquiry, website: 'spam' })).status, 201);
  assert.equal(sent.length, 0);
});

test('returns 503 when the email provider fails', async () => {
  failNext = true;
  const res = await post(enquiry);
  assert.equal(res.status, 503);
  const data = await res.json();
  assert.equal(data.success, false);
  assert.ok(!JSON.stringify(data).includes('ETIMEDOUT'));
});

test('in production, rejects enquiries with 503 if email is not configured', async () => {
  process.env.NODE_ENV = 'production';
  const savedPass = process.env.SMTP_PASS;
  process.env.SMTP_PASS = '';
  try {
    const res = await post(enquiry);
    assert.equal(res.status, 503);
    assert.equal(sent.length, 0);
  } finally {
    process.env.SMTP_PASS = savedPass;
  }
});
