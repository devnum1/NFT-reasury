import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Typography } from '@mui/material';
// hooks
import useOffSetTop from 'src/hooks/useOffSetTop';
import useResponsive from 'src/hooks/useResponsive';
// utils
import cssStyles from 'src/utils/cssStyles';
// config
import { HEADER, NAVBAR } from 'src/config';
// components
import Iconify from 'src/components/Iconify';
import { IconButtonAnimate } from 'src/components/animate';
import ProfilePopover from 'src/components/ProfilePopover';
//
// import NetworkPopover from './NetworkPopover';

/** ---------------------------------------------------------------------- */

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  color: theme.palette.text.primary,
  backgroundImage: 'none',
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

const BackStyle = styled((props) => <Typography variant="h4" component="a" {...props} />)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
  alignItems: 'center',
}));

/** ---------------------------------------------------------------------- */

DashboardHeader.propTypes = {
  fallbackUrl: PropTypes.string,
  isCollapse: PropTypes.bool,
  onOpenSidebar: PropTypes.func,
  title: PropTypes.string,
  verticalLayout: PropTypes.bool,
  withBackButton: PropTypes.bool,
  withNetwork: PropTypes.bool,
};

export default function DashboardHeader({
  fallbackUrl = '/dashboard',
  isCollapse = false,
  onOpenSidebar,
  title,
  verticalLayout = false,
  withBackButton,
}) {
  const router = useRouter();
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;
  const isMobile = useResponsive('down', 'lg');

  const handleBack = () => {
    if (window?.history?.length > 1) {
      router.back()
    } else {
      router.push(fallbackUrl)
    }
  }

  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        {isMobile && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}
        {title && (
          <Fragment>
            {withBackButton ? (
              <BackStyle onClick={handleBack}>
                <Iconify icon="kei:arrow-left" sx={{ height: 24, width: 24 }} />
                <span>{title}</span>
              </BackStyle>
            ) : (
              <Typography variant="h4" component="h1">
                {title}
              </Typography>
            )}
          </Fragment>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }}>
          <ProfilePopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
