import '../styles/globals.css';
import '../styles/import.css';
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/config/theme';
import createEmotionCache from '../src/createEmotionCache';
import Layout from '../src/components/Layout/Layout';
import { BouquetsProvider } from '../src/components/context/BouquetsContext';
import logo from '../public/assets/images/logo_flower.png';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <link rel='icon' href={logo.src} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='Премиум цветы 💐 в Минске'></meta>
        <meta property='og:type' content='website'></meta>
        <meta
          property='og:description'
          content='Премиум цветы 💐 в Минске'
        ></meta>
        <meta
          property='twitter:title'
          content='Премиум цветы 💐 в Минске'
        ></meta>
        <meta property='vk:image' content={logo.src}></meta>
        <meta property='twitter:image' content={logo.src}></meta>
        <meta property='og:image' content={logo.src}></meta>
      </Head>
      <ThemeProvider theme={theme}>
        <BouquetsProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. For MUI*/}
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BouquetsProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

