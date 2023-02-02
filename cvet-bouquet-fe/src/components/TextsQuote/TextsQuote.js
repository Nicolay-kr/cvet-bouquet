import React from 'react';
import Box from '@mui/material/Box';
import size from '../../utils/size';

export default function TextsQuote() {
return (
    <Box
      sx={{
        '& span': {
          fontFamily: 'Zeferino One, serif',
          fontSize: { xs: '36px', xl: '50px', xxl: '2.6vw' },
          lineHeight: '1',
        },
        '& p': {
          m: '0',
          fontSize: { ...size(24),xs:16},

        },
        width: { xs: '100%', sm: '60%', lg: '100%' },
        mx: { xs: '0', sm: 'auto', lg: '0' },
      }}
    >
      <Box
        component='p'
        sx={{
          textAlign: 'left',
          position: 'relative',
          left: { xs: '0%', lg: '-10%' },
        }}
      >
        <span>Ваши</span> самые необычные и
        оригинальные <span>замыслы</span>
      </Box>
      <Box component='p' sx={{ textAlign: 'center' }}>
        становятся <span> реальностью </span> помощью наших опытных
      </Box>
      <Box component='p' sx={{ textAlign: 'right' }}>
        <span> флористов. </span>
      </Box>
    </Box>
  );
}
