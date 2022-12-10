import React from 'react';
import Box from '@mui/material/Box';
import BlockContent from '@sanity/block-content-to-react';

export default function BlockContentBox({ blocks,fs=20 }) {
  return (
    <Box
    className='blockContentt'
      sx={{
        color:'#000000',
        '& p': {
          fontFamily: 'Raleway, serif',
          color:'#000000',
          fontSize: { xs: '16px',lg: '14px', xl: `${fs}px`, xxl: '1.2vw' },
        },
        my: 'auto',
        '& li+li': {
          mt: '16px',
        },
      }}
    >
      <BlockContent blocks={blocks}></BlockContent>
    </Box>
  );
}
