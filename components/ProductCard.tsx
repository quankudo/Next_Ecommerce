import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ProductCard = () => {
  return (
    <div className='shadow rounded'>
        <div className='relative flex justify-center items-center bg-[#f7f7f7]'>
            <span className='absolute top-4 left-4 inline-block px-4 py-2 rounded text-white bg-black'>-20%</span>
            <Image src={'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/sofa-1-600x600.png'} width={250} height={200} className='object-cover' alt=''/>
        </div>
        <div className='p-4'>
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                    key={index}
                    className={`w-4 h-4 ${index < 4 ? "text-yellow-400" : "text-gray-400"}`}
                    fill={index < 4 ? "#facc15" : "none"} // fill vàng cho sao được chọn
                    />
                ))}
            </div>
            <h5 className='text-black mt-1'>Benc Hmade Sanford Sofa Good</h5>
            <hr className='text-gray-300 my-2' />
            <div className='flex gap-4 items-center'>
                <span className='line-through text-gray-600 text-sm'>490,000₫</span>
                <span className='text-red-500 text-xl'>390,000₫</span>
            </div>
        </div>
    </div>
  )
}

export default ProductCard
