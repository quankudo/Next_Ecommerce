import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='px-32'>
      <div className='flex justify-between py-20'>
        <div className='flex flex-col gap-4'>
          <Image src={'https://smartfurniture.monamedia.net/wp-content/uploads/2024/11/logo.svg'} width={120} height={60} alt='logo'/>
          <p>4517 Washington Ave. Manchester, Kentucky <br /> 39495 ashington Ave. Manchester,</p>
          <div className='flex items-center gap-3'>
            <div className='w-[40px] h-[40px] rounded-full bg-black text-white flex justify-center items-center'>
              <Mail className='text-[16px]' />
            </div>
            <p className='text-red-500'>info@quankudo.global</p>
          </div>
          <div className='flex items-center gap-3'>
            <div className='w-[40px] h-[40px] rounded-full bg-black text-white flex justify-center items-center'>
              <Phone className='text-[16px]' />
            </div>
            <p className='text-red-500'>(+84) 0313-728-397</p>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <h4 className='text-2xl mb-2'>Danh mục</h4>
          <Link href={'/'}>Trang chủ</Link>
          <Link href={'/'}>Giới thiệu</Link>
          <Link href={'/'}>Sản phẩm</Link>
          <Link href={'/'}>Tin tức</Link>
          <Link href={'/'}>Liên hệ</Link>
        </div>
        <div className='flex flex-col gap-5'>
          <h4 className='text-2xl mb-2'>Liên kết</h4>
          <Link href={'/'}>Tables and chairs</Link>
          <Link href={'/'}>Platform rocker</Link>
          <Link href={'/'}>Storage and Units</Link>
          <Link href={'/'}>Furniture Components</Link>
          <Link href={'/'}>Sleeping and bedrooms</Link>
        </div>
        <div className='flex flex-col gap-5'>
          <h4 className='text-2xl mb-2'>Chính sách</h4>
          <Link href={'/'}>Support Center</Link>
          <Link href={'/'}>Term & Conditions</Link>
          <Link href={'/'}>Shipping</Link>
          <Link href={'/'}>Privacy Policy</Link>
          <Link href={'/'}>Help</Link>
        </div>
      </div>
      <hr className='text-gray-400' />
      <div className='text-center py-5'>
        <p>© Thiết kế và lập trình bởi QuanKudo</p>
      </div>
    </footer>
  )
}

export default Footer
