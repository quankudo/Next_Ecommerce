"use client";

import SectionHeading from "@/components/admin/SectionHeading";
import Pagination from "@/components/ui/Pagination";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Filter from "@/components/admin/Filter";
import UserTable from "./UserTable";
import { FileDown, FileText, FileUp, Plus, Trash2 } from "lucide-react";
import ActionButtons from "@/components/admin/ActionButtons";
import { listUsers } from "@/app/data";
import { useActionHandler } from "@/hook/useActionHandler";
import { usePagination } from "@/hook/usePagination";

const Page = () => {
  const {
    handleUpload,
    handleExportExcel,
    handleExportPDF,
    handleDeleteAll,
    handleClickDelete,
  } = useActionHandler("người dùng");

  const [search, setSearch] = useState("");

  // 🔹 Lấy page từ URL
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentShow = parseInt(searchParams.get("show") || "5", 10);

  // Filter user
  const filteredUsers = useMemo(() => {
    return listUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.phone.includes(search)
    );
  }, [listUsers, search]);

  // Pagination
  const { paginatedData: paginatedUsers, totalPages } = usePagination(
    filteredUsers,
    currentPage,
    currentShow
  );
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
        <Filter currentShow={currentShow} search={search} setSearch={setSearch}>
          <select>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
          </select>
          {/* co nhieu filter con o day */}
        </Filter>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <UserTable
            paginatedUsers={paginatedUsers}
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
