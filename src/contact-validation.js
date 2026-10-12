// Accept local and international numbers with familiar display separators.
export function isValidPhone(value) {
  if (typeof value !== 'string') return false;
  const phone = value.trim();
  const digits = phone.replace(/\D/g, '');
  return phone.length <= 30 && /^\+?[0-9 ()-]+$/.test(phone)
    && digits.length >= 10 && digits.length <= 15;
}

export function validateContactDetails({ phone, email }) {
  const errors = {};
  if (!phone?.trim()) errors.phone = 'Please enter your phone number.';
  else if (!isValidPhone(phone)) errors.phone = 'Enter a valid phone number with 10–15 digits, including the country code if needed.';
  if (email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Enter a valid email address, or leave it blank.';
  return errors;
}
