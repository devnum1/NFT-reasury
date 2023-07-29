/** routes */
import { PATH_DASHBOARD, PATH_SOCIAL } from 'src/routes/paths';
/** components */
import Iconify from 'src/components/Iconify';

/** ---------------------------------------------------------------------- */

const getIcon = (name, sx) => <Iconify icon={name} sx={sx} />;

const ICONS = {
  home: 'kei:home',
  laptop: 'kei:laptop',
  layers: 'kei:layers',
  flash: 'kei:flash',
  arrowFromRight: 'kei:arrow-from-right',
  wrap: 'kei:wrap',
  bridge: 'kei:bridge',
  chat: 'kei:chat',
  users: 'kei:users-alt',
  file: 'kei:file-alt',
  bug: 'kei:bug',
  heart: 'kei:heart',
  swap: 'kei:arrows-h-alt',
  referral: 'kei:game-structure',
  facebook: 'kei:dashboard-facebook',
  telegram: 'kei:dashboard-telegram',
  youtube: 'kei:dashboard-youtube',
  discord: 'kei:dashboard-discord',
};

const navConfig = [
  {
    items: [
      {
        title: 'home',
        transKey: 'menu.home',
        path: PATH_DASHBOARD.root,
        icon: getIcon(ICONS.home),
      },
    ],
  },
  {
    items: [
      {
        title: 'forum',
        transKey: 'menu.forum',
        path: PATH_DASHBOARD.root,
        icon: getIcon(ICONS.chat),
      },
    ],
  },
];

export const navSocialConfig = [
  {
    title: 'facebook',
    path: PATH_SOCIAL.facebook,
    icon: getIcon(ICONS.facebook),
  },
  {
    title: 'telegram',
    path: PATH_SOCIAL.telegram,
    icon: getIcon(ICONS.telegram),
  },
  {
    title: 'youtube',
    path: PATH_SOCIAL.youtube,
    icon: getIcon(ICONS.youtube),
  },
  {
    title: 'discord',
    path: PATH_SOCIAL.discord,
    icon: getIcon(ICONS.discord),
  },
];

export default navConfig;
