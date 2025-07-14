import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import BasketItem from '../../components/BasketItem/BasketItem';
import { supabase } from '../../supabase'
import styles from '../../components/BasketItem/BasketItem.module.css'
import cartEmptyImage from '../../img/cartEmptyImage.png'
import { NavLink } from 'react-router';

export default function Basket() {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let { data, error } = await supabase
            .from('cart')
            .select('*');

        if (error) {
            console.error('Ошибка получения данных:', error.message);
        } else {
            setCart(data || []);
        }
    }

    return (
        <Layout>
            <div className="container">
                {cart.length > 0
                    ?
                    cart.map((item) => {
                        return (
                            <BasketItem
                                key={item.id}
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                rating={item.rating}
                                count={item.count}
                                price={item.price}
                            />
                        )
                    })
                    :
                    <div className={styles.cart__empty}>
                        <img src={cartEmptyImage} alt="" />
                        <div className={styles.cart__info}>
                            Корзина пуста
                            <NavLink to={'/collection'}>Перейти к покупкам</NavLink>
                        </div>
                    </div>
                }

            </div>
        </Layout>
    )
}
