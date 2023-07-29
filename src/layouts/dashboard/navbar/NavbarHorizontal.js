import { memo } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { AppBar } from '@mui/material';
// config
import { NAVBAR } from 'src/config';
// components
import { NavSectionHorizontal } from 'src/components/nav-section';
//
import { navMobileConfig, navSocialConfig } from './NavConfig';

/** ---------------------------------------------------------------------- */

const RootStyle = styled(AppBar)(({ theme }) => ({
  transition: theme.transitions.create('top', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  width: '100%',
  position: 'fixed',
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(0),
  boxShadow: theme.customShadows.z8,
  top: `calc( 100% - ${NAVBAR.DASHBOARD_MOBILE_HEIGHT}px )`,
  bottom: 0,
  height: NAVBAR.DASHBOARD_MOBILE_HEIGHT,
  backgroundColor: theme.palette.background.default,
  WebkitBackfaceVisibility: 'hidden',
}));

/** ---------------------------------------------------------------------- */

function NavbarHorizontal() {
  return (
    <RootStyle>
      <NavSectionHorizontal navConfig={navMobileConfig} navSocialConfig={navSocialConfig} />
    </RootStyle>
  );
}

export default memo(NavbarHorizontal);
