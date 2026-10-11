export function validateEnquiry(values) {
  const errors = {};
  if (!values.name?.trim()) errors.name = 'Please enter your full name.';
  if (!values.email?.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address, such as you@example.com.';
  if (!values.enquiryType) errors.enquiryType = 'Please choose an enquiry type.';
  if (!values.message?.trim()) errors.message = 'Tell us a little about your idea.';
  return errors;
}

export async function submitEnquiry(endpoint, values, { fetcher = fetch, signal, requestId = crypto.randomUUID() } = {}) {
  if (!endpoint) return { ok: false, message: 'Email delivery is not connected yet. Your message has not been sent. You can copy your enquiry below and keep it ready to share.' };
  try {
    const response = await fetcher(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': requestId },
      body: JSON.stringify({
        name: values.name.trim(), email: values.email.trim(),
        organization: values.organization.trim(), enquiryType: values.enquiryType,
        message: values.message.trim(),
      }),
      signal,
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.success !== true) return { ok: false, message: 'Your enquiry could not be confirmed. Please try again in a moment. Your message is still here.' };
    return { ok: true, message: 'Your enquiry has been received. Thank you for reaching out — we look forward to talking.' };
  } catch (error) {
    return { ok: false, message: error.name === 'AbortError' || error.name === 'TimeoutError'
      ? 'The request took too long. Delivery could not be confirmed. Your message is still here; please try again later.'
      : 'We could not connect. Check your connection and try again. Your message is still here.' };
  }
}
