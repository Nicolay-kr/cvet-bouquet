import React, { useMemo } from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import SwiperCore, { Mousewheel, FreeMode } from 'swiper';
import { SwiperSlide } from 'swiper/react';
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
import size from '../../utils/size';

SwiperCore.use([Mousewheel, FreeMode]);

const Carusel = ({
  bouquets,
  caruselRef,
  isSpec,
  categoryslug,
  controlledSwiper = null,
  isPremium = false,
  initialSlide=0,
  loopedSlides=null
}) => {
  const md = useMediaQuery('(max-width:720px)');
  const xl = useMediaQuery('(max-width:1536px)');
  const upTo724height = useMediaQuery('(max-height:724px)');

  const listItems = bouquets.map((bouquet) => {
    return (
      <SwiperSlide style={{ width: 'auto', height: 'auto' }} key={bouquet._id}>
        {isSpec ? (
          <SimpleBouquetCard
            width={{ ...size(upTo724height?336:360), xs: '100%',sm:270 }}
            isPremium={isPremium}
            id={bouquet._id}
            title={bouquet.title?.ru ? bouquet.title?.ru : bouquet.title}
            price={bouquet.price}
            imagePath={isPremium ? bouquet.images[0] : bouquet.mainImage}
            slug={bouquet.slug}
          ></SimpleBouquetCard>
        ) : (
          <BouquetCard
            width={{ ...size(upTo724height?300:360), xs: '100%', }}
            id={bouquet._id}
            title={bouquet.title?.ru}
            price={bouquet.price}
            categorySlug={`catalog/${categoryslug}`}
            imagePath={bouquet.images[0]}
            slug={bouquet.slug}
            deliveryPrice={bouquet.delivery.deliveryPrice}
            deliveryMin={bouquet.delivery.deliveryMin}
          ></BouquetCard>
        )}
      </SwiperSlide>
    );
  });

  return (
    <Swiper
      ref={caruselRef}
      // slidesPerView={breakpoints.m ? (breakpoints.xs ? "2" : "3") : "5"}
      slidesPerView={isSpec ? (md ? 1.5 : 'auto') : md ? 2.1 : 'auto'}
      // slidesPerView={md && !isSpec ? 2:'auto'}
      initialSlide={initialSlide}
      loopedSlides={loopedSlides?loopedSlides:4}
      grabCursor={true}
      loop={true}
      spaceBetween={md ? (isSpec ? 10 : 15) : xl ? (isSpec ? 20 : 30) : 30}
      modules={[Controller]}
      controller={{ control: controlledSwiper }}
    >
      {listItems}
    </Swiper>
  );
};

export default Carusel;
