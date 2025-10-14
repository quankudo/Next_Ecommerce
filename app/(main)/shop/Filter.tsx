"use client";

import { bestSellingProducts } from "@/app/data";
import ScoreStar from "@/components/ScoreStar";
import { formatCurrency } from "@/utils/format";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function Filter() {
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(2000);

  const router = useRouter();

  const handleFilter = () => {
    router.push(`/shop?min=${minPrice}&max=${maxPrice}`);
  };

  return (
    <div className='w-1/4 flex flex-col gap-8'>
      <div>
        <h5 className="text-xl mb-4 relative inline-block">
          Danh Mục
          <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-red-600 to-orange-500 rounded"></span>
        </h5>

        <div className="flex flex-col gap-4">
          {listCategory.map((item, index) => (
            <div
              key={index}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 shadow-sm bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:shadow-md cursor-pointer transition-all duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-500 group-hover:bg-purple-500 transition-all"></span>
              <p className="text-gray-700 font-medium group-hover:text-indigo-600">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h5 className="text-xl mb-4 relative inline-block">
          Lọc Giá
          <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-red-600 to-orange-500 rounded"></span>
        </h5>

        <div className="w-full max-w-md p-5 rounded-xl bg-white shadow-md border border-gray-100">
          {/* Thanh range */}
          <div className="mb-6 flex items-center gap-3">
            <input
              type="range"
              min={100}
              max={2000}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
            <input
              type="range"
              min={100}
              max={2000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
          </div>

          {/* Kết quả và nút lọc */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleFilter}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-300"
            >
              Lọc
            </button>

            <div className="flex items-center gap-2 flex-1 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg py-2 px-3">
              <span className="text-black">Giá:</span>
              <span className="text-red-600">{minPrice}</span>
              <span>-</span>
              <span className="text-red-600">{maxPrice}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h5 className="text-xl mb-4 relative inline-block">
          Màu Sắc
          <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-red-600 to-orange-500 rounded"></span>
        </h5>
        <div className='flex flex-wrap gap-x-6 gap-y-4'>
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
        <h5 className="text-xl mb-4 relative inline-block">
          Đánh Giá Trung Bình
          <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-red-600 to-orange-500 rounded"></span>
        </h5>

        <div className="flex flex-col gap-3">
          {listReview.map((item) => (
            <div
              key={item.star}
              className="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg border border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all duration-200"
            >
              {/* Stars */}
              <ScoreStar score={item.star} />

              {/* Count */}
              <span className="text-sm text-gray-600">({item.count})</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h5 className="text-xl mb-4 relative inline-block">
          Sản Phẩm Bán Chạy
          <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-red-600 to-orange-500 rounded"></span>
        </h5>
        <div className="flex flex-col gap-4">
          {
            bestSellingProducts.map(item=>(
              <div key={item.id} className="flex gap-2 items-center rounded shadow p-3">
                <Image src={item.image} alt={item.name} width={100} height={50} className="flex-1 object-cover" />
                <div className="flex flex-col gap-1">
                  <p className="flex gap-3 items-center">
                    <span className="text-sm line-through">{formatCurrency(item.oldPrice)}</span>
                    <span className="text-red-500 font-medium text-sm">{formatCurrency(item.newPrice)}</span>
                  </p>
                  <h4 className="text-sm">{item.name}</h4>
                  <ScoreStar score={4}/>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}