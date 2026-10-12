import { sendEnquiry } from './enquiry-delivery.js';

export function validateEnquiry(values) {
  const errors = {};
  if (!values.name?.trim()) errors.name = 'Please enter your full name.';
  if (!values.email?.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address, such as you@example.com.';
  if (!values.enquiryType) errors.enquiryType = 'Please choose an enquiry type.';
  if (!values.message?.trim()) errors.message = 'Tell us a little about your idea.';
  return errors;
}

export function submitEnquiry(endpoint, values, options) {
  return sendEnquiry(endpoint, {
    source: 'main', name: values.name.trim(), email: values.email.trim(),
    organization: values.organization.trim(), enquiryType: values.enquiryType,
    message: values.message.trim(), website: values.website || '',
  }, options);
}
