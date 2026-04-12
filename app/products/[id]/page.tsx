import ProductPage from '@/components/ProductPage'
import { getProductById, getSimilarProducts } from '@/lib/actions'
import { ProductType } from '@/lib/types'
import React from 'react'


type IProps = {
  params: Promise<{ id: string }>
}
async function Product({ params }: IProps) {
  const { id: prodId } = await params
  const result = await Promise.allSettled([getProductById(prodId), getSimilarProducts(prodId)])

  const productDetails = result[0].status === "fulfilled" ? result[0].value as ProductType : null
  const similarProducts = result[1].status === "fulfilled" ? result[1].value as ProductType[] : []

  return (
    <>
      <ProductPage prodId={prodId} productDetails={productDetails} similarProducts={similarProducts} />
    </>
  )
}

export default Product
