import * as React from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ArcheMainConteiner from '../ArcheImageConteiners/ArcheMainConteiner';
import { urlFor } from '../../../sanity';
import { NextSanityIMG } from '../CustopNextComponents/NextSanityIMG';
import ArcheSecondConteiner from '../ArcheImageConteiners/ArcheSecondConteiner';

export default function IntroBlock({ mainImage, secondImage, textBlock }) {
  return (
    <Box component='section' width='100%' sx={{ px: { xs: '5%', lg: '10%' } }}>
      <Box
        sx={{
          mt:'0',
          position: 'relative',
          display: 'grid',
          columnGap: 'max(30px, 1.5vw)',
          gridTemplateColumns: { sx: '1fr', lg: '5fr 7fr' },
          height:'100%',
        }}
      >
        {textBlock}
        <Box
          sx={{ pl: {xs:'0',lg:'60px'} , position: 'relative' }}
        >
          <Box sx={{ mt: {xs:'40px',lg:'60px'} }}>
            <ArcheMainConteiner
              src={urlFor(mainImage).width(500).url()}
            ></ArcheMainConteiner>
          </Box>
          <Box sx={{ position: 'absolute', top: '0', right: '0'  }}>
            <ArcheSecondConteiner
              src={urlFor(secondImage).width(500).url()}
            ></ArcheSecondConteiner>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
