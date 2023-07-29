import { useState } from 'react';
import { useRouter } from 'next/router';
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Container, Button } from '@mui/material';
import { useAddress } from '@thirdweb-dev/react';

import useOffSetTop from 'src/hooks/useOffSetTop';
import useResponsive from 'src/hooks/useResponsive';
import { HEADER } from 'src/config';
import Logo from 'src/components/Logo';
import ProfilePopover from 'src/components/ProfilePopover';
import NavigationSwitch from 'src/components/NavigationSwitch';
import useFirebaseDocument from 'src/lib/useFirebaseUserDocument';

import cssStyles from 'src/utils/cssStyles';
import LoginDialog from 'src/components/dialogs/LoginDialog';
import WalletDialog from 'src/components/dialogs/WalletDialog';
import EmptyProfile from 'src/components/EmptyProfile';
import useFirebaseUser from 'src/lib/useFirebaseUser';
import Link from 'next/link';
import { grey } from '@mui/material/colors';

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },

  '& .navBtn': {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  '& .navBtn.navBtn--whitepaper': {
    marginLeft: theme.spacing(2),
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

const LeftBox = styled(Box)(() => ({
  width: 'calc(50% + 50px)',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const RightBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.spacing('30px'),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing('5px'),
  },
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const address = useAddress();
  const [isOpenLogin, setOpenLogin] = useState(false);
  const [isLogouting, setIsLogouting] = useState(false);
  const [isOpenWallet, setOpenWallet] = useState(false);
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);
  const { document, isLoading } = useFirebaseDocument();
  const { user, isLoading: isLoadingUser } = useFirebaseUser();

  const theme = useTheme();

  const { pathname, push } = useRouter();

  const isMobile = useResponsive('down', 'sm');
  const isDesktop = useResponsive('up', 'md');
  const avatarSize = isMobile ? 36 : 50;

  const isHome = pathname === '/';

  const navigate = () => {
    if (pathname === '/') return push('/profile');
    return push('/');
  };

  const logoutCallback = () => {
    setIsLogouting(true);
  };

  return (
    <AppBar sx={{ boxShadow: 0, background: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur({ opacity: 0.2 }),
            backgroundColor: alpha(theme.palette.background.default, 0.2),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 32 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <LeftBox>
            <Logo />
          </LeftBox>
          <RightBox>
            {/* <WalletPopover /> */}
            <Button component={Link} href="/crystal-list" sx={{ color: grey[900], fontSize: { xs: 10, sm: 12, md: 14 }, textAlign: 'center' }}>
              Crystal List
            </Button>
            <NavigationSwitch value={pathname} onChange={navigate} checked={pathname === '/profile'} />
            {user && !isLoading && !isLoadingUser ? (
              <ProfilePopover logoutCallback={logoutCallback} />
            ) : (
              <EmptyProfile isLogouting={isLogouting} />
            )}
          </RightBox>
        </Container>
      </ToolbarStyle>
      <LoginDialog
        isOpen={isOpenLogin}
        handleClose={() => setOpenLogin(false)}
        onSuccessCallback={() => setOpenLogin(false)}
      />
      <WalletDialog isOpen={isOpenWallet} handleClose={() => setOpenWallet(false)} />
      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
