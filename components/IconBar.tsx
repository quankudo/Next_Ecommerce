import React, { useState } from 'react'
import { User, Heart, ShoppingCart, Bell } from "lucide-react";
import Link from 'next/link';

const IconBar = () => {
  const [isOpenBell, setIsOpenBell] = useState<boolean>(false)
  return (
    <div className="flex items-center gap-5">
      <User className="w-5 h-5 text-black" strokeWidth={1}/>    
      <div className='relative cursor-pointer'>
        <Bell className="w-5 h-5 text-black" strokeWidth={1} onClick={()=>setIsOpenBell(!isOpenBell)} />
        <div className='absolute -top-1 right-0 w-2 h-2 rounded-full bg-black text-white flex justify-center items-center text-[9px]'/>
        {
          isOpenBell && <div className='absolute top-[calc(100% + 4px)] right-0 z-[4] bg-white shadow-md p-4 rounded w-[360px]'>
            <h5>Thong Bao</h5>
            <div className='max-h-[400px] overflow-y-scroll'>
              
            </div>
          </div>
        }
      </div>
      <Link href={'/wishlist'} className='relative'>
        <Heart className="w-5 h-5 text-black" strokeWidth={1}/>
        <div className='absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black text-white flex justify-center items-center text-[9px]'>2</div>
      </Link>
      <Link href={'/cart'} className='relative'>
        <ShoppingCart className="w-5 h-5 text-black" strokeWidth={1}/>
        <div className='absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black text-white flex justify-center items-center text-[9px]'>9</div>
      </Link>
    </div>
  )
}

export default IconBar
