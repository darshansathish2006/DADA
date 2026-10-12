import { Image } from '@/lib/navigation';
import { Link } from '@/lib/navigation';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/data/services';
import { getProject } from '@/data/projects';
import { publicPath } from '@/lib/paths';
import { reveal } from '@/lib/reveal';
import Section from '@/components/ui/Section';

/** An open service index, illustrated with the team's real client work. */
export default function Services() {
  return (
    <Section id="services" labelledBy="services-heading" className="border-t border-line bg-surface">
      <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end lg:gap-10" {...reveal()}>
        <div className="lg:col-span-7">
          <p className="eyebrow">Consultancy services</p>
          <h2 id="services-heading" className="mt-4 max-w-[18ch] text-h2">
            A website with<br />a job to do.
          </h2>
        </div>
        <p className="max-w-md text-muted lg:col-span-5 lg:pb-1">
          Show your work. Take bookings. Start a conversation. We plan and build around the
          things your customers actually need.
        </p>
      </div>

      <ul className="border-b border-line">
        {services.map((service, index) => {
          const project = getProject(service.projectSlug);
          return (
            <li
              key={service.id}
              className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 gap-y-6 border-t border-line py-8 sm:gap-x-6 lg:grid-cols-12 lg:gap-x-8 lg:py-10"
              {...reveal()}
            >
              <span className="pt-2 font-heading text-small text-accent lg:col-span-1" aria-hidden="true">
                / 0{index + 1}
              </span>
              <div className="lg:col-span-3">
                <h3 className="text-h2">{service.title}</h3>
                <p className="mt-3 text-small text-muted">{service.lead}</p>
              </div>
              <div className="col-span-2 sm:col-span-1 sm:col-start-2 lg:col-span-4 lg:col-start-auto lg:pr-4">
                <p className="max-w-lg text-muted">{service.description}</p>
                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-small" aria-label={`${service.title} services`}>
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              {project ? (
                <Link
                  href={`/work/${project.slug}`}
                  className="group col-span-2 block sm:col-span-1 sm:col-start-2 lg:col-span-4 lg:col-start-auto"
                  aria-label={`See ${service.title.toLowerCase()} in practice: ${project.title} case study`}
                >
                  <figure>
                    <div className="overflow-hidden">
                      <Image
                        src={publicPath(project.cover.src)}
                        alt={project.cover.alt}
                        width={project.cover.width}
                        height={project.cover.height}
                        sizes="(min-width: 1280px) 400px, (min-width: 1024px) 30vw, (min-width: 640px) 80vw, 90vw"
                        className="aspect-[2/1] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.025] group-focus-visible:scale-[1.025]"
                      />
                    </div>
                    <figcaption className="mt-3">
                      <span className="flex items-center justify-between gap-3 text-small font-semibold group-hover:underline">
                        {project.title}
                        <ArrowUpRight size={18} className="shrink-0 text-accent" aria-hidden="true" />
                      </span>
                      <span className="mt-1 block text-small text-muted">{service.projectNote}</span>
                    </figcaption>
                  </figure>
                </Link>
              ) : null}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
