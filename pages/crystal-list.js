import Head from 'next/head';
import { Element } from 'react-scroll';
import { styled } from '@mui/material/styles';
import Layout from 'src/layouts';
import Page from 'src/components/Page';
import { WORDING } from 'src/config';
import CrystalListSection from 'src/sections/CrystalListSection';
import StayConnected from 'src/sections/StayConnected';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  background: theme.palette.background.default,
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  // background: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

CrystalListPage.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function CrystalListPage() {
  return (
    <Page>
      <Head>
        <title>Profile - {WORDING.title} - Infinitely Expanding NFTs</title>
      </Head>
      <RootStyle>
        <ContentStyle>
          <Element name="hero">
            <CrystalListSection />
          </Element>
          <StayConnected />
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
