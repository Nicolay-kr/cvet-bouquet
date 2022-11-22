import React from 'react';
import Box from '@mui/material/Box';
import BlockContent from '@sanity/block-content-to-react';


export default function BlockContentBox({ blocks }) {
  return (
    <>
      <Box
        sx={{
          '& p': {
            fontFamily: 'Raleway, serif',
            fontSize: { xs: '16px', xl: '20px', xxl: '1vw' },
            '@media (-webkit-min-device-pixel-ratio: 1.25)': {
              fontSize: { xs: '16px', xxl: '1vw' },
            },
          },
          my: 'auto',
          '& li+li':{
            mt:'16px',
          }
        }}
        component={BlockContent}
        blocks={blocks}
      ></Box>
    </>
  );
}
