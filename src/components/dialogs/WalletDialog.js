import { forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Dialog, Typography, Zoom, Divider, Stack, MenuItem } from '@mui/material';
import { useMetamask, useCoinbaseWallet, useWalletConnect } from '@thirdweb-dev/react';

import Image from 'src/components/Image';
import Cookies from 'js-cookie';
import { COOKIE_KEYS } from 'src/config';

const ContentStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2, 3),
}));

const MenuTitle = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
  marginBottom: 20,
}));

const MenuInsider = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 15,
}));

const Transition = forwardRef((props, ref) => <Zoom ref={ref} {...props} />);

export default function WalletDialog({ handleClose, isOpen }) {
  const connectMetamask = useMetamask();
  const connectCoinbase = useCoinbaseWallet();
  const connectWalletConnect = useWalletConnect();

  const handleConnect = async (provider) => {
    Cookies.set(COOKIE_KEYS.provider, provider);
    if (provider === 'coinbase') {
      await connectCoinbase();
    } else if (provider === 'walletconnect') {
      await connectWalletConnect();
    } else {
      await connectMetamask();
    }
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      open={isOpen}
      maxWidth={'xs'}
      onClose={handleClose}
      fullWidth={true}
      BackdropProps={{ className: 'blurred-backdrop' }}
    >
      <ContentStyle>
        <Stack spacing={0.75}>
          <MenuTitle>
            <Typography variant="title2012" textAlign="center">
              Connect Your Wallet
            </Typography>
            <Typography variant="title1412" textAlign="center" color="text.tertiary">
              Select your preferred wallet below.
            </Typography>
          </MenuTitle>
          <Divider />
          <MenuItem onClick={() => handleConnect('metamask')}>
            <MenuInsider>
              <Image src="/img/metamask.png" sx={{ width: 50, height: 50 }} disabledEffect alt="Metamask" />
              <Typography variant="title1412" fontWeight={600}>
                Metamask
              </Typography>
            </MenuInsider>
          </MenuItem>
          <MenuItem onClick={() => handleConnect('coinbase')}>
            <MenuInsider>
              <Image src="/img/coinbase.png" sx={{ width: 50, height: 50 }} disabledEffect alt="Coinbase" />
              <Typography variant="title1412" fontWeight={600}>
                Coinbase
              </Typography>
            </MenuInsider>
          </MenuItem>
          <MenuItem onClick={() => handleConnect('walletconnect')}>
            <MenuInsider>
              <Image src="/img/walletconnect.png" sx={{ width: 50, height: 50 }} disabledEffect alt="WalletConnect" />
              <Typography variant="title1412" fontWeight={600}>
                WalletConnect
              </Typography>
            </MenuInsider>
          </MenuItem>
        </Stack>
      </ContentStyle>
    </Dialog>
  );
}
