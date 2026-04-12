"use client"

import { ProductType } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import PriceInfoCard from './ProductInfo'
import { formatNumber } from '@/lib/utils'
import ProductCard from './ProductCard'
import Modal from './Modal'

type Props = {
    prodId: string,
    productDetails: ProductType | null,
    similarProducts: ProductType[]
}
function ProductPage({ prodId, productDetails, similarProducts }: Props) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [inputEmail, setInputEmail] = useState('')

    const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        await fetch(`/api/products/${prodId}/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: inputEmail }),
        })
        setOpenModal(false)
        setLoading(false)
        setInputEmail('')
    }

    if (!productDetails) {
        redirect('/')
    }

    return (
        <>
            <div className='product-container'>

                <div className='product-image flex items-center justify-center'>
                    <Image src={productDetails.image} alt={productDetails.title} width={578} height={578}
                        className='object-contain max-h-[500px]' />
                </div>


                <div className='flex flex-col gap-6'>
                    <div className='flex gap-3 flex-wrap items-start'>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-lg text-text-primary'>{productDetails.title}</p>
                            <Link href={productDetails.url} target="_blank" className="text-text-muted hover:text-accent-purple transition-colors duration-200">Visit here...</Link>
                        </div>

                        <div className='flex justify-center gap-3'>
                            <div className="product-hearts">
                                <Image
                                    src="/assets/icons/red-heart.svg"
                                    alt="heart"
                                    width={20}
                                    height={20}
                                />
                                <p className="text-base font-semibold text-accent-red">{productDetails.reviewsCount}</p>
                            </div>

                            <div className='p-2 rounded-10 border border-glass-border hover:border-accent-purple transition-colors duration-200 cursor-pointer'
                                style={{ background: "rgba(255,255,255,0.06)" }}>
                                <Image src="/assets/icons/bookmark.svg" width={20} height={20} alt="bookmark" style={{ filter: "invert(1)" }} />
                            </div>

                            <div className='p-2 rounded-10 border border-glass-border hover:border-accent-purple transition-colors duration-200 cursor-pointer'
                                style={{ background: "rgba(255,255,255,0.06)" }}>
                                <Image src="/assets/icons/share.svg" width={20} height={20} alt="share" style={{ filter: "invert(1)" }} />
                            </div>
                        </div>

                    </div>

                    <div className="product-info">
                        <div className='flex flex-col'>
                            <p className='text-[34px] font-semibold text-text-primary'>{productDetails.currency}{formatNumber(productDetails.originalPrice)}</p>
                            <p className='text-[21px] text-text-muted line-through'>{productDetails.currency}{formatNumber(productDetails.originalPrice)}</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <div className="flex gap-4">
                            <div className="product-stars">
                                <Image src="/assets/icons/star.svg" alt="star" width={16} height={16} />
                                <p className='text-sm text-primary-orange font-semibold'>23</p>
                            </div>

                            <div className="product-reviews">
                                <Image src="/assets/icons/comment.svg" alt="reviews" width={16} height={16} style={{ filter: "invert(1)" }} />
                                <p className='text-sm text-text-secondary font-semibold'>23 Reviews</p>
                            </div>
                        </div>
                        <p className='text-sm text-text-secondary'><span className='text-primary-green font-bold'>93%</span> of buyers have recommended this.</p>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <div className="flex gap-5 flex-wrap">
                            <PriceInfoCard
                                title="Current Price"
                                iconSrc="/assets/icons/price-tag.svg"
                                value={`${productDetails.currency} ${formatNumber(productDetails.currentPrice)}`}
                            />
                            <PriceInfoCard
                                title="Average Price"
                                iconSrc="/assets/icons/chart.svg"
                                value={`${productDetails.currency} ${formatNumber(productDetails.averagePrice)}`}
                            />
                            <PriceInfoCard
                                title="Highest Price"
                                iconSrc="/assets/icons/arrow-up.svg"
                                value={`${productDetails.currency} ${formatNumber(productDetails.highestPrice)}`}
                            />
                            <PriceInfoCard
                                title="Lowest Price"
                                iconSrc="/assets/icons/arrow-down.svg"
                                value={`${productDetails.currency} ${formatNumber(productDetails.lowestPrice)}`}
                            />
                        </div>
                        <button className='btn my-8' onClick={() => setOpenModal(true)}>Track</button>
                    </div>

                </div>

                <div className="flex flex-col gap-16">
                    <div className='flex flex-col gap-3'>
                        <h2 className='text-2xl font-semibold text-text-primary'>Product Description</h2>
                    </div>

                    <div className='flex flex-col gap-4'>
                        {productDetails.description.split("\n")}
                        {/* {productDetails.description} */}
                    </div>

                    <button className='btn w-fit min-w-[200px] items-center justify-center self-center flex gap-3'>
                        <Image src="/assets/icons/bag.svg" alt="bag" width={22} height={22} />
                        <Link className="text-base text-white" href={productDetails.url} >Buy Now</Link>
                    </button>
                </div>

                {similarProducts.length > 0 && (
                    <div className="py-16 flex flex-col gap-2 w-full">
                        <p className='section-text'>Similar Products</p>

                        <div className="flex flex-wrap gap-10 mt-7 w-full">
                            {similarProducts && similarProducts.map((prod) => (
                                <ProductCard key={prod._id} product={prod} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Modal isOpen={openModal} setOpenModal={setOpenModal} 
            isLoading={isLoading}
            inputEmail={inputEmail} setInputEmail={setInputEmail}
            handleEmailSubmit={handleEmailSubmit}
            />
        </>

    )
}

export default ProductPage
