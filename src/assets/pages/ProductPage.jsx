import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import ProductItem from '../../components/Products/ProductItem/ProductItem'
import axios from 'axios'
import ProductDetail from '../../components/ProductDetail/ProductDetail'
import Layout from '../../components/Layout/Layout'
import Loader from './Loader'
import SameProducts from '../../components/SameProducts/SameProducts'

import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function ProductPage() {


    const { productId } = useParams()


    const containerRef = useRef(null);
    const [productDetail, setProductDetail] = useState([])

    const [detailLoading, setDetailLoading] = useState(true)



    async function getProducts() {
        const responce = await axios.get(`https://fakestoreapi.com/products/${productId}`)
        setProductDetail(responce.data)
        setDetailLoading(false)

        gsap.to(window, {
            duration: .5,
            scrollTo: 0,
        });
    }
    useEffect(() => {
        getProducts()

    }, [productId])


    return (

        detailLoading
            ?
            <Loader />
            :
            <Layout>
                <ProductDetail ref={containerRef}
                    image={productDetail.image}
                    title={productDetail.title}
                    price={productDetail.price}
                    rating={productDetail.rating}
                    description={productDetail.description}
                    product={productDetail}
                />
                <SameProducts />

            </Layout>

    )
}
