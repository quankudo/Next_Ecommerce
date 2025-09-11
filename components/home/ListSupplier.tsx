import { div } from 'framer-motion/client'
import Image from 'next/image'
import React from 'react'

const listSupplier = [
    'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/3.png',
    'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/4.png',
    'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/5.png',
    'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/6.png',
    'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/1.png',
    'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/2.png'
]

const ListSupplier = () => {
  return (
    <div className='flex justify-between gap-5 items-center mx-32 my-14 shadow overflow-hidden'>
        {
            listSupplier.map((item,index)=>(
                <Image className='object-cover flex-1 py-8 hover:scale-110 transition-all duration-300 hover:bg-gray-100' key={index} src={item} alt='' width={200} height={120} />
            ))
        }
    </div>
  )
}

export default ListSupplier
