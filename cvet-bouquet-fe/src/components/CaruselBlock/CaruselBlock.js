import React, { useRef } from 'react';
import styles from './CaruselBlock.module.css';

import Box from '@mui/material/Box';

import Image from 'next/future/image';
import leftArrow from '../../assets/icons/leftArrow.svg';
import rightArrow from '../../assets/icons/rightArrow.svg';
import IconButton from '@mui/material/IconButton';
import TitleWithSubtitle from '../TitleWithSubtitle/TitleWithSubtitle';
import Carusel from '../carusels/Carusel';
import ArcheConteiner from '../ArcheConteiner/ArcheConteiner';
import introImg1 from '../../assets/images/intro_img1.png';

export default function CaruselBlock({
  bouquets,
  isSpec = false,
  title,
  subtitle,
}) {
  const caruselRef = useRef(null);

  const handleRightArrowClick = () => {
    caruselRef.current.swiper.slideNext();
  };
  const handleLeftArrowClick = () => {
    caruselRef.current.swiper.slidePrev();
  };

  return (
    <>
      <Box sx={{ width: '100%', pl: isSpec ? '10%' : 0, mt: '200px' }}>
        <TitleWithSubtitle
          title={title}
          subtitle={subtitle}
        ></TitleWithSubtitle>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', mb: '40px' }}
        >
          <IconButton
            onClick={handleLeftArrowClick}
            sx={{ marginLeft: isSpec ? 0 : '10vw' }}
          >
            <Image src={leftArrow} alt='leftArrow icon'></Image>
          </IconButton>
          <IconButton
            sx={{ marginRight: '10vw' }}
            onClick={handleRightArrowClick}
          >
            <Image src={rightArrow} alt='rightArrow icon'></Image>
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          {isSpec ? <Box sx={{mr:'30px'}}><ArcheConteiner src={introImg1} /></Box> : null}
          <Carusel
            bouquets={bouquets}
            caruselRef={caruselRef}
            isSpec={isSpec}
          />
        </Box>
      </Box>
    </>
  );
}
