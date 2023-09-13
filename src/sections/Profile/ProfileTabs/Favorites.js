/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, CircularProgress, Typography, Button, CardContent, Card, CardActionArea } from '@mui/material';
import { useAddress, useContract } from '@thirdweb-dev/react';
import { ceil, reduce } from 'lodash';
import { useDispatch } from 'react-redux';

import { decimalPrecision } from 'src/utils/formatNumber';
import useResponsive from 'src/hooks/useResponsive';
import Image from 'src/components/Image';
import GradientText from 'src/components/GradientText';
import useFirebaseDocument from 'src/lib/useFirebaseUserDocument';
import { find } from 'lodash';
import nftsApi from '../../../../pages/api/nfts';

const NftCardContent = styled(CardContent)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing('10px'),
    paddingBottom: theme.spacing('10px'),
  },

  '.BuyButton': {
    maxHeight: 40,
    padding: theme.spacing(2, 3),
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      minWidth: 0,
      width: 'auto',
      padding: theme.spacing('12px', '10px'),
    },
  },
}));

const PriceBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export default function Favorites({ selectNft = () => {}, user, refresh }) {
  const address = useAddress();
  const [listNfts, setListNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  // Fetch Data Listing
  const fetchNfts = async () => {
    setIsLoading(true);
    let data;
    data = await nftsApi({
      page: page,
      likedBy: address,
      isProfile: false,
    });
    if (data?.name === 'AxiosError') {
      data = await nftsApi({
        page: page,
        likedBy: address,
        isProfile: false,
      });
    } else {
      setListNfts(data.records);
      setPageCount(data.metadata.pageCount);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNfts();
  }, [user, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleRefresh = async () => {
    setPage(1);
    setPageCount(1);
    setListNfts([]);
    setIsLoading(true);

    let data;
    data = await nftsApi({
      page: 1,
      likedBy: user.uid,
      isProfile: false,
    });
    if (data?.name === 'AxiosError') {
      data = await nftsApi({
        page: 1,
        likedBy: user.uid,
        isProfile: false,
      });
    } else {
      setListNfts(data.records);
      setPageCount(data.metadata.pageCount);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (refresh) handleRefresh();
  }, [refresh]);

  const isMobile = useResponsive('down', 'sm');

  return (
    <Box display="flex" flexDirection="column" gap={'30px'}>
      <Grid container spacing={3} sx={{ pb: 2 }}>
        {listNfts.length > 0 &&
          listNfts.map((nft, key) => {
            if (nft?.sellerAddress !== address) {
              return (
                <Grid item xs={6} md={3} key={key}>
                  <Card variant="default">
                    <CardActionArea onClick={() => selectNft(nft)}>
                      <Image
                        sx={{ height: isMobile ? 177 : 270 }}
                        className="NftThumbnail"
                        src={nft?.image}
                        alt={nft?.detail?.name}
                      />
                    </CardActionArea>
                    <NftCardContent>
                      <Typography gutterBottom variant="title2012" component="div" noWrap>
                        {nft?.detail?.name}
                      </Typography>
                      <PriceBox>
                        <Box display="flex" flexDirection="column" gap={'5px'}>
                          <Box
                            display="flex"
                            flexDirection="row"
                            gap={1}
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography variant="text1210">Buy{!isMobile && ' for'}:</Typography>
                            <Typography variant="text1210" fontWeight={600}>
                              {(Math.ceil(nft?.buyFor * 10) / 10).toFixed(1)} MATIC
                            </Typography>
                          </Box>
                          <Box
                            display="flex"
                            flexDirection="row"
                            gap={1}
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography variant="text1210" color="text.secondary">
                              Sell{!isMobile && ' for'}:
                            </Typography>
                            <Typography
                              variant="text1210"
                              color="primary.main"
                              fontWeight={600}
                              component={GradientText}
                            >
                              {(Math.floor(nft?.sellFor * 10) / 10).toFixed(1)} MATIC
                            </Typography>
                          </Box>
                        </Box>
                        <Button type="button" variant="default" className="BuyButton" onClick={() => selectNft(nft)}>
                          Buy
                        </Button>
                      </PriceBox>
                    </NftCardContent>
                  </Card>
                </Grid>
              );
            } else {
              return (
                <Grid item xs={6} md={3} key={nft?.id}>
                  <Card variant="default">
                    <CardActionArea
                      onClick={() =>
                        selectNft({
                          ...nft,
                          price: parseFloat(nft?.buyFor),
                          currency: 'MATIC',
                          inCollection: true,
                          isCancel: true,
                        })
                      }
                    >
                      <Image
                        sx={{ height: isMobile ? 177 : 270 }}
                        className="NftThumbnail"
                        src={nft?.image}
                        alt={nft?.detail?.name}
                      />
                    </CardActionArea>
                    <NftCardContent>
                      <Typography gutterBottom variant="title2012" component="div" noWrap>
                        {nft?.detail?.name}
                      </Typography>
                      <PriceBox>
                        <Box display="flex" flexDirection="column" alignItems="flex-start">
                          <Typography variant="text1410" color="text.secondary">
                            Bought for
                          </Typography>
                          <Typography variant="text1410" fontWeight={600}>
                            {(Math.ceil(nft?.buyFor * 10) / 10).toFixed(1)} {'MATIC'}
                          </Typography>
                        </Box>
                        <Button
                          type="button"
                          variant="default"
                          className="BuyButton"
                          onClick={() =>
                            selectNft({
                              ...nft,
                              price: parseFloat(nft?.buyFor),
                              currency: 'MATIC',
                              inCollection: true,
                              isCancel: true,
                            })
                          }
                        >
                          <Typography variant="text1410" color="text.secondary">
                            Cancel
                          </Typography>
                        </Button>
                      </PriceBox>
                    </NftCardContent>
                  </Card>
                </Grid>
              );
            }
          })}
        {isLoading && (
          <Box
            sx={{ width: '100%', minHeight: '20vh', py: 10 }}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress color="primary" />
          </Box>
        )}
      </Grid>
      {page < pageCount && !isLoading && (
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
          <Button type="button" variant="default" sx={{ maxWidth: 200, fontWeight: 'normal' }} onClick={handleLoadMore}>
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
}
