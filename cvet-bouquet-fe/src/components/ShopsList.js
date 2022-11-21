import React from 'react';
import Typography from '@mui/material/Typography';
import Image from 'next/future/image';
import metroIcon from '../../public/assets/icons/metro.svg';
import Box from '@mui/material/Box';


export default function ShopsList({shop,currentKey, delivery=false}) {
  return (
    <Box key={`${currentKey}-shop`}>
      <Typography
        sx={{
          alignSelf: 'left',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '0px',
          opacity: !delivery || delivery === shop.adress ? '1' : '0.5',
          fontSize: { lg: '16px', xl: '20px' },
        }}
        gutterBottom
        variant='h6'
        component='p'
      >
        {shop.adress}
        <Image
          style={{ margin: '0 10px' }}
          src={metroIcon}
          alt='metro icon'
        ></Image>
        {shop.metro}
      </Typography>
      <Typography
        sx={{
          alignSelf: 'left',
          opacity: !delivery || delivery === shop.adress ? '1' : '0.5',
        }}
        gutterBottom
        variant='body2'
        component='span'
      >
        {shop.time}
      </Typography>
    </Box>
  );
}
