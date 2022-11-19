import * as React from 'react';

import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
// import Image from 'next/future/image';

export default function ArcheMainConteiner({ src }) {
  return (
    <Box
      style={{
        position: 'absolute',
        right: '-2%',
        top: '-1%',
        width: '25.5vw',
        height:'28vw',
        zIndex: '1',
        borderRadius:'0 0 400px 400px',
        overflow: 'hidden',
        borderTop: '5px solid #F8F2EA',
        borderRight: '4px solid #F8F2EA',
        background:` no-repeat url(${src})`,
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
