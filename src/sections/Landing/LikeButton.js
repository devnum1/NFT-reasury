/* eslint-disable react/prop-types */
import { IconButton, useTheme } from '@mui/material';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { find } from 'lodash';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import LoginDialog from 'src/components/dialogs/LoginDialog';
import WalletDialog from 'src/components/dialogs/WalletDialog';

import Iconify from 'src/components/Iconify';
import initializeFirebaseClient from 'src/lib/initFirebase';
import useFirebaseDocument from 'src/lib/useFirebaseUserDocument';
import useFirebaseUser from 'src/lib/useFirebaseUser';
import likeNftAPI from '../../../pages/api/likeNft';

export default function LikeButton({ nft, address, user }) {
  const [isOpen, setOpen] = useState(false);
  const [isOpenLogin, setOpenLogin] = useState(false);
  const theme = useTheme();
  const { db } = initializeFirebaseClient();
  const { document: userDetail } = useFirebaseDocument();
  const { contractAddress, tokenId } = nft || {};
  const userFavorites = userDetail?.favorites || [];
  const [isFavorited, setIsFavorited] = useState(nft?.isLiked);

  const setFavorite = useCallback(async (isFavorited) => {
    try {
      const firebaseToken = await user.getIdToken();
      const data = await likeNftAPI({ id: nft?.tokenId, token: firebaseToken });
      setIsFavorited(data?.status === 201 ? !isFavorited : isFavorited);
    } catch (err) {
      console.error({ err });
    }
  }, []);

  const handleFavorite = async () => {
    if (!address) {
      setOpen(true);
      return;
    }
    if (!userDetail) {
      setOpenLogin(true);
      return;
    }
    setFavorite(isFavorited);
  };

  return (
    <>
      <IconButton
        type="button"
        onClick={handleFavorite}
        variant="default"
        sx={{
          height: 50,
          width: 50,
          minWidth: 0,
          borderRadius: '15px',
          color: isFavorited ? theme.palette.error.main : theme.palette.text.primary,
        }}
      >
        {isFavorited ? (
          <Iconify icon="bxs:heart" sx={{ width: 16, height: 16 }} />
        ) : (
          <Iconify icon="nft:heart" sx={{ width: 16, height: 16 }} />
        )}
      </IconButton>
      <LoginDialog
        isOpen={isOpenLogin}
        onSuccessCallback={() => setOpenLogin(false)}
        handleClose={() => setOpenLogin(false)}
      />
      <WalletDialog isOpen={isOpen} onSuccessCallback={() => setOpen(false)} handleClose={() => setOpen(false)} />
    </>
  );
}
