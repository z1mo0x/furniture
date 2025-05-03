import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ProductItem from '../../components/Products/ProductItem/ProductItem'
import axios from 'axios'
import ProductDetail from '../../components/ProductDetail/ProductDetail'
import Layout from '../../components/Layout/Layout'
import Loader from './Loader'

export default function ProductPage() {

    const { id } = useParams()

    const [productDetail, setProductDetail] = useState([])

    const [detailLoading, setDetailLoading] = useState(true)


    async function getProducts() {
        const responce = await axios.get(`https://fakestoreapi.com/products/${id}`)
        setProductDetail(responce.data)
        setDetailLoading(false)
    }

    useEffect(() => {
        getProducts()
    }, [])


    return (
        <Layout>
            {
                detailLoading
                    ?
                    <Loader />
                    :
                    <ProductDetail
                        key={productDetail.id}
                        image={productDetail.image}
                        title={productDetail.title}
                        price={productDetail.price}
                        rating={productDetail.rating}
                        description={productDetail.description}
                    />
            }
        </Layout>
    )
}
