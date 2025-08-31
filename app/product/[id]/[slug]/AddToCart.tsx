'use client'
import Button from '@/components/ui/Button'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'

const AddToCart = () => {

    const [countItemCart, setCountItemCart] = useState<number>(1)

  return (
    <div className="flex items-center gap-10">
        <div className="flex items-center justify-center gap-3">
            <button className="p-1 hover:text-red-500">
            <Minus className="w-4 h-4" onClick={()=>setCountItemCart(countItemCart-1)} />
            </button>
            <div className="w-8 h-8 bg-gray-200 rounded text-[15px] flex justify-center items-center">
                {countItemCart}
            </div>
            <button className="p-1 hover:text-green-600">
            <Plus className="w-4 h-4" onClick={()=>setCountItemCart(countItemCart+1)} />
            </button>
        </div>
        <Button text='Thêm vào giỏ hàng' />
    </div>
  )
}

export default AddToCart
