import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchBar from './SearchBar'
import IconBar from './IconBar'

const Header = () => {
  return (
    <header className='flex items-center gap-10 px-32 py-5'>
        <div >
            <Image src={'https://smartfurniture.monamedia.net/wp-content/uploads/2024/11/logo.svg'} width={120} height={60} alt='logo'/>
        </div>
        <div className='flex justify-between items-center flex-1'>
            <nav className='flex items-center gap-8'>
                <Link href={'/'}>Trang chủ</Link>
                <Link href={'/about'}>Giới thiệu</Link>
                <Link href={'/shop'}>Sản phẩm</Link>
                <Link href={'/blog'}>Tin tức</Link>
                <Link href={'/contact'}>Liên hệ</Link>
            </nav>
            <div className='flex items-center gap-8'>
                <SearchBar />
                <IconBar />
            </div>
        </div>
    </header>
  )
}

export default Header
