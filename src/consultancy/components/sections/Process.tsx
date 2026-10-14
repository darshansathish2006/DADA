import { Link } from '@/lib/navigation';

const steps = [
  {
    title: 'Understand the goal',
    body: 'Start with your audience, your business and the action you want visitors to take.',
    example: 'SS Builders · services & enquiries',
    slug: 'ss-builders',
  },
  {
    title: 'Shape the content',
    body: 'Organise your services, products or achievements into a clear, useful journey.',
    example: 'MBBS Portfolio · academic & clinical work',
    slug: 'mbbs-portfolio',
  },
  {
    title: 'Design your identity',
    body: 'Bring your brand to life through thoughtful layouts, imagery and visual direction.',
    example: 'D’Dreams Arc · studio site & rebrand',
    slug: 'ddreams-arc',
  },
  {
    title: 'Build the connections',
    body: 'Connect the experience to enquiries, bookings or the tools your business uses.',
    example: 'Angel Collections · WhatsApp enquiries',
    slug: 'angel-collections',
  },
  {
    title: 'Review & launch',
    body: 'Check the experience on mobile and desktop, refine the details and prepare the handover.',
    example: 'Dr. Belin’s · clinic & booking experience',
    slug: 'belin-dentistry',
  },
] as const;

/** Opening-section process with examples from our consultancy work. */
export default function Process() {
  return (
    <div id="approach" className="mt-14 scroll-mt-24 border-t border-line pt-8 md:mt-16">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-h3">From the first conversation to launch</h2>
        <p className="text-small text-muted">Our approach, illustrated through our work.</p>
      </div>
      <ol className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col border-t border-line pt-4 lg:row-span-4 lg:grid lg:grid-rows-subgrid">
            <span className="font-heading text-small font-bold text-accent">0{index + 1}</span>
            <h3 className="mt-3 font-heading text-body font-bold">{step.title}</h3>
            <p className="mt-2 text-small text-muted">{step.body}</p>
            <Link href={`/work/${step.slug}`} className="mt-auto pt-4 text-small underline decoration-line-strong underline-offset-4 hover:decoration-accent lg:mt-0 lg:self-start">
              {step.example}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
