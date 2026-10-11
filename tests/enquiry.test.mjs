import test from 'node:test';
import assert from 'node:assert/strict';
import { submitEnquiry, validateEnquiry } from '../src/enquiry.js';

const valid = { name: '  Example Student  ', email: 'student@example.com', organization: '', enquiryType: 'Project Collaboration', message: '  Let us collaborate.  ' };

test('validation catches blank required fields and malformed email', () => {
  assert.deepEqual(Object.keys(validateEnquiry({ name: ' ', email: '', message: ' ' })).sort(), ['email', 'enquiryType', 'message', 'name']);
  assert.ok(validateEnquiry({ ...valid, email: 'not-an-email' }).email);
  assert.deepEqual(validateEnquiry(valid), {});
});

test('an unconfigured endpoint never sends or claims success', async () => {
  const result = await submitEnquiry('', valid, { fetcher: () => assert.fail('No request should be made') });
  assert.equal(result.ok, false);
  assert.match(result.message, /has not been sent/);
});

test('successful submission requires an explicit acknowledgement and trims data', async () => {
  let sent;
  const result = await submitEnquiry('/api/enquiries', valid, { requestId: 'repeat-safe-id', fetcher: async (url, options) => {
    sent = { url, options };
    return { ok: true, json: async () => ({ success: true }) };
  } });
  assert.equal(result.ok, true);
  assert.equal(sent.options.headers['Idempotency-Key'], 'repeat-safe-id');
  assert.equal(JSON.parse(sent.options.body).name, 'Example Student');
  assert.equal(JSON.parse(sent.options.body).message, 'Let us collaborate.');
});

test('HTTP errors, missing acknowledgements, and network failures are never successes', async () => {
  for (const response of [
    { ok: false, json: async () => ({ success: true }) },
    { ok: true, json: async () => ({}) },
    { ok: true, json: async () => { throw Error('not JSON'); } },
  ]) assert.equal((await submitEnquiry('/api', valid, { fetcher: async () => response })).ok, false);
  const network = await submitEnquiry('/api', valid, { fetcher: async () => { throw Error('Offline'); } });
  assert.equal(network.ok, false);
  assert.match(network.message, /could not connect/);
});

test('a timeout is reported without losing the enquiry', async () => {
  const result = await submitEnquiry('/api', valid, { fetcher: async () => { const error = new Error('Timeout'); error.name = 'AbortError'; throw error; } });
  assert.equal(result.ok, false);
  assert.match(result.message, /took too long/);
  assert.match(result.message, /message is still here/);
});
