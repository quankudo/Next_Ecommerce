import React from 'react'
import { User, Heart, ShoppingCart } from "lucide-react";
import Link from 'next/link';

const IconBar = () => {
  return (
    <div className="flex items-center gap-5">
      <User className="w-5 h-5 text-black" strokeWidth={1}/>        {/* Profile */}
      <Link href={'/'} className='relative'>
        <Heart className="w-5 h-5 text-black" strokeWidth={1}/>
        <div className='absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black text-white flex justify-center items-center text-[9px]'>1</div>
      </Link>
      <Link href={'/'} className='relative'>
        <ShoppingCart className="w-5 h-5 text-black" strokeWidth={1}/>
        <div className='absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black text-white flex justify-center items-center text-[9px]'>1</div>
      </Link>
    </div>
  )
}

export default IconBar
