import * as React from 'react';

import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
// import Image from 'next/future/image';

export default function ArcheMainConteiner({ src }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: '0',
        top: '0',
        width: { xs: '42vw', lg: '25.5vw' },
        height: { xs: '53vw', lg: '28vw' },
        zIndex: '1',
        borderRadius: '0 0 400px 400px',
        overflow: 'hidden',
        background: ` no-repeat url(${src})`,
        backgroundOrigin: 'border-box',
        backgroundSize: 'cover',
        flexShrink: 0,
      }}
    >
      {/* <Image
        style={{
          width: '100%',
          objectFit: 'cover',
          objectPosition: 'top',
          height: '100%',
        }}
        src={src}
        alt='image'
      ></Image> */}
    </Box>
  );
}
