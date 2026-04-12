import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavSearchBar from './NavSearchBar'

const navIcons = [
    {src:"/assets/icons/black-heart.svg", alt:"heart"},
    {src:"/assets/icons/user.svg", alt:"user"}
]

function Navbar() {
  return (
    <nav className='nav'>
      <Link href="/" className='flex items-center gap-2'>
        <Image src="/assets/icons/logo.svg" alt="logo" width={30} height={30}/>
        <p className='nav-logo'>Deal<span className='text-accent-purple'>Watcher</span></p>
      </Link>

      <div className='flex items-center gap-3'>
        <NavSearchBar />
        {navIcons.map(icon => (
          <div
            key={icon.alt}
            className='p-2 rounded-xl border border-glass-border cursor-pointer hover:border-accent-purple transition-colors duration-200'
            style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
          >
            <Image src={icon.src} alt={icon.alt} width={20} height={20} style={{ filter: "invert(1)" }}/>
          </div>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
