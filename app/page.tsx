import HeroCaurosal from '@/components/HeroCaurosal'
import ProductCard from '@/components/ProductCard'
import SearchBar from '@/components/SearchBar'
import { getAllProducts } from '@/lib/actions'
import { ProductType } from '@/lib/types'
import Image from 'next/image'
import React from 'react'


{
  /*
  In Next-13 > or in app direectory based nextjs, by default all componentsa r SSR.
  they provide client with basuc HTML, CSS files, so that renderring can be fast,
  Data fetching logic can exist inside this server side components.
  Any client side manipulations like use of hooks, evwnt handlers are to be used in client componentas only..
  */
}


async function Home() {
  const allProducts =  await getAllProducts()

  // #TODO IMPLEMENT A ERROR BOUNDARY PAGE

  return (
    <>
      <section className='px-6 md:px-20 py-24'>
      <div  className='flex max-xl:flex-col gap-16'>
        <div className='flex flex-col justify-center'>
          <p className='small-text'>
            Smart Shoping starts here:
            <Image src="/assets/icons/arrow-right.svg" alt="logo" width={16} height={16}/>
          </p>

          <h1 className='head-text'>Unleash the Power of {' '}
            <span className='text-primary'>
              DealWatcher
            </span>
          </h1>

          <p className='mt-6'>
            Powerful self-serve platform and growth nanakytics to help you, and ertain more.
          </p>
          <SearchBar />

        </div>

      <HeroCaurosal/>
      </div>
      </section>

      <section className='trending-section'> 
        <h2 className='action-text'>Trending Deals</h2>

        <div className='flex flex-wrap gap-x-4 gap-y-16'>
        {allProducts?.map((product: ProductType) => 
          <ProductCard key={product._id} product={product}/>
        )}
        </div>
      </section>
    </>
  )
}

export default Home