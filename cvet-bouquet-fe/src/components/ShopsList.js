import React from 'react';
import Typography from '@mui/material/Typography';
import MetroIcon from '../../public/assets/icons/metro.svg';
import Box from '@mui/material/Box';
import size from '../utils/size';

export default function ShopsList({ shop, delivery = false }) {
  return (
    <Box>
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
        <span >
          {shop.adress}
          <span style={{display:'inline-flex', alignItems: 'center',verticalAlign: 'bottom'}}>
            
            <Box
              component={MetroIcon}
              width={20}
              height={20}
              viewBox='0 0 33 33'
              sx={{ width: size(32),position:'relative',mr:5 }}
            ></Box>
            {shop.metro}
          </span>
        </span>
      </Typography>
      <Typography
        sx={{
          alignSelf: 'left',
          opacity: !delivery || delivery === shop.adress ? '1' : '0.5',
          mt:10,
        }}
        gutterBottom
        variant='body2'
        component='p'
      >
        {shop.time}
      </Typography>
    </Box>
  );
}
