import SectionHeading from '@/components/admin/SectionHeading'
import React from 'react'

const page = () => {
  return (
    <div>
        <SectionHeading text='Tạo đơn hàng' 
            links={[{label: 'Quản lý đơn hàng', href:'/admin/orders'}]}
        />
    </div>
  )
}

export default page
