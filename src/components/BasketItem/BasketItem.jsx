import React, { useEffect, useState } from 'react'
import styles from './BasketItem.module.css'
import { supabase } from '../../supabase'
import { getStars } from '../../scripts/stars'
import ButtonRed from '../Buttons/ButtonRed/ButtonRed'


export default function BasketItem({ cart, calculateTotal, getDataCart, id, image, price, rating, title }) {

    const [cartCount, setCartCount] = useState(0)
    const [loading, setLoading] = useState(false)
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
            // Увеличиваем количество на 1
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
            // Уменьшаем количество на 1
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
        try {
            const { error } = await supabase
                .from('cart')
                .delete()
                .eq('id', id)

            if (error) throw error

            console.log('Товар удалён:', id)
        } catch (error) {
            console.error('Ошибка при удалении товара:', error.message)
        } finally {
            getDataCart(noLoading)
            calculateTotal(cart)
        }
    }

    return (
        <div className={styles.basket__item} >
            <div className={styles.basket__image}>
                <img src={image} alt={title} />
            </div>
            <div className={styles.basket__title}>{title}</div>
            <div className={styles.basket__rating}>
                <div className={styles.basket__rate}>
                    {getStars(rating)}
                </div>
                {rating} / 5
            </div>
            <div className={styles.basket__price}>
                {`${price} $`}
                <br />
                {
                    cartCount > 1
                        ?
                        `Сумма: ${(price * cartCount).toFixed(2)} $`
                        :
                        ''
                }
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
                    Удалить
                </ButtonRed>
            </div>
        </div>
    )
}
