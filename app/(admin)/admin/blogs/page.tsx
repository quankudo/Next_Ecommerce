"use client";

import SectionHeading from "@/components/admin/SectionHeading";
import Pagination from "@/components/ui/Pagination";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Filter from "@/components/admin/Filter";
import BlogTable, { Blog } from "./BlogTable";
import { FileDown, FileText, FileUp, Plus, Trash2 } from "lucide-react";
import ActionButtons from "@/components/admin/ActionButtons";
import { usePagination } from "@/hook/usePagination";
import { useActionHandler } from "@/hook/useActionHandler";

export const blogsInit: Blog[] = [
  {
    id: 1,
    title: "Mẹo chọn máy lọc nước cho gia đình",
    category: "Mẹo mua sắm",
    author: "Admin",
    status: "Published",
    publishedAt: "2025-09-01T10:00:00",
    views: 320,
  },
  {
    id: 2,
    title: "Khuyến mãi Tết 2025 - Giảm giá 50%",
    category: "Khuyến mãi",
    author: "Nguyễn Văn A",
    status: "Draft",
    publishedAt: "",
    views: 0,
  },
  {
    id: 3,
    title: "Cách bảo quản nồi chiên không dầu",
    category: "Hướng dẫn",
    author: "Admin",
    status: "Published",
    publishedAt: "2025-08-20T08:30:00",
    views: 152,
  },
  {
    id: 4,
    title: "Top 5 máy hút bụi đáng mua nhất",
    category: "Đánh giá sản phẩm",
    author: "Nguyễn Văn B",
    status: "Published",
    publishedAt: "2025-07-15T14:00:00",
    views: 678,
  },
  {
    id: 5,
    title: "So sánh quạt điều hòa và máy lạnh",
    category: "So sánh",
    author: "Trần Thị C",
    status: "Published",
    publishedAt: "2025-06-25T09:15:00",
    views: 245,
  },
  {
    id: 6,
    title: "Cách vệ sinh máy giặt đơn giản",
    category: "Hướng dẫn",
    author: "Admin",
    status: "Draft",
    publishedAt: "",
    views: 0,
  },
  {
    id: 7,
    title: "10 mẹo tiết kiệm điện khi dùng điều hòa",
    category: "Mẹo gia đình",
    author: "Nguyễn Văn D",
    status: "Published",
    publishedAt: "2025-06-10T18:00:00",
    views: 801,
  },
  {
    id: 8,
    title: "Khuyến mãi mùa hè - Săn deal cực rẻ",
    category: "Khuyến mãi",
    author: "Admin",
    status: "Published",
    publishedAt: "2025-05-30T12:45:00",
    views: 950,
  },
  {
    id: 9,
    title: "Cách chọn bếp từ phù hợp cho căn bếp nhỏ",
    category: "Mẹo mua sắm",
    author: "Nguyễn Văn E",
    status: "Published",
    publishedAt: "2025-05-20T07:20:00",
    views: 410,
  },
  {
    id: 10,
    title: "Kinh nghiệm chọn tủ lạnh tiết kiệm điện",
    category: "Đánh giá sản phẩm",
    author: "Trần Thị F",
    status: "Published",
    publishedAt: "2025-05-10T16:10:00",
    views: 602,
  },
  {
    id: 11,
    title: "Cách vệ sinh bình siêu tốc đúng cách",
    category: "Hướng dẫn",
    author: "Admin",
    status: "Published",
    publishedAt: "2025-04-28T10:40:00",
    views: 233,
  },
  {
    id: 12,
    title: "Xu hướng đồ gia dụng thông minh 2025",
    category: "Tin tức",
    author: "Nguyễn Văn G",
    status: "Published",
    publishedAt: "2025-04-15T11:55:00",
    views: 1200,
  },
];

const Page = () => {
  const {
    handleUpload,
    handleExportExcel,
    handleExportPDF,
    handleDeleteAll,
    handleClickDelete,
  } = useActionHandler("bài đăng");
  const [blogs, setBlogs] = useState<Blog[]>(blogsInit);
  const [search, setSearch] = useState("");

  // 🔹 Lấy page từ URL
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentShow = parseInt(searchParams.get("show") || "5", 10);

  // Filter user
  const filtered = useMemo(() => {
    return blogs.filter(
      (u) =>
        u.title.toLowerCase().includes(search.toLowerCase()) ||
        u.category.toLowerCase().includes(search.toLowerCase()) ||
        u.author.includes(search)
    );
  }, [blogs, search]);

  // Pagination
  const { paginatedData: paginatedBlogs, totalPages } = usePagination(
    filtered,
    currentPage,
    currentShow
  );
  return (
    <div>
      <SectionHeading text="Quản lý bài đăng" />
      <div className="mt-5 p-4 rounded bg-white">
        <ActionButtons
          actions={[
            {
              key: "create",
              label: "Tạo bài đăng",
              href: "/admin/blogs/create",
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
          <BlogTable
            paginatedBlogs={paginatedBlogs}
            handleClickDelete={handleClickDelete}
          />

          {/* Pagination */}
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Page;
