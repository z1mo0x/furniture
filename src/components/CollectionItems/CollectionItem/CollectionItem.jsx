import React from "react";
import styles from "./CollectionItem.module.css";
import { NavLink } from "react-router";

export default function CollectionItem({ className, title, image, price, rating, link }) {
	return (
		<NavLink to={`/product/${link}`} className={`${styles.item} ${className}`}>
			<div className={styles.item__image}>
				<img src={image} alt="" />
			</div>
			<div className={styles.item__info}>
				<div className={styles.item__title}>{title}</div>
				<div className={styles.item__price}>{price} $</div>
			</div>
		</NavLink>
	);
}
