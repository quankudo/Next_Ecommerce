import React, { useState } from 'react'
import { User, Heart, ShoppingCart, Bell, X, UserCheck } from "lucide-react";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { logout } from '@/redux/authSlice';

const IconBar = () => {
  const [isOpenBell, setIsOpenBell] = useState<boolean>(false)
  const [isOpenUser, setIsOpenUser] = useState<boolean>(false)

  const dispatch = useDispatch()
  const items = useSelector((state: RootState) => state.cart.items)
  const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length);
  const user = useSelector((state: RootState) => state.auth.user)
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleClickLogout = () => {
    dispatch(logout());
  }
  return (
    <div className="flex items-center gap-5">
      <div className="relative">
      <div 
        className="cursor-pointer flex items-center gap-2"
        onClick={() => setIsOpenUser(!isOpenUser)}
      >
        {user 
          ? <UserCheck className="w-5 h-5 text-black" strokeWidth={1} /> 
          : <User className="w-5 h-5 text-black" strokeWidth={1}/>
        }
      </div>

      {isOpenUser && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-sm shadow rounded z-20">
          {user ? (
            <div className="flex flex-col">
              {user ? <Link href={'/profile'} className='text-left px-4 py-2 hover:bg-gray-100 cursor-pointer'>{user.name}</Link> : null}
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleClickLogout}>
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              <Link href="/login" className="px-4 py-2 hover:bg-gray-100">
                Đăng nhập
              </Link>
              <Link href="/register" className="px-4 py-2 hover:bg-gray-100">
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      )}
    </div>    
      <div className='relative cursor-pointer'>
        <Bell className="w-5 h-5 text-black" strokeWidth={1} onClick={()=>setIsOpenBell(!isOpenBell)} />
        <div className='absolute -top-1 right-0 w-2 h-2 rounded-full bg-black text-white flex justify-center items-center text-[9px]'/>
        {
          isOpenBell && <div className='absolute top-[calc(100% + 4px)] right-0 z-[4] bg-white shadow-md p-4 rounded w-[360px]'>
            <div className='flex justify-between items-center'>
              <h5>Thong Bao</h5><X className='w-5 h-5' onClick={()=>setIsOpenBell(false)}/>
            </div>
            <div className='max-h-[400px] overflow-y-scroll'>
              
            </div>
          </div>
        }
      </div>
      <Link href={'/wishlist'} className='relative'>
        <Heart className="w-5 h-5 text-black" strokeWidth={1}/>
        <div className='absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black text-white flex justify-center items-center text-[9px]'>{wishlistCount}</div>
      </Link>
      <Link href={'/cart'} className='relative'>
        <ShoppingCart className="w-5 h-5 text-black" strokeWidth={1}/>
        <div className='absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black text-white flex justify-center items-center text-[9px]'>{totalQuantity}</div>
      </Link>
    </div>
  )
}

export default IconBar
