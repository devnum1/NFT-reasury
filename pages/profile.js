import { useState } from 'react';
import Head from 'next/head';
import { scroller, Element } from 'react-scroll';
import { useAddress } from '@thirdweb-dev/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import sleep from 'sleep-promise';
import { useCallback } from 'react';
import { styled } from '@mui/material/styles';

import Layout from 'src/layouts';

import Page from 'src/components/Page';

import { WORDING } from 'src/config';
import FaqSection from 'src/sections/FaqSection';
import HeroProfile from 'src/sections/Profile/HeroProfile';
import HeroNftDetailThirdweb from 'src/sections/Landing/HeroNftDetailThirdweb';
import StayConnected from 'src/sections/StayConnected';
import ProfileTabs from 'src/sections/Profile/ProfileTabs';
import WalletDialog from 'src/components/dialogs/WalletDialog';
import LoginDialog from 'src/components/dialogs/LoginDialog';
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

ProfilePage.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ProfilePage() {
  const [key, setKey] = useState(Date.now());
  const [isOpen, setOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const address = useAddress();
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [isRefresh, setIsRefresh] = useState(null);
  const { user } = useFirebaseUser();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSelect = (nft) => {
    scroller.scrollTo('hero', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
    setSelected(nft);
  };
  const handleClear = () => {
    setIsRefresh(Date.now());
    setSelected(null);
    setKey(Date.now());
  };

  useEffect(() => {
    if (!address) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [address]);

  const loadSDK = useCallback(async () => {
    await sleep(1 * 1000);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (address) loadSDK();
  }, [address, loadSDK]);

  const handleSelectTab = (val) => {
    setSelectedTab(val);
  };

  return (
    <Page>
      <Head>
        <title>Profile - {WORDING.title} - Infinitely Expanding NFTs</title>
      </Head>
      <RootStyle>
        <ContentStyle>
          <Element name="hero">
            {selected ? (
              <HeroNftDetailThirdweb
                key={`${selected?.id}.${key}`}
                nft={selected}
                onClose={handleClear}
                isSelling={selected?.inCollection}
                user={user}
                isProfile={selectedTab === 2 ? false : true}
              />
            ) : (
              <HeroProfile />
            )}
          </Element>
          <ProfileTabs
            selectNft={handleSelect}
            key={`${key}`}
            user={user}
            refresh={isRefresh}
            selectTab={handleSelectTab}
          />
          <FaqSection />
          <StayConnected />
        </ContentStyle>
      </RootStyle>
      <WalletDialog isOpen={isOpen} handleClose={() => router.push('/')} />
      <LoginDialog isOpen={isLoginOpen} handleClose={() => router.push('/')} />
    </Page>
  );
}
