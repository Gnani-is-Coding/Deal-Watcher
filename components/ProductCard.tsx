import { ProductType } from '@/lib/types'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

interface Iprops {
  product: ProductType;
}
function ProductCard({product}: Iprops) {
  return (
    <Link href={`/products/${product._id}`} className='product-card'>
      <div className='product-card_img-container'>

        <Image src={product.url} alt={product.title} width={200} height={200} className='product-card_img'/>
        <div className='flex flex-col gap-2 '>
            <h3 className='product-title'>
              {product.title}
            </h3>

            <div className='flex justify-between w-full'>
              <p className='text-black opacity-50 text-lg capitalize'>{product.category}</p>
              <p className='font-semibold text-lg'>
                <span>{product.currency}</span>
                <span>{product.currentPrice}</span>
                </p>
            </div>
        </div>
       
      </div>

    </Link>
  )
}

export default ProductCard
