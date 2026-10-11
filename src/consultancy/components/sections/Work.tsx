import { Link } from '@/lib/navigation';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projectStats, projects, type Project } from '@/data/projects';
import { reveal } from '@/lib/reveal';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import BrowserFrame from '@/components/ui/BrowserFrame';
import Tag from '@/components/ui/Tag';
import Todo from '@/components/ui/Todo';
import WorkedOnBy from '@/components/ui/WorkedOnBy';

/** Selected work: a card grid of every completed project, then a muted "in progress" row. */
export default function Work() {
  return (
    <Section id="work" tone="light" labelledBy="work-heading">
      <SectionHeader
        id="work-heading"
        eyebrow="Selected work"
        title="Websites built for real clients"
        intro="Selected client work in construction, interiors, fashion, healthcare and medicine."
      />

      <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.slug} {...reveal((index % 2) * 80)}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      <InProgress />
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const href = `/work/${project.slug}`;
  return (
    <article className="group flex h-full flex-col">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
        <BrowserFrame
          image={project.cover}
          url={project.url}
          sizes="(min-width: 1280px) 600px, (min-width: 768px) 45vw, 100vw"
          className="transition-transform duration-300 ease-out group-hover:-translate-y-1"
        />
      </Link>
      <div className="mt-5 flex flex-1 flex-col">
        <p className="eyebrow">{project.sector}</p>
        <h3 className="mt-2 text-h3">
          <Link href={href} className="hover:underline">
            {project.title}
          </Link>
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="What we did">
          {project.did.map((item) => (
            <li key={item}>
              <Tag>{item}</Tag>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-small text-muted">{project.result ?? <Todo>result line</Todo>}</p>
        <p className="mt-3 text-small">
          <span className="text-muted">Worked on by: </span>
          <WorkedOnBy names={project.workedOnBy} />
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-5 text-small font-semibold">
          <Link href={href} className="inline-flex items-center gap-1.5 hover:underline">
            Case study
            <ArrowRight size={15} aria-hidden="true" />
            <span className="sr-only">: {project.title}</span>
          </Link>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted hover:text-fg hover:underline"
            >
              Live site
              <ArrowUpRight size={15} aria-hidden="true" />
              <span className="sr-only">
                : {project.title} (opens in a new tab)
              </span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function InProgress() {
  return (
    <div className="mt-16 border-t border-line pt-10 md:mt-20" {...reveal()}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-h3">In progress</h3>
        <p className="text-small text-muted">{projectStats.ongoing} projects currently being built</p>
      </div>
      <p className="mt-4 max-w-xl text-small text-muted">More client work is on the way. Explore the case studies above, or tell us what you have in mind.</p>
    </div>
  );
}
