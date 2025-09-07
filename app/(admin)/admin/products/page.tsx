"use client";

import SectionHeading from "@/components/admin/SectionHeading";
import Pagination from "@/components/ui/Pagination";
import { Edit, Trash, Plus, Eye } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Filter from "@/components/admin/Filter";
import Swal from "sweetalert2";
import Link from "next/link";

const Page = () => {
  const products = [
    { id: 1, name: "iPhone 15 Pro", price: 30000000, category: "Điện thoại", status: "Active" },
    { id: 2, name: "MacBook Air M2", price: 25000000, category: "Laptop", status: "Inactive" },
    { id: 3, name: "Chuột Logitech MX Master 3", price: 2500000, category: "Phụ kiện", status: "Active" },
    { id: 4, name: "Tai nghe Sony WH-1000XM5", price: 8000000, category: "Tai nghe", status: "Active" },
    { id: 5, name: "Màn hình LG UltraWide", price: 12000000, category: "Màn hình", status: "Inactive" },
    { id: 6, name: "Bàn phím Keychron K2", price: 2200000, category: "Phụ kiện", status: "Active" },
    { id: 7, name: "iPad Pro 12.9", price: 32000000, category: "Máy tính bảng", status: "Inactive" },
  ];

  const [search, setSearch] = useState("");

  // 🔹 Lấy page từ URL
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentShow = parseInt(searchParams.get("show") || "5", 10);

  const handleClickDelete = (id: number) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
  };

  // Filter product
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / currentShow);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * currentShow;
    return filteredProducts.slice(start, start + currentShow);
  }, [filteredProducts, currentShow, currentPage]);

  return (
    <div>
      <SectionHeading text="Quản lý sản phẩm" />
      <div className="mt-5 p-4 rounded bg-white">
        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <Link href={'/admin/products/create'} className="flex items-center px-2 text-[12px] font-medium cursor-pointer py-1 rounded bg-blue-200 text-blue-700">
            <Plus className="w-4 h-4" strokeWidth={1}/>Thêm sản phẩm
          </Link>
          <button className="flex items-center px-2 text-[12px] font-medium cursor-pointer py-1 rounded bg-yellow-200 text-yellow-700">
            <Plus className="w-4 h-4" strokeWidth={1}/>Tải từ file
          </button>
          <button className="flex items-center px-2 text-[12px] font-medium cursor-pointer py-1 rounded bg-green-300 text-green-700">
            <Plus className="w-4 h-4" strokeWidth={1}/>Xuất Excel
          </button>
          <button className="flex items-center px-2 text-[12px] font-medium cursor-pointer py-1 rounded bg-red-300 text-red-700">
            <Plus className="w-4 h-4" strokeWidth={1}/>Xuất PDF
          </button>
          <button className="flex items-center px-2 text-[12px] font-medium cursor-pointer py-1 rounded bg-gray-300 text-gray-700">
            <Plus className="w-4 h-4" strokeWidth={1}/>Xóa tất cả
          </button>
        </div>

        <hr className="text-gray-300 my-4" />

        {/* Search & Filter */}
        <Filter currentShow={currentShow} search={search} setSearch={setSearch} />

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full">
            <thead>
              <tr className="bg-black text-left text-white">
                <th className="py-3 px-3 font-normal">#</th>
                <th className="py-3 px-3 font-normal">ID</th>
                <th className="py-3 px-3 font-normal">Tên sản phẩm</th>
                <th className="py-3 px-3 font-normal">Giá</th>
                <th className="py-3 px-3 font-normal">Danh mục</th>
                <th className="py-3 px-3 font-normal">Trạng thái</th>
                <th className="py-3 px-3 text-center font-normal">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((p, index) => (
                <tr key={p.id} className={`hover:bg-gray-50 ${index % 2 === 0 && "bg-gray-100"}`}>
                  <td className="px-3 py-3">
                    <input type="checkbox" />
                  </td>
                  <td className="px-3 py-3">{p.id}</td>
                  <td className="px-3 py-3">{p.name}</td>
                  <td className="px-3 py-3">{p.price.toLocaleString("vi-VN")} ₫</td>
                  <td className="px-3 py-3">{p.category}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        p.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 flex items-center justify-center gap-2">
                    <button className="text-blue-500 p-1 rounded cursor-pointer bg-blue-200">
                      <Eye size={18} />
                    </button>
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="text-green-500 p-1 rounded cursor-pointer bg-green-200 inline-flex items-center"
                    >
                      <Edit size={18} />
                    </Link>
                    <button className="text-red-500 p-1 rounded cursor-pointer bg-red-200">
                      <Trash size={18} onClick={()=>handleClickDelete(p.id)} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Page;