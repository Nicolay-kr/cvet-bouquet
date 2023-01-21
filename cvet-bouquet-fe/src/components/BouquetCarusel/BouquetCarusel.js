import React from 'react';
import styles from './CaruselBlock.module.css';

import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function BouquetCarusel({
  listItems,
  caruselRef = null,
  initialSlide = null,
}) {
  return (
    <Swiper
      className={styles.swiperCustom}
      slidesPerView={1}
      loopedSlides={3}
      grabCursor={true}
      loop={true}
      ref={caruselRef}
      initialSlide={initialSlide?initialSlide:0}
    >
      {listItems.map((item, index) => (
        <SwiperSlide key={index}>{item}</SwiperSlide>
      ))}
    </Swiper>
  );
}
