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

export default function Products() {

    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(null)


    useEffect(() => {
        async function getProducts() {
            setProductsLoading(true)
            try {
                const responce = await axios.get('https://fakestoreapi.com/products')
                setProducts(responce.data)
            }
            catch { }
            finally {
                setProductsLoading(false)
            }
        }

        getProducts()
    }, [])


    const swiperRef = useRef(null);

    const handleNext = () => {
        swiperRef.current.swiper.slideNext();
    };

    const handlePrev = () => {
        swiperRef.current.swiper.slidePrev();
    };


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
                                productsLoading
                                    ?
                                    'LOADING...'
                                    :
                                    <ProductsSwiper swiperRef={swiperRef}>
                                        {products.map((product, index) => {
                                            return (
                                                <>
                                                    <SwiperSlide key={index}>
                                                        <ProductItem
                                                            productJSON={product}
                                                            key={product.id}
                                                            image={product.image}
                                                            title={product.title}
                                                            price={product.price}
                                                            link={product.id} />
                                                    </SwiperSlide >
                                                </>
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
