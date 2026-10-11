export type ServiceIcon = 'code' | 'lightbulb';
export const services: { id: string; title: string; description: string; deliverables: string[]; icon: ServiceIcon }[] = [
  {
    id: 'build', title: 'Build', icon: 'code',
    description: 'Websites and web apps for businesses, professionals and campuses, designed and built end to end.',
    deliverables: ['Websites', 'Web apps', 'Portfolios', 'E-commerce catalogues'],
  },
  {
    id: 'consult', title: 'Consult', icon: 'lightbulb',
    description: 'Clear advice on tech and AI, so you choose the right tools and know what to do next.',
    deliverables: ['Tech & AI advice', 'Digital strategy', 'Site audits', 'Tool selection'],
  },
];
