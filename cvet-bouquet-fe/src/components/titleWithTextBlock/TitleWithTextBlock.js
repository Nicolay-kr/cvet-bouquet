import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BlockContent from '@sanity/block-content-to-react';


export default function TitleWithTextBlocks({ title, blocks }) {
  return (
    <>
      <Typography
        variant='h1'
        component='h1'
        color='initial'
        sx={{
          fontSize: { xs: '40px', lg: '65px', xxl: '3.4vw' },
          position: 'relative',
          left: { xs: '0%', lg: '-10%' },
        }}
      >
        {title}
      </Typography>
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
        }}
        component={BlockContent}
        blocks={blocks}
      ></Box>
    </>
  );
}
