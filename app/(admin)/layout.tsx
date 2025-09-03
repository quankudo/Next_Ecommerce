"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  Package,
  Layers,
  Star,
  Bell,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationList from "@/components/notifications/NotificationList";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpenBell, setIsOpenBell] = useState(false);
  const pathname = usePathname();

  const menuItems = [
  { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/admin" },
  { icon: <Users size={20} />, label: "Users", href: "/admin/users" },
  { icon: <Package size={20} />, label: "Products", href: "/admin/products" },
  { icon: <Layers size={20} />, label: "Categories", href: "/admin/categories" },
  { icon: <ShoppingCart size={20} />, label: "Orders", href: "/admin/orders" },
  { icon: <Star size={20} />, label: "Reviews", href: "/admin/reviews" },
  { icon: <Bell size={20} />, label: "Notifications", href: "/admin/notifications" },
  { icon: <BarChart3 size={20} />, label: "Reports", href: "/admin/reports" },
  { icon: <Settings size={20} />, label: "Settings", href: "/admin/settings" },
];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? "w-16" : "w-56"
        } bg-black text-white flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isCollapsed && <span className="text-lg font-bold">Admin</span>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-gray-800"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-2 p-2">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded text-sm transition
                ${isActive ? "bg-gray-800 font-semibold" : "hover:bg-gray-800"}`}
              >
                {item.icon}
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <button className="text-white absolute bottom-10 left-5 flex justify-center items-center gap-2 text-sm"><LogOut size={20}/> Đăng xuất</button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 bg-white shadow flex items-center justify-between px-6">
          <h1 className="font-semibold text-lg">Admin Panel</h1>
          <div className="flex items-center gap-5">
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
            <Settings className="w-5 h-5 text-black" strokeWidth={1}/>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              <span className="text-sm font-medium">Admin User</span>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}