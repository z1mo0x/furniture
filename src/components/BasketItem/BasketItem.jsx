import React, { useEffect, useRef, useState } from 'react'
import styles from './BasketItem.module.css'
import { supabase } from '../../supabase'
import { getStars } from '../../scripts/stars'
import ButtonRed from '../Buttons/ButtonRed/ButtonRed'


export default function BasketItem({ cart, calculateTotal, getDataCart, id, image, price, rating, title }) {

    const [cartCount, setCartCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [animation, setAnimation] = useState()
    const itemRef = useRef(null)
    let noLoading = true;

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('cart')
                .select('count')
                .eq('id', id)
                .single()

            if (error) throw error

            setCartCount(data?.count || 0)
        } catch (error) {
            console.error('Ошибка получения данных:', error.message)
            setCartCount(0)
        }
        setLoading(false)
    }

    async function plusBasket() {
        setLoading(true)
        try {
            const { error } = await supabase
                .from('cart')
                .update({
                    count: cartCount + 1,
                })
                .eq('id', id)

            if (error) throw error

            await getData()

        } catch (error) {
            console.error('Ошибка при увеличении количества:', error.message)
        } finally {
            setLoading(false)
            getDataCart(noLoading)

        }
    }

    async function minusBasket() {
        if (cartCount <= 1) return

        setLoading(true)
        try {
            const { error } = await supabase
                .from('cart')
                .update({
                    count: cartCount - 1,
                })
                .eq('id', id)

            if (error) throw error

            await getData()
            getDataCart(noLoading)


        } catch (error) {
            console.error('Ошибка при уменьшении количества:', error.message)
        } finally {
            setLoading(false)
        }
    }

    async function deleteCart() {
        if (!itemRef.current) return;

        setAnimation(`${styles.basket__item_delete}`);

        try {
            await new Promise((resolve) => {
                const handler = (e) => {
                    itemRef.current.removeEventListener('animationend', handler);
                    resolve();
                };

                itemRef.current.addEventListener('animationend', handler);
            });

            const { error } = await supabase
                .from('cart')
                .delete()
                .eq('id', id);

            if (error) throw error;

            getDataCart(noLoading);
            calculateTotal(cart);

        } catch (error) {
            console.error('Ошибка удаления:', error);
            setAnimation('');
        }
    }

    return (
        <div ref={itemRef} className={`${styles.basket__item} ${animation} `} >
            <div className={styles.basket__image}>
                <img src={image} alt={title} />
            </div>
            <div className={styles.basket__title}>{title}</div>
            <div className={styles.basket__rating}>
                <div className={styles.basket__rate}>
                    {getStars(rating)}
                </div>
                <p>
                    {rating} / 5
                </p>
            </div>
            <div className={styles.basket__price}>
                {`${price} $`}
                <br />
                <div className={`${styles.basket__total} ${cartCount > 1 ? '' : `${styles.basket__nototal}`}`}>
                    {` Сумма: ${(price * cartCount).toFixed(2)} $`}
                </div>
            </div>
            <div className={styles.basket__count}>
                <button
                    onClick={minusBasket}
                    className={styles.basket__minus}
                    disabled={loading || cartCount <= 1}
                >
                    -
                </button>
                <input type="text" value={cartCount} readOnly />
                <button onClick={plusBasket} className={styles.basket__plus} disabled={loading}>
                    +
                </button>
            </div>
            <div className={styles.basket__actions}>
                <ButtonRed onClick={deleteCart} classes={styles.basket__delete} disabled={loading}>
                    x
                </ButtonRed>
            </div>
        </div>
    )
}
