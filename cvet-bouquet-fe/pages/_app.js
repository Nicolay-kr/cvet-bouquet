import '../styles/globals.css';
import '../styles/import.css';
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import Layout from '../src/components/Layout/Layout';
import { BouquetsProvider } from '../src/components/context/BouquetsContext';
// import { sanityClient } from '../sanity';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  // console.log(pageProps)

  return (
    <CacheProvider value={emotionCache}>
      <Head lang="ru">
        <meta name='viewport' content='initial-scale=1, width=device-width shrink-to-fit=no, user-scalable=no' />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;700&display=swap" rel="stylesheet"/>
      </Head>
      <ThemeProvider theme={theme}>
        <BouquetsProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. For MUI*/}
          {/* <CssBaseline /> */}
          <Layout category = {pageProps.category}>
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


// export const getServerSideProps = async (pageContext) => {
//   const queryCategory = `*[ _type == "category"]
//   {
//     slug,
//     title,
//   }`;

//   const resultCategory = await sanityClient.fetch(queryCategory);

//   if (!resultCategory.length) {
//     return {
//       props: {
//         bouquets: [],
//       },
//     };
//   } else {
//     return {
//       props: {
//         category: resultCategory,
//       },
//     };
//   }
// };
