"use client";

import SectionHeading from "@/components/admin/SectionHeading";
import Pagination from "@/components/ui/Pagination";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Filter from "@/components/admin/Filter";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { FileDown, FileText, FileUp, Plus, Trash2 } from "lucide-react";
import ActionButtons from "@/components/admin/ActionButtons";
import PromotionTable, { Promotion } from "./PromotionTable";

export const promotionsInit: Promotion[] = [
  {
    id: 1,
    title: "Giảm 10% cho đơn trên 500k",
    method: "Voucher",
    type: "Toàn shop",
    status: "Active",
    usage: "2/50",
    startDate: "2025-09-01T00:00:00",
    endDate: "2025-09-30T23:59:59",
  },
  {
    id: 2,
    title: "Free ship toàn quốc",
    method: "Free Ship",
    type: "Toàn shop",
    status: "Active",
    usage: "15/100",
    startDate: "2025-09-05T00:00:00",
    endDate: "2025-10-05T23:59:59",
  },
  {
    id: 3,
    title: "Mua 1 tặng 1",
    method: "Khuyến mãi",
    type: "Sản phẩm",
    status: "Inactive",
    usage: "0/20",
    startDate: "2025-09-10T00:00:00",
    endDate: "2025-09-20T23:59:59",
  },
  {
    id: 4,
    title: "Giảm 50k cho đơn trên 300k",
    method: "Voucher",
    type: "Toàn shop",
    status: "Active",
    usage: "5/200",
    startDate: "2025-09-01T00:00:00",
    endDate: "2025-12-31T23:59:59",
  },
  {
    id: 5,
    title: "Giảm 20% máy lọc nước",
    method: "Giảm %",
    type: "Sản phẩm",
    status: "Expired",
    usage: "10/10",
    startDate: "2025-08-01T00:00:00",
    endDate: "2025-08-15T23:59:59",
  },
  {
    id: 6,
    title: "Flash Sale cuối tuần",
    method: "Voucher",
    type: "Toàn shop",
    status: "Active",
    usage: "25/100",
    startDate: "2025-09-12T00:00:00",
    endDate: "2025-09-14T23:59:59",
  },
  {
    id: 7,
    title: "Khuyến mãi 8/3",
    method: "Voucher",
    type: "Toàn shop",
    status: "Expired",
    usage: "100/100",
    startDate: "2025-03-01T00:00:00",
    endDate: "2025-03-08T23:59:59",
  },
  {
    id: 8,
    title: "Sale Back to School",
    method: "Giảm %",
    type: "Danh mục",
    status: "Active",
    usage: "8/30",
    startDate: "2025-09-01T00:00:00",
    endDate: "2025-09-15T23:59:59",
  },
  {
    id: 9,
    title: "Voucher 100k cho khách hàng mới",
    method: "Voucher",
    type: "Toàn shop",
    status: "Active",
    usage: "50/200",
    startDate: "2025-09-01T00:00:00",
    endDate: "2025-12-31T23:59:59",
  },
  {
    id: 10,
    title: "Giảm 30% đồ gia dụng",
    method: "Giảm %",
    type: "Danh mục",
    status: "Inactive",
    usage: "0/50",
    startDate: "2025-09-20T00:00:00",
    endDate: "2025-09-25T23:59:59",
  },
];


const Page = () => {
    const [promotions, setPromotions] = useState<Promotion[]>(promotionsInit)
  const [search, setSearch] = useState("");

  // 🔹 Lấy page từ URL
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentShow = parseInt(searchParams.get("show") || "5", 10);

  const handleUpload = () => {
    toast.success("Tải từ file thành công!");
  };

  const handleExportExcel = () => {
    toast.success("Xuất Excel thành công!");
  };

  const handleExportPDF = () => {
    toast.success("Xuất PDF thành công!");
  };

  const handleDeleteAll = () => {
    toast.success("Xóa tất cả thành công!");
  };

  const handleClickDelete = (id: number, name: string) => {
    Swal.fire({
      title: `Bạn có chắc muốn xóa bài đăng ${id}-${name}?`,
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(()=>{
        setPromotions((prev)=>prev.filter(item=>item.id!==id));
      toast.success("Xóa khuyến mãi thành công");
    });
  };

  // Filter user
  const filteredBlogs = useMemo(() => {
    return promotions.filter(
      (u) =>
        u.title.toLowerCase().includes(search.toLowerCase()) ||
        u.type.toLowerCase().includes(search.toLowerCase())
    )
  }, [promotions, search]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / currentShow);
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * currentShow;
    return filteredBlogs.slice(start, start + currentShow);
  }, [filteredBlogs, currentShow, currentPage]);
  return (
    <div>
      <SectionHeading text="Quản lý khuyến mãi" />
      <div className="mt-5 p-4 rounded bg-white">
        <ActionButtons
          actions={[
            {
              key: "create",
              label: "Thêm khuyến mãi",
              href: "/admin/promotions/create",
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
        <Filter currentShow={currentShow} search={search} setSearch={setSearch} />

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <PromotionTable paginatedPromotions={paginatedBlogs} handleClickDelete={handleClickDelete}/>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;