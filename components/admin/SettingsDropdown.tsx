"use client";

import { Settings, LogOut, User, Bell } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const SettingsDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Nút icon Settings */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <Settings className="w-5 h-5 text-black" strokeWidth={1}/>
      </button>

      {/* Dropdown */}
      {(
        <div
            className={`absolute top-[calc(100%+4px)] right-0 z-[4] bg-white shadow-md rounded w-[max-content]
            origin-top-right transform transition-all duration-300 ease-in-out
            ${
            open
                ? "opacity-100 scale-100"
                : "opacity-0 scale-0 pointer-events-none"
            }`}
        >
          <ul className="text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <User size={16} /> Tài khoản
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <Bell size={16} /> Thông báo
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <Settings size={16} /> Cài đặt hệ thống
            </li>
            <hr className="my-1" />
            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer text-red-600">
              <LogOut size={16} /> Đăng xuất
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;