import React, { useRef } from 'react';
import styles from './CaruselBlock.module.css';

import Box from '@mui/material/Box';

import Image from 'next/future/image';
import leftArrow from '../../../public/assets/icons/leftArrow.svg';
import rightArrow from '../../../public/assets/icons/rightArrow.svg';
import IconButton from '@mui/material/IconButton';
import TitleWithSubtitle from '../TitleWithSubtitle/TitleWithSubtitle';
import Carusel from '../carusels/Carusel';
import ArcheMainConteiner from '../ArcheImageConteiners/ArcheMainConteiner';
import { urlFor } from '../../../sanity';

export default function CaruselBlock({
  bouquets,
  isSpec = false,
  title,
  subtitle,
  categoryslug = null,
}) {
  const caruselRef = useRef(null);

  const handleRightArrowClick = () => {
    caruselRef.current.swiper.slideNext();
  };
  const handleLeftArrowClick = () => {
    caruselRef.current.swiper.slidePrev();
  };


  return (
    <Box
      sx={{
        width: '100%',
        pl: isSpec ? { xs: '5%', lg: '10%' } : 0,
        mt: { xs: '0',sm: '100px', lg: '100px' },
      }}
    >
      <TitleWithSubtitle title={title} subtitle={subtitle}></TitleWithSubtitle>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: { xs: '0', lg: '40px' },
        }}
      >
        <IconButton
          onClick={handleLeftArrowClick}
          sx={{ marginLeft: isSpec ? 0 : { xs: '5vw', lg: '10vw' } }}
        >
          <Box
            component={Image}
            sx={{ width: { xs: '32px', sm: '60px', lg: '95px' } }}
            src={leftArrow}
            alt='leftArrow icon'
          ></Box>
        </IconButton>
        <IconButton
          sx={{ marginRight: { xs: '5vw', lg: '10vw' } }}
          onClick={handleRightArrowClick}
        >
          <Box
            component={Image}
            sx={{ width: { xs: '32px', sm: '60px', lg: '95px' } }}
            src={rightArrow}
            alt='rightArrow icon'
          ></Box>
        </IconButton>
      </Box>


      <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
        <Carusel
          bouquets={[...bouquets]}
          caruselRef={caruselRef}
          isSpec={isSpec}
          categoryslug={categoryslug}
        />
      </Box>
    </Box>
  );
}
