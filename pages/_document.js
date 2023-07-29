import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';

import palette from 'src/theme/palette';
import { THEME, WORDING } from 'src/config';

function createEmotionCache() {
  return createCache({ key: 'css' });
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffc40d" />
          <meta name="msapplication-TileColor" content="#ffc40d" />
          <meta name="theme-color" content={palette.light.primary.main} />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href={`https://fonts.googleapis.com/css2?family=${THEME.googleFont}:wght@400;500;600;700&display=swap`}
            rel="stylesheet"
          />

          <meta name="description" content={WORDING.metaDescription} />
          <meta name="keywords" content={WORDING.metaKeywords} />
          <meta name="author" content={WORDING.author} />
          {/* <link rel="preload" as="image" href="/img/nftreasury.png" key="Logo" /> */}
          <link rel="preload" as="image" href="/img/metamask.png" key="IconMetamask" />
          <link rel="preload" as="image" href="/img/coinbase.png" key="IconCoinbase" />
          <link rel="preload" as="image" href="/img/walletconnect.png" key="IconWalletConnect" />
          <link rel="preload" as="image" href="/img/bg-hero.png" key="BgHero" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        (
          <CacheProvider value={cache}>
            <App {...props} />
          </CacheProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles?.styles?.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};
