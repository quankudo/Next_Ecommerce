import SectionTitle from '@/components/SectionTitle'
import { CircleUserRound, MessageCircleMore } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import BlogItem from './BlogItem'
import BlogAside from './BlogAside'

const page = () => {
  return (
    <div>
      <SectionTitle title='Trang Tin Tức' subTitle='Tin Tức'/>
      <div className='px-32 mt-14 flex items-start gap-6'>
        <div className='w-3/4 flex flex-col gap-10'>
          <BlogItem />
          <BlogItem />
          <BlogItem />
          <BlogItem />
        </div>
        <div className='w-1/4 sticky top-24 h-fit'>
          <BlogAside />
        </div>
      </div>
    </div>
  )
}

export default page
