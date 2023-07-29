import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';
// @mui
import { Box, Stack } from '@mui/material';
// import MainFooter from './MainFooter';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import { WORDING } from 'src/config';

// ----------------------------------------------------------------------

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function MainLayout({ children }) {
  const isProduction = Boolean(process.env.NEXT_PUBLIC_HIDDEN);
  
  if (isProduction) return null
  return (
    <Stack
      sx={{
        minHeight: 1,
        backgroundColor: 'background.default',
      }}
    >
      <NextSeo
        title={WORDING.seoTitle}
        description={WORDING.seoDescription}
        openGraph={{
          title: WORDING.seoTitle,
          description: WORDING.seoDescription,
          site_name: WORDING.title,
          tipe: 'website',
          images: [
            {
              url: '/img/og-nftreasury.png',
              width: 1200,
              height: 630,
              alt: WORDING.seoTitle,
              type: 'image/png',
            },
          ],
        }}
      />
      <MainHeader />

      {children}

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
}
