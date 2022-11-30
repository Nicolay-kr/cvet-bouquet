import React, { useMemo } from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import SwiperCore, { Mousewheel, FreeMode } from 'swiper';
import { SwiperSlide } from 'swiper/react';
import style from './Carusel.module.css';
import BouquetCard from '../BouquetCard/BouquetCard';
import SimpleBouquetCard from '../SimpleBouquetCard/SimpleBouquetCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

SwiperCore.use([Mousewheel, FreeMode]);

const Carusel = ({ bouquets, caruselRef, isSpec, categoryslug }) => {
  // let gap = Math.round((20 / +window?.screen?.width) * 5000);
  const sm = useMediaQuery('(max-width:600px)');
  const lg = useMediaQuery('(max-width:1200px)');
  const xl = useMediaQuery('(max-width:1536px)');

  const listItem = bouquets?.map((bouquet) => {
    return (
      <SwiperSlide className={style.bouquetBox} key={bouquet._id}>
        {isSpec ? (
          <SimpleBouquetCard
            id={bouquet._id}
            title={bouquet.title.ru ? bouquet.title.ru : bouquet.title}
            price={bouquet.price}
            // description={description.ru}
            imagePath={bouquet.mainImage}
            slug={bouquet.slug}
          ></SimpleBouquetCard>
        ) : (
          <Box sx={{height:'100%',mr:{xs:'10px',lg:'max(20px,1.2vw)'}}}>
            <BouquetCard
              id={bouquet._id}
              title={bouquet.title.ru}
              price={bouquet.price}
              categorySlug={`catalog/${categoryslug}`}
              // description={description.ru}
              imagePath={bouquet.images[0]}
              slug={bouquet.slug}
            ></BouquetCard>
          </Box>
        )}
      </SwiperSlide>
    );
  });

  return (
    <Swiper
      ref={caruselRef}
      // slidesPerView={breakpoints.m ? (breakpoints.xs ? "2" : "3") : "5"}
      slidesPerView={sm ? 2 : 'auto'}
      loopedSlides={4}
      grabCursor={true}
      loop={true}
      // mousewheel={breakpoints.md ? false : true}
      // direction={breakpoints.md? "horizontal" : "vertical"}
      // freeMode={breakpoints.s ? true : false}
      spaceBetween={10}
    >
      {listItem}
    </Swiper>
  );
};

export default Carusel;
