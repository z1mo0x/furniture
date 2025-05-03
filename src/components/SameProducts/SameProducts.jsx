import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import ProductItem from '../Products/ProductItem/ProductItem';
import ProductsSwiper from '../Products/ProductsSwiper/ProductsSwiper';
import { SwiperSlide } from 'swiper/react';
import styles from './SameProducts.module.css'
import Title from '../Title/Title';

export default function SameProducts() {

    const [same, setSame] = useState([]);

    const { id } = useParams()

    async function getProducts() {
        const responce = await axios.get(`https://fakestoreapi.com/products/`)
        let thisElementCategory = responce.data[id].category;

        responce.data.filter((el) => {
            if (el.category === thisElementCategory) {
                setSame(prevSame => [...prevSame, el])
            }
        })

        console.log(thisElementCategory);
    }
    useEffect(() => {
        getProducts()
    }, [])

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
