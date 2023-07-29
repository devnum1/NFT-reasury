import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Box, IconButton, Backdrop } from '@mui/material';
// components
import MenuPopover from 'src/components/MenuPopover';
import { NavItemRoot } from './NavItem';
import { getActive } from 'src/components/nav-section';
import { some } from 'lodash';

/** ---------------------------------------------------------------------- */

const SocialStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(1),
  '& .socialBtn': {
    height: 32,
    width: 32,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.menuActive,
    color: theme.palette.text.primary,
  },
}));
export default function MoreMenuPopover({ navConfig, navSocialConfig }) {
  const { pathname, asPath } = useRouter();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <NavItemRoot
        onClick={handleOpen}
        item={navConfig}
        active={some(navConfig?.items.map((it) => getActive(it.path, pathname, asPath), Boolean))}
      />
      <Backdrop
        sx={{
          color: 'rgba(0, 0, 0, 0.68)',
          bottom: 108,
          backdropFilter: 'blur(10px)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={Boolean(open)}
        onClick={handleClose}
      >
        <MenuPopover
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          arrow="bottom-right"
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleClose}
          bg="background.nav"
          sx={{
            // bottom: 120,
            top: 'calc(100vh - 216px) !important',
            ml: 0.75,
            width: '100%',
            '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
          }}
          BackdropProps={{
            className: 'more-menu-backdrop',
          }}
        >
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Box display="flex" flexDirection="row">
              {navConfig?.items.map((item) => (
                <NavItemRoot key={item?.title} item={item} active={getActive(item.path, pathname, asPath)} />
              ))}
            </Box>
            {Array.isArray(navSocialConfig) && navSocialConfig.length > 0 && (
              <SocialStyle>
                <Box sx={{ display: 'flex', flexDirection: 'row' }} gap={1}>
                  {navSocialConfig.map((ns) => (
                    <IconButton
                      key={`ns.${ns?.id}`}
                      className="socialBtn"
                      component="a"
                      href={ns?.path}
                      target="_blank"
                    >
                      {ns.icon}
                    </IconButton>
                  ))}
                </Box>
              </SocialStyle>
            )}
          </Box>
        </MenuPopover>
      </Backdrop>
    </>
  );
}

MoreMenuPopover.propTypes = {
  navConfig: PropTypes.object,
  navSocialConfig: PropTypes.array,
};
