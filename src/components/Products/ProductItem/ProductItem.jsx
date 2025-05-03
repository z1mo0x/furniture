import React from 'react'
import productImage from '../../../img/product-1.png'
import styles from './ProductItem.module.css'
import { NavLink } from 'react-router'

export default function ProductItem({ image, title, price, link }) {
    return (
        <NavLink to={`product/${link}`} className={styles.product}>
            <div className={styles.product__image}>
                <img src={image} alt="" />
            </div>
            <div className={styles.product__title}>
                {title}
            </div>
            <div className={styles.product__price}>
                ${price}
            </div>
        </NavLink>
    )
}
