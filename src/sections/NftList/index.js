import React, { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Box, Button, Card, CardActionArea, CardContent, Container, Grid, Typography } from '@mui/material';
import useSWRInfinite from 'swr/infinite';
import { useDebounce } from '@react-hook/debounce';
import { useContract, useContractRead } from '@thirdweb-dev/react';

import { HorizontalBetween } from 'src/components/StyledComponents';
import { pxToRem } from 'src/utils/getFontValue';
import { autoFormat, decimalPrecision, fNumber } from 'src/utils/formatNumber';

import SearchField from './SearchField';
import SelectField from './SelectField';
import Image from 'src/components/Image';
import useResponsive from 'src/hooks/useResponsive';
import GradientText from 'src/components/GradientText';
import { useEffect } from 'react';

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

const PriceBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const categories = [
  { label: 'All NFTs', value: 'all' },
  { label: 'Popular', value: 'popular', count: 0 },
  { label: 'Gemstones', value: 'Gemstones', count: 10 },
  { label: 'Elemental', value: 'Elemental', count: 10 },
  { label: 'Mythical', value: 'Mythical', count: 10 },
  { label: 'Celestial', value: 'Celestial', count: 10 },
];

const sorting = [
  { label: 'Most Recent', value: 1 },
  { label: 'Most Liked', value: 2 },
  { label: 'Price (Highest)', value: 3 },
  { label: 'Price (Lowest)', value: 4 },
];

const PAGE_SIZE = 12;

const listFetcher = (url) =>
  fetch(url).then(async (res) => {
    const data = await res.json();
    return data?.data || [];
  });

export default function NftList({ selectNft }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useDebounce(search, 500);
  const isSmallScreen = useResponsive('down', 'md');
  const isMobile = useResponsive('down', 'sm');
  const dir = Number(sortBy) === 4 ? 'asc' : 'desc';
  const orderBy = Number(sortBy) === 1 ? 'created_at' : 'price';

  const { contract } = useContract('0x5746605C7e6CF4dE7C8aC908F19B438DE7ee2889', 'marketplace');
  // const { contract } = useContract('0xfE78059B842C126fDA67B5efe167E69FD2C0131F');

  const getListings = async () => {
    const listings = await contract.getActiveListings();
  };

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `/api/nfts?per_page=${PAGE_SIZE}&page=${
        index + 1
      }&order_by=${orderBy}&dir=${dir}&filter=${filter}&search=${debouncedSearch}`,
    listFetcher
  );

  const nfts = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  const handleLoadMore = (givenSize) => {
    setSize(givenSize);
  };

  const handleChangeSort = (e) => {
    setSortBy(e?.target?.value);
  };

  const handleSearch = (e) => {
    setSearch(e?.target?.value);
    setDebouncedSearch(e?.target?.value);
  };

  useEffect(() => {
    if (contract) getListings();
  }, [contract]);

  return (
    <RootStyle>
      <Container>
        <Box display="flex" flexDirection="column" gap={'30px'} sx={{ paddingBottom: 4 }}>
          <SearchHeader>
            <HorizontalBetween>
              <Typography variant="title30">Explore Collections</Typography>
              <SearchField value={search} onChange={handleSearch} />
            </HorizontalBetween>
          </SearchHeader>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              {isSmallScreen ? (
                <SelectField options={categories} value={filter} onChange={(e) => setFilter(e?.target?.value)} />
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
              <SelectField options={sorting} value={sortBy} onChange={handleChangeSort} />
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ pb: 2 }}>
            {nfts.length > 0 &&
              nfts.map((nft) => (
                <Grid item xs={6} md={3} key={nft?.id}>
                  <Card variant="default">
                    <CardActionArea onClick={() => selectNft(nft)}>
                      <Image
                        sx={{ height: isMobile ? 177 : 270 }}
                        className="NftThumbnail"
                        src={nft?.image}
                        alt={nft?.name}
                      />
                    </CardActionArea>
                    <NftCardContent>
                      <Typography gutterBottom variant="title2012" component="div" noWrap>
                        {nft?.name}
                      </Typography>
                      <PriceBox>
                        <Box display="flex" flexDirection="column" gap={'5px'}>
                          <Box display="flex" flexDirection="row" gap={1} alignItems="center">
                            <Typography variant="text1210">Buy{!isMobile && ' for'}:</Typography>
                            <Typography variant="text1210" fontWeight={600}>
                              {decimalPrecision(nft?.price, '000')} {nft?.currency}
                            </Typography>
                          </Box>
                          <Box display="flex" flexDirection="row" gap={1} alignItems="center">
                            <Typography variant="text1210" color="text.secondary">
                              Sell{!isMobile && ' for'}:
                            </Typography>
                            <Typography
                              variant="text1210"
                              color="primary.main"
                              fontWeight={600}
                              component={GradientText}
                            >
                              {decimalPrecision(nft?.sell_price, '000')} {nft?.currency}
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
              ))}
          </Grid>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <Button
              type="button"
              variant="default"
              sx={{ maxWidth: 200, fontWeight: 'normal' }}
              onClick={() => handleLoadMore(size + 1)}
              disabled={isReachingEnd || isLoadingMore}
            >
              {isLoadingMore ? 'Loading...' : isReachingEnd ? 'No more' : 'Load more'}
            </Button>
          </Box>
        </Box>
      </Container>
    </RootStyle>
  );
}
