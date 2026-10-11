import { useEffect } from 'react';

/**
 * Drives the one entrance animation used on the site: fade + 16px rise, once per element.
 *
 * Elements opt in with `data-reveal`. Anything already on screen (or above it) is left alone;
 * everything below the fold is marked `pending` and flipped to `done` by a single shared
 * IntersectionObserver. With reduced motion, or without IntersectionObserver, nothing is
 * ever hidden. Only opacity and transform are animated (see globals.css).
 */
export default function RevealController() {
  const pathname = window.location.pathname;

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const viewportHeight = window.innerHeight;
    const pending: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top < viewportHeight * 0.92) return;
      el.dataset.revealState = 'pending';
      pending.push(el);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealState = 'done';
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    );
    pending.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
