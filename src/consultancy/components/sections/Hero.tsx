import { bookingHref } from '@/data/site-config';
import { projectStats, projects } from '@/data/projects';
import Button from '@/components/ui/Button';
import Todo from '@/components/ui/Todo';

const stats: { label: string; value: number | null; todo: string }[] = [
  { label: 'Projects delivered', value: projectStats.completed, todo: 'count' },
  { label: 'Projects in progress', value: projectStats.ongoing, todo: 'count' },
  { label: 'Featured case studies', value: projects.length, todo: 'count' },
];

/**
 * Hero. The headline is the only display-size text on the site. Nothing here is animated
 * or hidden until JavaScript runs, so the headline is the LCP element and paints immediately.
 */
export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="pb-12 pt-12 md:pb-20 md:pt-20">
      <div className="wrap">
        <p className="eyebrow">Chennai · Consultancy & client work</p>
        <p className="mt-6 font-heading text-h2 font-bold uppercase leading-none tracking-tight text-accent">
          Team DADA
        </p>
        <h1 id="hero-heading" className="mt-4 max-w-[18ch] text-display font-bold">
          Your next idea. Designed, built, delivered.
        </h1>
        <p className="mt-6 max-w-2xl text-h3 font-body font-normal text-muted">
          Team DADA designs websites and web apps, and helps businesses make clear decisions about tech and AI.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#work" size="lg">
            See our work
          </Button>
          <Button href={bookingHref} variant="secondary" size="lg">
            Book a call
          </Button>
        </div>

        <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-line pt-8 md:mt-16 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end gap-2">
              <dt className="text-small text-muted">{stat.label}</dt>
              <dd className="font-heading text-h2 font-bold leading-none">
                {stat.value === null ? <Todo>{stat.todo}</Todo> : stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
