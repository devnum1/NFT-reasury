// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'majesticons:home-analytics'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Products',
    icon: <Iconify icon={'fa-solid:gem'} {...ICON_SIZE} />,
    path: '/?products',
  },
  {
    title: 'Progress',
    icon: <Iconify icon={'carbon:in-progress'} {...ICON_SIZE} />,
    path: '/?progress',
  },
  {
    title: 'Documentation',
    icon: <Iconify icon={'entypo:text-document-inverted'} {...ICON_SIZE} />,
    path: '/?documentation',
  },
];

export default menuConfig;
