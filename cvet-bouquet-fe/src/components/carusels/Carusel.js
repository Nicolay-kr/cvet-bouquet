import React, { useMemo } from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import SwiperCore, { Mousewheel, FreeMode } from 'swiper';
import { SwiperSlide } from 'swiper/react';
import style from './Carusel.module.css';
import BouquetCard from '../BouquetCard/BouquetCard';

SwiperCore.use([Mousewheel, FreeMode]);

const Carusel = ({ bouquets, caruselRef }) => {
  // let gap = Math.round((20 / +window?.screen?.width) * 5000);
  console.log(bouquets)

  const listItem = bouquets?.map((bouquet) => {
    return (
      <SwiperSlide className={style.bouquetBox} key={bouquet._id}>
        <BouquetCard
          id={bouquet._id}
          title={bouquet.title.ru}
          price={bouquet.price}
          // description={description.ru}
          imagePath={bouquet.mainImage}
          slug={bouquet.slug}
        ></BouquetCard>
      </SwiperSlide>
    );
  });

  return (
    <Swiper
      ref={caruselRef}
      // slidesPerView={breakpoints.m ? (breakpoints.xs ? "2" : "3") : "5"}
      slidesPerView='auto'
      loopedSlides={5}
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
