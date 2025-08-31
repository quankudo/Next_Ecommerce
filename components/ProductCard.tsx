import { Heart, ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ScoreStar from './ScoreStar'

const ProductCard = () => {
  return (
    <Link href={'/product/123/Bench-Astor-Oak-Rectangle-Dining-Table'}
      className='shadow rounded relative group overflow-hidden'>
        <div className='flex flex-col gap-3 absolute top-3 right-3
          transform -translate-y-10 opacity-0
          group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-300 z-[3]'>
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-white shadow'>
            <ShoppingCart className='w-5 h-5' strokeWidth={1}/>
          </div>
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-white shadow'>
            <Heart className='w-5 h-5' strokeWidth={1}/>
          </div>
        </div>
        <div className='relative flex justify-center items-center bg-[#f7f7f7]'>
            <span className='absolute top-4 left-4 inline-block px-2 py-1 text-sm rounded text-white bg-black'>-20%</span>
            <Image src={'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/sofa-1-600x600.png'} width={250} height={200} className='object-cover' alt=''/>
        </div>
        <div className='p-4'>
            <ScoreStar score={4} />
            <h5 className='text-black mt-1'>Benc Hmade Sanford Sofa Good</h5>
            <hr className='text-gray-300 my-2' />
            <div className='flex gap-4 items-center'>
                <span className='line-through text-gray-600 text-sm'>490,000₫</span>
                <span className='text-red-500 text-xl'>390,000₫</span>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard
