import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// hooks
import useCollapseDrawer from 'src/hooks/useCollapseDrawer';
// config
import { HEADER, NAVBAR } from 'src/config';
//
import DashboardHeader from './header';
import NavbarVertical from './navbar/NavbarVertical';

/** ---------------------------------------------------------------------- */

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));

/** ---------------------------------------------------------------------- */

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  fallbackUrl: PropTypes.string,
  title: PropTypes.string,
  withBackButton: PropTypes.bool,
};

export default function DashboardLayout({ children, fallbackUrl, title, withBackButton }) {
  const { collapseClick, isCollapse } = useCollapseDrawer();

  const [open, setOpen] = useState(false);

  const verticalLayout = false;

  if (verticalLayout) {
    return (
      <>
        <DashboardHeader
          onOpenSidebar={() => setOpen(true)}
          verticalLayout={verticalLayout}
          title={title}
          withBackButton={withBackButton}
          fallbackUrl={fallbackUrl}
        />

        <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

        <Box
          component="main"
          sx={{
            px: { lg: 2 },
            pt: {
              xs: `${HEADER.MOBILE_HEIGHT}px`,
              lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT}px`,
            },
            pb: {
              xs: `${HEADER.MOBILE_HEIGHT}px`,
              lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT}px`,
            },
          }}
        >
          {children}
        </Box>
      </>
    );
  }

  return (
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      <DashboardHeader
        isCollapse={isCollapse}
        onOpenSidebar={() => setOpen(true)}
        title={title}
        withBackButton={withBackButton}
        fallbackUrl={fallbackUrl}
      />

      <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

      <MainStyle collapseClick={collapseClick}>{children}</MainStyle>
    </Box>
  );
}
