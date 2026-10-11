import type { AnchorHTMLAttributes, ImgHTMLAttributes } from 'react';

/** Keep all copied portfolio routes inside the consultancy subsite. */
export function portfolioHref(href: string) {
  if (href.startsWith('/work/')) return `/consultancy${href.replace(/\/$/, '')}/`;
  if (href === '/' || href.startsWith('/#')) return `/consultancy${href}`;
  return href;
}

export function Link({ href = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a href={portfolioHref(href)} {...props} />;
}

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean; quality?: number };
export function Image({ src = '', priority = false, quality: _quality, ...props }: ImageProps) {
  return <img {...props} src={src.startsWith('/projects/') ? `/consultancy${src}` : src}
    loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />;
}
