import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import vm from 'node:vm';

const script = await readFile(new URL('../apps-script/Code.gs', import.meta.url), 'utf8');
const main = { source: 'main', requestId: 'request-0001', name: 'Example Customer', email: 'customer@example.org', organization: 'Example Company', enquiryType: 'Project Collaboration', message: 'We would like help building our website.', website: '' };
const consultancy = { ...main, source: 'consultancy', enquiryType: 'Business website', budget: 'Under ₹50k', timeline: 'Within a month' };
const workshop = { ...main, source: 'workshop', institution: 'Example College', institutionType: 'College', audience: 'College', topics: ['AI for Students'], activities: ['Spot the Fake'], date: '2040-10-15', participants: '60', consent: true };

function server(options = {}) {
  let now = Date.UTC(2026, 9, 12, 10);
  let sendCalls = 0;
  let released = 0;
  const messages = [];
  const data = new Map();
  const properties = {
    getProperties: () => Object.fromEntries(data),
    deleteProperty: key => data.delete(key),
    setProperty: (key, value) => {
      if (options.receiptFailure && JSON.parse(value).state === 'sent') throw new Error('Storage interrupted');
      data.set(key, value);
    },
  };
  class ClockDate extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  }
  const context = vm.createContext({
    Date: ClockDate,
    ContentService: { MimeType: { JSON: 'application/json' }, createTextOutput: text => ({ text, setMimeType() { return this; } }) },
    Session: { getEffectiveUser: () => ({ getEmail: () => options.account || 'teamdadaoffl@gmail.com' }) },
    LockService: { getScriptLock: () => ({ tryLock: () => options.busy !== true, releaseLock: () => released++ }) },
    PropertiesService: { getScriptProperties: () => properties },
    MailApp: {
      getRemainingDailyQuota: () => options.quota ?? 100,
      sendEmail: email => { sendCalls++; if (options.mailError) throw new Error('Mail failed'); messages.push(JSON.parse(JSON.stringify(email))); },
    },
    Utilities: {
      DigestAlgorithm: { SHA_256: 'sha256' }, Charset: { UTF_8: 'utf8' },
      computeDigest: (_algorithm, value) => [...createHash('sha256').update(value).digest()],
      formatDate: date => new Date(date.valueOf() + 19800000).toISOString().slice(0, 10),
    },
  });
  vm.runInContext(script, context);
  return {
    post: payload => JSON.parse(context.doPost({ postData: { contents: JSON.stringify(payload) } }).text),
    raw: contents => JSON.parse(context.doPost({ postData: { contents } }).text),
    get: () => JSON.parse(context.doGet().text),
    advance: ms => { now += ms; },
    messages, data, calls: () => sendCalls, releases: () => released,
  };
}

for (const [source, input, fields] of [
  ['main', main, ['Example Company', 'Project Collaboration']],
  ['consultancy', consultancy, ['Under ₹50k', 'Within a month', 'Business website']],
  ['workshop', workshop, ['Example College', 'AI for Students', 'Spot the Fake', '2040-10-15', '60', 'Permission to contact:\nYes']],
]) test(`${source} sends complete enquiry to the fixed team mailbox with customer Reply-To`, () => {
  const backend = server();
  assert.equal(backend.post({ ...input, to: 'attacker@example.org', from: 'fake@example.org' }).success, true);
  const email = backend.messages[0];
  assert.equal(email.to, 'teamdadaoffl@gmail.com');
  assert.equal(email.replyTo, input.email);
  assert.equal(email.from, undefined, 'Google uses the authorized team account');
  assert.match(email.subject, new RegExp(source === 'main' ? 'Main site' : source, 'i'));
  for (const field of [...fields, input.name, input.email, input.message, input.requestId]) assert(email.body.includes(field));
  assert.equal(backend.releases(), 1);
});

test('rejects malformed, oversized, injected and incomplete requests before sending', () => {
  const backend = server();
  for (const payload of [null, [], {}, { ...main, source: '__proto__' }, { ...main, requestId: 'x' },
    { ...main, email: 'customer@example.org\r\nBcc: attacker@example.org' }, { ...main, message: 'x'.repeat(5001) },
    { ...main, website: 'bot.example' }, { ...main, name: '' }, { ...main, enquiryType: 'Unsupported' },
    { ...workshop, consent: false }, { ...workshop, topics: [] }, { ...workshop, participants: '0' },
    { ...workshop, date: '2020-01-01' }, { ...workshop, date: '2040-02-30' }, { ...workshop, topics: Array(11).fill('topic') },
  ]) assert.equal(backend.post(payload).code, 'invalid');
  assert.equal(backend.raw('{not JSON').code, 'invalid');
  assert.equal(backend.raw('x'.repeat(20001)).code, 'invalid');
  assert.equal(backend.calls(), 0);
});

test('deduplicates unchanged retries and rejects reuse of an ID for changed content', () => {
  const backend = server();
  assert.equal(backend.post(main).success, true);
  assert.equal(backend.post(main).success, true);
  assert.equal(backend.post({ ...main, message: 'A different enquiry.' }).code, 'conflict');
  assert.equal(backend.calls(), 1);
  const stored = [...backend.data.values()].join('');
  assert(!stored.includes(main.email));
  assert(!stored.includes(main.name));
  assert(!stored.includes(main.message));
});

test('mail and receipt failures are never success and are not sent again on retry', () => {
  for (const options of [{ mailError: true }, { receiptFailure: true }]) {
    const backend = server(options);
    assert.equal(backend.post(main).code, 'uncertain');
    assert.equal(backend.post(main).code, 'uncertain');
    assert.equal(backend.calls(), 1);
    assert.equal(backend.releases(), 2);
  }
});

test('wrong deployment account, exhausted quota and a busy lock do not send', () => {
  for (const options of [{ account: 'another@gmail.com' }, { quota: 0 }, { busy: true }]) {
    const backend = server(options);
    assert.equal(backend.post(main).success, false);
    assert.equal(backend.calls(), 0);
  }
  assert.equal(server().get().ready, true);
  assert.equal(server({ account: 'another@gmail.com' }).get().ready, false);
});

test('per-customer and global rate limits prevent repeated public submissions', () => {
  const backend = server();
  for (let i = 0; i < 3; i++) assert.equal(backend.post({ ...main, requestId: `request-${i}same` }).success, true);
  assert.equal(backend.post({ ...main, requestId: 'request-blocked' }).code, 'rate_limit');
  backend.advance(600001);
  assert.equal(backend.post({ ...main, requestId: 'request-allowed' }).success, true);
  const global = server();
  for (let i = 0; i < 10; i++) assert.equal(global.post({ ...main, email: `customer${i}@example.org`, requestId: `global-request-${i}` }).success, true);
  assert.equal(global.post({ ...main, requestId: 'global-blocked' }).code, 'rate_limit');
});

test('expires deduplication records after 24 hours without deleting unrelated settings', () => {
  const backend = server();
  backend.data.set('unrelated-setting', 'preserve');
  assert.equal(backend.post(main).success, true);
  backend.advance(86400001);
  assert.equal(backend.post({ ...main, requestId: 'request-newer' }).success, true);
  assert.equal(backend.data.has('dada-enquiry:' + main.requestId), false);
  assert.equal(backend.data.get('unrelated-setting'), 'preserve');
});
