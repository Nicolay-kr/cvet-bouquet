import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WordWithArrow from '../WordWithArrow';

export default function BouquetSort({ sorting, activeSorting }) {
  return (
    <Box sx={{ px: { xs: '5%', lg: '10%' }, py: { xs: '24px', lg: '24px' } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          '& div+div': { ml: '20px' },
        }}
      >
        <Typography variant='h5'>Сортировать по:</Typography>
        <Box
          sx={{
            display: 'flex',
            ml: { xs: '0', lg: '20px' },
            mt: { xs: '20px', lg: '0' },
          }}
        >
          <WordWithArrow
            isActive={activeSorting === 'price'}
            title='цене'
            withClick={sorting.price}
          ></WordWithArrow>
          <WordWithArrow
            isActive={activeSorting === 'publishedAt'}
            title='новизне'
            withClick={sorting.novelty}
          ></WordWithArrow>
          <WordWithArrow
            isActive={activeSorting === 'popularity'}
            title='популярности'
            withClick={sorting.popularity}
          ></WordWithArrow>
        </Box>
      </Box>
    </Box>
  );
}
