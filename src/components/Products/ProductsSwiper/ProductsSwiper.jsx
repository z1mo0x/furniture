import React from 'react'
import { Swiper } from 'swiper/react';
import 'swiper/css';

export default function ProductsSwiper({ children, swiperRef }) {
    return (
        <Swiper
            breakpoints={{
                320: { slidesPerView: 1 },
                577: { slidesPerView: 2 },
                767: { slidesPerView: 3 },
                992: { slidesPerView: 4 },
            }}
            slidesPerView={4}
            spaceBetween={40}
            ref={swiperRef}
        >
            {children}
        </Swiper>
    )
}
