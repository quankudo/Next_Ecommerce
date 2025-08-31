import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SectionTitle = ({title, subTitle} : {title: string, subTitle?: string}) => {
  return (
    <div className='bg-gray-100 h-[20rem] flex justify-center items-center flex-col gap-5'>
        <h3 className='text-4xl font-medium'>{title}</h3>
        <div className='flex items-center gap-3'>
            <Link href={'/'}>Trang chủ </Link>
            <ChevronRight /> <span className='text-gray-500'>{subTitle ? subTitle : title}</span>
        </div>
    </div>
  )
}

export default SectionTitle
