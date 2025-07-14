import React, { useEffect, useState } from "react";
import CollectionItems from "../../components/CollectionItems/CollectionItems";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import CollectionFilter from '../../components/CollectionItems/CollectionFilter/CollectionFilter'
import CollectionItem from "../../components/CollectionItems/CollectionItem/CollectionItem";

export default function Collection() {

	const [collection, setCollection] = useState([]);
	const [displayCollection, setDisplayCollection] = useState([])
	const [collectionLoading, setCollectionLoading] = useState(false);

	async function getProducts() {
		setCollectionLoading(true);
		const response = await axios.get(`https://fakestoreapi.com/products/`);
		setCollection(response.data);
		setDisplayCollection(response.data)
		setCollectionLoading(false);
	}

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<Layout>
			<div className="container">
				<CollectionFilter setDisplayCollection={setDisplayCollection} displayCollection={displayCollection} collection={collection} setCollection={setCollection} />
				{collectionLoading
					?
					<CollectionItem
						key={0}
						link={''}
						title={''}
						rating={''}
						price={''}
						image={''}
					/>
					:
					<CollectionItems displayCollection={displayCollection} setDisplayCollection={setDisplayCollection} collection={collection} loading={collectionLoading} />
				}
			</div>
		</Layout>
	);
}
