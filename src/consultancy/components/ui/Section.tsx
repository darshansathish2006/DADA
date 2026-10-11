import { cn } from '@/lib/utils';

interface Props {
  id?: string;
  /** `light` swaps in the cream palette for the whole section. */
  tone?: 'dark' | 'light';
  /** id of the section's heading, for the landmark label. */
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}

/** Page section: consistent vertical rhythm, centred container, optional cream surface. */
export default function Section({ id, tone = 'dark', labelledBy, className, children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('section-y', tone === 'light' && 'theme-light', className)}
    >
      <div className="wrap">{children}</div>
    </section>
  );
}
