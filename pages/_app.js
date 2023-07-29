import { useEffect } from 'react';
import jwtEncode from 'jwt-encode';
import { Provider as ReduxProvider } from 'react-redux';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

// custom icons
import 'src/components/customIcons';
// simplebar
import 'simplebar/src/simplebar.css';
// lazy-load-image-blur
import 'react-lazy-load-image-component/src/effects/blur.css';
// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import PropTypes from 'prop-types';
import cookie from 'cookie';
// next
import Head from 'next/head';
import App from 'next/app';

// utils
import { getSettings } from 'src/utils/settings';
// contexts
import { SettingsProvider } from 'src/contexts/SettingsContext';
import { CollapseDrawerProvider } from 'src/contexts/CollapseDrawerContext';
// theme
import ThemeProvider from 'src/theme';
// components
import ProgressBar from 'src/components/ProgressBar';
import MotionLazyContainer from 'src/components/animate/MotionLazyContainer';
import NotistackProvider from 'src/components/NotistackProvider';
// Auth Provider
import { AuthProvider } from 'src/contexts/JWTContext';
import { ACCESS_TOKEN_KEY, JWT_SECRET } from 'src/config';
import { setSession } from 'src/utils/jwt';
// redux
import { store } from 'src/redux/store';
import LogrocketProvider from '../src/components/LogrocketProvider';
// ----------------------------------------------------------------------

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  settings: PropTypes.object,
};

export default function MyApp(props) {
  const { Component, pageProps, settings } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const generateFakeToken = () => {
    /**
     * This use JWT case
     * Set the token here because there is no Login Page
     * This should be replaced with REAL ACCESS TOKEN
     */
    const currentDate = new Date();
    const token = jwtEncode({ exp: new Date(currentDate.setDate(currentDate.getDate() + 8)) }, JWT_SECRET);
    setSession(token);
  };

  useEffect(() => {
    /**
     * Remove this block if you have prepared the
     * authentication mechanism
     */
    const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!accessToken) generateFakeToken();
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ReduxProvider store={store}>
        <ThirdwebProvider
          // supportedChains={JSON.parse(process.env.NEXT_PUBLIC_CHAINS)}
          desiredChainId={Number(process.env.NEXT_PUBLIC_DESIRED_CHAIN_ID)}
          authConfig={{
            // Set this to your domain to prevent signature malleability attacks.
            domain: process.env.NEXT_PUBLIC_NFTR_DOMAIN,
            authUrl: '/api/auth',
            loginRedirect: '/',
          }}
        >
          <AuthProvider>
            <LogrocketProvider>
              <SettingsProvider defaultSettings={settings}>
                <ThemeProvider>
                  <NotistackProvider>
                    <CollapseDrawerProvider>
                      <MotionLazyContainer>
                        <ProgressBar />
                        {getLayout(<Component {...pageProps} />)}
                      </MotionLazyContainer>
                    </CollapseDrawerProvider>
                  </NotistackProvider>
                </ThemeProvider>
              </SettingsProvider>
            </LogrocketProvider>
          </AuthProvider>
        </ThirdwebProvider>
      </ReduxProvider>
    </>
  );
}

// ----------------------------------------------------------------------

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);

  const cookies = cookie.parse(context?.ctx?.req ? context?.ctx?.req?.headers?.cookie || '' : document?.cookie);

  const settings = getSettings(cookies);

  return {
    ...appProps,
    settings,
  };
};
