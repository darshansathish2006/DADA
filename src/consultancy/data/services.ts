/** Consultancy services grounded in the five documented client projects. */

export interface Service {
  id: 'strategy' | 'design' | 'development';
  title: string;
  lead: string;
  /** Two lines at most. */
  description: string;
  /** Plain-text capabilities, alongside an example from the portfolio. */
  deliverables: string[];
  projectSlug: string;
  projectNote: string;
}

export const services: Service[] = [
  {
    id: 'strategy',
    title: 'Plan',
    lead: 'Start with a clear brief.',
    description:
      'We work out who the website is for, what it needs to say and what visitors should do next. Then we give the content and features a clear structure.',
    deliverables: ['Requirements', 'Site structure', 'Content planning', 'Technology advice'],
    projectSlug: 'ss-builders',
    projectNote: 'Making services and completed work easy to explore.',
  },
  {
    id: 'design',
    title: 'Design',
    lead: 'Make it feel like your business.',
    description:
      'Your work sets the visual direction. We shape the typography, imagery and layouts around it, with the same care on a phone as on a larger screen.',
    deliverables: ['Brand websites', 'Professional portfolios', 'Product catalogues', 'Responsive design'],
    projectSlug: 'ddreams-arc',
    projectNote: 'A new identity and website for an interior studio.',
  },
  {
    id: 'development',
    title: 'Build',
    lead: 'Connect the useful parts.',
    description:
      'Product enquiries, appointment flows, forms connected to Google Sheets. We build the features that help the website fit into your day-to-day work.',
    deliverables: ['Web development', 'Enquiry forms', 'Booking flows', 'Launch & handover'],
    projectSlug: 'angel-collections',
    projectNote: 'From browsing a collection to a WhatsApp enquiry.',
  },
];
