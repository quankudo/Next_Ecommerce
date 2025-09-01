import { Search, Facebook, Instagram, Twitter, Youtube, Bath, BedDouble, ChefHat, Armchair, ArrowRight} from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const listSocial = [
    {
        icon: Facebook,
        text: 'Facebook'
    },
    {
        icon: Instagram,
        text: 'Instagram'
    },
    {
        icon: Twitter,
        text: 'Twitter'
    },
    {
        icon: Youtube,
        text: 'YouTube'
    },
]

const listCategory = [
    {
        id: 'Bath',
        icon: Bath,
        name: 'Phòng tắm',
        count: 2
    },
    {
        id: 'BedDouble',
        icon: BedDouble,
        name: 'Phòng ngủ',
        count: 1
    },
    {
        id: 'ChefHat',
        icon: ChefHat,
        name: 'Phòng bếp',
        count: 1
    },
    {
        id: 'Armchair',
        icon: Armchair,
        name: 'Phòng khách',
        count: 1
    }
]

const listNewBlogs = [
    {
        category: 'PHÒNG NGỦ',
        imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/news-10.jpg',
        desc: 'Perfect found a work computer setup.'
    },
    {
        category: 'PHÒNG BẾP',
        imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/news-9.jpg',
        desc: 'Proud found a work computer setup.'
    },
    {
        category: 'PHÒNG KHÁCH',
        imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/news-8-1.jpg',
        desc: 'Finally found a work computer setup.'
    },
    {
        category: 'PHÒNG TẮM',
        imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/news-7.jpg',
        desc: 'Hoya Vision USA: Using Inbound Blogs.'
    }
]

const listKeyWord = [
    'Business', 'Furniture', 'Plastic', 'Wood', 'Work'
]

const BlogAside = () => {
  return (
    <div className='border border-gray-300 p-5'>
        {/* Tìm kiếm */}
        <div className='flex justify-between items-center border border-gray-300 p-3'>
            <input type="text" placeholder='Tìm kiếm' className='outline-none'/>
            <Search className='w-5 h-5' strokeWidth={1}/>
        </div>
        <div className='mt-10'>
            <div className='relative w-full pb-4 border-b border-gray-300'>
                <h5 className='text-xl'>Mạng Xã Hội</h5>
                <span className='absolute inline-block bottom-0 h-[1px] w-[80px] bg-red-500 '/>
            </div>
            <div className='flex flex-col gap-5 mt-5'>
                {
                    listSocial.map(item=>(
                        <div key={item.text} className='flex justify-between items-center'>
                            <div className='w-10 h-10 border border-gray-300 rounded-full flex justify-center items-center'>
                                <item.icon className='w-6 h-6' />
                            </div>
                            <p>{item.text}</p>
                            <button className='inline-block px-4 py-2 rounded-3xl border border-gray-300 
                                text-gray-400 hover:bg-red-500 hover:text-white text-sm'>
                                Follow
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className='mt-10'>
            <div className='relative w-full pb-4 border-b border-gray-300'>
                <h5 className='text-xl'>Chuyên Mục</h5>
                <span className='absolute inline-block bottom-0 h-[1px] w-[80px] bg-red-500 '/>
            </div>
            <div className='flex flex-col gap-5 mt-5'>
                {
                    listCategory.map(item=>(
                        <div key={item.id} className='flex justify-between items-center p-3 border border-gray-300 hover:bg-black hover:text-white'>
                            <div className='flex items-center gap-3'>
                                <item.icon className='w-6 h-6' strokeWidth={1}/>
                                <p>{item.name}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='text-red-500'>({item.count})</span>
                                <ArrowRight className='w-5 h-5 text-gray-400' />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className='mt-10'>
            <div className='relative w-full pb-4 border-b border-gray-300'>
                <h5 className='text-xl'>Bài Viết Mới Nhất</h5>
                <span className='absolute inline-block bottom-0 h-[1px] w-[80px] bg-red-500 '/>
            </div>
            <div className='flex flex-col gap-5 mt-5'>
                {
                    listNewBlogs.map((item,index)=>(
                        <div key={index} className='flex gap-3'>
                            <div className='w-[120px] h-[80px] relative'>
                                <span className='z-[1] absolute top-0 left-0 inline-block text-[12px] px-1 bg-black text-white'>0{index+1}</span>
                                <Image src={item.imageUrl} alt='' fill className='object-cover' />
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm text-gray-400 mb-1'>{item.category}</p>
                                <p className='text-sm'>{item.desc}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className='mt-10'>
            <div className='relative w-full pb-4 border-b border-gray-300'>
                <h5 className='text-xl'>Bài Viết Mới Nhất</h5>
                <span className='absolute inline-block bottom-0 h-[1px] w-[80px] bg-red-500 '/>
            </div>
            <div className='flex flex-wrap gap-2 mt-5'>
                {
                    listKeyWord.map((item)=>(
                        <button key={item} className='inline-block px-4 py-2 bg-gray-100 text-gray-500 text-sm'>
                            {item}
                        </button>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default BlogAside
