import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";

import styles from './GallerySlider.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-fade";

const gallery = [
  {
    id: 1,
    img: "img/Banner.png",
    title: "new iphone text 1"
  },
  {
    id: 2,
    img: "img/Banner2.png",
    title: "new iphone text 2"
  },
  {
    id: 3,
    img: "img/Banner3.png",
    title: "new iphone text 3"
  },
  {
    id: 4,
    img: "img/Banner4.jpg",
    title: "new iphone text 4"
  },
  {
    id: 5,
    img: "img/Banner5.jpg",
    title: "new iphone text 5"
  },
]

const GallerySlider = () => {
  return (
    <div className={styles.topGallery}>
      <>
        <Swiper
          effect={"fade"}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          className="mySwiper"
        >
          {gallery.map(item => (
            <SwiperSlide key={item.id}>
              <img src={item.img} alt={item.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  )
}

export default GallerySlider
