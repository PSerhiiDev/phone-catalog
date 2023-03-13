import React from 'react';
import { Product } from '../../App';
import ProductCard from '../ProductCard/ProductCard';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import styles from './ProductsSlider.module.scss';
import "swiper/css";

type Props = {
  title: string;
  list: Product[];
};



const ProductsSlider: React.FC<Props> = ({ title, list }) => {
  return (
    <div className={styles.sliderWrapper}>
      <h2 className="section-title">{title}</h2>

      <Swiper
        spaceBetween={16}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            // spaceBetween: 20
          },
          800: {
            slidesPerView: 3,
             spaceBetween: 10
          },
          1200: {
            slidesPerView: 4,
            // spaceBetween: 40
          }
        }}
      >
        {list?.map((item: Product) => (
          <SwiperSlide key={item.id}>
            <ProductCard
              item={item}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductsSlider