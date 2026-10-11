import { Link } from '@/lib/navigation';
import { projects } from '@/data/projects';

/** Small, muted client wordmarks (text, not logos) that light up on hover. */
export default function ClientStrip() {
  return (
    <section aria-label="Clients" className="border-y border-line py-8">
      <div className="wrap flex flex-wrap items-center gap-x-10 gap-y-4">
        <p className="eyebrow">Built for</p>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="font-heading text-body font-bold text-muted transition-colors hover:text-accent"
              >
                {project.client}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
