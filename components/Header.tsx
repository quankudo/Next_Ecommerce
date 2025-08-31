"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchBar from './SearchBar'
import IconBar from './IconBar'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/shop", label: "Sản phẩm" },
    { href: "/blog", label: "Tin tức" },
    { href: "/contact", label: "Liên hệ" },
  ]

  return (
    <header className="sticky top-0 bg-white z-10 shadow flex items-center gap-10 px-32 py-5">
      <div>
        <Image
          src="https://smartfurniture.monamedia.net/wp-content/uploads/2024/11/logo.svg"
          width={120}
          height={60}
          alt="logo"
        />
      </div>
      <div className="flex justify-between items-center flex-1">
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                pathname === item.href
                  ? "text-red-500 font-semibold" // màu chủ đạo khi active
                  : "text-gray-800 hover:text-black"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-8">
          <SearchBar />
          <IconBar />
        </div>
      </div>
    </header>
  )
}

export default Header
