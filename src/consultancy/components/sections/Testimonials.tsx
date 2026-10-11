import { testimonials } from '@/data/testimonials';
import { reveal } from '@/lib/reveal';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';

/** Real client quotes only. The whole section is hidden until data/testimonials.ts has entries. */
export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <Section id="testimonials" labelledBy="testimonials-heading" className="border-t border-line">
      <SectionHeader id="testimonials-heading" eyebrow="Kind words" title="What clients say" />
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.slice(0, 3).map((item, index) => (
          <li key={`${item.name}-${item.business}`} {...reveal(index * 80)}>
            <Card as="div" className="flex h-full flex-col">
              <blockquote className="flex-1 text-body">“{item.quote}”</blockquote>
              <p className="mt-6 text-small font-semibold">{item.name}</p>
              <p className="text-small text-muted">{item.business}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
