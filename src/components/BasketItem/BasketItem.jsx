import React, { useEffect, useState } from 'react'
import styles from './BasketItem.module.css'
import { supabase } from '../../supabase'

export default function BasketItem({ id, image, price, rating, title }) {

    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let { data, error } = await supabase
            .from('cart')
            .select('count')
            .eq('id', id);

        if (error) {
            console.error('Ошибка получения данных:', error.message);
        } else {
            setCartCount(data[0].count || []);
        }
    }

    console.log(cartCount);

    async function plusBasket() {
        const productId = id;

        // Проверяем, есть ли товар уже в корзине
        const { data: existingItems, error: selectError } = await supabase
            .from('cart')
            .select('*')
            .eq('id', productId);

        if (selectError) {
            console.error('Ошибка при проверке товара в корзине:', selectError.message);
            return;
        }

        if (existingItems.length > 0) {
            // Товар уже есть — увеличиваем количество
            const existingItem = existingItems[0];
            const updatedQuantity = existingItem.count + 1;

            const { error: updateError } = await supabase
                .from('cart')
                .update({ count: updatedQuantity })
                .eq('id', productId);

            if (updateError) {
                console.error('Ошибка при обновлении количества:', updateError.message);
            } else {
                console.log('Количество увеличено до', updatedQuantity);
            }
        }
        getData();
    }

    async function minusBasket() {
        const productId = id;

        // Проверяем, есть ли товар уже в корзине
        const { data: existingItems, error: selectError } = await supabase
            .from('cart')
            .select('*')
            .eq('id', productId);

        if (selectError) {
            console.error('Ошибка при проверке товара в корзине:', selectError.message);
            return;
        }

        if (existingItems.length > 0) {
            // Товар уже есть — увеличиваем количество
            const existingItem = existingItems[0];
            const updatedQuantity = existingItem.count - 1;

            const { error: updateError } = await supabase
                .from('cart')
                .update({ count: updatedQuantity })
                .eq('id', productId);

            if (updateError) {
                console.error('Ошибка при обновлении количества:', updateError.message);
            } else {
                console.log('Количество увеличено до', updatedQuantity);
            }
        }
        getData();
    }

    async function deleteCart() {
        const { error } = await supabase
            .from('cart')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Ошибка при обновлении количества:', updateError.message);
        } else {
            console.log("Удален товар:", id);
        }
        getData()
    }

    return (

        <div className={styles.basket__item}>
            <div className={styles.basket__image}>
                <img src={image} alt="" />
            </div>
            <div className={styles.basket__title}>
                {title}
            </div>
            <div className={styles.basket__rating}>
                {rating} / 5
            </div>
            <div className={styles.basket__price}>
                {price} $
            </div>
            <div className={styles.basket__count}>
                <button onClick={plusBasket} className={styles.basket__plus}>+</button>
                <input type="text" value={cartCount} readOnly />
                <button onClick={minusBasket} className={styles.basket__minus}>-</button>
            </div>
            <div className={styles.basket__actions}>
                <button onClick={deleteCart} className={styles.basket__delete}>Удалить</button>
            </div>
        </div>
    )
}
