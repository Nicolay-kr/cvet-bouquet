import * as React from 'react';
import FreePayForm from '../src/components/FreeForm/FreePayForm';
import Box from '@mui/material/Box';
import BreadCrumbs from '../src/components/Breadcrubs/BreadCrumbs';
import Head from 'next/head';

export default function FreepayPage({}) {
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: 'Свободный платеж', href: null },
  ];

  return (
    <>
      <Head>
        <title>Свободный платеж | ЦВЕТ•БУКЕТ</title>
        <meta property="og:title" content="Свободный платеж | ЦВЕТ•БУКЕТ" />
        <meta property="og:url" content="https://cvetbuket.by/freepay" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://cvetbuket.by/freepay" />
      </Head>
      <BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs>
      <Box
        sx={{
          width: '100%',
          px: { xs: '5%', lg: '10%' },
        }}
      >
        <FreePayForm></FreePayForm>
      </Box>
    </>
  );
}
