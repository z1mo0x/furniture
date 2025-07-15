import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import styles from './HeaderAction.module.css'
import { supabase } from '../../../supabase'
import cartIcon from '../../../img/card-icon.png'
import searchIcon from '../../../img/search-icon.svg'

export default function HeaderActions() {

    const [basketCount, setBasketCount] = useState('')

    useEffect(() => {
        getCountBasket()

        function onCartUpdated() {
            getCountBasket();
        }

        window.addEventListener('cartUpdated', onCartUpdated);

        return () => {
            window.removeEventListener('cartUpdated', onCartUpdated);
        }
    }, [])


    async function getCountBasket() {
        const { data, error } = await supabase.from('cart').select('*');

        if (error) {
            console.error('Ошибка получения данных:', error.message);
        } else {
            setBasketCount(data.length)
        }
    }

    return (
        <div className={`${styles.icons}`}>
            <Link to={'/basket'} className={styles.icons__item}>
                {basketCount > 0
                    ?
                    <div className={styles.icons__count}>{basketCount}</div>
                    :
                    ''
                }
                <img src={cartIcon} alt="" />
            </Link>
            {/* <div className={styles.icons__item}>
                <img src={searchIcon} alt="" />
            </div> */}
        </div>
    )
}
