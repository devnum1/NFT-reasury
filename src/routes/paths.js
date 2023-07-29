/**
 * ----------------------------------------------------------------------
 */

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
/**
 * ----------------------------------------------------------------------
 */

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
};

export const PATH_PAGE = {
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
};

export const PATH_SOCIAL = {
  facebook: 'https://facebook.com',
  telegram: 'https://telegram.org',
  youtube: 'https://youtube.com',
  discord: 'https://discord.com',
};
