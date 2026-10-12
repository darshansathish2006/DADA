import { contactEmail, teamNumbers, whatsappHref } from '../../contact-details';

// Public contact details shared with the main site. No server credentials are used.
export const siteConfig = {
  name: 'Team DADA',
  legalName: 'Team DADA',
  tagline: 'Website consultancy, design and development',
  description: 'Team DADA helps businesses and professionals plan, design and build websites, from brand sites and portfolios to catalogues and enquiry integrations.',
  location: 'Chennai, India',
  email: contactEmail,
  booking: '',
  availability: 'Open for consultancy projects.',
  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'Services', href: '/#services' },
    { label: 'Our approach', href: '/#approach' },
    { label: 'Team', href: '/#team' },
    { label: 'Contact', href: '/#contact' },
  ],
  contactForm: {
    enquiryTypes: ['Business website', 'Professional portfolio', 'Product catalogue', 'Website consultation', 'Other'],
    budgets: ['Not sure yet', 'Under ₹50k', '₹50k – ₹1.5L', '₹1.5L – ₹5L', '₹5L and above'],
    timelines: ['As soon as possible', 'Within a month', '1–3 months', 'Flexible'],
  },
};

export const hasEmail = true;
export const hasBooking = false;
export const bookingHref = '/#contact';
export const socialLinks: { key: string; href: string; label: string }[] = [];
export const phoneLinks = teamNumbers.map(phone => ({ ...phone, href: `tel:${phone.number}` }));
export const whatsappLinks = phoneLinks.map(phone => ({
  ...phone,
  href: whatsappHref(phone.number, 'Hi Team DADA! I would like to discuss a website consultancy project.'),
}));
