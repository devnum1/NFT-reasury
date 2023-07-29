import { useEffect, useState } from 'react';
import Head from 'next/head';
import { styled } from '@mui/material/styles';
import { scroller, Element } from 'react-scroll';
import { useSelector, useDispatch } from 'react-redux';

import Layout from 'src/layouts';

import Page from 'src/components/Page';

import { HeroCarousel } from 'src/sections/Landing';
import NftList from 'src/sections/NftList/NftListings';
import FaqSection from 'src/sections/FaqSection';
import StayConnected from 'src/sections/StayConnected';
import HeroNftDetailThirdweb from 'src/sections/Landing/HeroNftDetailThirdweb';
import { selectedNftSelector, select, clear } from 'src/redux/slices/selectedNft';
import carouselAPI from './api/carousels';
import useFirebaseUser from '../src/lib/useFirebaseUser';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  background: theme.palette.background.default,
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  background: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

const listFetcher = (url) =>
  fetch(url).then(async (res) => {
    const data = await res.json();
    return data || [];
  });

const parameterizeArray = (key, givenArray) => {
  let arr = givenArray.map(encodeURIComponent);
  return '?' + key + '[]=' + arr.join('&' + key + '[]=');
};

export default function HomePage() {
  const { current: selected } = useSelector(selectedNftSelector);
  const [carousel, setCarousel] = useState([]);
  const [loadingCarousel, setLoadingCarousel] = useState(true);
  const [isRefresh, setIsRefresh] = useState(null);
  const dispatch = useDispatch();
  const { user } = useFirebaseUser();

  /**
   * Select NFT
   * @param {*} nft
   */
  const handleSelect = (nft) => {
    dispatch(select(nft));
    scroller.scrollTo('hero', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  /**
   * Clear NFT from selection
   */
  const handleClear = () => {
    dispatch(clear());
    setIsRefresh(Date.now());
  };

  // Fetch Data Carousel
  const fetchCarousel = async () => {
    setLoadingCarousel(true);
    let data;
    data = await carouselAPI();
    if (data?.name === 'AxiosError') {
      data = await carouselAPI();
    } else {
      setCarousel(data);
      setLoadingCarousel(false);
    }
  };

  useEffect(() => {
    fetchCarousel();
  }, []);

  return (
    <Page>
      <Head>
        <title>theNFtreasury - Infinitely Expanding NFTs</title>
      </Head>
      <RootStyle>
        <ContentStyle>
          <Element name="hero">
            {selected ? (
              <HeroNftDetailThirdweb
                key={selected?.id}
                nft={selected}
                onClose={handleClear}
                user={user}
                isProfile={false}
              />
            ) : (
              <HeroCarousel onSelect={handleSelect} nfts={carousel} loading={loadingCarousel} />
            )}
          </Element>
          <NftList selectNft={handleSelect} isRefresh={isRefresh} />
          <FaqSection />
          <StayConnected />
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
