import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function TitleWithSubtitle({ title, subtitle }) {
  return (
    <Box
      sx={{
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
      }}
    >
      <Typography variant='h1' component='h2' sx={{ mr: 'auto' }}>
        {title}
      </Typography>

      <Typography
        variant='h2'
        component='p'
        sx={{
          ml: 'auto',
          mt: 'max(10px,0.5vw)',
          position: 'relative',
          right:{ xs:'-10%',sm:'-20%'},
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}
