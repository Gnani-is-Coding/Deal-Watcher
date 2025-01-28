import Image from 'next/image'
import React from 'react'

function Home() {
  return (
    <>
      <section className='px-6 border-2 border-red-500 md:px-20 py-24'>
      <div  className='flex max:xl:flex-col gap-16'>
        <div className='flex flex-col justify-center items-center'>
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
        </div>
      </div>
      </section>
    </>
  )
}

export default Home