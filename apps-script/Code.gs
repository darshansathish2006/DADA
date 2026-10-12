/* Deploy from teamdadaoffl@gmail.com, execute as Me, access Anyone.
 * This file runs on Google's servers, never in the website bundle.
 */
var DADA_INBOX = 'teamdadaoffl@gmail.com';
var DADA_SOURCES = { main: 'Main site', workshop: 'Workshop', consultancy: 'Consultancy' };
var DADA_RECORD_PREFIX = 'dada-enquiry:';
var DADA_RECORD_TTL = 24 * 60 * 60 * 1000;

function doGet() {
  try {
    return json_({ service: 'DADA enquiries', version: 2, ready: accountReady_() && MailApp.getRemainingDailyQuota() > 0 });
  } catch (_error) { return json_({ service: 'DADA enquiries', version: 2, ready: false }); }
}

// Run this once in the editor to authorize sending. It does not send an email.
function authorizeEnquiries() {
  if (!accountReady_()) throw new Error('Deploy this script from ' + DADA_INBOX + '.');
  return { ready: true, remainingRecipients: MailApp.getRemainingDailyQuota() };
}

function doPost(event) {
  var enquiry;
  try {
    var contents = event && event.postData && event.postData.contents;
    if (!contents || contents.length > 20000) return json_({ success: false, code: 'invalid' });
    enquiry = validateEnquiry_(JSON.parse(contents));
  } catch (_error) { return json_({ success: false, code: 'invalid' }); }

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return json_({ success: false, code: 'rate_limit' });
  try {
    if (!accountReady_()) return json_({ success: false, code: 'unavailable' });
    var now = Date.now();
    var properties = PropertiesService.getScriptProperties();
    var records = readRecords_(properties, now);
    var key = DADA_RECORD_PREFIX + enquiry.requestId;
    var fingerprint = hash_(JSON.stringify({ source: enquiry.source, fields: enquiry.fields }));
    var previous = records[key];
    if (previous) {
      if (previous.fingerprint !== fingerprint) return json_({ success: false, code: 'conflict' });
      return json_(previous.state === 'sent'
        ? { success: true, requestId: enquiry.requestId }
        : { success: false, code: 'uncertain' });
    }
    if (MailApp.getRemainingDailyQuota() < 1) return json_({ success: false, code: 'unavailable' });

    var phoneHash = hash_(enquiry.phone.replace(/\D/g, ''));
    var recent = Object.keys(records).map(function (entry) { return records[entry]; });
    // Bound public submissions; only hashes/timestamps/status are retained.
    if (recent.length >= 1000 ||
        recent.filter(function (entry) { return now - entry.createdAt < 60000; }).length >= 10 ||
        recent.filter(function (entry) { return entry.phoneHash === phoneHash && now - entry.createdAt < 600000; }).length >= 3) {
      return json_({ success: false, code: 'rate_limit' });
    }

    var record = { fingerprint: fingerprint, phoneHash: phoneHash, createdAt: now, state: 'sending' };
    // Record before sending. An interrupted execution must not send a duplicate
    // on retry; only a completed MailApp call plus stored receipt yields success.
    properties.setProperty(key, JSON.stringify(record));
    try {
      var mail = {
        to: DADA_INBOX,
        name: 'Team DADA Enquiries',
        subject: '[DADA ' + DADA_SOURCES[enquiry.source] + ' Enquiry] ' + enquiry.name,
        body: emailBody_(enquiry, now),
      };
      if (enquiry.email) mail.replyTo = enquiry.email;
      MailApp.sendEmail(mail);
      record.state = 'sent';
      properties.setProperty(key, JSON.stringify(record));
    } catch (_error) {
      record.state = 'uncertain';
      properties.setProperty(key, JSON.stringify(record));
      return json_({ success: false, code: 'uncertain' });
    }
    return json_({ success: true, requestId: enquiry.requestId });
  } catch (_error) {
    return json_({ success: false, code: 'unavailable' });
  } finally { lock.releaseLock(); }
}

function accountReady_() {
  return Session.getEffectiveUser().getEmail().toLowerCase() === DADA_INBOX;
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

function hash_(value) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value, Utilities.Charset.UTF_8)
    .map(function (byte) { return ('0' + ((byte + 256) % 256).toString(16)).slice(-2); }).join('');
}

function readRecords_(properties, now) {
  var all = properties.getProperties();
  var records = {};
  Object.keys(all).forEach(function (key) {
    if (key.indexOf(DADA_RECORD_PREFIX) !== 0) return;
    var record;
    try { record = JSON.parse(all[key]); } catch (_error) { record = null; }
    if (!record || !record.createdAt || now - record.createdAt >= DADA_RECORD_TTL) properties.deleteProperty(key);
    else records[key] = record;
  });
  return records;
}

function field_(input, key, limit, required, multiline) {
  var value = input[key];
  if (value === undefined || value === null) value = '';
  if (typeof value !== 'string') throw new Error('Invalid field');
  value = value.trim();
  if ((required && !value) || value.length > limit || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value) || (!multiline && /[\r\n]/.test(value))) throw new Error('Invalid field');
  return value;
}

function choices_(value, allowed) {
  if (allowed.indexOf(value) === -1) throw new Error('Invalid choice');
  return value;
}

function list_(input, key, required) {
  var items = input[key] === undefined ? [] : input[key];
  if (!Array.isArray(items) || items.length > 10 || (required && !items.length)) throw new Error('Invalid list');
  return items.map(function (value) { return field_({ value: value }, 'value', 160, true, false); });
}

function validateEnquiry_(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || !Object.prototype.hasOwnProperty.call(DADA_SOURCES, input.source)) throw new Error('Invalid source');
  var requestId = field_(input, 'requestId', 80, true, false);
  if (!/^[a-zA-Z0-9_-]{8,80}$/.test(requestId) || field_(input, 'website', 300, false, false)) throw new Error('Invalid request');
  var name = field_(input, 'name', 120, true, false);
  var phone = field_(input, 'phone', 30, true, false);
  var phoneDigits = phone.replace(/\D/g, '');
  if (!/^\+?[0-9 ()-]+$/.test(phone) || phoneDigits.length < 10 || phoneDigits.length > 15) throw new Error('Invalid phone');
  var email = field_(input, 'email', 254, false, false);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email');
  var fields = [['Name', name], ['Phone / WhatsApp', phone], ['Email / reply-to', email || 'Not provided — contact by phone']];
  if (input.source === 'workshop') {
    fields.push(['Institution', field_(input, 'institution', 180, true, false)]);
    fields.push(['Institution type', choices_(field_(input, 'institutionType', 30, true, false), ['School', 'College', 'Other'])]);
    fields.push(['Student audience', choices_(field_(input, 'audience', 60, true, false), ['Classes 8–10', 'Classes 11–12', 'College', 'Mixed audience'])]);
    fields.push(['Workshop topics', list_(input, 'topics', true).join('\n')]);
    fields.push(['Activities', list_(input, 'activities', false).join('\n') || 'Open to suggestions']);
    var date = field_(input, 'date', 10, false, false);
    if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date || date < Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd'))) throw new Error('Invalid date');
    var participants = field_(input, 'participants', 6, false, false);
    if (participants && (!/^\d+$/.test(participants) || Number(participants) < 1 || Number(participants) > 100000)) throw new Error('Invalid participants');
    if (input.consent !== true) throw new Error('Consent required');
    fields.push(['Preferred date', date || 'To discuss'], ['Participants', participants || 'To discuss'], ['Additional requirements', field_(input, 'message', 3000, false, true) || 'None specified'], ['Permission to contact', 'Yes']);
  } else {
    var types = input.source === 'main'
      ? ['Project Collaboration', 'Consultancy', 'Workshop', 'Hackathon / Event', 'Other']
      : ['Business website', 'Professional portfolio', 'Product catalogue', 'Website consultation', 'Other'];
    fields.push(['Enquiry type', choices_(field_(input, 'enquiryType', 60, true, false), types)]);
    if (input.source === 'main') fields.push(['Organization / institution', field_(input, 'organization', 180, false, false) || 'Not specified']);
    else fields.push(['Budget', field_(input, 'budget', 60, false, false) || 'Not specified'], ['Timeline', field_(input, 'timeline', 60, false, false) || 'Not specified']);
    var message = field_(input, 'message', input.source === 'main' ? 5000 : 2000, true, true);
    if (input.source === 'consultancy' && (name.length < 2 || message.length < 20)) throw new Error('More detail required');
    fields.push(['Message', message]);
  }
  return { source: input.source, requestId: requestId, name: name, phone: phone, email: email, fields: fields };
}

function emailBody_(enquiry, timestamp) {
  return 'NEW DADA ENQUIRY\n\nSource: ' + DADA_SOURCES[enquiry.source] +
    '\nReceived: ' + Utilities.formatDate(new Date(timestamp), 'Asia/Kolkata', 'dd MMM yyyy, HH:mm:ss') + ' IST' +
    '\nEnquiry ID: ' + enquiry.requestId + '\n\n' +
    enquiry.fields.map(function (field) { return field[0] + ':\n' + field[1]; }).join('\n\n') +
    (enquiry.email ? '\n\nReply to this email to contact ' + enquiry.name + ' at ' + enquiry.email + '.'
      : '\n\nNo email address was provided. Contact ' + enquiry.name + ' by phone / WhatsApp at ' + enquiry.phone + '.') +
    (enquiry.source === 'workshop' ? '\nThis is an enquiry, not a confirmed workshop booking.' : '');
}
