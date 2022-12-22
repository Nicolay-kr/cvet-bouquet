// @ts-nocheck
import * as React from 'react';

import Box from '@mui/material/Box';
import Image from 'next/future/image';

export default function ArcheMainConteiner({ src, isSwiper = false,priority=false}) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: isSwiper ? '45vw' : '62vw', lg: '25.5vw' },
        height: { xs: isSwiper ? '62vw' : '79vw', lg: '37vw' },
        zIndex: '2',
        overflow: 'hidden',
        flexShrink: 0,
        backgroundColor:'#F8F2EA',
        borderTop: '5px solid #F8F2EA',
        borderRight: '4px solid #F8F2EA',
        borderLeft: '4px solid #F8F2EA',
        borderRadius: '400px 400px 0 0',
      }}
    >
      <Image
        src={src}
        alt='Bouquet image'
        fill={true}
        priority={priority}
        style={{
          objectFit: 'cover',
          left: '1%',
          top: isSwiper? '0%':'-1%',
        }}
      ></Image>
    </Box>
  );
}
