import React from 'react';
import styles from './CaruselBlock.module.css';

import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

export default function BouquetCarusel({
  listItems,
  caruselRef = null,
  initialSlide = null,
}) {
  return (
    <Swiper
      className={styles.swiperCustom}
      slidesPerView={1}
      loopedSlides={1}
      grabCursor={true}
      loop={true}
      pagination={{dynamicBullets:true}}
      modules={[Pagination]}
      ref={caruselRef}
      initialSlide={initialSlide?initialSlide:0}
    >
      {listItems.map((item, index) => (
        <SwiperSlide key={index}>{item}</SwiperSlide>
      ))}
    </Swiper>
  );
}
