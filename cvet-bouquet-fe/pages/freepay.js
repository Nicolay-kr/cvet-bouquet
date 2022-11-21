import * as React from 'react';
import FreePayForm from '../src/components/freeForm/FreePayForm';
import Box from '@mui/material/Box';

export default function freepayPage({}) {
  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: '5%', lg: '10%' },
      }}
    >
      <FreePayForm></FreePayForm>
    </Box>
  );
}
