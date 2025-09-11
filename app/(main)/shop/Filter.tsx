"use client";

import ScoreStar from "@/components/ScoreStar";
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
      <div className="w-full max-w-md rounded-lg">
      <div className="mb-4 flex items-center">
        <input
          type="range"
          min={100}
          max={2000}
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="w-full accent-red-500"
        />
        <input
          type="range"
          min={100}
          max={2000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-red-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
            onClick={handleFilter}
            className="bg-black text-white py-2 px-6"
        >
            Lọc
        </button>
        <div className="flex items-center gap-3 flex-1">
            Giá: {minPrice} - {maxPrice }
        </div>
      </div>
    </div>
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
  );
}