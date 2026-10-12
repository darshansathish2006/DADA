import test from 'node:test';
import assert from 'node:assert/strict';
import { sendEnquiry } from '../src/enquiry-delivery.js';

const endpoint = 'https://script.google.com/macros/s/test-deployment/exec';
const payload = { source: 'workshop', name: 'Customer', email: 'customer@example.org', topics: ['HTML & CSS'], consent: true };

test('Apps Script transport avoids preflight, follows redirects, and reads acknowledgement', async () => {
  let sent;
  const result = await sendEnquiry(endpoint, payload, { requestId: 'request-1234', fetcher: async (url, options) => {
    sent = { url, options };
    return { ok: true, json: async () => ({ success: true }) };
  } });
  assert.equal(result.ok, true);
  assert.deepEqual(sent.options.headers, { 'Content-Type': 'text/plain;charset=UTF-8' });
  assert.equal(sent.options.redirect, 'follow');
  assert.equal(sent.options.credentials, 'omit');
  assert.notEqual(sent.options.mode, 'no-cors');
  assert.deepEqual(JSON.parse(sent.options.body), { ...payload, requestId: 'request-1234' });
});

test('a Google sign-in page, string success, empty or unreadable reply never claims success', async () => {
  for (const response of [
    { ok: true, json: async () => { throw Error('HTML sign-in page'); } },
    { ok: true, json: async () => ({ success: 'true' }) },
    { ok: false, json: async () => ({ success: true }) },
    { ok: true, json: async () => null },
  ]) assert.equal((await sendEnquiry(endpoint, payload, { fetcher: async () => response })).ok, false);
});

test('preserves server failure reason and never displays arbitrary server messages', async () => {
  for (const code of ['rate_limit', 'unavailable', 'uncertain', 'conflict', 'invalid']) {
    const result = await sendEnquiry(endpoint, payload, { fetcher: async () => ({ ok: true, json: async () => ({ success: false, code, message: '<script>untrusted</script>' }) }) });
    assert.equal(result.ok, false);
    assert.equal(result.code, code);
    assert.match(result.message, /message is still here/);
    assert(!result.message.includes('<script>'));
  }
});
