import { CircleUserRound, MessageCircleMore } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const BlogItem = () => {
  return (
    <div>
        {/* Image */}
        <div className='rounded-t-xl overflow-hidden relative w-full h-[450px]'>
            <Image src={'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/news-10.jpg'} alt=''
            fill className='object-cover'
            />
            <div className='absolute top-3 left-3 bg-white rounded text-2xl text-center w-20 h-20 flex justify-center items-center'>24<br />Th9</div>
        </div>
        {/* Content */}
        <div className='flex gap-5 items-center mt-5'>
            <span className='inline-block px-4 py-1 bg-black text-white'># Tags</span>
            <span>Plastic</span>
            <span>Wood</span>
        </div>
        <h4 className='text-2xl my-5'>Perfect found a work computer setup That’s practically perf</h4>
        <div className='flex gap-5 items-center'>
            <div className='flex gap-1 items-center'><CircleUserRound className='w-5 h-5' strokeWidth={1}/> monamedia</div> | 
            <div className='flex gap-1 items-center'><MessageCircleMore className='w-5 h-5' strokeWidth={1}/> 3</div>
        </div>
        <hr className='text-gray-300 my-3'/>
        <p className='text-gray-600 leading-loose'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem the industry’s standard dummy text ever since the when an unknown 
            printer took a galley of type and scrambled it to make a type spe has 
            been the industry’s standard dummy text
        </p>
    </div>
  )
}

export default BlogItem
