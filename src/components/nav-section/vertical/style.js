/** @mui */
import { styled, alpha } from '@mui/material/styles';
import { ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
/** config */
import { ICON, NAVBAR } from 'src/config';

/** ---------------------------------------------------------------------- */

export const ListItemStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) =>
    prop !== 'activeRoot' && prop !== 'activeSub' && prop !== 'subItem' && prop !== 'isComingSoon',
})(({ activeRoot, activeSub, subItem, isComingSoon, theme }) => ({
  ...theme.typography.body1,
  backgroundImage: 'none',
  fontWeight: 400,
  position: 'relative',
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  textTransform: 'capitalize',
  paddingLeft: 0,
  paddingRight: theme.spacing(1.5),
  marginBottom: theme.spacing(0.5),
  marginLeft: 14,
  marginRight: 16,
  color: theme.palette.text.secondary,
  borderRadius: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
  },
  // activeRoot
  ...(activeRoot && {
    ...theme.typography.body1,
    fontWeight: 700,

    color: theme.palette.text.primary,
  }),
  // activeSub
  ...(activeSub && {
    ...theme.typography.body1,
    fontWeight: 900,
    color: theme.palette.text.primary,
  }),
  // subItem
  ...(subItem && {
    height: NAVBAR.DASHBOARD_ITEM_SUB_HEIGHT,
  }),
  ...(isComingSoon && {
    cursor: 'default',
    height: NAVBAR.DASHBOARD_ITEM_SUB_HEIGHT + 16,
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(2.5),
    justifyContent: 'flex-start',
    '& .comingSoon': {
      position: 'absolute',
      bottom: 4,
      left: 56,
      borderRadius: 5,
      fontSize: 11,
      fontWeight: 400,
      color: alpha(theme.palette.text.primary, 0.5),
      backgroundColor: alpha(theme.palette.text.primary, 0.1),
    },
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.text.secondary,
    },
  }),
}));

export const ListItemTextStyle = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== 'isCollapse',
})(({ isCollapse, theme }) => ({
  whiteSpace: 'nowrap',
  transition: theme.transitions.create(['width', 'opacity'], {
    duration: theme.transitions.duration.shorter,
  }),
  ...(isCollapse && {
    width: 0,
    opacity: 0,
  }),
}));

export const ListItemIconStyle = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'activeRoot',
})(({ activeRoot, theme }) => ({
  width: ICON.NAVBAR_ITEM,
  height: ICON.NAVBAR_ITEM,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': { width: '100%', height: '100%' },
  ...(activeRoot && {
    color: theme.palette.text.primary,
  }),
}));
