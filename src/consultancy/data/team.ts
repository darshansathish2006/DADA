/**
 * Team members. Add real people only — name and role as a minimum, plus a square-ish photo
 * (public/team/) and profile links when available.
 *
 * `teamSize` is the full size of the team. Members not yet listed render as TODO cards so the
 * gap is visible; lower or remove them by adding entries below.
 */

export interface TeamMember {
  name: string;
  /** Main role line. A TODO marker is shown until it is supplied. */
  role?: string;
  /** Areas of work, shown as small tags under the role. */
  focus?: string[];
  /** Square-ish portrait, e.g. /team/name.jpg (public/team/). TODO until supplied. */
  photo?: { src: string; alt: string; width: number; height: number; position?: string };
  linkedin?: string;
  github?: string;
  /** Personal portfolio site. */
  website?: string;
  /** PDF resume in public/resumes/, e.g. /resumes/name.pdf. TODO marker until supplied. */
  resume?: string;
}

export const teamSize = 6;

export const team: TeamMember[] = [
  {
    name: 'Darshan C S',
    role: 'Co-Lead Developer',
    focus: ['Full stack engineering', 'AI developer'],
    photo: { src: '/team/darshan-c-s.jpg', alt: 'Portrait of Darshan C S', width: 854, height: 845 },
    linkedin: 'https://www.linkedin.com/in/darshan-c-s-77ab43331',
    github: 'https://github.com/darshansathish2006',
    website: 'https://darshancs.vercel.app',
    resume: '/resumes/darshan-c-s.pdf',
  },
  {
    name: 'Andryan Durai Jebin',
    role: 'Co-Lead Developer',
    focus: ['Backend developer', 'AI engineer'],
    photo: { src: '/team/andryan-durai-jebin.jpg', alt: 'Portrait of Andryan Durai Jebin', width: 900, height: 900 },
    linkedin: 'https://www.linkedin.com/in/andryan-durai-bb2b40331',
    github: 'https://github.com/Andryandurai',
    website: 'https://andryan-portfolio.vercel.app/',
    resume: '/resumes/andryan-durai-jebin.pdf',
  },
  // Details supplied so far. Still to come: Aakash A's photo, and profile links for Aakash A and
  // Daniel Jonathan.
  { name: 'Aakash A', role: 'Co-Lead Developer' },
  {
    name: 'Akshaya P',
    role: 'Frontend Developer, Data Analyst',
    photo: { src: '/team/akshaya-p.jpg', alt: 'Portrait of Akshaya P', width: 900, height: 900 },
    linkedin: 'https://www.linkedin.com/in/akshaya-p-18693b331/',
    github: 'https://github.com/Akshaya0206-tech',
    resume: '/resumes/akshaya-p.pdf',
  },
  {
    name: 'Dinesh G',
    role: 'Data Analyst, UI/UX Designer',
    photo: { src: '/team/dinesh-g.jpg', alt: 'Portrait of Dinesh G', width: 600, height: 600 },
    linkedin: 'https://www.linkedin.com/in/dinesh6618/',
    github: 'https://github.com/Dinesh6618/',
    resume: '/resumes/dinesh-g.pdf',
  },
  {
    name: 'Daniel Jonathan',
    role: 'UI/UX Designer, Tester',
    photo: { src: '/team/daniel-jonathan-portrait.png', alt: 'Daniel Jonathan smiling outdoors', width: 900, height: 1600, position: '50% 30%' },
  },
];

/** "Andryan Durai Jebin" -> "member-andryan-durai-jebin": the id of that person's card in the Team section. */
export const memberId = (name: string): string =>
  `member-${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}`;

/** Link to a team member's card on the homepage, or null when the name is not (yet) in `team`. */
export const memberHref = (name: string): string | null =>
  team.some((member) => member.name === name) ? `/#${memberId(name)}` : null;

/** Number of team members whose details are still to come. */
export const pendingMembers = Math.max(0, teamSize - team.length);
