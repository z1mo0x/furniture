import React from 'react'
import { Swiper } from 'swiper/react';
import 'swiper/css';

export default function ProductsSwiper({ children, swiperRef }) {
    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={40}
            ref={swiperRef}
        >
            {children}
        </Swiper>
    )
}
