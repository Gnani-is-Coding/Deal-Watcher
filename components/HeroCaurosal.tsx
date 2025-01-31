"use client" 
// Add interactivity and event listeners (onClick(), onChange(), etc)		
// Use State and Lifecycle Effects (useState(), useReducer(), useEffect(), etc)

// here in this component, we are not manuallly doing any interractions to DOM.
// We have a package inside this Caurosel which does some interactions, so we use use Client in this case.


import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css";



const heroImages = [
    {
        imgUrl: "/assets/images/hero-1.svg",
        alt: "smartWatch"
    },
    {
        imgUrl: "/assets/images/hero-2.svg",
        alt: "bag"
    },
    {
        imgUrl: "/assets/images/hero-3.svg",
        alt: "lamp"
    },
    {
        imgUrl: "/assets/images/hero-4.svg",
        alt: "air fryer"
    },
    {
        imgUrl: "/assets/images/hero-5.svg",
        alt: "chair"
    },

]
function HeroCaurosal() {
    return (
        <div className='hero-carousel'>
            <Carousel 
            showThumbs={false}
            stopOnHover={true}
            // autoPlay
            // infiniteLoop
            interval={2000}
            showArrows={false}
            showStatus={false}
            >
                {heroImages.map(img => (
                    <Image key={img.alt} src={img.imgUrl} alt={img.alt} width={484} height={484} className='object-contain'/>
                ))}
            </Carousel>
            <Image src="/assets/icons/hand-drawn-arrow.svg"
            alt="arrow"
            height={175}
            width={175} 
            className='max-xl:hidden absolute -left-[15%] bottom-0 z-0'
            />
        </div>
    )
}

export default HeroCaurosal
