/* eslint-disable react/prop-types */
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
import { getDoc, doc } from 'firebase/firestore';
import Identicons from 'react-identicons';

import Image from 'src/components/Image';
import Avatar from 'src/components/Avatar';
import initializeFirebaseClient from 'src/lib/initFirebase';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { truncateMiddle } from 'src/utils/text';

const Vertical10 = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing('10px'),

  '.description': {
    color: theme.palette.text.tertiary,
    minHeight: '60px',
  },
}));

const InfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing('10px'),
  minHeight: 50,
  padding: theme.spacing('10px', '20px'),
}));

const avatarSize = 30;

export default function OwnedBy({ sellerAddress }) {
  // user wallet address
  const address = useAddress();
  const isMyNFT = address === sellerAddress;
  const { db } = initializeFirebaseClient();
  const usersRef = doc(db, 'users', sellerAddress);
  const [user, setUser] = useState(null);

  const getUser = useCallback(async () => {
    const selectedUserDocument = await getDoc(usersRef);
    if (selectedUserDocument.exists()) {
      setUser(selectedUserDocument.data());
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box>
      <Vertical10>
        <Typography variant="text1412" component="h5" color="text.tertiary" fontWeight={500}>
          Owned by
        </Typography>
        <Card variant="default">
          <InfoBox>
            <Avatar sx={{ height: avatarSize, width: avatarSize }}>
              {user?.avatar && (
                <Image
                  src={user?.avatar}
                  alt={user?.username || '--'}
                  width={avatarSize}
                  ratio="1/1"
                  height={avatarSize}
                  sx={{ width: avatarSize, height: avatarSize }}
                />
              )}
            </Avatar>
            <Typography variant="text1412" component="h5" sx={{ pt: 0.5 }}>
              {user?.username ? `@${user?.username}` : truncateMiddle(sellerAddress, 10, '....', 8)}
            </Typography>
            {/* {isMyNFT && (
              <Typography variant="text1210" component="small" sx={{ pt: 0.7 }} fontWeight="normal">
                (YOU)
              </Typography>
            )} */}
          </InfoBox>
        </Card>
      </Vertical10>
    </Box>
  );
}
