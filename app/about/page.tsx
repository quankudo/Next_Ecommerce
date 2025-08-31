import AboutTabs from '@/app/about/AboutTabs'
import BlogPreviewCard from '@/components/BlogPreviewCard'
import CategoryTitle from '@/components/CategoryTitle'
import SectionTitle from '@/components/SectionTitle'
import { Armchair, ArrowRight, Bath, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import FeaturesList from './FeaturesList'

const AboutPage = () => {
  return (
    <div>
      <SectionTitle title='Giới Thiệu' />
      <div className='py-14 px-32 flex gap-16 items-center'>
        <div className='relative flex-1'>
          <div className='bg-white px-6 py-4 absolute top-3 left-3'>
            <div className='flex items-center justify-center'><h4 className='text-6xl'>26</h4><span className='text-3xl'>+</span></div>
            <p className='text-center text-gray-500 text-sm'>năm <br /> kinh nghiệm</p>
          </div>
          <Image src={'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/about.jpg'} width={500} height={500} className='h-[500px] w-full object-cover' alt='' />
        </div>
        <div className='flex-1'>
          <span className='inline-block px-6 py-2 border-1 border-black rounded'>Mona Furniture</span>
          <h4 className='text-4xl mt-4'>Thiết kế nội thất <br /> phù hợp với mọi nhu cầu</h4>
          <p className='my-6 leading-loose'>Lựa chọn sản phẩm theo nhu cầu và sở thích cá nhân. <br />
              Với Mona Furniture, bạn có thể tạo dựng không gian 
              sống ưng ý và tiện nghi nhất.
          </p>
          <div className='flex gap-10 mb-6'>
            <div className='flex gap-3 items-center'>
              <Armchair className='w-8 h-8' strokeWidth={1}/>
              <p>Nội thất chất lượng</p>
            </div>
            <div className='flex gap-3 items-center'>
              <Bath className='w-8 h-8' strokeWidth={1}/>
              <p>Không gian sống lý tưởng</p>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-3'>
              <Check className='w-8 h-8'/>
              <p className='text-gray-500'>Chúng tôi cung cấp các sản phẩm nội thất cao cấp giúp bạn tối ưu hóa 
                không gian và tiện ích cho ngôi nhà.</p>
            </div>
            <div className='flex gap-3'>
              <Check className='w-8 h-8'/>
              <p className='text-gray-500'>Kết hợp tinh tế giữa màu sắc, kiểu dáng và chất liệu, 
                mang đến không gian sống hoàn hảo.</p>
            </div>
          </div>
        </div>
      </div>
      <div className='px-32'>
        <span className='inline-block px-6 py-1 border-1 border-black rounded-2xl'>Nội Thất Bền Bỉ 100%</span>
        <h4 className='text-3xl leading-normal my-7'>Sản Xuất Nội Thất Đẹp Mắt <br />
          Cho Doanh Nghiệp Của Bạn
        </h4>
        <AboutTabs />
      </div>
      <FeaturesList/>
      {/* New Blog */}
      <div className="px-32 mt-14">
        <CategoryTitle title="Bài Viết Mới Nhất"/>
        <div className="grid grid-cols-4 gap-5">
          <BlogPreviewCard />
          <BlogPreviewCard />
          <BlogPreviewCard />
          <BlogPreviewCard />
        </div>
        <div className="flex justify-center mt-8">
          <Link href={'/'} 
            className="flex items-center gap-2 bg-black text-white px-10 py-3 w-[max-content]">
            Xem tất cả <ArrowRight/>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
