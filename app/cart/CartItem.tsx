'use client'

import React from 'react'
import { useDispatch } from 'react-redux'
import { CartItem as CartItemType, updateQuantity, removeItem } from '@/redux/cartSlice'
import Image from 'next/image'
import { Minus, Plus, X } from 'lucide-react'

interface Props {
  item: CartItemType
}

const CartItem = ({ item }: Props) => {
  const dispatch = useDispatch()

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
    }
  }

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
  }

  const handleRemove = () => {
    dispatch(removeItem(item.id))
  }

  return (
    <tr key={item.id} className="text-center">
      <td className="p-3 border border-gray-300 text-left">
        <div className="flex gap-4 items-center relative">
          <div
            className="cursor-pointer w-5 h-5 rounded-full bg-red-500 absolute -top-1 -left-1 flex justify-center items-center"
            onClick={handleRemove}
          >
            <X className="w-4 h-4 text-white" />
          </div>
          <Image src={item.imageUrl} alt={item.name} width={80} height={80} className="object-contain" />
          <h5 className="font-medium">{item.name}</h5>
        </div>
      </td>
      <td className="p-3 border border-gray-300">{item.price.toLocaleString()}₫</td>
      <td className="p-3 border border-gray-300">
        <div className="flex items-center justify-center gap-3">
          <button className="p-1 hover:text-red-500" onClick={handleDecrease}>
            <Minus className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 bg-gray-200 rounded text-[15px] flex justify-center items-center">
            {item.quantity}
          </div>
          <button className="p-1 hover:text-green-600" onClick={handleIncrease}>
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </td>
      <td className="p-3 border border-gray-300 font-semibold">
        {(item.price * item.quantity).toLocaleString()}₫
      </td>
    </tr>
  )
}

export default CartItem