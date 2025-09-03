"use client";

import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      {/* Icon */}
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-12 h-12 text-red-500" />
        <h1 className="text-5xl font-bold">404</h1>
      </div>

      {/* Nội dung */}
      <p className="text-lg text-black mb-8">
        Oops! Trang bạn tìm không tồn tại hoặc đã bị xóa.
      </p>

      {/* Nút quay về Home */}
      <Link
        href="/"
        className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full 
                   font-medium hover:bg-gray-800 transition"
      >
        <Home className="w-5 h-5" />
        Quay về Trang Chủ
      </Link>
    </div>
  );
}