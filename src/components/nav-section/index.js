// import { matchPath } from 'react-router-dom';

/** ---------------------------------------------------------------------- */

export { default as NavSectionVertical } from './vertical';
export { default as NavSectionHorizontal } from './horizontal';

export function isExternalLink(path) {
  if (!path) return false
  return path.includes('http');
}

export function getActive(path, pathname, asPath) {
  if (path === '/') return pathname === '/';
  if (path === '/dashboard') return pathname === '/dashboard';
  return pathname.includes(path) || asPath.includes(path);
}
