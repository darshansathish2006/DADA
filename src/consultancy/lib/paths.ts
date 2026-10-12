import { sitePath } from '../../site-paths';

/** Resolve assets and native anchors from the imported consultancy app. */
export function publicPath(path: string) {
  return path.startsWith('/') && !path.startsWith('//')
    ? sitePath(`/consultancy${path}`)
    : path;
}
