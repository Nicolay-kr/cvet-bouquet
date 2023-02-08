import * as React from 'react';

import Box from '@mui/material/Box';
import Image from 'next/future/image';

export default function ArcheMainConteiner({ src, isDrop = false }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: '0',
        top: '0',
        mr: isDrop ? '1vw' : '0',
        width: isDrop
          ? { xs: '48vw', lg: '20vw' }
          : { xs: '42vw', lg: '20.5vw' },
        height: isDrop
          ? { xs: '48vw', lg: '20vw' }
          : { xs: '53vw', lg: '25vw' },
        zIndex: '1',
        borderRadius: isDrop
          ? { xs: '15vw 0 15vw 0', lg: '100px 0 100px 0' }
          : { xs: '0 0 400px 400px' },
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <Image
        src={src}
        alt='Bouquet image'
        fill={true}
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        style={{objectFit:'cover'}}
      ></Image>
    </Box>
  );
}
