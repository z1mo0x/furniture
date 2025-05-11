import axios from 'axios'
import { useEffect, useState } from 'react'
import { Router, useParams } from 'react-router';
import ProductItem from '../Products/ProductItem/ProductItem';
import ProductsSwiper from '../Products/ProductsSwiper/ProductsSwiper';
import { SwiperSlide } from 'swiper/react';
import styles from './SameProducts.module.css'
import Title from '../Title/Title';

export default function SameProducts() {

    const [same, setSame] = useState([]);

    const { productId } = useParams()

    async function getProducts() {
        const response = await axios.get(`https://fakestoreapi.com/products/`);
        const thisElementCategory = response.data[productId - 1].category;

        // Фильтруем массив, чтобы исключить текущий продукт
        const filteredProducts = response.data.filter((el) => {
            return el.category === thisElementCategory && el !== response.data[productId - 1]; // Используем el.id для сравнения
        });

        setSame(filteredProducts);
    }

    useEffect(() => {
        getProducts();
    }, [productId]);

    return (
        <>
            <div className={styles.same}>
                <div className="container">
                    <Title >Same Products</Title>
                    <div className={styles.same__slider}>
                        <ProductsSwiper>
                            {
                                same.map((item, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            {/* TODO починить ссылки */}
                                            <ProductItem
                                                key={item.key}
                                                title={item.title}
                                                image={item.image}
                                                price={item.price}
                                                link={item.id}
                                            />
                                            {/* TODO починить ссылки */}
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </ProductsSwiper>
                    </div>
                </div>
            </div>
        </>
    )
}
