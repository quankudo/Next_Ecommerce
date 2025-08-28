import { Headset, LockKeyhole, Truck, Wallet } from 'lucide-react'
import React from 'react'

const listFeatures = [
    {
        icon: Truck,
        title: 'Miễn Phí Vận Chuyển',
        desc: 'Miễn phí vận chuyển cho đơn hàng trên 500k'
    },
    {
        icon: LockKeyhole,
        title: 'Thanh Toán An Toàn',
        desc: 'Thanh toán bảo mật an toàn 100%'
    },
    {
        icon: Headset,
        title: 'Hỗ Trợ 24/7',
        desc: 'Dịch vụ hỗ trợ chuyên nghiệp 24/7'
    },
    {
        icon: Wallet,
        title: 'Cam Kết Hoàn Tiền',
        desc: 'Đảm bảo hoàn tiền nếu không hài lòng'
    }
]

const Features = () => {
  return (
    <div className='flex justify-between px-32 gap-8 my-16'>
        {listFeatures.map((item, index)=> (
            <div key={index} className='flex items-center px-6 py-4 gap-5 bg-white shadow-md'>
                {<item.icon className='w-10 h-10' strokeWidth={1} />}
                <div>
                    <p>{item.title}</p>
                    <p className='text-sm mt-2 text-gray-600'>{item.desc}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Features
