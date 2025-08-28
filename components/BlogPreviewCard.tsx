import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogPreviewCard = () => {
  return (
    <div>
        <div className='relative flex justify-center items-center bg-[#f7f7f7]'>
            <span className='absolute text-[14px] top-4 right-4 inline-block px-4 py-1 text-black bg-white'>BEDROOM</span>
            <Image src={'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/news-10-420x267.jpg'} width={250} height={200} className='object-cover w-full' alt=''/>
        </div>
        <div className='flex flex-col gap-4 mt-3'>
            <div className='flex justify-between items-center'>
                <p>Bởi: <span className='text-red-500'>monamedia</span></p>
                <span className='text-gray-500'>24/09/2022</span>
            </div>
            <h5 className='text-[18px]'>Perfect found a work computer setup That’s practically perf</h5>
            <Link href={''} className='flex items-center gap-3'>Xem thêm <ArrowRight/></Link>
        </div>
    </div>
  )
}

export default BlogPreviewCard
