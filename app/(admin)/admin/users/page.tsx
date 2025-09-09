"use client";

import SectionHeading from "@/components/admin/SectionHeading";
import Pagination from "@/components/ui/Pagination";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Filter from "@/components/admin/Filter";
import UserTable, { User } from "./UserTable";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { FileDown, FileText, FileUp, Plus, Trash2 } from "lucide-react";
import ActionButtons from "@/components/admin/ActionButtons";

const Page = () => {
  const users: User[] = [
    { id: 1, name: "Nguyễn Văn A", email: "vana@example.com", phone: "0123456789", address: "Hà Nội", status: "Active" },
    { id: 2, name: "Trần Thị B", email: "thib@example.com", phone: "0987654321", address: "TP.HCM", status: "Inactive" },
    { id: 3, name: "Lê Văn C", email: "vanc@example.com", phone: "0911222333", address: "Đà Nẵng", status: "Active" },
    { id: 4, name: "Phạm Thị D", email: "thid@example.com", phone: "0933444555", address: "Hải Phòng", status: "Active" },
    { id: 5, name: "Hoàng Văn E", email: "vane@example.com", phone: "0955666777", address: "Cần Thơ", status: "Inactive" },
    { id: 6, name: "Đỗ Thị F", email: "thif@example.com", phone: "0977888999", address: "Huế", status: "Active" },
    { id: 7, name: "Bùi Văn G", email: "vang@example.com", phone: "0909090909", address: "Quảng Ninh", status: "Inactive" },
  ];
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
      title: `Bạn có chắc muốn xóa người dùng ${id}-${name}?`,
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(()=>{
      toast.success("Xóa người dùng thành công");
    });
  };

  // Filter user
  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.phone.includes(search)
    );
  }, [users, search]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / currentShow);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * currentShow;
    return filteredUsers.slice(start, start + currentShow);
  }, [filteredUsers, currentShow, currentPage]);
  return (
    <div>
      <SectionHeading text="Quản lý người dùng" />
      <div className="mt-5 p-4 rounded bg-white">
        <ActionButtons
          actions={[
            {
              key: "create",
              label: "Thêm người dùng",
              href: "/admin/users/create",
              icon: Plus,
              className: "bg-blue-200 text-blue-700",
            },
            {
              key: "upload",
              label: "Tải từ file",
              icon: FileUp,
              className: "bg-yellow-200 text-yellow-700",
              onClick: handleUpload,
            },
            {
              key: "exportExcel",
              label: "Xuất Excel",
              icon: FileDown,
              className: "bg-green-300 text-green-700",
              onClick: handleExportExcel,
            },
            {
              key: "exportPDF",
              label: "Xuất PDF",
              icon: FileText,
              className: "bg-red-300 text-red-700",
              onClick: handleExportPDF,
            },
            {
              key: "deleteAll",
              label: "Xóa tất cả",
              icon: Trash2,
              className: "bg-gray-300 text-gray-700",
              onClick: handleDeleteAll,
            },
          ]}
        />
        <hr className="text-gray-300 my-4" />
        {/* Search & Filter */}
        <Filter currentShow={currentShow} search={search} setSearch={setSearch} />

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <UserTable paginatedUsers={paginatedUsers} handleClickDelete={handleClickDelete}/>

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