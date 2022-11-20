import * as React from 'react';
import styles from './IntroBlock.module.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ArcheMainConteiner from '../ArcheImageConteiners/ArcheMainConteiner';
import { urlFor } from '../../../sanity';
import { NextSanityIMG } from '../CustopNextComponents/NextSanityIMG';
import ArcheSecondConteiner from '../ArcheImageConteiners/ArcheSecondConteiner';

export default function IntroBlock({ mainImage, secondImage, textBlock }) {
  return (
    <Box component='section' width='100%' px='10%'>
      <Box mb={10} className={styles.content}>
        {textBlock}
        
        <Box pl={12.5} className={styles.mediaBox}>
          <Box sx={{ mt: '60px' }}>
            <ArcheMainConteiner
              src={urlFor(mainImage).width(500).url()}
            ></ArcheMainConteiner>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <ArcheSecondConteiner
              src={urlFor(secondImage).width(500).url()}
            ></ArcheSecondConteiner>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
