/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { styled, useTheme } from '@mui/material/styles';
import { Button, Box, Divider, IconButton, MenuItem, Typography, Stack } from '@mui/material';
import {
  useAddress,
  useMetamask,
  useCoinbaseWallet,
  useWalletConnect,
  useSDK,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react';
import { getDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { signInWithCustomToken } from 'firebase/auth';
import useLocalStorage from 'use-local-storage';
import { capitalize, lowerCase, replace } from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Iconify from 'src/components/Iconify';
import MenuPopover from 'src/components/MenuPopover';

import Image from './Image';
import { truncateMiddle } from 'src/utils/text';
import useFirebaseDocument from 'src/lib/useFirebaseUserDocument';
import initializeFirebaseClient from 'src/lib/initFirebase';
import { decimalPrecision } from 'src/utils/formatNumber';
import Cookies from 'js-cookie';
import { alchemySettings, COOKIE_KEYS, THIRDWEB } from 'src/config';
import { Alchemy } from 'alchemy-sdk';

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

const WalletInsider = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 18,
}));

const WalletProviderWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isMetamask',
})(({ theme, isMetamask }) => ({
  borderRadius: '50%',
  margin: theme.spacing(2, 0, 0, 0),
  backgroundColor: theme.palette.grey[350],
  ...(isMetamask && { padding: theme.spacing('10px') }),
}));

const WalletTitle = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 10,
}));

export default function WalletPopover() {
  const address = useAddress();
  const [lsProvider] = useLocalStorage(THIRDWEB.provider);
  const sdk = useSDK();
  const connectMetamask = useMetamask();
  const connectCoinbase = useCoinbaseWallet();
  const connectWalletConnect = useWalletConnect();
  const { auth, db } = initializeFirebaseClient();
  const { document } = useFirebaseDocument();
  const walletProvider =
    document?.provider || Cookies.get(COOKIE_KEYS.provider) || replace(lowerCase(lsProvider), /\s/i, '');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const theme = useTheme();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    closeSnackbar();
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const fetchWalletBalance = useCallback(async () => {
    try {
      const alchemy = new Alchemy(alchemySettings);
      const data = await alchemy.core.getTokenBalances(address, 'erc20');
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleConnect = async (provider) => {
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
      if (address) signIn(provider);
    }
  };

  const signIn = useCallback(
    async (provider) => {
      if (!address) return;
      const payload = await sdk?.auth?.login(process.env.NEXT_PUBLIC_NFTR_DOMAIN);

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload, provider }),
      });

      const { token } = await res.json();

      signInWithCustomToken(auth, token)
        .then((userCredential) => {
          const user = userCredential.user;

          const usersRef = doc(db, 'users', user?.uid);
          getDoc(usersRef).then((doc) => {
            if (!doc.exists()) {
              setDoc(usersRef, { createdAt: serverTimestamp(), provider }, { merge: true });
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [address]
  );

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const { data: balance, isLoading: isLoadingBalance } = useContractRead(contract, 'balanceOf', address);
  const { data: symbol, isLoading: isLoadingSymbol } = useContractRead(contract, 'symbol');
  const userBalance = balance ? balance.toNumber() : 0;
  const isLoadingBS = isLoadingBalance || isLoadingSymbol;

  // useEffect(() => {
  //   if (address) fetchWalletBalance();
  // }, [address]);

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ color: 'text.primary' }}>
        <Iconify icon="nft:wallet" />
      </IconButton>

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
        {address ? (
          <Stack spacing={0.75}>
            <WalletTitle>
              <Typography variant="title2012" textAlign="center">
                {capitalize(walletProvider)} Wallet
              </Typography>
            </WalletTitle>
            <Divider />
            <WalletInsider>
              <WalletProviderWrapper isMetamask={walletProvider === 'metamask'}>
                <Image
                  src={`/img/${walletProvider}.png`}
                  sx={{
                    width: walletProvider === 'metamask' ? 50 : 60,
                    height: walletProvider === 'metamask' ? 50 : 60,
                  }}
                  disabledEffect
                  alt={walletProvider}
                />
              </WalletProviderWrapper>
              <Typography variant="title3020">
                {isLoadingBS ? (
                  <Iconify icon="eos-icons:loading" sx={{ width: 30, height: 30, color: 'primary.main' }} />
                ) : (
                  <span>
                    {decimalPrecision(userBalance, '000')} {symbol}
                  </span>
                )}
              </Typography>
              {!document && (
                <Button variant="gradient" sx={{ mb: 2, width: '100%' }} onClick={() => signIn(walletProvider)}>
                  Sign In with Wallet
                </Button>
              )}
            </WalletInsider>
            <Divider />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center" sx={{ mt: 2 }}>
              <Typography variant="text1410" fontWeight="bold">
                Your Address:
              </Typography>
              <Typography variant="text1410">{truncateMiddle(address, 24, '....', 9)}</Typography>

              <CopyToClipboard text={address} onCopy={() => enqueueSnackbar('Address has been coppied')}>
                <Button variant="copy" type="button">
                  <Typography variant="body5">Copy</Typography>
                </Button>
              </CopyToClipboard>
            </Stack>
          </Stack>
        ) : (
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
        )}
      </MenuPopover>
    </>
  );
}
