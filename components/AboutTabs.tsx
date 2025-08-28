import { Check } from 'lucide-react'
import React from 'react'

const AboutTabs = () => {
  return (
    <div>
        <div className='flex gap-8'>
            <button className='bg-black text-white shadow-md px-10 py-4'>ABOUT US</button>
            <button className='shadow-md px-10 py-4'>OBJECTIVE</button>
            <button className='shadow-md px-10 py-4'>EXCELLENT</button>
        </div>
        <div>
            <p className='my-6'>Từ thiết kế đến chất lượng, Mona Furniture cam kết mang đến những sản phẩm đẳng cấp cho doanh nghiệp của bạn. 
                Mang đến cho không gian văn phòng của bạn sự thoải mái và năng suất làm việc cao nhất.</p>
            <h5 className='text-2xl'>Nội Thất Mona Furniture - Nâng Tầm Không Gian Sống</h5>
            <div className='grid grid-cols-2 w-[60%] gap-6 mt-4'>
                <div className='flex gap-3 items-center'>
                    <Check className='w-4 h-4'/>
                    <p className='text-gray-500'>Nội Thất Cao Cấp Cho Doanh Nghiệp</p>
                </div>
                <div className='flex gap-3 items-center'>
                    <Check className='w-4 h-4'/>
                    <p className='text-gray-500'>Thiết Kế Đẹp Mắt</p>
                </div>
                <div className='flex gap-3 items-center'>
                    <Check className='w-4 h-4'/>
                    <p className='text-gray-500'>Nâng Tầm Không Gian Sống</p>
                </div>
                <div className='flex gap-3 items-center'>
                    <Check className='w-4 h-4'/>
                    <p className='text-gray-500'>Đảm Bảo Chất Lượng</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutTabs
