import { Code, Lightbulb } from 'lucide-react';
import { services, type ServiceIcon } from '@/data/services';
import { reveal } from '@/lib/reveal';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';

const icons: Record<ServiceIcon, typeof Code> = {
  code: Code,
  lightbulb: Lightbulb,
};

/** The portfolio's two consultancy services. */
export default function Services() {
  return (
    <Section id="services" labelledBy="services-heading">
      <SectionHeader
        id="services-heading"
        eyebrow="What we do"
        title="Build with purpose. Choose with clarity."
        intro="Web development and technical advice for your next project."
      />
      <ul className="grid gap-6 md:grid-cols-2">
        {services.map((service, index) => {
          const Icon = icons[service.icon];
          return (
            <li key={service.id} {...reveal(index * 80)}>
              <Card as="div" className="flex h-full flex-col">
                <span className="inline-flex size-11 items-center justify-center rounded-md bg-accent text-ink">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-h3">{service.title}</h3>
                <p className="mt-3 text-muted">{service.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2 pt-1" aria-label={`${service.title} examples`}>
                  {service.deliverables.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
