import type { AnchorHTMLAttributes, ImgHTMLAttributes } from 'react';
import { sitePath } from '../../site-paths';

/** Keep all copied portfolio routes inside the consultancy subsite. */
export function portfolioHref(href: string) {
  if (href.startsWith('/work/')) return sitePath(`/consultancy${href.replace(/\/$/, '')}/`);
  if (href === '/' || href.startsWith('/#')) return sitePath(`/consultancy${href}`);
  return sitePath(href);
}

export function Link({ href = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a href={portfolioHref(href)} {...props} />;
}

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean; quality?: number };
export function Image({ src = '', priority = false, quality: _quality, ...props }: ImageProps) {
  return <img {...props} src={sitePath(src.startsWith('/projects/') ? `/consultancy${src}` : src)}
    loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />;
}
