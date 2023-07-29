import PropTypes from 'prop-types';
import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Box, Button, Drawer, Typography, Chip, Stack } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import useCollapseDrawer from 'src/hooks/useCollapseDrawer';
// utils
import cssStyles from 'src/utils/cssStyles';
// config
import { NAVBAR } from 'src/config';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// components
import Logo from 'src/components/Logo';
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';
import { NavSectionVertical } from 'src/components/nav-section';
import navConfig, { navSocialConfig } from './NavConfig';
// import CollapseButton from './CollapseButton';

/** ---------------------------------------------------------------------- */

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

/** ---------------------------------------------------------------------- */

NavbarVertical.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }) {
  const theme = useTheme();

  const { pathname } = useRouter();

  const isDesktop = useResponsive('up', 'lg');
  const isMobile = useResponsive('down', 'lg');

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Stack
        spacing={4}
        sx={{
          pt: 4,
          pb: 1,
          px: 2,
          flexShrink: 0,
          ...(isCollapse && { alignItems: 'center' }),
        }}
      >
        <Stack direction="column" alignItems="center" justifyContent="space-between">
          <Logo height={46} href={PATH_DASHBOARD.root} mode={theme?.palette?.mode} />
        </Stack>
        <Button
          variant="containedGradient"
          size="large"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 56,
          }}
        >
          <Iconify icon="kei:logo" sx={{ width: 31, height: 26 }} />
          <Box component="span" sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
            <Typography variant="body1" fontWeight={700}>
              Kei Finance
            </Typography>
            <Chip
              label="PRO"
              sx={{
                backgroundColor: alpha(theme.palette.common.white, 0.3),
                borderRadius: '6px',
                color: 'common.white',
              }}
            />
          </Box>
          <Iconify icon="kei:arrow-up-right" sx={{ width: 24, height: 24 }} />
        </Button>
      </Stack>

      <NavSectionVertical navConfig={navConfig} isCollapse={isCollapse} socialConfig={navSocialConfig} />
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      {isMobile && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: NAVBAR.DASHBOARD_WIDTH, backgroundColor: 'background.navbar', backgroundImage: 'none' },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              backgroundColor: 'background.navbar',
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightWidth: 0,
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: (theme) => theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
