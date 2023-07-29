/* eslint-disable react/prop-types */
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';

import GradientText from 'src/components/GradientText';
import Image from 'src/components/Image';
import useResponsive from 'src/hooks/useResponsive';
import { decimalPrecision } from 'src/utils/formatNumber';
import { first } from 'lodash';
import { useAddress, useContract, useOwnedNFTs, useSDK } from '@thirdweb-dev/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

const NftCardContent = styled(CardContent)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing('10px'),
    paddingBottom: theme.spacing('10px'),
  },

  '.BuyButton': {
    display: 'flex',
    borderRadius: 10,
    maxHeight: 50,
    flexDirection: 'column',
    padding: theme.spacing(2, 3),
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
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

export default function CollectionCard({ nft, selectNft, transaction }) {
  const address = useAddress();
  const [tokenDetail, setTokenDetail] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const { contract: tokenContract } = useContract(nft?.contract?.address);

  const isMobile = useResponsive('down', 'sm');
  const media = first(nft?.media);
  const imageUrl = media ? media?.gateway : null;

  const getCollectionDetail = useCallback(async () => {
    try {
      setLoading(true);
      const tokenResponse = await tokenContract.get(nft?.tokenId);
      setTokenDetail(tokenResponse);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [tokenContract, nft]);

  useEffect(() => {
    if (nft?.contract?.address && nft?.tokenId && tokenContract) getCollectionDetail();
  }, [nft, tokenContract, getCollectionDetail]);

  return (
    <Grid item xs={6} md={3} key={nft?.id}>
      <Card variant="default" sx={{ cursor: 'pointer' }}>
        <CardActionArea
          onClick={() => {
            if (isLoading) return;
            selectNft({
              ...nft,
              asset: nft?.asset || nft?.metadata || tokenDetail?.metadata,
              inCollection: true,
              image: nft?.asset?.image || tokenDetail?.metadata?.image || imageUrl,
              name: nft?.title || tokenDetail?.metadata?.name,
              description: nft?.description || nft?.asset?.name || tokenDetail?.metadata?.description,
              price: parseFloat(transaction?.value),
              sellerAddress: address,
            });
          }}
        >
          <Image
            sx={{ height: isMobile ? 177 : 270 }}
            className="NftThumbnail"
            src={nft?.asset?.image || tokenDetail?.metadata?.image || imageUrl}
            alt={nft?.title || nft?.asset?.name || tokenDetail?.metadata?.name}
          />
        </CardActionArea>
        <NftCardContent>
          <Typography gutterBottom variant="title2012" component="div" noWrap>
            {nft?.title || nft?.asset?.name || tokenDetail?.metadata?.name}
          </Typography>
          <PriceBox>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="text1410" color="text.secondary">
                Bought for
              </Typography>
              <Typography variant="text1210" fontWeight={600}>
                {decimalPrecision(parseFloat(transaction?.value), '000')} {nft?.currency}
              </Typography>
            </Box>
            <Button
              type="button"
              variant="default"
              className="BuyButton"
              onClick={() => {
                if (isLoading) return;
                selectNft({
                  ...nft,
                  asset: nft?.asset || nft?.metadata || tokenDetail?.metadata,
                  inCollection: true,
                  image: nft?.asset?.image || tokenDetail?.metadata?.image || imageUrl,
                  name: nft?.title || tokenDetail?.metadata?.name,
                  description: nft?.description || nft?.asset?.name || tokenDetail?.metadata?.description,
                  price: parseFloat(transaction?.value),
                  sellerAddress: address,
                });
              }}
            >
              <Typography variant="text1410" color="text.secondary">
                Sell for
              </Typography>
              <Typography variant="text1210" color="primary.main" fontWeight={600} component={GradientText}>
                {decimalPrecision(parseFloat(transaction?.value) * process.env.NEXT_PUBLIC_MARKUP_TIMES_VALUE, '000')}{' '}
                {nft?.currency}
              </Typography>
            </Button>
          </PriceBox>
        </NftCardContent>
      </Card>
    </Grid>
  );
}
