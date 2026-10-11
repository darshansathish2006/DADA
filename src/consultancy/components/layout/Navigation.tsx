import { useEffect, useRef, useState } from 'react';
import { Link } from '@/lib/navigation';
import { sitePath } from '../../../site-paths';
import { Menu, X } from 'lucide-react';
import { bookingHref, siteConfig } from '@/data/site-config';
import Button from '@/components/ui/Button';

/** Sticky, compact navigation with a simple disclosure menu on small screens. */
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggle.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95">
      <nav aria-label="Primary" className="wrap flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-body font-bold uppercase tracking-tight"
          aria-label={`${siteConfig.name} — home`}
          onClick={() => setOpen(false)}
        >
          <img src={sitePath('/assets/branding/dada-logo-blue.png')} alt="DADA" className="consultancy-logo" />
          <span className="text-small normal-case">Consultancy</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          <li><a href={sitePath('/')} className="text-small text-muted hover:text-fg">← Team DADA</a></li>
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-small font-medium text-muted transition-colors hover:text-fg">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden md:block"><Button href={bookingHref} size="sm">
            Book a call
          </Button></div>
          <button
            ref={toggle}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-bg md:hidden">
          <ul className="wrap flex flex-col py-2">
            <li className="border-b border-line"><a href={sitePath('/')} className="block py-4 font-heading text-h3 font-bold">← Team DADA</a></li>
            {siteConfig.nav.map((item) => (
              <li key={item.href} className="border-b border-line last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-heading text-h3 font-bold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <Button href={bookingHref} className="w-full" onClick={() => setOpen(false)}>
                Book a call
              </Button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
