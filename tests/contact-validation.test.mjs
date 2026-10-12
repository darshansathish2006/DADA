import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidPhone, validateContactDetails } from '../src/contact-validation.js';
import { normalizeContact, validateContact } from '../src/consultancy/lib/contact.ts';

test('phone validation accepts local and international formats and rejects invalid numbers', () => {
  for (const phone of ['9876543210', '+91 98765 43210', '+1 (202) 555-0123', '020 7946 0958']) assert.equal(isValidPhone(phone), true, phone);
  for (const phone of [undefined, '', '1234', '+1234567890123456', 'call9876543210', '98765\n43210', '91+9876543210']) assert.equal(isValidPhone(phone), false, String(phone));
});

test('all forms share required phone and optional email validation', () => {
  assert.deepEqual(validateContactDetails({ phone: '9876543210', email: '' }), {});
  assert.deepEqual(validateContactDetails({ phone: '+91 98765 43210', email: 'person@example.org' }), {});
  assert.ok(validateContactDetails({ phone: '', email: 'person@example.org' }).phone);
  assert.ok(validateContactDetails({ phone: '9876543210', email: 'invalid' }).email);
});

test('consultancy retains the phone in its payload and allows phone-only contact', () => {
  const input = normalizeContact({ name: 'Customer', phone: '  +91 98765 43210  ', email: '', enquiryType: 'Business website', message: 'We would like to discuss a website for our business.' });
  assert.equal(input.phone, '+91 98765 43210');
  assert.deepEqual(validateContact(input), {});
  assert.ok(validateContact({ ...input, phone: '' }).phone);
  assert.ok(validateContact({ ...input, email: 'invalid' }).email);
});
