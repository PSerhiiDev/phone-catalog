import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";

import styles from './GallerySlider.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-fade";

const GallerySlider = () => {
  return (
    <div className={styles.topGallery}>
        <>
      <Swiper 
        effect={"fade"}
        loop={true}
        navigation={true} 
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]} 
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="img/Banner.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="img/Banner2.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="img/Banner3.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="img/Banner4.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="img/Banner5.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
    </div>
  )
}

export default GallerySlider
