import * as React from 'react';
import FreePayForm from '../src/components/freeForm/FreePayForm';
import Box from '@mui/material/Box';
import BreadCrumbs from '../src/components/Breadcrubs/BreadCrumbs';
import Head from 'next/head';

export default function freepayPage({}) {
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: 'Свободный платеж', href: null },
  ];
  return (
    <>
      <Head>
        <title> Свободный платеж | ЦВЕТ•БУКЕТ</title>
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
