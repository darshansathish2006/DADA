import type { CSSProperties } from 'react';

/**
 * Props that opt an element into the fade-and-rise entrance (see RevealController and the
 * `[data-reveal]` rules in globals.css). Spread onto any server or client element:
 *
 *   <li {...reveal(80)}>…</li>
 */
export const reveal = (delayMs = 0): { 'data-reveal': string; style?: CSSProperties } => ({
  'data-reveal': '',
  ...(delayMs > 0 ? { style: { '--reveal-delay': `${delayMs}ms` } as CSSProperties } : {}),
});
