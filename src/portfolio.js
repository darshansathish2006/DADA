// Projects and interface images: D:\Projects\Portfolio\index.html.
// Competition and session records: D:\Projects\DADA-PORTFOLIO\DADA-Portfolio\data\events.ts.
// Session galleries: Darshan's portfolio and user-supplied CLICK photos; see scripts/prepare-event-photos.mjs.
// Keep internal-round wins distinct from national results, and finalists distinct from winners.
export const projects = [
  {
    id: 'echosense', name: 'EchoSenseAI', category: 'HEALTHCARE / AI',
    subtitle: 'Tinnitus care, connected.',
    description: 'A platform bringing tinnitus assessment, sound therapy, and doctor consultation together. Built for NIEPMD, it connects patient tools with a clinician console, an AI companion, and an interactive 3D ear viewer.',
    stack: ['React', 'TypeScript', 'Django REST', 'Three.js', 'scikit-learn'],
    highlight: 'Winner · Smart Ability Hackathon 2026',
    image: '/assets/projects/echosense.webp',
    alt: 'EchoSense AI patient overview with consultation, therapy shortcuts, and a daily mood check-in',
  },
  {
    id: 'sevps', name: 'SEVPS', category: 'EMERGENCY RESPONSE / REAL-TIME SYSTEMS',
    subtitle: 'Smart Emergency Vehicle Priority System',
    description: 'A real-time platform that gives ambulances traffic-signal priority, plans routes, and tracks hospital readiness. Connected dashboards keep administrators, drivers, paramedics, and hospitals in sync through live WebSocket updates.',
    stack: ['React', 'Django Channels', 'Redis', 'PostGIS', 'NetworkX'],
    highlight: 'Finalist · CIH ’26',
    image: '/assets/projects/sevps.webp',
    alt: 'SEVPS control room showing ambulances, routes, and traffic signals for green corridors',
  },
  {
    id: 'click', name: 'CLICK', category: 'EDUCATION / LEARN · TEST · PRACTICE',
    subtitle: 'A first step into C. A habit of building.',
    description: 'Built for first-year students at REC, CLICK combines C-programming microlearning, practice problems, tests, and progress tracking. Students can learn through the web app, Windows and Android apps, or practise inside VS Code.',
    stack: ['JavaScript', 'Cloudflare Workers', 'Supabase', 'Electron', 'VS Code API'],
    highlight: 'Introduced to 450 first-year AI & DS students',
    image: '/assets/projects/click.webp',
    alt: 'CLICK learner home with the DADA mascot and a chapter-by-chapter learning path',
  },
  {
    id: 'academic-wdb', name: 'ACADEMIC WDB', category: 'EDUCATION / CONVERSATIONAL TOOLS',
    subtitle: 'Study resources. One message away.',
    description: 'A WhatsApp academic resource bot that delivers notes, videos, and reference links by department, semester, and subject. Regex-first intent matching with a Groq Llama fallback connects to a secured Django REST API, Supabase, and a React admin panel.',
    stack: ['WhatsApp Cloud API', 'Django REST', 'React', 'Supabase', 'Groq'],
    highlight: 'Academic resources through WhatsApp',
    image: '/assets/projects/academic-wdb.png',
    alt: 'Academic WDB conversation preview showing a request for DBMS notes, a PDF response, and a lecture video',
    imageCaption: 'Conversation preview from Darshan’s portfolio',
  },
];

export const technicalInitiatives = [
  {
    id: 'sih-2026', title: 'Smart India Hackathon 2026', detail: 'Internal round',
    date: '30 Aug 2026', result: 'Winner', project: 'Pramana (IP-Sakthi Sahayak)',
    description: 'Won the internal round with Pramana, an AI-assisted IP and regulatory guide for AYUSH innovators.',
    image: '/assets/events/sih-2026.jpg', alt: 'Team working on laptops during the SIH 2026 internal round',
  },
  {
    id: 'smart-ability', title: 'Smart Ability Hackathon 2026',
    detail: 'REC Centre of Excellence in Assistive Technology · NIEPMD',
    date: '01 Aug 2026', result: 'Winner', project: 'EchoSense AI',
    description: 'Won with EchoSense AI, bringing tinnitus assessment, sound therapy, and doctor consultation into one platform. The work continued as a project for NIEPMD.',
    image: '/assets/events/smart-ability-2026.jpg', alt: 'Smart Ability 2026 prize presentation in front of the event banner', position: '50% 25%',
  },
  {
    id: 'kutty-koncepts', title: 'Kutty Koncepts AI Hackathon', detail: 'Rajalakshmi Engineering College',
    date: '06 Jun 2026', result: 'Winner', project: 'AI-generated DSA lesson with Aadhi',
    description: 'Created and presented an AI-generated video in which REC’s mascot Aadhi teaches DSA concepts. The win led to a four-month AI internship at REC.',
    image: '/assets/events/kutty-team.jpg', alt: 'Team holding certificates after the Kutty Koncepts AI Hackathon', position: '50% 35%',
  },
  {
    id: 'cih-26', title: 'CIH ’26', detail: 'Rathinam Techzone, Coimbatore',
    date: 'Aug 2026', result: 'Finalist', project: 'SEVPS',
    description: 'Reached the finals with the Smart Emergency Vehicle Priority System, a real-time traffic-signal priority and routing platform for ambulances.',
    image: '/assets/events/cih-26.jpg', alt: 'Team on the steps at Rathinam Techzone during CIH ’26',
  },
];

export const engagements = [
  {
    id: 'ai-nexus', title: 'AI Nexus 2026', detail: 'AI Innovators Expo · Rajalakshmi Engineering College',
    date: '18 Jul 2026', category: 'EXPO / PRESENTATION',
    description: 'Presented Aadhi EduEngine, the team’s AI video generator, at the AI Innovators Expo. The project turns course concepts into learning videos and study materials.',
    photos: [
      { src: '/assets/events/ai-nexus-conversation.webp', alt: 'Explaining the project to visitors at the AI Nexus expo', caption: 'Ideas in conversation' },
      { src: '/assets/events/ainexus-stall.jpg', alt: 'The team at the AI Nexus expo stall beside the Aadhi EduEngine banner', caption: 'The team at AI Nexus · REC' },
    ],
  },
  {
    id: 'hackathon-awareness', title: 'Hackathon Awareness Session', detail: 'Prerequisites & readiness · Dept. of AI & DS, REC',
    date: '13 Aug 2026', category: 'AWARENESS SESSION',
    description: 'A session for AI & DS students on preparation, the hackathon process, jury evaluation, and deliverables. EchoSense served as a live example, followed by a Q&A.',
    photos: [
      { src: '/assets/events/hackathon-awareness.webp', alt: 'Explaining EchoSense during the Hackathon Awareness Session', caption: 'Learning through EchoSense' },
      { src: '/assets/events/awareness-talk.jpg', alt: 'Demonstrating the EchoSense doctor-consultation page during the awareness session', caption: 'EchoSense · Live project walkthrough' },
    ],
  },
  {
    id: 'click-session', title: 'CLICK Deployment', detail: 'Platform rollout · Phase 1 & 2 · REC',
    date: '2026', category: 'PRODUCT LAUNCH / HANDS-ON',
    description: 'Rolled CLICK out to first-year AI & DS students in two phases, walking each batch from signing in to writing their first C programs. Hands-on sessions also introduced the VS Code extension for checking code, running tests, and pairing with the web app.',
    photos: [
      { src: '/assets/events/click-phase-1.webp', alt: 'Demonstrating the CLICK app to first-year students during the first deployment phase', caption: 'Deployment · Phase 1' },
      { src: '/assets/events/click-launch.jpg', alt: 'The CLICK team and faculty together at the platform launch', caption: 'CLICK launch · Team and faculty' },
      { src: '/assets/events/click-deploy1.webp', alt: 'Demonstrating the CLICK practice extension in VS Code to students', caption: 'Hands-on with the VS Code extension' },
      { src: '/assets/events/click-deploy2.webp', alt: 'Explaining the CLICK rollout to students in the classroom', caption: 'Learning together in the classroom' },
    ],
  },
];
