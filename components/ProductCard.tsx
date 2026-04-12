import { ProductType } from '@/lib/types'
import { formatNumber } from '@/lib/utils'
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

        <Image src={product.image} alt={product.title} width={200} height={200} className='product-card_img'/>
        <div className='flex flex-col gap-2 '>
            <h3 className='product-title'>
              {product.title}
            </h3>

            <div className='flex justify-between items-center w-full gap-2'>
              <p className='text-text-muted text-sm capitalize truncate min-w-0'>{product.category}</p>
              <p className='font-bold text-base text-white shrink-0'>
                <span>{product.currency}</span>
                <span>{formatNumber(product.currentPrice)}</span>
              </p>
            </div>
        </div>
       
      </div>

    </Link>
  )
}

export default ProductCard
