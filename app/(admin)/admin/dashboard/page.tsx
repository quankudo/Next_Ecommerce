import SectionHeading from '@/components/admin/SectionHeading'
import React from 'react'
import { Users, ShoppingCart, DollarSign, Package } from "lucide-react";

const listBtnTime = [
  'Hôm nay', 'Tuần này', 'Tháng này', 'Năm này'
];

const listCard = [
  {
    icon: <Users className="w-6 h-6 text-blue-500" />,
    title: "Người dùng",
    percent: "+12%",
    count: "1,250",
  },
  {
    icon: <ShoppingCart className="w-6 h-6 text-green-500" />,
    title: "Đơn hàng",
    percent: "+8%",
    count: "320",
  },
  {
    icon: <DollarSign className="w-6 h-6 text-yellow-500" />,
    title: "Doanh thu",
    percent: "+15%",
    count: "$12,450",
  },
  {
    icon: <Package className="w-6 h-6 text-purple-500" />,
    title: "Sản phẩm",
    percent: "-3%",
    count: "540",
  },
];

const page = () => {
  return (
    <div>
      <SectionHeading text='Dashboard'/>
      <div className='mt-5 p-4 rounded bg-white'>
        {/* list time btn */}
        <div className='flex justify-end gap-5 items-center'>
          {
            listBtnTime.map((item, index)=>(
              <button key={index} className={`px-6 py-2 rounded shadow ${item === "Hôm nay" && 'bg-black text-white'}`}>{item}</button>
            ))
          }
        </div>
        {/* list card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {listCard.map((card, i) => (
            <div
              key={i}
              className="bg-white shadow rounded-xl p-5 flex items-center justify-between hover:scale-[1.02] transition"
            >
              <div>
                <p className="text-sm text-gray-700 font-medium">{card.title}</p>
                <h3 className="text-xl">{card.count}</h3>
                <span
                  className={`text-xs ${
                    card.percent.startsWith("-")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {card.percent} so với tháng trước
                </span>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">{card.icon}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white shadow rounded-xl p-5">
            <h4 className="font-semibold mb-3">Doanh thu theo tháng</h4>
            <div className="h-64 flex items-center justify-center text-gray-400">
              (Chart Placeholder)
            </div>
          </div>
          <div className="bg-white shadow rounded-xl p-5">
            <h4 className="font-semibold mb-3">Trạng thái đơn hàng</h4>
            <div className="h-64 flex items-center justify-center text-gray-400">
              (Chart Placeholder)
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white shadow rounded-xl p-5">
            <h4 className="font-semibold mb-3">Các sản phẩm bán chạy</h4>
            <div className="h-64 flex items-center justify-center text-gray-400">
              (Chart Placeholder)
            </div>
          </div>
          <div className="bg-white shadow rounded-xl p-5">
            <h4 className="font-semibold mb-3">Danh mục sản phẩm</h4>
            <div className="h-64 flex items-center justify-center text-gray-400">
              (Chart Placeholder)
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-5 mt-6">
          <h4 className="font-semibold mb-3">Đơn hàng gần nhất</h4>
          <div className="text-gray-400 h-40 flex items-center justify-center">
            (Table Placeholder)
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
