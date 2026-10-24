const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');

// Keep the enquiry rate limit out of the way for these tests;
// the limiter itself is tested separately below.
process.env.ENQUIRY_RATE_LIMIT_MAX = '1000';
const app = require('../src/app');
const { createRateLimiter } = require('../src/middleware/rateLimit');

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

const validEnquiry = {
  name: 'Asha Verma',
  email: 'Asha@Example.com',
  phone: '+91 98765 43210',
  service: 'Annual ROC Compliance',
  message: 'We need help with our annual filings for this year.',
};

function postEnquiry(body, headers = {}) {
  return fetch(`${baseUrl}/api/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

test('GET /api/health returns success', async () => {
  const res = await fetch(`${baseUrl}/api/health`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { success: true, message: 'CS Firm API is running' });
});

test('accepts a valid enquiry', async () => {
  const res = await postEnquiry(validEnquiry);
  assert.equal(res.status, 201);
  const data = await res.json();
  assert.equal(data.success, true);
});

test('phone is optional', async () => {
  const { phone, ...withoutPhone } = validEnquiry;
  const res = await postEnquiry(withoutPhone);
  assert.equal(res.status, 201);
});

test('rejects missing required fields with field errors', async () => {
  const res = await postEnquiry({});
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.success, false);
  assert.ok(data.errors.name);
  assert.ok(data.errors.email);
  assert.ok(data.errors.service);
  assert.ok(data.errors.message);
  assert.equal(data.errors.phone, undefined);
});

test('rejects whitespace-only values', async () => {
  const res = await postEnquiry({ ...validEnquiry, name: '   ', message: '    ' });
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.ok(data.errors.name);
  assert.ok(data.errors.message);
});

test('rejects malformed email and phone', async () => {
  const res = await postEnquiry({ ...validEnquiry, email: 'not-an-email', phone: 'call me' });
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.ok(data.errors.email);
  assert.ok(data.errors.phone);
});

test('rejects non-string field values', async () => {
  const res = await postEnquiry({ ...validEnquiry, name: ['Asha'], message: { text: 'hello there' } });
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.ok(data.errors.name);
  assert.ok(data.errors.message);
});

test('rejects an over-long message', async () => {
  const res = await postEnquiry({ ...validEnquiry, message: 'a'.repeat(2001) });
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.ok(data.errors.message);
});

test('rejects bodies over the size limit with 413', async () => {
  const res = await postEnquiry({ ...validEnquiry, message: 'a'.repeat(20000) });
  assert.equal(res.status, 413);
  const data = await res.json();
  assert.equal(data.success, false);
});

test('rejects invalid JSON without leaking details', async () => {
  const res = await postEnquiry('{"name": ');
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.message, 'Request body must be valid JSON.');
  assert.equal(data.stack, undefined);
});

test('silently accepts but drops honeypot submissions', async () => {
  const res = await postEnquiry({ website: 'http://spam.example' });
  assert.equal(res.status, 201);
});

test('unknown API routes return JSON 404', async () => {
  const res = await fetch(`${baseUrl}/api/unknown`);
  assert.equal(res.status, 404);
  assert.equal((await res.json()).success, false);
});

test('CORS allows the local frontend origin only', async () => {
  const allowed = await fetch(`${baseUrl}/api/health`, { headers: { Origin: 'http://localhost:5173' } });
  assert.equal(allowed.headers.get('access-control-allow-origin'), 'http://localhost:5173');

  const other = await fetch(`${baseUrl}/api/health`, { headers: { Origin: 'http://evil.example' } });
  assert.notEqual(other.headers.get('access-control-allow-origin'), 'http://evil.example');
});

test('rate limiter returns 429 after the limit', async () => {
  const limited = express();
  limited.get('/', createRateLimiter({ windowMs: 60_000, max: 2 }), (req, res) => res.json({ ok: true }));
  const limitedServer = limited.listen(0);
  await new Promise((resolve) => limitedServer.once('listening', resolve));
  const url = `http://127.0.0.1:${limitedServer.address().port}/`;

  try {
    assert.equal((await fetch(url)).status, 200);
    assert.equal((await fetch(url)).status, 200);
    const blocked = await fetch(url);
    assert.equal(blocked.status, 429);
    assert.ok(blocked.headers.get('retry-after'));
  } finally {
    limitedServer.close();
  }
});
