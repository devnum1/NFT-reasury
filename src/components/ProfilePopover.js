/* eslint-disable react/prop-types */
import { useState, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useLogout, useDisconnect } from '@thirdweb-dev/react';
import { getAuth, signOut } from 'firebase/auth';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Divider, MenuItem, Skeleton, Stack, Typography } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Iconify from 'src/components/Iconify';
import Avatar from 'src/components/Avatar';
import Image from 'src/components/Image';
import MenuPopover from 'src/components/MenuPopover';
// configs
import useFirebaseDocument from 'src/lib/useFirebaseUserDocument';
import Cookies from 'js-cookie';
import { COOKIE_KEYS } from 'src/config';
import { useRouter } from 'next/router';

/** ---------------------------------------------------------------------- */

const ProfileBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(2),
  alignItems: 'center',
  padding: theme.spacing(1, 0),
}));

const CircleWrapper = styled(Box)(() => ({
  height: 40,
  width: 40,
  backgroundColor: '#E0E3E8',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
}));

const MenuInsider = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 15,
}));


export default function ThemePopover({ logoutCallback }) {
  const { document: user, isLoading } = useFirebaseDocument();
  const { closeSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useResponsive('down', 'sm');
  const avatarSize = isMobile ? 36 : 50;
  const twLogout = useLogout();
  const disconnectWallet = useDisconnect();
  const auth = getAuth();
  const router = useRouter();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    closeSnackbar();
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = useCallback(async () => {
    logoutCallback();
    Cookies.remove(COOKIE_KEYS);
    setOpen(null);
    if (auth) {
      await signOut(auth);
    }
    router.push('/').then(() => {
      disconnectWallet();
      twLogout();
    });
  }, []);

  if (isLoading) return <ProfilePopverSkeleton isMobile={isMobile} />;

  return (
    <>
      <ProfileBox onClick={handleOpen} sx={{ cursor: 'pointer' }}>
        <Avatar sx={{ width: avatarSize, height: avatarSize, border: '5px solid white' }}>
          {user?.avatar && (
            <Image
              src={user?.avatar}
              alt={user?.username}
              width={avatarSize}
              ratio="1/1"
              height={avatarSize}
              sx={{ width: avatarSize, height: avatarSize }}
            />
          )}
        </Avatar>
      </ProfileBox>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          p: 3,
          maxWidth: 470,
          width: 300,
          borderRadius: '30px',
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '&.Mui-selected': {
              backgroundColor: theme.palette.background.popActive,
              fontWeight: 700,
              '&:hover': {
                backgroundColor: theme.palette.background.popActive,
              },
            },
          },
        }}
        BackdropProps={{
          className: 'profile-popover-backdrop',
        }}
      >
        <Stack spacing={0.75}>
          <Typography variant="title2012" textAlign="center" sx={{ mb: 2 }}>
            Profile
          </Typography>
          <Divider />
          <MenuItem
            onClick={() => {
              handleLogout();
            }}
          >
            <MenuInsider>
              <CircleWrapper>
                <Iconify icon="humbleicons:logout" />
              </CircleWrapper>
              <Typography variant="title1412" fontWeight={600}>
                Log out
              </Typography>
            </MenuInsider>
          </MenuItem>
        </Stack>
      </MenuPopover>
    </>
  );
}

export const ProfilePopverSkeleton = ({ isMobile }) => {
  const avatarSize = isMobile ? 36 : 50;
  return (
    <ProfileBox>
      <Skeleton variant="circular" width={avatarSize} height={avatarSize} />
    </ProfileBox>
  );
};
