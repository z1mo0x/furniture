import React from "react";
import styles from "./CollectionItems.module.css";
import CollectionItem from "./CollectionItem/CollectionItem";
import loadingProduct from '../../img/loadingProduct.gif'

export default function CollectionItems({ collection, collectionLoading }) {


	return (
		<div className={styles.collection}>
			<div className={styles.collection__wrapper}>
				{collection.map((el) => (
					<CollectionItem

						key={el.id}
						link={el.id}
						title={el.title}
						rating={el.rating.rate}
						price={el.price}
						image={el.image}
					/>
				))}

			</div>
		</div>
	);
}
