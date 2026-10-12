import { Link } from '@/lib/navigation';
import { sitePath } from '../../../site-paths';
import { ArrowUp } from 'lucide-react';
import { hasEmail, siteConfig, socialLinks } from '@/data/site-config';
import Todo from '@/components/ui/Todo';
import ContactNumbers from '@/components/ui/ContactNumbers';

/** Compact footer: logo, one-line description, links, email, socials and copyright. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="wrap grid gap-10 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex items-center gap-2 font-heading text-body font-bold uppercase">
            {siteConfig.name}
            <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />
          </Link>
          <p className="mt-3 max-w-sm text-small text-muted">{siteConfig.description}</p>
          <p className="mt-3 text-small text-muted">{siteConfig.location}</p>
          <a href={sitePath('/')} className="mt-4 inline-flex text-small font-semibold text-accent hover:underline">← Back to Team DADA</a>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow mb-3">Explore</p>
          <ul className="grid gap-2 text-small">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow mb-3">Get in touch</p>
          <ul className="grid gap-2 text-small">
            <li>
              {hasEmail ? (
                <a href={`mailto:${siteConfig.email}`} className="break-all text-fg hover:underline">
                  {siteConfig.email}
                </a>
              ) : (
                <Todo>team email</Todo>
              )}
            </li>
            <li><ContactNumbers compact /></li>
            {socialLinks.map((social) => (
              <li key={social.key}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-fg"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-5 text-small text-muted">
          <p>
            © {year} {siteConfig.legalName}
          </p>
          <a href="#" className="inline-flex items-center gap-2 transition-colors hover:text-fg">
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
