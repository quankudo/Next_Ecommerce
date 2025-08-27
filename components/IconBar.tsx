import React from 'react'
import { User, Heart, ShoppingCart } from "lucide-react";

const IconBar = () => {
  return (
    <div className="flex items-center gap-5">
      <User className="w-5 h-5 text-gray-700" />        {/* Profile */}
      <Heart className="w-5 h-5 text-gray-700" />       {/* Yêu thích / Favorite */}
      <ShoppingCart className="w-5 h-5 text-gray-700" /> {/* Giỏ hàng */}
    </div>
  )
}

export default IconBar
