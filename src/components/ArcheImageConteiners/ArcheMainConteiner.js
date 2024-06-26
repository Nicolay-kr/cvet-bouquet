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
        '@media (max-height:724px) and (min-width:1200px)': {
          height: '64vh',
          width: '22vw',
          mr:'0'
        },
      }}
    >
      <Image
        src={src}
        alt='Bouquet image'
        fill={true}
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 35vw,
              33vw"
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
