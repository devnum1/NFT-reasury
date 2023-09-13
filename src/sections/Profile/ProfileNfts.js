import React, { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Box, Button, Card, CardActionArea, CardContent, Container, Grid, Typography } from '@mui/material';
import useSWRInfinite from 'swr/infinite';
import { useDebounce } from '@react-hook/debounce';

import { HorizontalBetween } from 'src/components/StyledComponents';
import { pxToRem } from 'src/utils/getFontValue';
import { autoFormat, decimalPrecision, fNumber } from 'src/utils/formatNumber';

import Image from 'src/components/Image';
import useResponsive from 'src/hooks/useResponsive';
import GradientText from 'src/components/GradientText';
import SelectField from '../NftList/SelectField';

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

const PriceBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const categories = [
  { label: 'My Collection', value: 'collections', count: 120 },
  { label: 'For Sale', value: 'For Sale', disabled: true },
  { label: 'Favourites', value: 'Favourites', disabled: true },
  { label: 'Notifications', value: 'Notifications', disabled: true },
];

const sorting = [
  { label: 'Price (Highest)', value: 1 },
  { label: 'Price (Lowes)', value: 2 },
];

const PAGE_SIZE = 12;

const listFetcher = (url) =>
  fetch(url).then(async (res) => {
    const data = await res.json();
    return data?.data || [];
  });

export default function ProfileNfts({ selectNft = () => {} }) {
  const [filter, setFilter] = useState('collections');
  const [sortBy, setSortBy] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useDebounce(search, 500);
  const isSmallScreen = useResponsive('down', 'md');
  const isMobile = useResponsive('down', 'sm');
  const dir = Number(sortBy) === 2 ? 'asc' : 'desc';
  alert("herer")

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `/api/nfts?per_page=${PAGE_SIZE}&page=${
        index + 1
      }&order_by=sell_price&dir=${dir}&search=${debouncedSearch}`,
    listFetcher
  );

  console.log("data", data);
  alert("herer")

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

  return (
    <RootStyle>
      <Container>
        <Box display="flex" flexDirection="column" gap={'30px'} sx={{ paddingBottom: 4 }}>
          <SearchHeader>
            {isSmallScreen ? (
              <SelectField options={categories} value={filter} />
            ) : (
              <Box display="flex" flexDirection="row" gap={2} flexWrap="wrap">
                {categories.map((category) => (
                  <Button
                    variant={filter === category?.value ? 'default' : 'plain'}
                    key={category?.value}
                    className="FilterButton"
                    type="button"
                    disabled={category?.value !== 'collections'}
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
          </SearchHeader>
          <Grid container spacing={3} sx={{ pb: 2 }}>
            {nfts.length > 0 &&
              nfts.map((nft) => (
                <Grid item xs={6} md={3} key={nft?.id}>
                  <Card variant="default" sx={{ cursor: 'pointer' }}>
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
                        <Box display="flex" flexDirection="column" alignItems="flex-start">
                          <Typography variant="text1410" color="text.secondary">
                            Bought for
                          </Typography>
                          <Typography variant="text1410" fontWeight={600}>
                            {decimalPrecision(nft?.price, '000')} {nft?.currency}
                          </Typography>
                        </Box>
                        <Button type="button" variant="default" className="BuyButton" onClick={() => selectNft(nft)}>
                          <Typography variant="text1410" color="text.secondary">
                            Sell for
                          </Typography>
                          <Typography variant="text1410" color="primary.main" fontWeight={600} component={GradientText}>
                            {decimalPrecision(nft?.sell_price, '000')} {nft?.currency}
                          </Typography>
                        </Button>
                        {/* <Button type="button" variant="default" className="BuyButton">
                          Buy
                        </Button> */}
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
