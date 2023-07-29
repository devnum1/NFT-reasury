import React, { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import {
  useContractMetadata,
  useUnclaimedNFTSupply,
  useActiveClaimCondition,
  useContract,
  useUnclaimedNFTs,
} from '@thirdweb-dev/react';
import { formatUnits, parseUnits } from 'ethers/lib/utils';

import { HorizontalBetween } from 'src/components/StyledComponents';
import { pxToRem } from 'src/utils/getFontValue';
import { autoFormat, fNumber } from 'src/utils/formatNumber';

import SearchField from './SearchField';
import SelectField from './SelectField';
import Image from 'src/components/Image';
import useResponsive from 'src/hooks/useResponsive';

const RootStyle = styled('section')(({ theme }) => ({
  paddingTop: theme.spacing(4.5),

  '.FilterButton': {
    minWidth: 116,
    fontSize: pxToRem(14),
    fontWeight: 'normal',
    padding: theme.spacing(1.25),
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
  },
}));

const SearchHeader = styled('section')(({ theme }) => ({
  paddingBottom: theme.spacing('30px'),
  borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
}));

const NftCardContent = styled(CardContent)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing('10px'),
    paddingBottom: theme.spacing('10px'),
  },

  '.BuyButton': {
    padding: theme.spacing(2, 3),
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing('12px', '10px'),
    },
  },
}));

const PriceBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const categories = [
  { label: 'All NFTs', value: 'all' },
  { label: 'Popular', value: 'popular', count: 1231 },
  { label: 'Celestial', value: 'celestial', count: 1231 },
  { label: 'Gemstones', value: 'gemstones', count: 1231 },
  { label: 'Metals', value: 'metals', count: 1231 },
  { label: 'Minerals', value: 'minerals', count: 1231 },
];

const sorting = [
  { label: 'Most Recent', value: 1 },
  { label: 'Most Likes', value: 2 },
];

const PAGE_SIZE = 12;

export default function NftList() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState(1);
  const [page, setPage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const isSmallScreen = useResponsive('down', 'md');
  const isMobile = useResponsive('down', 'sm');

  const { contract: nftDrop } = useContract('0x2f28Ab7015613ff50030f3814Bd9C9935D2CE6fF');
  const { data: unclaimedNFTs, isLoading, error } = useUnclaimedNFTs(nftDrop, { start: page, count: PAGE_SIZE });
  const { data: contractMetadata } = useContractMetadata(nftDrop);

  // Load claimed supply and unclaimed supply
  const { data: unclaimedSupply } = useUnclaimedNFTSupply(nftDrop);

  // Load the active claim condition
  const { data: activeClaimCondition } = useActiveClaimCondition(nftDrop);

  // Check if there's NFTs left on the active claim phase
  const isNotReady = activeClaimCondition && parseInt(activeClaimCondition?.availableSupply) === 0;

  // Check if there's any NFTs left
  const isSoldOut = unclaimedSupply?.toNumber() === 0;

  // Check price
  const price = parseUnits(
    activeClaimCondition?.currencyMetadata.displayValue || '0',
    activeClaimCondition?.currencyMetadata.decimals
  );

  // Multiply depending on quantity
  const priceToMint = price.mul(quantity);

  const nfts = unclaimedNFTs ? [].concat(...unclaimedNFTs) : [];
  const isLoadingInitialData = !unclaimedNFTs && !error;
  const isLoadingMore =
    isLoadingInitialData || (page > 0 && unclaimedNFTs && typeof unclaimedNFTs[page - 1] === 'undefined');
  const isEmpty = unclaimedNFTs?.length === 0;
  const isReachingEnd = isEmpty || (unclaimedNFTs && unclaimedNFTs?.length < PAGE_SIZE);

  const handleLoadMore = (givenPage) => {
    setPage(givenPage);
  };

  return (
    <RootStyle>
      <Container>
        <Box display="flex" flexDirection="column" gap={'30px'} sx={{ paddingBottom: 4 }}>
          <SearchHeader>
            <HorizontalBetween>
              <Typography variant="title30">Explore Collections</Typography>
              <SearchField />
            </HorizontalBetween>
          </SearchHeader>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              {isSmallScreen ? (
                <SelectField options={categories} defaultValue={filter} />
              ) : (
                <Box display="flex" flexDirection="row" gap={2} flexWrap="wrap">
                  {categories.map((category) => (
                    <Button
                      variant={filter === category?.value ? 'default' : 'plain'}
                      key={category?.value}
                      className="FilterButton"
                      type="button"
                      onClick={() => {
                        setFilter(category?.value);
                      }}
                    >
                      <Box component="span">{category?.label}</Box>
                      {category?.count > 0 && (
                        <Box component="span" sx={{ color: 'text.secondary' }}>
                          {fNumber(category?.count)}
                        </Box>
                      )}
                    </Button>
                  ))}
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SelectField options={sorting} defaultValue={sortBy} />
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ pb: 2 }}>
            {nfts.length > 0 &&
              nfts.map((nft) => (
                <Grid item xs={6} md={3} key={nft?.id}>
                  <Card variant="default">
                    <Image
                      sx={{ height: isMobile ? 177 : 270 }}
                      className="NftThumbnail"
                      src={nft?.image}
                      alt={nft?.name}
                    />
                    <NftCardContent>
                      <Typography gutterBottom variant="title2012" component="div" noWrap>
                        {nft?.name}
                      </Typography>
                      <PriceBox>
                        <Box display="flex" flexDirection="column">
                          <Typography variant="title2010">
                            {`${quantity > 1 ? ` ${quantity}` : ''}${
                              activeClaimCondition?.price.eq(0)
                                ? ' (Free)'
                                : activeClaimCondition?.currencyMetadata.displayValue
                                ? ` ${formatUnits(priceToMint, activeClaimCondition.currencyMetadata.decimals)} ${
                                    activeClaimCondition?.currencyMetadata.symbol
                                  }`
                                : ''
                            }`}
                          </Typography>
                          <Box display="flex" flexDirection="row" gap={1}>
                            <Typography variant="responsiveBody2" color="text.secondary">
                              Sell{!isMobile && ' for'}:
                            </Typography>
                            <Typography variant="responsiveBody2" color="primary.main" fontWeight={600}>
                              {`${quantity > 1 ? ` ${quantity}` : ''}${
                                activeClaimCondition?.price.eq(0)
                                  ? ' (Free)'
                                  : activeClaimCondition?.currencyMetadata.displayValue
                                  ? ` ${formatUnits(priceToMint, activeClaimCondition.currencyMetadata.decimals)} ${
                                      activeClaimCondition?.currencyMetadata.symbol
                                    }`
                                  : ''
                              }`}
                            </Typography>
                          </Box>
                        </Box>
                        <Button type="button" variant="default" className="BuyButton">
                          Buy
                        </Button>
                      </PriceBox>
                    </NftCardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <Button
              type="button"
              variant="default"
              sx={{ maxWidth: 200, fontWeight: 'normal' }}
              onClick={() => handleLoadMore(page + 1)}
              disabled={isReachingEnd || isLoadingMore}
            >
              {isLoadingMore ? 'Loading...' : isReachingEnd ? 'No more' : 'load more'}
            </Button>
          </Box>
        </Box>
      </Container>
    </RootStyle>
  );
}
