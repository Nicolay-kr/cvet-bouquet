import React, { useRef } from 'react';
import styles from './CaruselBlock.module.css';

import Box from '@mui/material/Box';

import Image from 'next/future/image';
import leftArrow from '../../assets/icons/leftArrow.svg';
import rightArrow from '../../assets/icons/rightArrow.svg';
import IconButton from '@mui/material/IconButton';
import TitleWithSubtitle from '../TitleWithSubtitle/TitleWithSubtitle';
import Carusel from '../carusels/Carusel';

export default function CaruselBlock({ bouquets, isSpec=false }) {
  const caruselRef = useRef(null);

  const handleRightArrowClick = () => {
    caruselRef.current.swiper.slideNext();
  };
  const handleLeftArrowClick = () => {
    caruselRef.current.swiper.slidePrev();
  };

  return (
    <>
      <Box sx={{ width: '100%', pl: isSpec?'10%':0, mt: '100px' }}>
        <TitleWithSubtitle
          title={'Выберите '}
          subtitle={'категорию'}
        ></TitleWithSubtitle>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', mb: '40px' }}
        >
          <IconButton onClick={handleLeftArrowClick} sx={{ marginLeft: '10vw' }}>
            <Image src={leftArrow} alt='leftArrow icon'></Image>
          </IconButton>
          <IconButton
            sx={{ marginRight: '10vw' }}
            onClick={handleRightArrowClick}
          >
            <Image src={rightArrow} alt='rightArrow icon'></Image>
          </IconButton>
        </Box>
        <Carusel bouquets={bouquets} caruselRef={caruselRef} />
      </Box>
    </>
  );
}
