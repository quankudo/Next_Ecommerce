import SectionTitle from '@/components/SectionTitle'
import Filter from './Filter'
import ListProduct from './ListProduct'

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
          <ListProduct />
        </div>
        <Filter/>
      </div>
    </div>
  )
}

export default ShopPage
