import React, { useRef, useState } from 'react';
import styles from './CaruselBlock.module.css';

import Box from '@mui/material/Box';

import Image from 'next/future/image';
import leftArrow from '../../../public/assets/icons/leftArrow.svg';
import rightArrow from '../../../public/assets/icons/rightArrow.svg';
import IconButton from '@mui/material/IconButton';
import TitleWithSubtitle from '../TitleWithSubtitle/TitleWithSubtitle';
import Carusel from '../carusels/Carusel';
import ArcheMainConteiner from '../ArcheImageConteiners/ArcheMainConteiner';
import Typography from '@mui/material/Typography';
import { urlFor } from '../../../sanity';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import { EffectFade, Controller } from 'swiper';
import Link from '../CustopNextComponents/Link';
import bigFlower from '../../../public/assets/images/bigFlower.svg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/controller';

export default function CaruselBlockWithArch({
  bouquets,
  isSpec = false,
  title,
  subtitle,
  categoryslug = null,
}) {
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const caruselWithArchRef = useRef(null);

  const handleRightArrowClick = () => {
    caruselWithArchRef.current.swiper.slideNext();
  };
  const handleLeftArrowClick = () => {
    caruselWithArchRef.current.swiper.slidePrev();
  };

  const listItems = bouquets.map((item, index) => (
    <SwiperSlide key={index}>
      <Box component={Link} href={`/catalog/${item.slug?.current}`}>
        <ArcheMainConteiner
          isSwiper={true}
          src={urlFor(item.mainImage).width(400).url()}
        />
        <Typography
          sx={{
            display: 'block',
            backgroundColor: 'fon.main',
            textAlign: 'center',
            position: 'absolute',
            width: '100%',
            mt: '16px',
          }}
          variant='h5'
          component='p'
        >
          {item.title}
        </Typography>
      </Box>
    </SwiperSlide>
  ));

  return (
    <Box
      sx={{
        width: '100%',
        pl: isSpec ? { xs: '5%', lg: '10%' } : 0,
        mt: { xs: '60px', sm: '100px', lg: '100px' },
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

      <Box
        sx={{ display: 'flex', alignItems: 'baseline', position: 'relative' }}
      >
        <Box
          component={Image}
          sx={{
            position: 'absolute',
            top: '-12vw',
            left: '-12vw',
            width: { xs: '70vw', lg: '50vw' },
            height: { xs: '70vw', lg: '50vw' },
            pointerEvents: 'none',
          }}
          src={bigFlower}
          alt='flower'
        ></Box>
        <Box
          sx={{
            width: { xs: '45vw', lg: '25.5vw' },
            mr: { xs: '10px', lg: '20px' },
          }}
        >
          <Swiper
            modules={[EffectFade, Controller]}
            effect={'fade'}
            slidesPerView={1}
            loopedSlides={5}
            grabCursor={true}
            loop={true}
            spaceBetween={10}
            onSwiper={setControlledSwiper}
            enabled={false}
          >
            {listItems}
          </Swiper>
        </Box>
        <Carusel
          controlledSwiper={controlledSwiper}
          bouquets={bouquets}
          caruselRef={caruselWithArchRef}
          isSpec={isSpec}
          categoryslug={categoryslug}
        />
      </Box>
    </Box>
  );
}
