import { cn } from '@/lib/utils';
import { reveal } from '@/lib/reveal';

interface Props {
  eyebrow: string;
  title: string;
  /** id for the h2, referenced by the section's aria-labelledby. */
  id?: string;
  intro?: string;
  className?: string;
}

/** Eyebrow + h2 + optional intro paragraph, shared by every section. */
export default function SectionHeader({ eyebrow, title, id, intro, className }: Props) {
  return (
    <div className={cn('mb-10 max-w-2xl md:mb-14', className)} {...reveal()}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-h2">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-muted">{intro}</p> : null}
    </div>
  );
}
