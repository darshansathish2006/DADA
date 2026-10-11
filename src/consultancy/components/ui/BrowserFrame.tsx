import { Image } from '@/lib/navigation';
import type { ProjectImage } from '@/data/projects';
import { cn } from '@/lib/utils';

interface Props {
  image: ProjectImage;
  /** Live URL; only its hostname is shown in the address bar. */
  url?: string;
  sizes: string;
  /** Preload the image (use only for the first visible screenshot on a page). */
  priority?: boolean;
  className?: string;
}

const hostOf = (url?: string): string => {
  if (!url) return 'preview';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'preview';
  }
};

/** Consistent browser-window mockup around a project screenshot. */
export default function BrowserFrame({ image, url, sizes, priority = false, className }: Props) {
  return (
    <div className={cn('overflow-hidden rounded-lg border border-line bg-surface', className)}>
      <div className="flex items-center gap-3 border-b border-line px-3 py-2" aria-hidden="true">
        <span className="flex gap-1.5">
          <i className="size-2.5 rounded-full bg-line-strong" />
          <i className="size-2.5 rounded-full bg-line-strong" />
          <i className="size-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="truncate rounded-md bg-fg/5 px-2.5 py-0.5 text-xs text-muted">{hostOf(url)}</span>
      </div>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        quality={75}
        className="h-auto w-full"
      />
    </div>
  );
}
