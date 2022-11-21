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
import introImg1 from '../../../public/assets/images/intro_img1.png';

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
    <>
      <Box
        sx={{
          width: '100%',
          pl: isSpec ? '10%' : 0,
          mt: { xs: '100px', lg: '200px' },
        }}
      >
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
          {isSpec ? (
            <Box sx={{ mr: '30px' }}>
              <ArcheMainConteiner src={introImg1} />
            </Box>
          ) : null}
          <Carusel
            bouquets={bouquets}
            caruselRef={caruselRef}
            isSpec={isSpec}
            categoryslug={categoryslug}
          />
        </Box>
      </Box>
    </>
  );
}
