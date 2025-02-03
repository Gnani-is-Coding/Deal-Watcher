import ProductPage from '@/components/ProductPage'
import { getProductById, getSimilarProducts } from '@/lib/actions'
import { ProductType } from '@/lib/types'
import React from 'react'


type IProps = {
    params: {id: string}
}
async function Product({params }: IProps) {
    const {id:prodId} = await params
    const productDetails:ProductType = await getProductById(prodId)
    const similarProducts = await getSimilarProducts(prodId) || []


  return (
    <>
      <ProductPage prodId={prodId} productDetails={productDetails} similarProducts={similarProducts} />
    </> 
  )
}

export default Product
