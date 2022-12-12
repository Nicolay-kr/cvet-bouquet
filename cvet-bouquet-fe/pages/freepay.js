import * as React from 'react';
import FreePayForm from '../src/components/freeForm/FreePayForm';
import Box from '@mui/material/Box';
import BreadCrumbs from '../src/components/breadcrubs/BreadCrumbs';

export default function freepayPage({}) {
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: 'Свободный платеж', href: null },
  ];
  return (
    <><BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs><Box
      sx={{
        width: '100%',
        px: { xs: '5%', lg: '10%' }
      }}
    >
      <FreePayForm></FreePayForm>
    </Box></>
  );
}
