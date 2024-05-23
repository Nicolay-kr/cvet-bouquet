import React from 'react';
import Typography from '@mui/material/Typography';
import BlockContentBox from '../BlockcontentBox/BlockContentBox';


export default function TitleWithTextBlocks({ title, blocks }) {
  return (
    <>
      <Typography
        variant='h1'
        component='h1'
        color='#000000'
        sx={{
          fontSize: { xs: '40px', lg: '65px', xxl: '3.4vw' },
          position: 'relative',
          left: { xs: '0%', lg: '-3%' },
        }}
      >
        {title}
      </Typography>
      <BlockContentBox blocks={blocks}></BlockContentBox>
    </>
  );
}
