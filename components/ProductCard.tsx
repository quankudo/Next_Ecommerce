'use client'

import { Eye, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ScoreStar from './ScoreStar'

import { useDispatch, useSelector } from 'react-redux'
import { addItem } from "@/redux/cartSlice";
import { addToWishlist } from "@/redux/wishlistSlice";
import { Product } from '@/app/data'
import { RootState } from '@/redux/store'
import { toast } from 'sonner'
import { formatCurrency } from '@/utils/format'

const ProductCard = ({product}: {product:Product}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const isInCart = cart.some(item => item.id === product.id+'');
  const isInWishlist = wishlist.some(item => item=== product.id+'');

  const handleAddCart = (e: React.MouseEvent<HTMLDivElement>) => {
    handleClick("cart");

    const btn = e.currentTarget;

    // tạo span +1
    const plusOne = document.createElement("span");
    plusOne.innerText = "+1";
    plusOne.className =
      "absolute text-sm font-bold text-red-500 animate-fly";
    btn.appendChild(plusOne);

    // tự xoá khi animation xong
    plusOne.addEventListener("animationend", () => {
      plusOne.remove();
    });
  };

  const handleClick = (type: "cart" | "wishlist") => {
    if (type === "cart") {
      dispatch(addItem({
        id: product.id+'',
        name: product.name,
        price: product.newPrice,
        quantity: 1,
        imageUrl: product.image
      }));
      toast.success('Đã thêm vào giỏ hàng!')
    } else if (type === "wishlist") {
      dispatch(addToWishlist(product.id+''));
      toast.success('Đã thêm vào danh sách yêu thích!')
    }
    
  };
  return (
    <div
      className='shadow rounded relative group overflow-hidden product-card'>
        {/* handle click cart-heart-eye */}
        <div className='flex flex-col gap-3 absolute top-3 right-3
          transform -translate-y-10 opacity-0
          group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-300 z-[3]'>
          <div onClick={handleAddCart}
            className={`flex cursor-pointer items-center justify-center w-10 h-10 rounded-full shadow 
              ${isInCart ? 'bg-black text-white': 'bg-white text-black'}`}>
            <ShoppingCart className="w-5 h-5" strokeWidth={1}/>
          </div>
          <div onClick={()=> handleClick('wishlist')}
            className={`flex cursor-pointer items-center justify-center w-10 h-10 rounded-full shadow 
            ${isInWishlist ? 'bg-red-500 text-white': 'bg-white text-black'}`}>
            <Heart className='w-5 h-5' strokeWidth={1}/>
          </div>
          <Link href={'/product/123/Bench-Astor-Oak-Rectangle-Dining-Table'}
            className='flex items-center justify-center w-10 h-10 rounded-full bg-white shadow'>
            <Eye className='w-5 h-5' strokeWidth={1}/>
          </Link>
        </div>
        
        {/* Product details */}
        <div className='relative flex justify-center items-center bg-[#f7f7f7]'>
          <span className='absolute top-4 left-4 inline-block px-2 py-1 text-sm rounded text-white bg-black'>-{product.discount}%</span>
          <Image src={product.image} width={250} height={200} className='object-cover' alt=''/>
        </div>
        <Link href={'/product/123/Bench-Astor-Oak-Rectangle-Dining-Table'} className='block p-4'>
          <ScoreStar score={Number(product.score)} />
          <h5 className='text-black mt-1'>{product.name}</h5>
          <hr className='text-gray-300 my-2' />
          <div className='flex gap-4 items-center'>
            <span className='line-through text-gray-600 text-sm'>{formatCurrency(product.oldPrice)}</span>
            <span className='text-red-500 text-xl'>{formatCurrency(product.newPrice)}</span>
          </div>
        </Link>
    </div>
  )
}

export default ProductCard