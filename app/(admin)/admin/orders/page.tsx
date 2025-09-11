"use client";

import { Plus, FileText, FileDown, Trash2, FileUp } from "lucide-react";
import SectionHeading from "@/components/admin/SectionHeading";
import Pagination from "@/components/ui/Pagination";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Filter from "@/components/admin/Filter";
import Swal from "sweetalert2";
import { toast } from "sonner";
import OrderTable, { Order } from "./OrderTable";
import ActionButtons from "@/components/admin/ActionButtons";

const Page = () => {
  const orders: Order[] = [
    { id: "DH001", customer: "Nguyễn Văn A", date: "2025-09-01", status: "Đang xử lý", total: 1500000 },
    { id: "DH002", customer: "Trần Thị B", date: "2025-09-02", status: "Hoàn thành", total: 2500000 },
    { id: "DH003", customer: "Lê Văn C", date: "2025-09-03", status: "Đã hủy", total: 500000 },
    { id: "DH004", customer: "Phạm Thị D", date: "2025-09-04", status: "Chờ xác nhận", total: 1800000 },
    { id: "DH005", customer: "Hoàng Văn E", date: "2025-09-05", status: "Hoàn thành", total: 3200000 },
    { id: "DH006", customer: "Đỗ Thị F", date: "2025-09-06", status: "Đã hủy", total: 700000 },
    { id: "DH007", customer: "Bùi Văn G", date: "2025-09-07", status: "Hoàn thành", total: 2200000 },
  ];

  const [search, setSearch] = useState("");

  // 🔹 Lấy page từ URL
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentShow = parseInt(searchParams.get("show") || "5", 10);

  const handleClickDelete = (id: string) => {
    Swal.fire({
      title: `Bạn có chắc muốn xóa đơn hàng ${id}?`,
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(()=> {
      toast.success(`Xóa đơn hàng ${id} thành công!`)
    });
  };

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

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter(
      (o) =>
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase()) ||
        o.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [orders, search]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / currentShow);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * currentShow;
    return filteredOrders.slice(start, start + currentShow);
  }, [filteredOrders, currentShow, currentPage]);

  return (
    <div>
      <SectionHeading text="Quản lý đơn hàng" />
      <div className="mt-5 p-4 rounded bg-white">
        <ActionButtons
          actions={[
            {
              key: "create",
              label: "Tạo đơn hàng",
              href: "/admin/orders/create",
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
          <OrderTable handleClickDelete={handleClickDelete} paginatedOrders={paginatedOrders}/>

          {/* Pagination */}
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Page;