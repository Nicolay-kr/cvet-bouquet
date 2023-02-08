import React from 'react';
import Box from '@mui/material/Box';


export default function DoubleBlock({ children }) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'grid',
        columnGap: 'max(30px, 1.5vw)',
        rowGap: 'max(30px, 1.5vw)',
        gridTemplateColumns: { xs: '1fr', lg: '5fr 7fr' },
        height: '100%',
        px: { xs: '5%', lg: '10%' },
        mb: { xs: '40px', lg: '200px' },
      }}
      component='section'
    >
      {children}
    </Box>
  );
}

