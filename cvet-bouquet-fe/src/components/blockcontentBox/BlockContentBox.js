import React from 'react';
import Box from '@mui/material/Box';
import BlockContent from '@sanity/block-content-to-react';

export default function BlockContentBox({ blocks,fs=20 }) {
  return (
    <Box
      sx={{
        color:'#000000',
        '& p': {
          fontFamily: 'Raleway, serif',
          color:'#000000',
          fontSize: { xs: '16px', lg: `${fs}px`, xxl: '1.2vw' },
          '@media (-webkit-min-device-pixel-ratio: 1.25)': {
            fontSize: { xs: '16px', lg: `${fs/1.25}px`, xxl: '1.2vw' },
          },
        },
        my: 'auto',
        '& li+li': {
          mt: '16px',
        },
      }}
      component={BlockContent}
      blocks={blocks}
    ></Box>
  );
}
