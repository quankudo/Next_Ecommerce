'use client'
import { Check } from 'lucide-react'
import React, { useState } from 'react'

const AboutTabs = () => {
    const [tab, setTab] = useState<string>('gioi-thieu');
  return (
    <div>
        <div className='flex gap-8'>
            <button className={`cursor-pointer px-10 py-3 
                ${tab==='gioi-thieu'?'bg-black text-white':'bg-white text-black border border-black'}`}
                onClick={()=>setTab('gioi-thieu')}>
                GIỚI THIỆU
            </button>
            <button className={`cursor-pointer px-10 py-3 
                ${tab==='khach-quan'?'bg-black text-white':'bg-white text-black border border-black'}`}
                onClick={()=>setTab('khach-quan')}>
                KHÁCH QUAN
            </button>
            <button className={`cursor-pointer px-10 py-3 
                ${tab==='xuat-sac'?'bg-black text-white':'bg-white text-black border border-black'}`}
                onClick={()=>setTab('xuat-sac')}>
                XUẤT SẮC
            </button>
        </div>
        <div className={`mt-5 ${tab === 'gioi-thieu' ? 'block' : 'hidden'}`}>
            <p className='mb-6 text-gray-600'>Từ thiết kế đến chất lượng, Mona Furniture cam kết mang đến những sản phẩm đẳng cấp cho doanh nghiệp của bạn. 
                Mang đến cho không gian văn phòng của bạn sự thoải mái và năng suất làm việc cao nhất.</p>
            <h5 className='text-2xl'>Nội Thất Mona Furniture - Nâng Tầm Không Gian Sống</h5>
            <div className='grid grid-cols-2 w-[60%] gap-5 mt-4'>
                <div className='flex gap-3 items-center'>
                    <Check className='w-4 h-4'/>
                    <p className='text-gray-600'>Nội Thất Cao Cấp Cho Doanh Nghiệp</p>
                </div>
                <div className='flex gap-3 items-center'>
                    <Check className='w-4 h-4'/>
                    <p className='text-gray-600'>Thiết Kế Đẹp Mắt</p>
                </div>
                <div className='flex gap-3 items-center'>
                    <Check className='w-4 h-4'/>
                    <p className='text-gray-600'>Nâng Tầm Không Gian Sống</p>
                </div>
                <div className='flex gap-3 items-center'>
                    <Check className='w-4 h-4'/>
                    <p className='text-gray-600'>Đảm Bảo Chất Lượng</p>
                </div>
            </div>
        </div>
        <div className={`mt-5 ${tab === 'khach-quan' ? 'block' : 'hidden'}`}>
            <p className='mt-5'>Text tab Khach quan...</p>
        </div>
        <div className={`mt-5 ${tab === 'xuat-sac' ? 'block' : 'hidden'}`}>
            <p className='mt-5'>Text tab Xuat sac...</p>
        </div>
    </div>
  )
}

export default AboutTabs
