export const contactEmail = 'teamdadaoffl@gmail.com';

export const teamNumbers = [
  { number: '+919944852361', display: '+91 99448 52361' },
  { number: '+917358528466', display: '+91 73585 28466' },
];

// The workshop page intentionally excludes +91 99448 52361.
export const workshopNumbers = [
  teamNumbers[1],
  { number: '+917305966008', display: '+91 73059 66008' },
];

// Public Apps Script URL supplied and authorized by the team. Keep a checked-in
// default so ordinary builds and GitHub Pages work without extra configuration.
export const enquiryEndpoint = import.meta.env?.VITE_ENQUIRY_ENDPOINT || 'https://script.google.com/macros/s/AKfycbzPdegpfYbjBPT39MCdNI5Vv5tlPgJ_8m1GdRugXq6-sUrO5vmsAFC0c2BN7D5uwLMX4A/exec';
export const workshopEnquiryEndpoint = import.meta.env?.VITE_WORKSHOP_ENQUIRY_ENDPOINT || enquiryEndpoint;

export function whatsappHref(number, message = 'Hi Team DADA! I would like to make an enquiry.') {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
