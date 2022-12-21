import React from 'react';
import Typography from '@mui/material/Typography';
import MetroIcon from '../../public/assets/icons/metro.svg';
import Box from '@mui/material/Box';
import size from '../utils/size';


export default function ShopsList({shop, delivery=false}) {
  return (
    <Box >
      <Typography
        sx={{
          alignSelf: 'left',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '0px',
          opacity: !delivery || delivery === shop.adress ? '1' : '0.5',
        }}
        gutterBottom
        variant='h5'
        component='span'
      >
        {shop.adress}
        <span>
        <Box
          component={MetroIcon}
          viewBox="0 0 33 33" 
          sx={{ margin: '0 10px',width:size(32) }}
        ></Box>
        </span>
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
