import React, { useRef } from 'react';
import styles from './CaruselBlock.module.css';

import Box from '@mui/material/Box';

import Image from 'next/future/image';
import LeftArrow from '../../../public/assets/icons/leftArrow.svg';
import RightArrow from '../../../public/assets/icons/rightArrow.svg';
import IconButton from '@mui/material/IconButton';
import TitleWithSubtitle from '../TitleWithSubtitle/TitleWithSubtitle';
import Carusel from '../carusels/Carusel';
import size from '../../utils/size';

export default function CaruselBlock({
  bouquets,
  isSpec = false,
  title,
  subtitle,
  categoryslug = null,
  customMt = null,
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
      component='section'
      sx={{
        width: '100%',
        pl: isSpec ? { xs: '5%', lg: '10%' } : 0,
        mt: customMt ? customMt : size(100),
      }}
    >
      <TitleWithSubtitle
        title={title}
        subtitle={subtitle}
        subtileRight={10}
      ></TitleWithSubtitle>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: { xs: '0', lg: '40px' },
          '@media (max-height:724px) and (min-width:1200px)': {
            mb:'20px',
          },
        }}
      >
        <IconButton
          onClick={handleLeftArrowClick}
          sx={{ marginLeft: isSpec ? 0 : { xs: '5vw', lg: '10vw' } }}
          aria-label='LeftArrowIcon'
        >
          <Box
            sx={{ width: { xs: '32px', sm: '60px', lg: '94px' } }}
            viewBox='0 0 104 18'
            component={LeftArrow}
          ></Box>
        </IconButton>
        <IconButton
          sx={{ marginRight: { xs: '5vw', lg: '10vw' } }}
          onClick={handleRightArrowClick}
          aria-label='RightArrowIcon'
        >
          <Box
            sx={{ width: { xs: '32px', sm: '60px', lg: '94px' } }}
            viewBox='0 0 104 18'
            component={RightArrow}
          ></Box>
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
        <Carusel
          bouquets={[...bouquets]}
          caruselRef={caruselRef}
          isSpec={isSpec}
          categoryslug={categoryslug}
          loopedSlides={6}
        />
      </Box>
    </Box>
  );
}
