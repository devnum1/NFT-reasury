/* eslint-disable react/prop-types */
import { useState, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Divider, MenuItem, Typography, Stack } from '@mui/material';
import {
  useAddress,
  useMetamask,
  useCoinbaseWallet,
  useWalletConnect,
  useSDK,
  useContract,
  useContractRead,
  useNetwork,
  useNetworkMismatch,
} from '@thirdweb-dev/react';
import { getDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { signInWithCustomToken } from 'firebase/auth';

import MenuPopover from 'src/components/MenuPopover';

import Image from './Image';
import initializeFirebaseClient from 'src/lib/initFirebase';
import { COOKIE_KEYS } from 'src/config';
import Cookies from 'js-cookie';
import useResponsive from 'src/hooks/useResponsive';
import Avatar from './Avatar';
import AutoLogin from './AutoLogin';
import useFirebaseUser from 'src/lib/useFirebaseUser';
// import useFirebaseDocument from '../lib/useFirebaseUserDocument';
import sleep from 'sleep-promise';

const MenuInsider = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 15,
}));

const MenuTitle = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 30,
  marginBottom: 20,
}));

export default function EmptyProfile({ isLogouting }) {
  const address = useAddress();
  const [stateProvider, setProvider] = useState(null);
  const sdk = useSDK();
  const isMobile = useResponsive('down', 'sm');
  const avatarSize = isMobile ? 36 : 50;
  const connectMetamask = useMetamask();
  const connectCoinbase = useCoinbaseWallet();
  const connectWalletConnect = useWalletConnect();
  const { auth, db } = initializeFirebaseClient();
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const { closeSnackbar } = useSnackbar();
  const theme = useTheme();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    closeSnackbar();
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleConnect = async (provider) => {
    setProvider(provider);
    Cookies.set(COOKIE_KEYS.provider, provider);
    let response;
    if (provider === 'coinbase') {
      response = await connectCoinbase();
    } else if (provider === 'walletconnect') {
      response = await connectWalletConnect();
    } else {
      response = await connectMetamask();
    }
    if (response?.data?.account) {
      if (address) signIn();
    }
  };

  const signIn = useCallback(async () => {
    if (!address) return;
    if (networkMismatch) {
      switchNetwork && switchNetwork(Number(process.env.NEXT_PUBLIC_DESIRED_CHAIN_ID));
    }
    const payload = await sdk?.auth?.login(process.env.NEXT_PUBLIC_NFTR_DOMAIN);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload, provider: stateProvider }),
    });

    const { token } = await res.json();

    signInWithCustomToken(auth, token)
      .then((userCredential) => {
        const user = userCredential.user;

        const usersRef = doc(db, 'users', user?.uid);
        getDoc(usersRef).then((doc) => {
          if (!doc.exists()) {
            setDoc(usersRef, { createdAt: serverTimestamp(), provider: stateProvider }, { merge: true });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [address, stateProvider]);

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const { data: balance, isLoading: isLoadingBalance } = useContractRead(contract, 'balanceOf', address);
  const { data: symbol, isLoading: isLoadingSymbol } = useContractRead(contract, 'symbol');
  const userBalance = balance ? balance.toNumber() : 0;
  const isLoadingBS = isLoadingBalance || isLoadingSymbol;

  return (
    <>
      <Avatar
        sx={{ width: avatarSize, height: avatarSize, border: '5px solid white', cursor: 'pointer' }}
        onClick={handleOpen}
      />
      {address && !isLogouting && <AutoLogin signIn={signIn} />}
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          p: 3,
          maxWidth: 520,
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
        {/* {address ? (
          <Stack spacing={0.75}>
            <WalletTitle>
              <Typography variant="title2012" textAlign="center">
                Profile
              </Typography>
            </WalletTitle>
            <Divider />
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
              <Typography variant="body2" textAlign="center" sx={{ my: 1 }}>
                Connect your wallet to earn ETH with every trade
              </Typography>
            </Box>
            <Button variant="gradient" sx={{ mb: 2, width: '100%' }} onClick={() => signIn(walletProvider)}>
              Sign In with Wallet
            </Button>
          </Stack>
        ) : ( */}
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
        {/* )} */}
      </MenuPopover>
    </>
  );
}
