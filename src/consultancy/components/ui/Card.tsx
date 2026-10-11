import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLElement> {
  /** Element to render (default `div`). */
  as?: 'div' | 'article' | 'li';
  /** `muted` is a flatter, dashed variant used for "in progress" and placeholder cards. */
  tone?: 'default' | 'muted';
  /** Set to false for cards whose content (e.g. a photo) runs edge to edge. */
  padded?: boolean;
}

/** Surface card with the shared radius, border and padding. */
export default function Card({
  as: Tag = 'div',
  tone = 'default',
  padded = true,
  className,
  children,
  ...rest
}: Props) {
  return (
    <Tag
      className={cn(
        'rounded-lg border',
        padded && 'p-6',
        tone === 'default' ? 'border-line bg-surface' : 'border-dashed border-line-strong bg-transparent',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
