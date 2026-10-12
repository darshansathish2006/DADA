import { sitePath } from './site-paths';
import { technicalInitiatives } from './portfolio';
import { enquiryEndpoint } from './contact-details';

// Official team social URLs can be added when available.
export const siteConfig = {
  fullName: 'Developers Advancing Dreams & Aspirations',
  consultancyUrl: import.meta.env.VITE_CONSULTANCY_URL || '/consultancy/',
  workshopsUrl: import.meta.env.VITE_WORKSHOPS_URL || '/workshop/',
  enquiryEndpoint,
  mascot: sitePath('/assets/mascot/dada-mature-pointing.png'),
  // Add verified URLs here. Empty entries are displayed as unavailable, never fake links.
  socials: [
    { label: 'GitHub', url: '' },
    { label: 'LinkedIn', url: '' },
    { label: 'Instagram', url: '' },
  ],
};

// Individual transparent cutouts. Source posters are archived in public/assets/mascot.
export const mascotPoses = {
  pointing: { src: sitePath('/assets/mascot/dada-mature-pointing.png'), label: 'Ready to build', alt: 'DADA mascot pointing confidently toward the viewer' },
  thinking: { src: sitePath('/assets/mascot/dada-mature-thinking.png'), label: 'Always curious', alt: 'DADA mascot thinking with a hand on his chin' },
  celebrating: { src: sitePath('/assets/mascot/dada-mature-celebrating.png'), label: 'Big build energy', alt: 'DADA mascot jumping in celebration with both hands raised' },
  laptop: { src: sitePath('/assets/mascot/dada-mature-laptop.png'), label: 'Learning by doing', alt: 'DADA mascot working on an open laptop' },
  waving: { src: sitePath('/assets/mascot/dada-mature-waving.png'), label: 'Say hello', alt: 'DADA mascot smiling and waving hello' },
};

export const navigation = [
  ['Home', 'home'], ['About', 'about'], ['What We Do', 'what-we-do'],
  ['Our Work', 'work'], ['Achievements', 'achievements'], ['Team', 'team'], ['Contact', 'contact'],
];

export const principles = [
  { icon: 'terminal', title: 'Learn by Building', text: 'Practical experience makes technical learning meaningful.' },
  { icon: 'brain', title: 'Think Like Students', text: 'We understand student challenges because we experience them ourselves.' },
  { icon: 'users', title: 'Create Together', text: 'Shared knowledge. Different perspectives. Collective progress.' },
  { icon: 'sparkles', title: 'Make Ideas Real', text: 'Experiment, implement, and create something that makes a difference.' },
];

export const services = [
  { icon: 'code', number: '01', title: 'Project Contributions', text: 'Collaborating on technical projects and developing practical solutions to real problems.', tag: 'IDEAS INTO IMPACT', target: '#contributions' },
  { icon: 'zap', number: '02', title: 'Hackathons', text: 'Turning problem statements into working prototypes. Together, against the clock.', tag: 'BUILD. TEST. REPEAT.', target: '#achievements' },
  { icon: 'layers', number: '03', title: 'Consultancy & Client Solutions', text: 'Websites, software, and digital experiences built around your requirements.', tag: 'BUILT FOR YOUR NEXT', destination: 'consultancy' },
  { icon: 'laptop', number: '04', title: 'Practical Workshops', text: 'Hands-on experiences that help students understand technology by building it.', tag: 'LESS THEORY. MORE DOING.', destination: 'workshops' },
];

// Highlights share the same source records as Technical Initiatives.
export const achievements = technicalInitiatives.filter(item => item.result === 'Winner').map((item, index) => ({
  id: String(index + 1).padStart(2, '0'), category: item.result.toUpperCase(),
  title: item.title + (item.id === 'sih-2026' ? ' — internal round' : ''),
  text: item.description, event: item.project, year: item.date, type: item.result,
}));

export const contributions = [
  { id: 'projects', number: '01', icon: 'code', title: 'Projects', text: 'EchoSenseAI, SEVPS, CLICK, and ACADEMIC WDB. Four ideas built into working experiences.', meta: '04 PROJECTS', action: 'Open projects' },
  { id: 'initiatives', number: '02', icon: 'trophy', title: 'Technical Initiatives', text: 'From the first prototype to the final pitch. Our hackathon wins and finalist experiences.', meta: '03 WINS / 01 FINALIST', action: 'View wins & participation' },
  { id: 'engagements', number: '03', icon: 'mic', title: 'Engagements & Sessions', text: 'Explore our AI expo, hackathon awareness session, and hands-on CLICK launch.', meta: '03 SESSIONS', action: 'Open sessions & photos' },
];

// The four members selected by the user, in their requested order.
// Roles, portraits, and profile URLs: D:\Projects\DADA-PORTFOLIO\DADA-Portfolio\data\team.ts.
export const members = [
  {
    id: 1, name: 'Darshan C S', role: 'Technical Expert, Co-Lead Developer',
    introduction: 'Full stack engineering and AI development.',
    image: sitePath('/assets/team/darshan-c-s.jpg'),
    github: 'https://github.com/darshansathish2006',
    linkedin: 'https://www.linkedin.com/in/darshan-c-s-77ab43331',
    portfolio: 'https://darshancs.vercel.app',
  },
  {
    id: 2, name: 'Andryan Durai Jebin', role: 'Co-Lead Developer',
    introduction: 'Backend development and AI engineering.',
    image: sitePath('/assets/team/andryan-durai-jebin.jpg'),
    github: 'https://github.com/Andryandurai',
    linkedin: 'https://www.linkedin.com/in/andryan-durai-bb2b40331',
    portfolio: 'https://andryan-portfolio.vercel.app/',
  },
  {
    id: 3, name: 'Dinesh G', role: 'Data Analyst, UI/UX Designer',
    introduction: 'Works across data analysis and interface design.',
    image: sitePath('/assets/team/dinesh-g.jpg'),
    github: 'https://github.com/Dinesh6618/',
    linkedin: 'https://www.linkedin.com/in/dinesh6618/',
    portfolio: '',
  },
  {
    id: 4, name: 'Akshaya P', role: 'Frontend Developer, Data Analyst',
    introduction: 'Builds frontend interfaces and works with data.',
    image: sitePath('/assets/team/akshaya-p.jpg'),
    github: 'https://github.com/Akshaya0206-tech',
    linkedin: 'https://www.linkedin.com/in/akshaya-p-18693b331/',
    portfolio: '',
  },
];

export const destinations = {
  consultancy: { title: 'Consultancy & Client Projects', label: 'Explore Consultancy', shortLabel: 'Consultancy', description: 'Explore our software, website development, and client-focused digital solutions.', enquiryType: 'Consultancy', icon: 'code' },
  workshops: { title: 'Practical Workshops', label: 'Explore Workshops', shortLabel: 'Workshops', description: 'Discover practical technical workshops designed to help students learn by building.', enquiryType: 'Workshop', icon: 'laptop' },
};

export const enquiryTypes = ['Project Collaboration', 'Consultancy', 'Workshop', 'Hackathon / Event', 'Other'];
