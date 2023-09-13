/* eslint-disable react/prop-types */
import React, { useMemo, useState, useCallback } from 'react';
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useDebounce } from '@react-hook/debounce';
import { useSelector, useDispatch } from 'react-redux';

import { HorizontalBetween } from 'src/components/StyledComponents';
import { pxToRem } from 'src/utils/getFontValue';
import { decimalPrecision, fNumber } from 'src/utils/formatNumber';

import SearchField from './SearchField';
import SelectField from './SelectField';
import Image from 'src/components/Image';
import useResponsive from 'src/hooks/useResponsive';
import GradientText from 'src/components/GradientText';
import { refreshListSelector } from 'src/redux/slices/refreshList';
import { ceil, lowerCase } from 'lodash';
import { orderBy } from 'lodash';
import { getCountsPerCategory, getFilteredNFTsByCategory } from 'src/utils/nftFilters';
import { cloneDeep } from 'lodash';
import { collection, getDoc, getDocs, query } from 'firebase/firestore';
import initializeFirebaseClient from 'src/lib/initFirebase';
import { useEffect } from 'react';
import { find } from 'lodash';
import { ethers } from 'ethers';
import nftsApi from 'pages/api/nfts';
import categoriesApi from 'pages/api/categories';

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

const PriceBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

// const categories = [
//   { label: 'All NFTs', value: '' },
//   // { label: 'Popular', value: 'popular', count: 0 },
//   { label: 'Gemstones', value: 'Gemstones', count: 10 },
//   { label: 'Elemental', value: 'Elemental', count: 10 },
//   { label: 'Mythical', value: 'Mythical', count: 10 },
//   { label: 'Celestial', value: 'Celestial', count: 10 },
// ];

const sorting = [
  { label: 'Most Recent', value: 'MOST_RECENT', by: 'startTimeInSeconds', order: 'desc' },
  { label: 'Most Liked', value: 'MOST_LIKED', by: 'likes', order: 'desc' },
  { label: 'Price (Highest)', value: 'PRICE_HIGHEST', by: 'price', order: 'desc' },
  { label: 'Price (Lowest)', value: 'PRICE_LOWEST', by: 'price', order: 'asc' },
];

export default function NftListings({ selectNft, isRefresh }) {
  const [filter, setFilter] = useState('');
  const [listNfts, setListNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [sortBy, setSortBy] = useState('MOST_RECENT');
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const isSmallScreen = useResponsive('down', 'md');
  const isMobile = useResponsive('down', 'sm');

  const handleChangeFilter = (e) => {
    if (e?.target?.value) setFilter(e?.target?.value);
    else setFilter(e);
    setPage(1);
    setPageCount(1);
    setListNfts([]);
  };

  const handleChangeSort = (e) => {
    setSortBy(e?.target?.value);
    setPage(1);
    setPageCount(1);
    setListNfts([]);
  };

  const handleSearch = (e) => {
    setSearch(e?.target?.value);
    setPage(1);
    setPageCount(1);
    setListNfts([]);
  };

  const handleRefresh = async () => {
    setPage(1);
    setPageCount(1);
    setListNfts([]);
    setIsLoading(true);
    await fetchCategories();

    let data;
    data = await nftsApi({
      page: 1,
      name: search,
      category: filter,
      isListed: true,
      sortBy: sortBy,
    });
    console.log("[data]", data)
    if (data?.name === 'AxiosError') {
      data = await nftsApi({
        page: 1,
        name: search,
        category: filter,
        isListed: true,
        sortBy: sortBy,
      });
    } else {
      setListNfts(data.records);
      setPageCount(data.metadata.pageCount);
      setIsLoading(false);
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    const data = await categoriesApi({
      page: page,
      name: search,
      category: filter,
      isListed: true,
      sortBy: sortBy,
    });

    const dataMapping = data?.map((c) => ({
      label: c.category,
      value: c.category,
      count: c.count,
    }));

    setCategories([{ label: 'All NFTs', value: '' }, ...dataMapping]);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch Data Listing
  const fetchNfts = async () => {
    setIsLoading(true);
    let data;
    data = await nftsApi({
      page: page,
      name: search,
      category: filter,
      isListed: true,
      sortBy: sortBy,
    });
    console.log("[data]", data)
    if (data?.name === 'AxiosError') {
      data = await nftsApi({
        page: page,
        name: search,
        category: filter,
        isListed: true,
        sortBy: sortBy,
      });
    } else {
      setListNfts([...listNfts, ...data.records]);
      setPageCount(data.metadata.pageCount);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNfts();
  }, [page, search, sortBy, filter]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  // Refresh
  useEffect(() => {
    if (isRefresh) handleRefresh();
  }, [isRefresh]);

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
                <SelectField disabled={isLoading} options={categories} value={filter} onChange={handleChangeFilter} />
              ) : (
                <Box display="flex" flexDirection="row" gap={2} flexWrap="wrap">
                  {categories.map((category) => (
                    <Button
                      variant={filter === category?.value ? 'default' : 'plain'}
                      key={category?.value}
                      className="FilterButton"
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleChangeFilter(category.value)}
                    >
                      <Box component="span">{category?.label}</Box>
                      {category?.count > 0 && (
                        <Box component="span" sx={{ color: 'text.secondary' }}>
                          {category.count}
                        </Box>
                      )}
                    </Button>
                  ))}
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SelectField options={sorting} value={sortBy} disabled={isLoading} onChange={handleChangeSort} />
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ pb: 2 }}>
            {listNfts.length > 0 &&
              listNfts.map((nft) => (
                <Grid item xs={6} md={3} key={nft?.tokenId}>
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
              ))}

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
        </Box>
        {page < pageCount && !isLoading && (
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <Button
              type="button"
              variant="default"
              sx={{ maxWidth: 200, fontWeight: 'normal' }}
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          </Box>
        )}
      </Container>
    </RootStyle>
  );
}
