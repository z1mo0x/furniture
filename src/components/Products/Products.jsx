import React, { useEffect, useRef, useState } from 'react'
import styles from './Products.module.css'
import Title from '../Title/Title'
import { SwiperSlide } from 'swiper/react';
import axios from 'axios'
import ProductsSwiper from './ProductsSwiper/ProductsSwiper'
import ProductItem from './ProductItem/ProductItem';
import next from '../../img/next.png'
import prev from '../../img/prev.png'
import Loader from '../../assets/pages/Loader';
import { fetchProducts } from '../../store'
import { useSelector, useDispatch } from 'react-redux'

export default function Products() {



    const dispatch = useDispatch()
    const products = useSelector(state => state.products.items)
    const status = useSelector(state => state.products.status)
    const error = useSelector(state => state.products.error)

    const swiperRef = useRef(null);

    const handleNext = () => {
        swiperRef.current.swiper.slideNext();
    };

    const handlePrev = () => {
        swiperRef.current.swiper.slidePrev();
    };

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts())  // запускаем загрузку товаров
        }
    }, [status, dispatch])


    return (
        <>
            <section className={styles.products}>
                <div className="container">
                    <div className={styles.products__wrapper}>
                        <div className={styles.products__header}>
                            <div className={styles.products__title}>
                                Our you have to buy
                                <Title>Product</Title>
                            </div>
                            <div className={styles.products__arrows}>
                                <div className={`${styles.products__arrow} ${styles.products__prev}`} onClick={handlePrev}>
                                    <img src={prev} alt="" />
                                </div>
                                <div className={`${styles.products__arrow} ${styles.products__next}`} onClick={handleNext}>
                                    <img src={next} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.products__slider}>
                            {
                                status === 'loading'
                                    ?
                                    'loading...' :
                                    <ProductsSwiper swiperRef={swiperRef}>
                                        {products.map((product, index) => {
                                            return (
                                                <SwiperSlide key={product.id}>
                                                    <ProductItem
                                                        productJSON={product}
                                                        image={product.image}
                                                        title={product.title}
                                                        price={product.price}
                                                        link={product.id} />
                                                </SwiperSlide >
                                            )
                                        })}
                                    </ProductsSwiper>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
