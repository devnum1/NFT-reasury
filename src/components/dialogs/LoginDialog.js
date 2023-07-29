import { useCallback, forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Dialog, Button, Typography, Zoom, IconButton } from '@mui/material';
import { useAddress, useSDK } from '@thirdweb-dev/react';
import { signInWithCustomToken } from 'firebase/auth';
import { getDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';

import initializeFirebaseClient from 'src/lib/initFirebase';
import useLocalStorage from 'use-local-storage';
import { THIRDWEB } from 'src/config';
import { isFunction, replace } from 'lodash';
import { lowerCase } from 'lodash';

const ContentStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2, 3),
}));

const Transition = forwardRef((props, ref) => <Zoom ref={ref} {...props} />);

export default function LoginDialog({ handleClose, isOpen, onSuccessCallback }) {
const [lsProvider] = useLocalStorage(THIRDWEB.provider);
  const address = useAddress();
  const sdk = useSDK();
  const { auth, db } = initializeFirebaseClient();
  const walletProvider = replace(lowerCase(lsProvider), /\s/i, '');

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
          if(isFunction(onSuccessCallback)) onSuccessCallback()
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [address]
  );

  return (
    <Dialog
      TransitionComponent={Transition}
      open={isOpen}
      maxWidth={'xs'}
      fullWidth={true}
      BackdropProps={{ className: 'blurred-backdrop' }}
    >
      <Box py={2} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
        <Typography variant="h5">Welcome to theNFtreasury</Typography>
      </Box>
      <ContentStyle>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" mb={4}>
          <Typography variant="body2" textAlign="center">
            Connect your wallet to earn ETH with every trade
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" gap={2} alignItems="center" justifyContent="center">
          <Button variant="default" size="large" sx={{ width: 160, height: 48 }} type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="gradient"
            sx={{ width: 160, height: 48, px: 0 }}
            type="button"
            onClick={() => signIn(walletProvider)}
          >
            Sign in
          </Button>
        </Box>
      </ContentStyle>
    </Dialog>
  );
}
