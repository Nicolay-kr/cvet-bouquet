import * as React from 'react';

import Box from '@mui/material/Box';
// import Image from 'next/future/image';

export default function ArcheConteiner({ src }) {
  return (
    <Box
      style={{
        position: 'relative',
        width: '25.5vw',
        height:'37vw',
        zIndex: '2',
        borderRadius:'400px 400px 0 0',
        overflow: 'hidden',
        borderTop: '5px solid #F8F2EA',
        borderRight: '4px solid #F8F2EA',
        backgroundImage:`url(${src.src})`,
        backgroundOrigin: 'border-box',
        // backgroundSize: 'cover',
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
