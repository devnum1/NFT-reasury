/* eslint-disable react/prop-types */
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CircularProgress, Container, Grid, IconButton, Typography } from '@mui/material';
import { ceil, first } from 'lodash';

import { decimalPrecision } from 'src/utils/formatNumber';
import Iconify from 'src/components/Iconify';
import NextImage from 'src/components/NextImage';
import OwnedBy from './OwnedBy';
import { useAddress, useContract, useContractWrite, useNetwork, useNetworkMismatch, useSDK } from '@thirdweb-dev/react';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { setLoaded } from 'src/redux/slices/refreshList';
import { useDispatch } from 'react-redux';
import WalletDialog from 'src/components/dialogs/WalletDialog';
import { fetchBuyingTransactions } from 'src/redux/slices/transactions';
import LikeButton from './LikeButton';
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import initializeFirebaseClient from 'src/lib/initFirebase';
import { ethers } from 'ethers';
import marketplaceABI from 'src/utils/marketplace.json';
import useFirebaseUser from 'src/lib/useFirebaseUser';
import { alchemySettings } from 'src/config';
import { Alchemy } from 'alchemy-sdk';
import { useCallback } from 'react';
import detailNftApi from '../../../pages/api/detailNft';

const RootStyle = styled('section')(({ theme }) => ({
  padding: theme.spacing('180px', 0, '100px'),
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  background: 'url(/img/bg-hero.png) no-repeat',
  backgroundSize: '100% 550px',
  backgroundPosition: 'top',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [theme.breakpoints.up('lg')]: {
    minHeight: 550,
  },

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing('120px', 0, '30px'),
  },

  '.CrystalImage': {
    borderRadius: '20px',
  },
}));

const DetailBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing('20px'),
  minHeight: '300px',
}));

const Vertical40 = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing('40px'),
}));

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
  gap: theme.spacing('10px'),
  minHeight: 50,
  padding: theme.spacing('10px', '20px'),
}));

const CrystalImageWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  minHeight: 357,

  [theme.breakpoints.down('sm')]: {
    minHeight: 0,
    height: '40vh',
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'transparent',
  position: 'absolute',
  right: '20px',
  top: '10px',
  [theme.breakpoints.down('sm')]: {
    top: '20px',
  },
}));

const HeroNftDetailThirdweb = ({ nft, onClose, isSelling, user, isProfile }) => {
  const [detailNft, setDetailNft] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  // modal login state
  const [isWalletOpen, setWalletOpen] = useState(false);
  // buying state
  const [isBuying, setBuying] = useState(false);
  // selling NFT
  const [isSellingProgress, setSellingProgress] = useState(false);
  // cancel listing
  const [isCanceling, setCanceling] = useState(false);
  // user wallet address
  const address = useAddress();
  // is the owner same as wallet owner
  const isMyNFT = address === detailNft?.listing?.tokenOwner;
  // firebase db
  const { db } = initializeFirebaseClient();

  // to check network mismatch
  const networkMismatch = useNetworkMismatch();
  // to switch network
  const [, switchNetwork] = useNetwork();
  const { enqueueSnackbar } = useSnackbar();
  // dispatch
  const dispatch = useDispatch();

  const wPrice = ethers.utils.parseEther(detailNft?.buyFor ?? '0');

  const { contract: nftreasuryMarketplace } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, 'marketplace');
  const { contract: nftreasuryMarketplace2 } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS);
  const { mutateAsync: buy, isLoading: isBuying2 } = useContractWrite(nftreasuryMarketplace2, 'buy');
  const sdk = useSDK();

  const fetchWalletBalance = useCallback(async () => {
    try {
      const alchemy = new Alchemy(alchemySettings);
      const data = await alchemy.core.getBalance(address, 'latest');
      setWalletBalance(parseFloat(ethers.utils.formatEther(data)));
    } catch (err) {
      setWalletBalance(0);
    }
  }, [address]);

  useEffect(() => {
    fetchWalletBalance();
  }, [address]);

  const saveTransaction = async (transactionDetail) => {
    const transactionRef = doc(db, 'transactions', transactionDetail?.transactionHash);
    getDoc(transactionRef).then((doc) => {
      if (!doc.exists()) {
        const { cumulativeGasUsed, effectiveGasPrice, events, logs, gasUsed, ...transaction } = transactionDetail || {};
        setDoc(
          transactionRef,
          {
            ...transaction,
            cumulativeGasUsed: cumulativeGasUsed?.toNumber(),
            effectiveGasPrice: effectiveGasPrice?.toNumber(),
            gasUsed: gasUsed?.toNumber(),
            createdAt: serverTimestamp(),
          },
          { merge: true }
        );
      }
    });
  };

  const recordTransaction = async (transactionDetail) => {
    await addDoc(collection(db, 'transactions'), transactionDetail);
  };

  const changeListingStatus = async (listingId, status) => {
    if (!user) return;
    try {
      const firebaseToken = await user.getIdToken();
      console.log('tes');
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${firebaseToken}` },
      };
      return fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}listings/set_listing_status?listingId=${listingId}&isListed=${status}`,
        options
      );
    } catch (err) {
      console.log('error');
      console.error(err);
    }
  };

  const handleBuy = async (listingId, price) => {
    if (!address) {
      setWalletOpen(true);
      return;
    }
    if (walletBalance < price) {
      enqueueSnackbar(
        <span>
          Failed to buy NFT
          <br />
          <small>Insufficient funds</small>
        </span>,
        {
          variant: 'error',
        }
      );
      return;
    }
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(Number(process.env.NEXT_PUBLIC_DESIRED_CHAIN_ID));
        return;
      }
      const weiPrice = ethers.utils.parseEther(price);

      setBuying(true);
      const buyParams = [listingId, address, 1, process.env.NEXT_PUBLIC_CURRENCY, weiPrice];
      const contractMarketplace = await sdk.getContractFromAbi(
        process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
        marketplaceABI.abi
      );
      const buyoutResponse = await contractMarketplace.call(
        'buy',
        listingId,
        address,
        1,
        process.env.NEXT_PUBLIC_CURRENCY,
        weiPrice,
        {
          value: weiPrice,
        }
      );
      await changeListingStatus(Number(listingId), false);
      recordTransaction({
        from: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
        to: address,
        action: 'buy',
        listingId,
        price: parseFloat(price),
        wei: weiPrice.toString(10),
        createdAt: serverTimestamp(),
      });
      recordTransaction({
        from: detailNft?.listing?.tokenOwner,
        to: address,
        action: 'sold',
        listingId,
        price: parseFloat(price),
        wei: weiPrice.toString(10),
        createdAt: serverTimestamp(),
      });
      enqueueSnackbar(`Successfully bought NFT: ${detailNft?.detail?.name}`, {
        variant: 'success',
      });
      setBuying(false);
      dispatch(setLoaded(false));
      dispatch(fetchBuyingTransactions(address));
      onClose();
    } catch (error) {
      setBuying(false);
      if (error?.reason && error?.reason === 'user rejected transaction') {
        enqueueSnackbar(<span>Transaction cancelled</span>, {
          variant: 'error',
        });
        return;
      }
      enqueueSnackbar(
        <span>
          Failed to buy NFT
          <br />
          <small>Please make sure your wallet is connected</small>
        </span>,
        {
          variant: 'error',
        }
      );
    }
  };

  const handleSell = async (listingId, price) => {
    if (!address) {
      setWalletOpen(true);
      return;
    }
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(Number(process.env.NEXT_PUBLIC_DESIRED_CHAIN_ID));
        return;
      }
      setSellingProgress(true);
      const weiPrice = ethers.utils.parseEther(price);
      await changeListingStatus(Number(listingId), true);

      recordTransaction({
        from: address,
        to: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
        action: 'sell',
        listingId,
        price: parseFloat(price),
        wei: weiPrice.toString(10),
        createdAt: serverTimestamp(),
      });
      enqueueSnackbar(`Successfully listed NFT: ${detailNft?.detail?.name}`, {
        variant: 'success',
      });
      setSellingProgress(false);
      dispatch(setLoaded(false));
      dispatch(fetchBuyingTransactions(address));
      onClose();
    } catch (err) {
      console.error(err);
      setSellingProgress(false);
      enqueueSnackbar(<span>Failed to sell NFT</span>, {
        variant: 'error',
      });
    }
  };

  const cancelNFT = async (listingId, price) => {
    if (!address) {
      setWalletOpen(true);
      return;
    }
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(Number(process.env.NEXT_PUBLIC_DESIRED_CHAIN_ID));
        return;
      }

      setCanceling(true);
      const weiPrice = ethers.utils.parseEther(price);
      await changeListingStatus(Number(listingId), false);
      recordTransaction({
        from: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
        to: address,
        action: 'cancel',
        listingId,
        price: parseFloat(price),
        wei: weiPrice.toString(10),
        createdAt: serverTimestamp(),
      });
      enqueueSnackbar(`NFT ${detailNft?.detail?.name} has been unlisted`, {
        variant: 'success',
      });
      setCanceling(false);
      dispatch(setLoaded(false));
      dispatch(fetchBuyingTransactions(address));
      onClose();
    } catch (error) {
      setCanceling(false);
      console.error(error);
      enqueueSnackbar(
        <span>
          Failed to cancel NFT
          <br />
          <small>Please make sure your wallet is connected</small>
        </span>,
        {
          variant: 'error',
        }
      );
    }
  };

  useEffect(() => {
    if (address) setWalletOpen(false);
  }, [address]);

  // Fetch Detail NFT
  const fetchDetail = async () => {
    setIsLoading(true);
    try {
      if (user) {
        const firebaseToken = await user.getIdToken();
        const data = await detailNftApi({ id: nft?.tokenId, token: firebaseToken, isProfile });
        setDetailNft(data);
      } else {
        const data = await detailNftApi({ id: nft?.tokenId, token: '', isProfile });
        setDetailNft(data);
      }

      setIsLoading(false);
    } catch (err) {
      console.error({ err });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [nft]);

  return (
    <RootStyle>
      {isLoading && (
        <Box
          sx={{ width: '100%', minHeight: 450, py: 10 }}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      {!isLoading && detailNft && (
        <Container>
          <Card variant="default" sx={{ borderRadius: '40px' }}>
            <DetailBox>
              <Grid container spacing={'20px'}>
                <Grid item xs={12} md={4}>
                  <CrystalImageWrapper>
                    <NextImage
                      loader={() => detailNft?.image}
                      src={detailNft?.image}
                      alt={detailNft?.detail?.name}
                      className="CrystalImage"
                      layout="fill"
                      objectFit="cover"
                    />
                  </CrystalImageWrapper>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Vertical40>
                    <Vertical10 sx={{ mt: 3 }}>
                      <Typography variant="title4025" component="h1">
                        {detailNft?.detail?.name}
                      </Typography>
                      <Typography variant="text1412" component="p" className="description">
                        {detailNft?.detail?.description}
                      </Typography>
                    </Vertical10>
                    <Grid container spacing={'30px'}>
                      <Grid item xs={12} sm={6}>
                        <OwnedBy sellerAddress={detailNft?.listing?.tokenOwner} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Vertical10>
                          <Typography variant="text1412" component="h5" color="text.tertiary" fontWeight={500}>
                            Collection
                          </Typography>
                          <Card variant="default">
                            <InfoBox>
                              <Typography variant="text1412" component="h5" sx={{ pt: 1 }}>
                                {detailNft?.detail?.category ?? '--'}
                              </Typography>
                            </InfoBox>
                          </Card>
                        </Vertical10>
                      </Grid>
                    </Grid>
                    {isSelling ? (
                      <Grid container spacing={'30px'}>
                        <Grid item xs={12} sm={6}>
                          <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ height: 56, alignSelf: 'center' }}
                          >
                            {nft?.isCancel ? (
                              <Box display="flex" flexDirection="row" gap={1} justifySelf="center">
                                <Typography variant="responsiveBody2" color="text.secondary">
                                  Sell for:
                                </Typography>
                                <Typography variant="responsiveBody2" fontWeight={600}>
                                  {(Math.floor(detailNft?.sellFor * 10) / 10).toFixed(1)} MATIC
                                </Typography>
                              </Box>
                            ) : (
                              <Box display="flex" flexDirection="row" gap={1} justifySelf="center">
                                <Typography variant="responsiveBody2" color="text.secondary">
                                  Bought for:
                                </Typography>
                                <Typography variant="responsiveBody2" fontWeight={600}>
                                  {(Math.ceil(detailNft?.buyFor * 10) / 10).toFixed(1)} MATIC
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Grid>
                        {nft?.isCancel ? (
                          <Grid item xs={12} sm={6}>
                            <Button
                              variant="gradient"
                              sx={{ width: '100%', fontWeight: 600, display: 'flex', flexDirection: 'row', gap: 1 }}
                              type="button"
                              onClick={() => cancelNFT(detailNft?.listing?.listingId, String(detailNft?.sellFor))}
                              disabled={isCanceling}
                            >
                              {isCanceling ? (
                                <>
                                  <span>Canceling</span>
                                  <Iconify icon="line-md:loading-twotone-loop" sx={{ width: 18, height: 18 }} />
                                </>
                              ) : (
                                <span>Cancel</span>
                              )}
                            </Button>
                          </Grid>
                        ) : (
                          <Grid item xs={12} sm={6}>
                            <Button
                              variant="gradient"
                              sx={{ width: '100%', fontWeight: 600, display: 'flex', flexDirection: 'row', gap: 1 }}
                              type="button"
                              onClick={() => handleSell(detailNft?.listing?.listingId, String(detailNft?.sellFor))}
                              disabled={isSellingProgress}
                            >
                              {isSellingProgress ? (
                                <>
                                  <span>Selling</span>
                                  <Iconify icon="line-md:loading-twotone-loop" sx={{ width: 18, height: 18 }} />
                                </>
                              ) : (
                                <>
                                  <span>Sell Now</span>
                                  <Iconify icon="akar-icons:arrow-right" />
                                  <span>{(Math.floor(detailNft?.sellFor * 10) / 10).toFixed(1)} MATIC</span>
                                </>
                              )}
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    ) : (
                      <Grid container spacing={'30px'}>
                        <Grid item xs={12} sm={6}>
                          <Button
                            variant="gradient"
                            sx={{ width: '100%', fontWeight: 600, display: 'flex', flexDirection: 'row', gap: 1 }}
                            onClick={() => handleBuy(detailNft?.listing?.listingId, detailNft?.buyFor)}
                            disabled={isBuying || isMyNFT}
                          >
                            {isBuying ? (
                              <>
                                <span>Buying</span>
                                <Iconify icon="line-md:loading-twotone-loop" sx={{ width: 18, height: 18 }} />
                              </>
                            ) : (
                              <>
                                <span>Buy Now</span>
                                <Iconify icon="akar-icons:arrow-right" />
                                <span>{(Math.ceil(detailNft?.buyFor * 10) / 10).toFixed(1)} MATIC</span>
                              </>
                            )}
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                            <Box display="flex" flexDirection="row" gap={1} justifySelf="center">
                              <Typography variant="responsiveBody2" color="text.secondary">
                                Sell for:
                              </Typography>
                              <Typography variant="responsiveBody2" fontWeight={600}>
                                {(Math.floor(detailNft?.sellFor * 10) / 10).toFixed(1)} MATIC
                              </Typography>
                            </Box>
                            <LikeButton nft={detailNft} address={address} user={user} />
                          </Box>
                        </Grid>
                      </Grid>
                    )}
                  </Vertical40>
                </Grid>
              </Grid>
              <CloseButton type="button" aria-label="close-button" onClick={onClose}>
                <Iconify icon="clarity:close-line" />
              </CloseButton>
            </DetailBox>
          </Card>
        </Container>
      )}

      <WalletDialog isOpen={isWalletOpen} handleClose={() => setWalletOpen(false)} />
    </RootStyle>
  );
};

export default HeroNftDetailThirdweb;
