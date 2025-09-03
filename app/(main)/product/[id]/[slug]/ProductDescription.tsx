'use client'
import ScoreStar from '@/components/ScoreStar'
import Button from '@/components/ui/Button'
import { Star } from 'lucide-react'
import React, { useState } from 'react'

const ProductDescription = () => {
    const [tab, setTab] = useState<string>('desc')
    const [star, setStar] = useState<number>(0)
    const handleChangeTab = (tab: string) => {
        setTab(tab)
    }
  return (
    <div className='px-32'>
        <div className='flex gap-3'>
            <button className={`px-8 py-2 cursor-pointer ${tab === 'desc' ? 'bg-black text-white' : 'text-black bg-white border border-black' } `} 
                onClick={()=> handleChangeTab('desc')}>Mô tả</button>
            <button className={`px-8 py-2 cursor-pointer ${tab === 'rate' ? 'bg-black text-white' : 'text-black bg-white border border-black' } `} 
                onClick={()=> handleChangeTab('rate')}>Đánh giá (1)</button>
        </div>
        {
            tab === 'desc'
            ? <div className='mt-5'>
                <h4 className='text-2xl mb-3'>Mô tả sản phẩm</h4>
                <p className='text-gray-600 leading-normal'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Curabitur vulputate vestibulum Phasellus rhoncus, dolor eget viverra pretium, 
                    dolor tellus aliquet nunc vitae ultricies erat elit eu lacus. 
                    Vestibulum non justo consectetur, cursus ante, tincidunt sapien. 
                    Nulla quis diam sit amet turpis interdum accumsan quis nec enim. 
                    Vivamus faucibus ex sed nibh egestas elementum. Mauris et bibendum dui. 
                    Aenean consequat pulvinar luctus
                </p>
            </div>
            : <div className='mt-5'>
                {/* List Comments */}
                <div className='flex flex-col gap-3'>
                    <div className='border border-gray-300 p-3'>
                        <div className='flex justify-between items-center mb-3 font-medium'>
                            <h5>bloxic – 22/09/2022</h5>
                            <ScoreStar score={4} />
                        </div>
                        <p className='leading-normal'>How all this mistaken idea of denouncing pleasure and praising pain was born and
                            I will give you a complete account of the system, and expound the actual teachings. 
                        </p>
                    </div>
                    <div className='border border-gray-300 p-3'>
                        <div className='flex justify-between items-center mb-3 font-medium'>
                            <h5>bloxic – 22/09/2022</h5>
                            <ScoreStar score={4} />
                        </div>
                        <p className='leading-normal'>How all this mistaken idea of denouncing pleasure and praising pain was born and
                            I will give you a complete account of the system, and expound the actual teachings. 
                        </p>
                    </div>
                </div>
                <hr className='text-gray-300 my-4' />
                {/* Form Review */}
                <form action="">
                    <div>
                        <label htmlFor="">Đánh giá của bạn *</label>
                        <div className="flex items-center gap-1 mt-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                            onClick={() => setStar(index + 1)}
                            key={index}
                            className={`w-4 h-4 ${index + 1 <= star ? "text-yellow-400" : "text-gray-400"}`}
                            fill={index + 1 <= star ? "#facc15" : "none"} // fill vàng cho sao được chọn
                            />
                        ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mt-5 mb-4'>
                        <label htmlFor="">Nhận xét của bạn *</label>
                        <textarea className='px-3 h-24 py-2 border border-gray-300' required></textarea>
                    </div>
                    <Button text='Gửi đi' isSubmit={true} />
                </form>
            </div>
        }
    </div>
  )
}

export default ProductDescription
