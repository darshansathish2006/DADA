import { CalendarDays } from 'lucide-react';
import { hasBooking, hasEmail, siteConfig } from '@/data/site-config';
import { reveal } from '@/lib/reveal';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Todo from '@/components/ui/Todo';
import CopyEmail from '@/components/ui/CopyEmail';
import ContactForm from '@/components/ui/ContactForm';
import ContactNumbers from '@/components/ui/ContactNumbers';

/** Contact on the cream surface: real contact routes on the left, the enquiry form on the right. */
export default function Contact() {
  return (
    <Section id="contact" tone="light" labelledBy="contact-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5" {...reveal()}>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-heading" className="mt-3 text-h2">
            Let’s talk about your website.
          </h2>
          <p className="mt-4 text-muted">Based in Chennai, working with clients anywhere.</p>

          <ul className="mt-8 grid gap-6">
            <li>
              <p className="eyebrow mb-2">Email</p>
              {hasEmail ? <CopyEmail email={siteConfig.email} /> : <Todo>team email</Todo>}
            </li>
            <li>
              <ContactNumbers />
            </li>
            {hasBooking && <li>
              <p className="eyebrow mb-2">Book a call</p>
              {hasBooking ? (
                <Button href={siteConfig.booking} variant="secondary" size="sm">
                  <CalendarDays size={16} aria-hidden="true" />
                  Pick a time
                </Button>
              ) : (
                <Todo>booking link (optional)</Todo>
              )}
            </li>}
          </ul>

          <p className="mt-8 flex items-center gap-3 text-small">
            <span className="ping inline-block size-2 rounded-full bg-fg" aria-hidden="true" />
            {siteConfig.availability}
          </p>
        </div>

        <div className="lg:col-span-7" {...reveal(80)}>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
