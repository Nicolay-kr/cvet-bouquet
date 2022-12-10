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
import { Controller } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/controller';

SwiperCore.use([Mousewheel, FreeMode]);

const Carusel = ({
  bouquets,
  caruselRef,
  isSpec,
  categoryslug,
  controlledSwiper = null,
  isPremium = false,
}) => {
  const sm = useMediaQuery('(max-width:600px)');

  const listItems = bouquets?.map((bouquet) => {
    return (
      <SwiperSlide className={style.bouquetBox} key={bouquet._id}>
        {isSpec ? (
          // <Box sx={{ width: { xs: '120px', lg: '20vw' } }}>
          <SimpleBouquetCard
            isPremium={isPremium}
            id={bouquet._id}
            title={bouquet.title.ru ? bouquet.title.ru : bouquet.title}
            price={bouquet.price}
            // description={description.ru}
            imagePath={isPremium ? bouquet.images[0] : bouquet.mainImage}
            slug={bouquet.slug}
          ></SimpleBouquetCard>
        ) : (
          // </Box>
          <Box
            sx={{ height: '100%', mr: { xs: '10px', lg: 'max(20px,1.2vw)' } }}
          >
            <BouquetCard
              id={bouquet._id}
              title={bouquet.title.ru}
              price={bouquet.price}
              categorySlug={`catalog/${categoryslug}`}
              // description={description.ru}
              imagePath={bouquet.images[0]}
              slug={bouquet.slug}
              deliveryPrice={bouquet.delivery.deliveryPrice}
              deliveryMin={bouquet.delivery.deliveryMin}
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
      slidesPerView={isSpec ? (sm ? 1.3 : 'auto') : sm ? 2 : 'auto'}
      loopedSlides={4}
      grabCursor={true}
      loop={true}
      spaceBetween={10}
      modules={[Controller]}
      controller={{ control: controlledSwiper }}
    >
      {listItems}
    </Swiper>
  );
};

export default Carusel;
