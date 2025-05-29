import React, { useEffect, useState } from "react";
import CollectionItems from "../../components/CollectionItems/CollectionItems";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import CollectionFilter from '../../components/CollectionItems/CollectionFilter/CollectionFilter'

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
				<CollectionFilter displayCollection={displayCollection} collection={collection} setCollection={setCollection} />
				{collectionLoading
					? 'loading...'
					:
					<CollectionItems collection={collection} loading={collectionLoading} />
				}
			</div>
		</Layout>
	);
}
