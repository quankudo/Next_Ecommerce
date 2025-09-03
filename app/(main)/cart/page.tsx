'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/ui/Button'
import React from 'react'
import CartItem from './CartItem'

const page = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = 40000 // ví dụ

  return (
    <div>
      <SectionTitle title="Giỏ hàng" />
      <div className="px-32 my-14 flex items-start gap-5">
        <table className="border flex-1 border-gray-300 border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-center font-medium border border-gray-300">Sản phẩm</th>
              <th className="p-3 font-medium border border-gray-300">Giá</th>
              <th className="p-3 font-medium border border-gray-300">Số lượng</th>
              <th className="p-3 font-medium border border-gray-300">Tổng</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </tbody>
        </table>

        <div className="w-[340px] flex flex-col gap-3 p-4 relative border border-black">
          <h5 className="text-xl absolute -top-4 left-4 bg-white">Tổng giỏ hàng</h5>
          <p className="flex justify-between items-center mt-5">
            <span className="font-medium">Tạm tính</span>
            <span>{subtotal.toLocaleString()}₫</span>
          </p>
          <p className="flex justify-between items-center">
            <span className="font-medium">Phí vận chuyển</span>
            <span>{shipping.toLocaleString()}₫</span>
          </p>
          <hr className="text-gray-200 my-2" />
          <p className="flex justify-between items-center">
            <span className="font-medium">Tổng</span>
            <span>{(subtotal + shipping).toLocaleString()}₫</span>
          </p>
          <Button text="Thanh Toán Ngay" />
        </div>
      </div>
    </div>
  )
}

export default page