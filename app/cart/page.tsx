import SectionTitle from '@/components/SectionTitle'
import { Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const listCart = [
  {
    id: 1,
    name: 'Dining Chair 0073 WF MG-01',
    price: 180000,
    imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/prod1-300x300.png'
  },
  {
    id: 2,
    name: 'Lori Leather Otto man Site w/Tray',
    price: 490000,
    imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/mora-300x300.png'
  },
  {
    id: 3,
    name: 'Leather Singint Tols In Canada Chair',
    price: 280000,
    imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/new-schair-300x300.png'
  }
]

const Page = () => {
  return (
    <div>
      <SectionTitle title="Giỏ hàng" />
      <div className="px-32 my-14">
        <table className="w-full border border-gray-300 border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border border-gray-300 text-left">Sản phẩm</th>
              <th className="p-3 border border-gray-300">Giá</th>
              <th className="p-3 border border-gray-300">Số lượng</th>
              <th className="p-3 border border-gray-300">Tổng</th>
            </tr>
          </thead>
          <tbody>
            {listCart.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="p-3 border border-gray-300 text-left">
                  <div className="flex gap-4 items-center relative">
                    <div className='cursor-pointer w-5 h-5 rounded-full bg-red-500 absolute -top-1 -left-1 flex justify-center items-center'><X className='w-4 h-4 text-white' /></div>
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                    <h5 className="font-medium">{item.name}</h5>
                  </div>
                </td>
                <td className="p-3 border border-gray-300">
                  {item.price.toLocaleString()}₫
                </td>
                <td className="p-3 border border-gray-300">
                  <div className="flex items-center justify-center gap-3">
                    <button className="p-1 hover:text-red-500">
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="w-8 h-8 bg-gray-200 rounded text-[15px] flex justify-center items-center">
                      1
                    </div>
                    <button className="p-1 hover:text-green-600">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="p-3 border border-gray-300 font-semibold">
                  {(item.price * 1).toLocaleString()}₫
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page