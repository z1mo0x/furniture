import styles from './ProductDetail.module.css'
import { supabase } from '../../supabase'
import { useEffect, useState } from 'react';
import { getStars } from '../../scripts/stars';

export default function ProductDetail({ product, image, title, price, description, rating }) {


    const [basketData, setBasketData] = useState([])

    useEffect(() => {
        getData();
    }, []);


    async function getData() {
        let { data, error } = await supabase
            .from('cart')
            .select('*')

        if (error) {
            console.error('Ошибка получения данных:', error.message);
        } else {
            setBasketData(data || []);
        }
    }

    async function addBasket() {
        const productId = product.id;

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
        } else {
            // Товара нет — вставляем новый с quantity = 1
            const { data: insertData, error: insertError } = await supabase
                .from('cart')
                .insert([
                    {
                        id: product.id,
                        title: product.title,
                        description: product.description,
                        image: product.image,
                        price: product.price,
                        rating: product.rating.rate,
                        rating_count: product.rating.count,
                        count: '1'
                    },
                ]);

            if (insertError) {
                console.error('Ошибка добавления товара:', insertError.message);
            } else {
                console.log('Товар добавлен в корзину:', insertData);
                window.dispatchEvent(new Event('cartUpdated'));
            }
        }

        // Обновляем локальные данные корзины
        getData();
    }

    return (
        <div className={styles.detail}>
            <div className="container">
                <div className={styles.detail__wrapper}>
                    <div className={styles.detail__image}>
                        <img src={image} alt="" />
                    </div>
                    <div className={styles.detail__info}>
                        <div className={styles.detail__sticky}>
                            <div className={styles.detail__title}>
                                {title}
                            </div>
                            <div className={styles.detail__descr}>{description}</div>
                        </div>
                    </div>
                    <div className={styles.detail__block}>
                        <div className={styles.detail__sticky}>
                            <div onClick={() => { addBasket(product) }} className={styles.detail__price}>
                                {price} $
                            </div>
                            <div className={styles.detail__rating}>
                                <div className={styles.detail__stars}>
                                    {getStars(rating.rate)}
                                </div>
                                {rating.rate}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
