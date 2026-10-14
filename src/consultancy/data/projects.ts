/**
 * Completed and ongoing projects — the single source for the homepage work grid,
 * the /work/[slug] case-study pages, the sitemap and structured data.
 *
 * Images live in `public/consultancy/projects/<slug>/` (1600px-wide JPEG for desktop, 780px for mobile).
 * Optional fields (`brief`, `stack`, `result`) are rendered as visible TODO markers until
 * real content is supplied — never invented.
 */

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Client / business name. */
  client: string;
  /** Sector line shown under the title. */
  sector: string;
  /** One-line description used on cards and in metadata. */
  summary: string;
  /** What we did, as prose for the case-study page. */
  overview: string[];
  /** What we did, as short tags. */
  did: string[];
  /** Team members who worked on it, spelled as in data/team.ts. A TODO marker is shown until supplied. */
  workedOnBy?: string[];
  url?: string;
  /** Access description for internal applications without a public demo. */
  access?: string;
  /** The more involved workflows built for this project. */
  features?: { title: string; description: string }[];
  screenshotsNote?: string;
  /** Desktop screenshot used on the card and case-study hero. */
  cover: ProjectImage;
  /** Extra screenshots; each image's dimensions determine its gallery layout. */
  gallery: ProjectImage[];
  /** TODO: the client's brief. */
  brief?: string;
  /** TODO: technologies used. */
  stack?: string[];
  /** TODO: one result line, e.g. "Launched in 3 weeks". */
  result?: string;
}

/**
 * Project counts for TEAM DADA. `completed` counts every delivered project, including any
 * not yet listed in `projects`; `ongoing` projects in progress (see `ongoingProjects`).
 */
export const projectStats = {
  completed: 8,
  ongoing: 4,
} as const;

export interface OngoingProject {
  title: string;
  /** One line about the project. */
  summary: string;
}

/** Fill in as ongoing projects are announced; missing slots render as TODO cards. */
export const ongoingProjects: OngoingProject[] = [];

/** Team members, spelled exactly as in data/team.ts. */
const person = {
  andryan: 'Andryan Durai Jebin',
  darshan: 'Darshan C S',
} as const;

const desktop = (slug: string, file: string, alt: string): ProjectImage => ({
  src: `/projects/${slug}/${file}.jpg`,
  alt,
  width: 1600,
  height: 1000,
});
const mobile = (slug: string, alt: string): ProjectImage => ({
  src: `/projects/${slug}/mobile-fold.jpg`,
  alt,
  width: 780,
  height: 1688,
});

export const projects: Project[] = [
  {
    slug: 'titans-windows-crm',
    title: 'Titans Windows — Manufacturing CRM',
    client: 'Titans Windows',
    sector: 'uPVC windows & doors manufacturing · Business software',
    summary:
      'Custom software for a uPVC windows and doors manufacturer, connecting sales, measurements, quotations, production, accounts, installation and handover in one order journey.',
    overview: [
      'Built a CRM around the way Titans Windows manufactures and delivers each order. A single customer record follows nine stages, from the first enquiry and rough measurement through quotation, order confirmation, final measurement, production, fabrication, installation and warranty handover.',
      'Each department gets the queues and actions relevant to its role. Sales, measurement, quotation, accounts, production and field teams work from the same order history, with documents, approvals and financial records kept together.',
    ],
    did: ['Manufacturing CRM', 'Production workflows', 'Accounts & documents'],
    workedOnBy: [person.darshan],
    access: 'Client application · Sign-in required',
    brief:
      'Build business software for a PVC windows manufacturing company to coordinate customer enquiries, department handoffs, factory progress, payments and final delivery without losing the history of an order.',
    features: [
      {
        title: 'Nine-stage workflow with approval gates',
        description: 'Connected rough measurements, quotation revisions, signed Customer Approval Forms (CAFs), final measurements and production-sheet validation. Required documents and approvals control when an order can move forward.',
      },
      {
        title: 'Fabrication planning and eight-step checklists',
        description: 'Built a factory board for future production, work in progress, dispatch readiness and dispatched orders. Cutting, reinforcement, welding, beading, CNC, assembly and both glass operations are tracked against each site.',
      },
      {
        title: 'Customer accounts and installer payments',
        description: 'Calculated order totals, additional charges, advances, receipts and outstanding balances. A separate installer ledger handles square-foot rates, extra charges, payments and the balance owed to outsourced installation teams.',
      },
      {
        title: 'Document generation and revision history',
        description: 'Generated customer approval and warranty PDFs from company formats, retained earlier quotation and elevation revisions, and linked signed documents and payment proofs to the relevant order.',
      },
      {
        title: 'Department access and accountable handoffs',
        description: 'Implemented role-based access and configurable stage permissions, staff allocation, scheduled measurement visits, follow-up history, sales targets and reminders for work that needs attention.',
      },
      {
        title: 'Installation, handover and after-sales service',
        description: 'Connected dispatch details to installation completion, signed handover documents and warranty records, with service-request handling after delivery.',
      },
    ],
    stack: ['Python', 'Django 5', 'Bootstrap 5', 'JavaScript', 'SQLite / PostgreSQL', 'ReportLab', 'pypdf'],
    result:
      'Built a connected manufacturing CRM with department-specific workflows, production approval gates, fabrication tracking, financial ledgers and document handover.',
    screenshotsNote: 'Actual application screens in dark mode, populated with sample records for this portfolio.',
    cover: desktop('titans-windows-crm', 'pipeline', 'Titans Windows CRM sales pipeline in dark mode, showing sample lead stages, order values and follow-ups'),
    gallery: [
      {
        ...desktop('titans-windows-crm', 'fabrication', 'Titans Windows fabrication board in dark mode with sample orders awaiting production, in progress and ready for dispatch'),
        caption: 'The fabrication board connects each site’s production status, checklist progress, quantities, order value and committed delivery date.',
      },
      {
        ...desktop('titans-windows-crm', 'ledger', 'Titans Windows customer ledger in dark mode showing a sample order, advance and outstanding balance'),
        caption: 'The customer ledger keeps the order value, advance, payments, extra charges and balance together.',
      },
    ],
  },
  {
    slug: 'titans-workforce-monitoring',
    title: 'Titans Windows — Workforce Monitoring',
    client: 'Titans Windows',
    sector: 'Manufacturing workforce · Monitoring software',
    summary:
      'A separate monitoring module for the same manufacturer, covering factory attendance, overtime, salary advances, monthly reports and sales executives’ site visits.',
    overview: [
      'Built the monitoring side of Titans Windows as a distinct workspace within the same software. Factory staff records and attendance are managed separately from customer orders, while sales executives have a mobile workflow for recording their working day and site visits.',
      'The system brings together daily attendance and advances, monthly calculations and downloadable reports. Access is tailored to administrators, authorised attendance staff and sales executives.',
    ],
    did: ['Attendance & overtime', 'Salary advances & reports', 'Site-visit tracking'],
    workedOnBy: [person.darshan],
    access: 'Client application · Sign-in required',
    brief:
      'Give the manufacturer a dedicated way to record factory attendance, keep advances and overtime consistent across months, prepare employee reports and review field visits separately from its CRM.',
    features: [
      {
        title: 'Daily attendance with overtime and advances',
        description: 'Built present, absent, half-day and holiday marking, overtime-hour entry and advances beside each day’s attendance. Bulk actions speed up marking, while employee calendars retain the daily history.',
      },
      {
        title: 'Advance carry-forward and salary calculations',
        description: 'Carried outstanding advances across months using the opening balance, daily advances and previous deductions. Calculated overtime from monthly salary, calendar days and an eight-hour day, then applied the month’s deduction to the salary payable.',
      },
      {
        title: 'Month closing and controlled corrections',
        description: 'Closed completed months automatically, with an administrator workflow to reopen and correct them. Validated deductions against the advance owed and available pay, while preserving former employees’ attendance history.',
      },
      {
        title: 'Employee PDFs and consolidated Excel reports',
        description: 'Generated individual reports with attendance calendars, overtime, advances and salary calculations, plus a monthly Excel workbook for the whole workforce. Reports are generated on demand from the saved records.',
      },
      {
        title: 'Location-stamped working days and site visits',
        description: 'Used browser geolocation to record where sales executives start work, log site stops and complete their day. Visit notes include timestamps, coordinates, location accuracy and map links, with an administrator view of the activity.',
      },
    ],
    stack: ['Python', 'Django 5', 'Bootstrap 5', 'JavaScript', 'Browser Geolocation API', 'openpyxl', 'ReportLab'],
    result:
      'Built a dedicated monitoring workspace for daily attendance, overtime and advance calculations, monthly employee reports and location-stamped field visits.',
    screenshotsNote: 'Actual monitoring screens captured in light mode. Employee names, attendance, pay figures and visits are sample records.',
    cover: desktop('titans-workforce-monitoring', 'attendance', 'Titans Windows monitoring attendance screen in light mode with sample employees, attendance states and overtime controls'),
    gallery: [
      {
        ...desktop('titans-workforce-monitoring', 'employee', 'Light-mode employee monitoring screen with a sample attendance calendar, overtime totals and advance balance'),
        caption: 'An employee’s monthly view connects attendance, overtime, daily advances and the running advance balance.',
      },
      {
        ...desktop('titans-workforce-monitoring', 'reports', 'Light-mode monitoring reports screen with monthly Excel and individual employee PDF downloads'),
        caption: 'Monthly reporting supports a workforce Excel sheet, employee PDFs and controlled reopening for corrections.',
      },
      {
        ...desktop('titans-workforce-monitoring', 'visits', 'Light-mode site-visit monitoring screen showing sample sales executives and timestamped visit notes'),
        caption: 'The site-visit view brings together each executive’s working day, recorded locations and visit notes.',
      },
    ],
  },
  {
    slug: 'ss-builders',
    title: 'SS Builders',
    client: 'SS Builders',
    sector: 'Construction & interiors · K.K. Nagar, Chennai',
    summary:
      'Brand website for a Chennai flat promoter and contractor with 24+ years in construction, reconstruction and interiors.',
    overview: [
      'A brand website for a K.K. Nagar, Chennai flat promoter and contractor with more than 24 years in construction, reconstruction and interiors.',
      'It brings together a project showcase, the company’s expertise and process, and a residential proposal, so prospective clients can see the work and how it is delivered.',
    ],
    did: ['Brand website', 'Project showcase'],
    workedOnBy: [person.andryan],
    brief:
      'Create a professional website for SS Builders, a Chennai-based flat promoter and contractor, to present its residential construction, reconstruction, and interior design services. The website needed an editorial visual identity, an engaging project gallery, an Anna Nagar residential proposal section, and a contact form integrated with Google Sheets for inquiry management.',
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'CSS Modules',
      'GSAP ScrollTrigger',
      'Lenis',
      'Lucide React',
      'Google Apps Script',
      'Google Sheets',
      'Vercel',
    ],
    result:
      'Designed and launched a premium, responsive website for SS Builders, bringing its construction services, residential portfolio, and customer inquiries together in one digital experience.',
    url: 'https://www.ssbuilders18.com/',
    cover: desktop('ss-builders', 'desktop-fold', 'SS Builders website homepage on a desktop screen'),
    gallery: [
      mobile('ss-builders', 'SS Builders website on a mobile screen'),
      desktop(
        'ss-builders',
        'desktop-section',
        'Expertise section of the SS Builders website, listing residential construction, reconstruction, interior design and planning & execution',
      ),
    ],
  },
  {
    slug: 'belin-dentistry',
    title: 'Dr. Belin’s Dentistry',
    client: 'Dr. Belin’s Dentistry',
    sector: 'Dental clinic',
    summary:
      'Clinic website covering services from general dentistry to implants and aligners, with online appointment booking and a guided quick tour.',
    overview: [
      'A website for Dr. Belin’s Dentistry, covering services from general dentistry to implants and aligners, the dentist’s profile, the clinic’s core values and its location.',
      'Visitors can book an appointment online, and a guided quick tour walks them through the site.',
    ],
    did: ['Clinic website', 'Appointment booking', 'Guided tour'],
    workedOnBy: [person.andryan, person.darshan],
    brief:
      'Create a friendly, professional website for a dental clinic that helps patients explore services, learn about the clinic, and navigate an appointment-booking experience. Use approachable visual storytelling, including a superhero tooth mascot and a happy-tooth character in the designated clinic-photo section.',
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Zustand',
      'Tailwind CSS',
      'Python',
      'Django 5',
      'Django REST Framework',
      'JWT / SimpleJWT',
      'SQLite (local development)',
      'PostgreSQL (production)',
    ],
    result:
      'Developing a dental clinic website concept with appointment-booking flows, interactive tooth mascots, service discovery, and clinic-location access.',
    url: 'https://www.drbelinsdentistry.com/',
    cover: desktop('belin-dentistry', 'desktop-fold', 'Dr. Belin’s Dentistry website homepage on a desktop screen'),
    gallery: [
      mobile('belin-dentistry', 'Dr. Belin’s Dentistry website on a mobile screen'),
      desktop(
        'belin-dentistry',
        'desktop-section',
        'Services section of the Dr. Belin’s Dentistry website, showing the range of dental treatments',
      ),
    ],
  },
  {
    slug: 'angel-collections',
    title: 'Angel Collections',
    client: 'Angel Collections',
    sector: 'Women’s fashion retail',
    summary:
      'A catalogue storefront for women’s fashion — sarees, ethnic wear, gowns and dresses — with new arrivals, shop-by-style collections and quick view.',
    overview: [
      'A catalogue storefront for a women’s fashion retailer, presenting sarees, ethnic wear, gowns and dresses in one browsable place.',
      'New arrivals and shop-by-style collections help shoppers find what they want, and quick view lets them look closer at a piece without leaving the page.',
    ],
    did: ['Catalogue website', 'Collections & quick view'],
    workedOnBy: [person.andryan],
    brief:
      'Create an elegant, mobile-friendly fashion website for Angel Collections to showcase dresses and curated collections, help customers explore products, and make enquiries directly through WhatsApp. The experience should emphasize editorial imagery, responsive layouts, and simple product discovery.',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Vercel',
      'Image optimization tooling',
      'Client-side product catalog data',
    ],
    result:
      'Built and deployed a responsive women’s fashion storefront on Vercel, featuring 210 catalog products, product galleries, Quick View, and WhatsApp-based product enquiries.',
    url: 'https://angel-collections.vercel.app/',
    cover: desktop('angel-collections', 'desktop-fold', 'Angel Collections website homepage on a desktop screen'),
    gallery: [
      mobile('angel-collections', 'Angel Collections website on a mobile screen'),
      desktop(
        'angel-collections',
        'desktop-section',
        'New Arrivals section of the Angel Collections website, showing dresses, a saree and suit material',
      ),
    ],
  },
  {
    slug: 'mbbs-portfolio',
    title: 'MBBS Portfolio',
    client: 'Andrena Joshia Jebin',
    sector: 'Personal portfolio · final-year MBBS student',
    summary:
      'Portfolio for Andrena Joshia Jebin, a final-year MBBS student — clinical experience, research, achievements and a certificates gallery.',
    overview: [
      'A personal portfolio for Andrena Joshia Jebin, an aspiring clinician and medical researcher in the final year of an MBBS degree.',
      'It organises clinical experience, academic work, research and poster presentations, and achievements, with a certificates gallery to back them up.',
    ],
    did: ['Portfolio website', 'Certificates gallery'],
    workedOnBy: [person.andryan],
    brief:
      'Designed and developed a professional personal portfolio for a final-year MBBS student to showcase her academic journey, clinical training, research projects, competition wins, certifications, and extracurricular activities. The goal was to create a minimal, elegant, and research-oriented digital presence that organizes her accomplishments into an accessible, responsive website.',
    stack: [
      'React 19',
      'TypeScript 6',
      'Vite 8',
      'Tailwind CSS 4',
      'Lucide React',
      'Framer Motion',
      'npm',
      'Vercel',
    ],
    result:
      'Built a responsive medical portfolio featuring 57 images and 29 PDFs, showcasing academic achievements, clinical experience, research studies, certifications, and presentations in one centralized platform.',
    url: 'https://andrena-mbbs-portfolio.vercel.app/',
    cover: desktop('mbbs-portfolio', 'desktop-fold', 'Andrena Joshia Jebin’s MBBS portfolio homepage on a desktop screen'),
    gallery: [
      mobile('mbbs-portfolio', 'Andrena Joshia Jebin’s MBBS portfolio on a mobile screen'),
      desktop(
        'mbbs-portfolio',
        'desktop-section',
        'Achievement section of the MBBS portfolio, showing prize certificates',
      ),
    ],
  },
  {
    slug: 'ddreams-arc',
    title: 'D’Dreams Arc',
    client: 'D’Dreams Arc',
    sector: 'Interior design studio',
    summary:
      'Website for an interior-design studio — services, 3D visualisation, portfolio of work, a six-step design process and online design consultation.',
    overview: [
      'A website for an interior-design studio, covering its services, 3D visualisation and a portfolio of finished work.',
      'The studio’s six-step design process is laid out clearly, and an online design consultation lets visitors start a conversation without leaving the site. The project also included a rebrand.',
    ],
    did: ['Studio website', 'Rebrand', 'Online design consultation'],
    workedOnBy: [person.andryan],
    brief:
      'Create a minimal, elegant online presence for D’Dreams Arc, an interior design studio focused on stylish, functional, and personalized spaces. The website should showcase the studio’s services, design process, and portfolio while allowing potential clients to submit project enquiries through an integrated contact form.',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Google Apps Script',
      'Google Sheets',
      'Vercel',
      'Git',
      'GitHub',
    ],
    result:
      'Designed and deployed a responsive interior design website with 7 pages, integrated enquiry submissions through Google Apps Script and Google Sheets, and passed production build, TypeScript, lint, accessibility, and responsive checks.',
    url: 'https://d-dreams-arc.vercel.app/',
    cover: desktop('ddreams-arc', 'desktop-fold', 'D’Dreams Arc website homepage — “Design your dreams. Create your space.”'),
    gallery: [
      mobile('ddreams-arc', 'D’Dreams Arc website on a mobile screen'),
      desktop(
        'ddreams-arc',
        'desktop-section',
        'Our Work section of the D’Dreams Arc website, showing selected 3D designs',
      ),
    ],
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const getAdjacentProjects = (slug: string): { prev: Project; next: Project } => {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
};

/** Completed projects not yet listed above (shown as TODO cards). */
export const unlistedCompleted = Math.max(0, projectStats.completed - projects.length);
