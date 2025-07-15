import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import BasketItem from '../../components/BasketItem/BasketItem';
import { supabase } from '../../supabase'
import styles from '../../components/BasketItem/BasketItem.module.css'
import cartEmptyImage from '../../img/cartEmptyImage.png'
import { NavLink } from 'react-router';
import Loader from './Loader';

export default function Basket() {

    const [cart, setCart] = useState([]);
    const [cartLoading, setCartLoading] = useState(false);

    useEffect(() => {
        getDataCart();
    }, []);
    useEffect(() => {
        calculateTotal(cart)
    }, [cart]);

    async function getDataCart(noLoading) {
        if (!noLoading) {
            setCartLoading(true);
        }

        const { data, error } = await supabase.from('cart').select('*');

        if (error) {
            console.error('Ошибка получения данных:', error.message);
        } else {
            setCart(data || []);
        }

        setCartLoading(false);
    }

    const [totalPrice, setTotalPrice] = useState()

    function calculateTotal(cartData) {
        const sum = cartData.reduce((acc, el) => acc + el.price * el.count, 0);
        setTotalPrice(Number(sum.toFixed(2)));
        console.log(sum.toFixed(2));
    }


    if (cartLoading) { return <Loader /> }

    return (
        <Layout>
            <div className="container">
                <div className={styles.cart}>
                    <div className={styles.cart__title}>
                        {`У вас в корзине ${cart.length} товаров`}
                    </div>
                    {

                        <div className={styles.cart__wrapper}>
                            {
                                cart.length > 0
                                    ?
                                    <>
                                        {cart.map((item) => {
                                            return (
                                                <BasketItem
                                                    key={item.id}
                                                    id={item.id}
                                                    image={item.image}
                                                    title={item.title}
                                                    rating={item.rating}
                                                    count={item.count}
                                                    price={item.price}
                                                    getDataCart={getDataCart}
                                                    calculateTotal={calculateTotal}
                                                    cart={cart}
                                                />
                                            )
                                        })}
                                        <div className={styles.cart__total}>
                                            {`Общая сумма покупок: ${totalPrice} $`}
                                        </div>
                                    </>
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

                    }
                </div>


            </div>
        </Layout >
    )
}
