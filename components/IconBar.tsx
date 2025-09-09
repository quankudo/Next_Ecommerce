"use client";

import React, { useState, useEffect, useRef } from "react";
import { User, Heart, ShoppingCart, Bell, UserCheck } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/authSlice";
import NotificationList from "./notifications/NotificationList";
import { toast } from "sonner";

const IconBar = () => {
  const [isOpenBell, setIsOpenBell] = useState<boolean>(false);
  const [isOpenUser, setIsOpenUser] = useState<boolean>(false);

  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.items.length
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleClickLogout = () => {
    toast.success("Đăng xuất thành công");
    dispatch(logout());
  };

  // Detect click outside user menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpenUser(false);
      }
    }

    if (isOpenUser) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenUser]);

  return (
    <div className="flex items-center gap-5">
      {/* User */}
      <div className="relative" ref={userMenuRef}>
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={() => setIsOpenUser(!isOpenUser)}
        >
          {user ? (
            <UserCheck className="w-5 h-5 text-black" strokeWidth={1} />
          ) : (
            <User className="w-5 h-5 text-black" strokeWidth={1} />
          )}
        </div>

        {isOpenUser && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-sm shadow rounded z-20">
            {user ? (
              <div className="flex flex-col">
                <Link
                  href={"/account/profile"}
                  className="text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {user.name}
                </Link>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleClickLogout}
                >
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

      {/* Notification */}
      <div className="relative cursor-pointer">
        <Bell
          className="w-5 h-5 text-black"
          strokeWidth={1}
          onClick={() => setIsOpenBell(!isOpenBell)}
        />
        <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-black text-white flex justify-center items-center text-[9px]" />
        <NotificationList
          isOpenBell={isOpenBell}
          setIsOpenBell={setIsOpenBell}
        />
      </div>

      {/* Wishlist */}
      <Link href={"/wishlist"} className="relative">
        <Heart className="w-5 h-5 text-black" strokeWidth={1} />
        <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black text-white flex justify-center items-center text-[9px]">
          {wishlistCount}
        </div>
      </Link>

      {/* Cart */}
      <Link href={"/cart"} className="relative">
        <ShoppingCart className="w-5 h-5 text-black" strokeWidth={1} />
        <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black text-white flex justify-center items-center text-[9px]">
          {totalQuantity}
        </div>
      </Link>
    </div>
  );
};

export default IconBar;