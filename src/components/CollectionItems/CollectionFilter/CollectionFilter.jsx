import React, { useEffect, useState } from "react";
import styles from './CollectionFilter.module.css'
import CollectionSearch from "../CollectionSearch/CollectionSearch";


export default function CollectionFilter({ collection, setCollection, displayCollection }) {

	const [categories, setCategories] = useState([]);
	const [filteredCollection, setFilteredCollection] = useState([])
	const [selectedCategory, setSelectedCategory] = useState(null); // Для хранения выбранной категории
	const filterDrop = document.querySelector(`.${styles.filter__down}`);
	const filterItems = document.querySelector(`.${styles.filter__drop}`);
	const filterItem = document.querySelectorAll(`.${styles.filter__item}`);

	useEffect(() => {
		const uniqCategories = []

		displayCollection.forEach((item) => {
			if (!uniqCategories.includes(item.category) && item.category !== selectedCategory) {
				uniqCategories.push(item.category)
			}
		})

		setCategories(uniqCategories)
	}, [collection])

	function openFilter() {
		console.log(displayCollection);;
		filterItems.classList.toggle('opened');
		if (filterItems.classList.contains('opened')) {
			filterDrop.style.height = filterDrop.scrollHeight + 'px';
		} else {
			filterDrop.style.height = '0px';
		}
	}

	function handleFilter(e) {
		const selected = e.target.textContent;
		setSelectedCategory(selected); // Сохраняем выбранную категорию
		const newFilteredCollection = displayCollection.filter(item => item.category === selected);
		setCollection(newFilteredCollection); // Обновляем основную коллекцию
		openFilter()
	}

	return (
		<div className={styles.filter}>
			<div className={styles.filter__wrapper}>
				<CollectionSearch displayCollection={displayCollection} collection={collection} setCollection={setCollection} />
				<div className={`${styles.filter__items} ${styles.filter__drop}`}>
					<div onClick={openFilter} className={`${styles.filter__item} ${styles.filter__first}`}>
						{selectedCategory || 'Выберите категорию'}
					</div>
					<div className={styles.filter__down}>
						{categories.map((el) => (
							<div key={el} onClick={handleFilter} className={styles.filter__item}>
								{el}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}