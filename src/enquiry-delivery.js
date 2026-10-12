const messages = {
  invalid: 'Please check your enquiry details and try again. Your message is still here.',
  rate_limit: 'Please wait a few minutes before trying again, or contact us directly. Your message is still here.',
  unavailable: 'Email delivery is temporarily unavailable. Please contact us by email, call or WhatsApp. Your message is still here.',
  uncertain: 'Delivery could not be confirmed. Please contact us directly before submitting again. Your message is still here.',
  conflict: 'This enquiry changed during submission. Please review your details and try again. Your message is still here.',
};

/** All three forms use the same acknowledged delivery contract. */
export async function sendEnquiry(endpoint, payload, { fetcher = fetch, signal, requestId = crypto.randomUUID() } = {}) {
  if (!endpoint) return { ok: false, code: 'unconfigured', message: 'Your enquiry has not been sent. Please use the email link below, or contact us by call or WhatsApp.' };
  const appsScript = /^https:\/\/script\.google\.com\/macros\/s\/[^/?#]+\/exec(?:\?.*)?$/.test(endpoint);
  try {
    const response = await fetcher(endpoint, {
      method: 'POST',
      // Apps Script does not handle OPTIONS preflights. Keep this a CORS-simple
      // request and carry the idempotency key in the body. Read the real reply;
      // never use no-cors or assume an opaque response means the email was sent.
      headers: appsScript
        ? { 'Content-Type': 'text/plain;charset=UTF-8' }
        : { 'Content-Type': 'application/json', 'Idempotency-Key': requestId },
      body: JSON.stringify({ ...payload, requestId }),
      redirect: 'follow',
      credentials: 'omit',
      signal: signal || AbortSignal.timeout(30000),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.success !== true) {
      const code = typeof result?.code === 'string' && Object.hasOwn(messages, result.code) ? result.code : 'unconfirmed';
      return { ok: false, code, message: messages[code] || 'Your enquiry could not be confirmed. Please try again in a moment or contact us directly. Your message is still here.' };
    }
    return { ok: true, message: 'Your enquiry has been sent to Team DADA. Thank you — we’ll reply using the contact details you provided.' };
  } catch (error) {
    return { ok: false, code: 'network', message: error.name === 'AbortError' || error.name === 'TimeoutError'
      ? 'The request took too long. Delivery could not be confirmed. Your message is still here; please try again later.'
      : 'We could not connect. Check your connection and try again. Your message is still here.' };
  }
}
