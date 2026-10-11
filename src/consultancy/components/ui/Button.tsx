import { Link } from '@/lib/navigation';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & (
  | { href: string; external?: boolean; onClick?: () => void }
  | ({ href?: undefined; external?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>)
);

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-heading font-bold transition-colors duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-ink hover:bg-fg hover:text-bg',
  secondary: 'border border-line-strong text-fg hover:border-fg hover:bg-fg/5',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-small',
  md: 'px-5 py-3 text-small',
  lg: 'px-7 py-4 text-body',
};

/** Primary / secondary button that renders a link when given an `href`. */
export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  external,
  ...rest
}: Props) {
  const onLinkClick = 'onClick' in rest && href !== undefined ? (rest.onClick as (() => void) | undefined) : undefined;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href !== undefined) {
    if (external ?? /^https?:\/\//.test(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onLinkClick}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onLinkClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
