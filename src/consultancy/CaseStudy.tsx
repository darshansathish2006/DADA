import { Image } from '@/lib/navigation';
import { Link } from '@/lib/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { getAdjacentProjects, getProject } from '@/data/projects';
import { siteConfig } from '@/data/site-config';
import { sitePath } from '../site-paths';
import { reveal } from '@/lib/reveal';
import BrowserFrame from '@/components/ui/BrowserFrame';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';
import Todo from '@/components/ui/Todo';
import WorkedOnBy from '@/components/ui/WorkedOnBy';

export default function CaseStudyPage({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) return <div className="wrap section-y"><h1 className="text-h2">Project not found</h1><Link href="/#work">Back to all work</Link></div>;
  const { prev, next } = getAdjacentProjects(project.slug);
  const hasPortrait = project.gallery.some((image) => image.height > image.width);

  return (
    <article>
      <header className="wrap pb-10 pt-10 md:pt-16">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-small text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All work
        </Link>
        <p className="eyebrow mt-8">{project.sector}</p>
        <h1 className="mt-3 max-w-3xl text-h2">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-muted">{project.summary}</p>

        <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-6 border-t border-line pt-6 text-small">
          <div>
            <dt className="eyebrow mb-1">Client</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">{project.access ? 'Application access' : 'Live site'}</dt>
            <dd>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold hover:underline"
                >
                  {new URL(project.url).hostname.replace(/^www\./, '')}
                  <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <span className="text-muted">{project.access ?? 'Not published yet'}</span>
              )}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="eyebrow mb-1">Worked on by</dt>
            <dd>
              <WorkedOnBy names={project.workedOnBy} />
            </dd>
          </div>
        </dl>
      </header>

      <div className="wrap">
        <BrowserFrame image={project.cover} url={project.url} sizes="(min-width: 1280px) 1200px, 100vw" priority />
        {project.screenshotsNote ? <p className="mt-3 text-small text-muted">{project.screenshotsNote}</p> : null}
      </div>

      <div className="wrap grid gap-12 py-14 md:py-20">
        <Block title="The brief">
          {project.brief ? <p>{project.brief}</p> : <Todo>the client&apos;s brief</Todo>}
        </Block>

        <Block title="What we did">
          <div className="grid gap-4">
            {project.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Deliverables">
            {project.did.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        </Block>

        {project.features?.length ? (
          <Block title="Complex workflows we built">
            <ul className="grid gap-6">
              {project.features.map((feature) => (
                <li key={feature.title}>
                  <h3 className="font-heading font-bold text-fg">{feature.title}</h3>
                  <p className="mt-2">{feature.description}</p>
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

        <Block title="Stack">
          {project.stack && project.stack.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          ) : (
            <Todo>technologies used</Todo>
          )}
        </Block>

        <Block title="Result">
          {project.result ? <p>{project.result}</p> : <Todo>result line, e.g. “Launched in 3 weeks”</Todo>}
        </Block>
      </div>

      <section aria-labelledby="screens-heading" className="wrap pb-14 md:pb-20">
        <h2 id="screens-heading" className="mb-8 text-h3">
          More screens
        </h2>
        <div className="grid items-start gap-6 md:grid-cols-12 md:gap-8">
          {project.gallery.map((image) => {
            const portrait = image.height > image.width;
            return (
              <figure key={image.src} className={portrait ? 'md:col-span-4' : hasPortrait ? 'md:col-span-8' : 'md:col-span-12'} {...reveal()}>
                {portrait ? (
                  <div className="mx-auto max-w-[280px] overflow-hidden rounded-xl border border-line bg-surface md:max-w-none">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(min-width: 768px) 28vw, 280px"
                      quality={75}
                      className="h-auto w-full"
                    />
                  </div>
                ) : (
                  <BrowserFrame image={image} url={project.url} sizes={hasPortrait ? '(min-width: 768px) 62vw, 100vw' : '(min-width: 1280px) 1200px, 100vw'} />
                )}
                {image.caption ? <figcaption className="mt-3 text-small text-muted">{image.caption}</figcaption> : null}
              </figure>
            );
          })}
        </div>
      </section>

      <section className="border-t border-line" aria-label="More projects">
        <div className="wrap grid gap-px py-10 sm:grid-cols-2">
          <Link href={`/work/${prev.slug}`} className="group flex flex-col gap-1 py-4">
            <span className="eyebrow inline-flex items-center gap-2">
              <ArrowLeft size={14} aria-hidden="true" />
              Previous
            </span>
            <span className="font-heading text-h3 font-bold group-hover:underline">{prev.title}</span>
          </Link>
          <Link href={`/work/${next.slug}`} className="group flex flex-col gap-1 py-4 sm:items-end sm:text-right">
            <span className="eyebrow inline-flex items-center gap-2">
              Next
              <ArrowRight size={14} aria-hidden="true" />
            </span>
            <span className="font-heading text-h3 font-bold group-hover:underline">{next.title}</span>
          </Link>
        </div>
        <div className="wrap pb-14">
          <Button href="/#contact" variant="secondary">
            Start a project with Team DADA
          </Button>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.summary,
            url: `${window.location.origin}${sitePath(`/consultancy/work/${project.slug}/`)}`,
            image: `${window.location.origin}${sitePath(`/consultancy${project.cover.src}`)}`,
            ...(project.url ? { sameAs: project.url } : {}),
            creator: { '@type': 'Organization', name: siteConfig.name, url: `${window.location.origin}${sitePath('/consultancy/')}` },
            ...(project.workedOnBy && project.workedOnBy.length > 0
              ? { contributor: project.workedOnBy.map((name) => ({ '@type': 'Person', name })) }
              : {}),
          }),
        }}
      />
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 md:grid-cols-12 md:gap-8" {...reveal()}>
      <h2 className="text-h3 md:col-span-3">{title}</h2>
      <div className="max-w-2xl text-muted md:col-span-9 [&_p]:text-fg/90">{children}</div>
    </section>
  );
}
