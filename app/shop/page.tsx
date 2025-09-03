import ProductCard from '@/components/ProductCard'
import ScoreStar from '@/components/ScoreStar'
import SectionTitle from '@/components/SectionTitle'
import Pagination from '@/components/ui/Pagination'
import React from 'react'
import PriceFilter from './PriceFilter'

const listCategory = [
  'Cockfighting Chair',
  'Court Cupboard',
  'Dressing Table',
  'Ggrandfather Clock',
  'Platform rocker',
  'Uncategorized'
]

const listColor = [
  {
    name: 'Đỏ',
    color: 'red',
    count: 5
  },
  {
    name: 'Vàng',
    color: 'yellow',
    count: 3
  },
  {
    name: 'Xám',
    color: 'gray',
    count: 7
  },
  {
    name: 'Xanh Dương',
    color: 'blue',
    count: 3
  },
  {
    name: 'Xanh lá',
    color: 'green',
    count: 9
  }
]

const listReview= [
  {
    star: 5,
    count: 10
  },
  {
    star: 4,
    count: 12
  },
  {
    star: 3,
    count: 5
  },
  {
    star: 2,
    count: 0
  },
  {
    star: 1,
    count: 0
  },
]

const ShopPage = () => {
  return (
    <div>
      <SectionTitle title='Sản phẩm' />
      <div className='mt-14 flex gap-10 px-32'>
        <div className='w-3/4'>
          <div className='flex justify-between items-center mb-10'>
            <p>Hiển thị 1–12 của 27 kết quả</p>
            <select name="" id="" className='px-5 py-2 border border-gray-300'>
              <option value="">Thứ tự mặc định</option>
              <option value="">Thứ tự theo mức độ phổ biến</option>
              <option value="">Thứ tự theo điểm đánh giá</option>
              <option value="">Mới nhất</option>
              <option value="">Thứ tự theo giá: thấp đến cao</option>
              <option value="">Thứ tự theo giá: cao đến thấp</option>
            </select>
          </div>
          <div className='grid grid-cols-3 gap-5'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <Pagination 
            currentPage={7} 
            totalPages={10} 
            basePath="/shop?page=" 
          />
        </div>
        <div className='w-1/4 flex flex-col gap-8'>
          <div>
            <h5 className='text-xl mb-8'>Danh Mục</h5>
            <div className='flex flex-col gap-6'>
              {
                listCategory.map((item,index)=> (
                  <div key={index} className=''>
                    {item}
                  </div>
                ))
              }
            </div>
          </div>
          <div>
            <h5 className='text-xl mb-8'>Lọc giá</h5>
            <PriceFilter
              min={0}
              max={1000}
            />
          </div>
          <div>
            <h5 className='text-xl mb-8'>Màu Sắc</h5>
            <div className='flex flex-col gap-6'>
              {
                listColor.map((item,index)=> (
                  <div key={item.color} className='flex items-center gap-3'>
                    <div className='w-4 h-4 rounded-full border-1 border-black p-1' style={{backgroundColor: item.color}}/>
                    <p><span>{item.name}</span><span>({item.count})</span></p>
                  </div>
                ))
              }
            </div>
          </div>
          <div>
            <h5 className='text-xl mb-8'>Đánh Giá Trung Bình</h5>
            <div className='flex flex-col gap-6'>
              {
                listReview.map((item)=> (
                  <div key={item.star} className='flex gap-3 items-center'>
                    <ScoreStar score={item.count} />
                    <span>({item.count})</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
