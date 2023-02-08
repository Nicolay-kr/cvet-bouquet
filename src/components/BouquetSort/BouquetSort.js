import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WordWithArrow from '../WordWithArrow/WordWithArrow';

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
            isActive={activeSorting.by === 'price'}
            title='цене'
            withClick={sorting.price}
            useOutsideState={true}
            state={activeSorting.by === 'price' && activeSorting.order==='asc' }
          ></WordWithArrow>
          <WordWithArrow
            isActive={activeSorting.by === 'publishedAt'}
            title='новизне'
            withClick={sorting.novelty}
            useOutsideState={true}
            state={activeSorting.by === 'publishedAt' && activeSorting.order==='asc' }
          ></WordWithArrow>
          <WordWithArrow
            isActive={activeSorting.by === 'popularity'}
            title='популярности'
            withClick={sorting.popularity}
            useOutsideState={true}
            state={activeSorting.by === 'popularity' && activeSorting.order==='asc' }
          ></WordWithArrow>
        </Box>
      </Box>
    </Box>
  );
}
