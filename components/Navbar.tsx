import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const navIcons = [
    {src:"/assets/icons/search.svg", alt:"search"},
    {src:"/assets/icons/black-heart.svg", alt:"heart"},
    {src:"/assets/icons/user.svg", alt:"user"}
]

function Navbar() {
  return (
    <header className='w-full'>
        <nav className='nav'>
            <Link href="/" className='flex items-center'>
            <Image src="/assets/icons/logo.svg" alt="logo" width={30} height={30}/>
            <p className='nav-logo'>Deal<span className='text-primary'>Watcher</span></p>
            </Link>

            <div className='flex items-center gap-1'>
                {navIcons.map(icon => <Image key={icon.alt} src={icon.src} alt={icon.alt} width={25} height={25}/>)}
            </div>
        </nav>
    </header>
  )
}

export default Navbar
