"use client";

import SectionHeading from "@/components/admin/SectionHeading";
import Pagination from "@/components/ui/Pagination";
import { Plus, FileText, FileDown, Trash2, FileUp } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Filter from "@/components/admin/Filter";
import ProductTable, { Product } from "./ProductTable";
import ActionButtons from "@/components/admin/ActionButtons";
import { usePagination } from "@/hook/usePagination";
import { useActionHandler } from "@/hook/useActionHandler";

const Page = () => {
  const {
    handleUpload,
    handleExportExcel,
    handleExportPDF,
    handleDeleteAll,
    handleClickDelete,
  } = useActionHandler("sản phẩm");
  const products: Product[] = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 30000000,
      category: "Điện thoại",
      status: "Active",
    },
    {
      id: 2,
      name: "MacBook Air M2",
      price: 25000000,
      category: "Laptop",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Chuột Logitech MX Master 3",
      price: 2500000,
      category: "Phụ kiện",
      status: "Active",
    },
    {
      id: 4,
      name: "Tai nghe Sony WH-1000XM5",
      price: 8000000,
      category: "Tai nghe",
      status: "Active",
    },
    {
      id: 5,
      name: "Màn hình LG UltraWide",
      price: 12000000,
      category: "Màn hình",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Bàn phím Keychron K2",
      price: 2200000,
      category: "Phụ kiện",
      status: "Active",
    },
    {
      id: 7,
      name: "iPad Pro 12.9",
      price: 32000000,
      category: "Máy tính bảng",
      status: "Inactive",
    },
  ];

  const [search, setSearch] = useState("");

  // 🔹 Lấy page từ URL
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentShow = parseInt(searchParams.get("show") || "5", 10);

  // Filter product
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  // Pagination
  const { paginatedData: paginatedProducts, totalPages } = usePagination(
    filteredProducts,
    currentPage,
    currentShow
  );

  return (
    <div>
      <SectionHeading text="Quản lý sản phẩm" />
      <div className="mt-5 p-4 rounded bg-white">
        {/* Action buttons */}
        <ActionButtons
          actions={[
            {
              key: "create",
              label: "Thêm sản phẩm",
              href: "/admin/products/create",
              icon: Plus,
              className: "bg-blue-200 text-blue-700 hover:bg-blue-300",
            },
            {
              key: "upload",
              label: "Tải từ file",
              icon: FileUp,
              className: "bg-yellow-200 text-yellow-700 hover:bg-yellow-300",
              onClick: handleUpload,
            },
            {
              key: "exportExcel",
              label: "Xuất Excel",
              icon: FileDown,
              className: "bg-green-200 text-green-700 hover:bg-green-300",
              onClick: handleExportExcel,
            },
            {
              key: "exportPDF",
              label: "Xuất PDF",
              icon: FileText,
              className: "bg-red-200 text-red-700 hover:bg-red-300",
              onClick: handleExportPDF,
            },
            {
              key: "deleteAll",
              label: "Xóa tất cả",
              icon: Trash2,
              className: "bg-gray-200 text-gray-700 hover:bg-gray-300",
              onClick: handleDeleteAll,
            },
          ]}
        />

        <hr className="text-gray-300 my-4" />

        {/* Search & Filter */}
        <Filter
          currentShow={currentShow}
          search={search}
          setSearch={setSearch}
        />

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <ProductTable
            handleClickDelete={handleClickDelete}
            paginatedProducts={paginatedProducts}
          />

          {/* Pagination */}
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Page;
