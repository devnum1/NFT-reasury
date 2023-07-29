// @mui
import { alpha, styled } from '@mui/material/styles';
import { Button, Popover } from '@mui/material';
// config
import { NAVBAR } from 'src/config';

/** ---------------------------------------------------------------------- */

export const ListItemStyle = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'activeRoot' && prop !== 'activeSub' && prop !== 'subItem' && prop !== 'open',
})(({ activeRoot, activeSub, subItem, open, theme }) => {
  const isLight = theme.palette.mode === 'light';

  const activeRootStyle = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.menuActive,
    boxShadow: `-2px 4px 6px 0 ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.16)}`,
  };

  return {
    ...theme.typography.body2,
    margin: theme.spacing(0),
    padding: theme.spacing(0, 1),
    color: theme.palette.text.secondary,
    height: NAVBAR.DASHBOARD_ITEM_HORIZONTAL_HEIGHT,
    minWidth: 76, // NAVBAR.DASHBOARD_ITEM_HORIZONTAL_WIDTH,
    maxWidth: 108, // NAVBAR.DASHBOARD_ITEM_HORIZONTAL_WIDTH,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'initial',

    '@media screen and (min-width: 500px) and (max-width: 606px)': {
      width: 108,
    },

    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
    },
    // activeRoot
    ...(activeRoot && {
      ...theme.typography.subtitle2,
      ...activeRootStyle,
      '&:hover': { ...activeRootStyle },
      '&>span': {
        color: theme.palette.primary.main,
      },
    }),
    // activeSub
    ...(activeSub && {
      ...theme.typography.subtitle2,
      color: theme.palette.text.primary,
    }),
    // subItem
    ...(subItem && {
      width: '100%',
      margin: 0,
      paddingRight: 0,
      paddingLeft: theme.spacing(1),
      justifyContent: 'space-between',
    }),
    // open
    ...(open &&
      !activeRoot && {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.hover,
      }),
  };
});

/** ---------------------------------------------------------------------- */

export const PaperStyle = styled(Popover)(({ theme }) => ({
  pointerEvents: 'none',
  '& .MuiPopover-paper': {
    width: 160,
    pointerEvents: 'auto',
    padding: theme.spacing(1),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    boxShadow: theme.customShadows.dropdown,
  },
}));
