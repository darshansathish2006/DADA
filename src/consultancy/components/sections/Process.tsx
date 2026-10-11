import { reveal } from '@/lib/reveal';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const steps = [
  { title: 'Discover', body: 'We learn what you need, who it is for and what a good result looks like.' },
  { title: 'Plan', body: 'We agree the scope, timeline and shape of the work before anything starts.' },
  { title: 'Build', body: 'We build the site, sharing progress as we go.' },
  { title: 'Support', body: 'We hand over clearly and stay available for questions afterwards.' },
] as const;

/** Four compact steps in one row; stacked on mobile. */
export default function Process() {
  return (
    <Section id="process" labelledBy="process-heading" className="border-t border-line">
      <SectionHeader id="process-heading" eyebrow="How we work" title="Four steps, no surprises" />
      <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="bg-bg p-6" {...reveal(index * 80)}>
            <span className="font-heading text-small font-bold text-accent">0{index + 1}</span>
            <h3 className="mt-3 text-h3">{step.title}</h3>
            <p className="mt-2 text-small text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
