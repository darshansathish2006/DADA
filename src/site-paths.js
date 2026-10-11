/** Resolve bundled assets and links from Vite's deployment base (e.g. /DADA/). */
export function sitePath(path = '/', base = import.meta.env?.BASE_URL || '/') {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#|\?)/i.test(path)) return path;
  const prefix = `/${base.split('/').filter(Boolean).join('/')}/`.replace(/^\/\/$/, '/');
  if (prefix !== '/' && (path === prefix.slice(0, -1) || path.startsWith(prefix))) return path;
  return prefix + path.replace(/^\/+/, '');
}

/** Match application routes independently of the deployment directory. */
export function stripSiteBase(path, base = import.meta.env?.BASE_URL || '/') {
  const prefix = sitePath('/', base);
  return prefix !== '/' && path.startsWith(prefix) ? path.slice(prefix.length - 1) : path;
}
