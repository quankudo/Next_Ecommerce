"use client";

import SectionHeading from "@/components/admin/SectionHeading";
import Pagination from "@/components/ui/Pagination";
import { Edit, Trash } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Filter from "@/components/admin/Filter";

const Page = () => {
  const users = [
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
      <SectionHeading text="Quản lý nhân viên" />
      <div className="mt-5 p-4 rounded bg-white">
        {/* Search & Filter */}
        <Filter currentShow={currentShow} search={search} setSearch={setSearch} />

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full">
            <thead> 
                <tr className="bg-black text-left text-white"> 
                    <th className="py-3 px-3 font-normal">#</th> 
                    <th className="py-3 px-3 font-normal">ID</th> 
                    <th className="py-3 px-3 font-normal">Tên</th> 
                    <th className="py-3 px-3 font-normal">Email</th> 
                    <th className="py-3 px-3 font-normal">SĐT</th> 
                    <th className="py-3 px-3 font-normal">Địa chỉ</th> 
                    <th className="py-3 px-3 font-normal">Trạng thái</th> 
                    <th className="py-3 px-3 text-center font-normal">Hành động</th> 
                </tr> 
            </thead>
            <tbody>
              {paginatedUsers.map((u, index) => (
                <tr key={u.id} className={`hover:bg-gray-50 ${index % 2 === 0 && "bg-gray-100"}`}>
                  <td className="px-3 py-3">
                    <input type="checkbox" />
                  </td>
                  <td className="px-3 py-3">{u.id}</td>
                  <td className="px-3 py-3">{u.name}</td>
                  <td className="px-3 py-3">{u.email}</td>
                  <td className="px-3 py-3">{u.phone}</td>
                  <td className="px-3 py-3">{u.address}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-1 rounded text-sm ${ u.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700" }`} >{u.status}</span>
                    </td>
                  <td className="px-3 py-3 flex items-center justify-center gap-2">
                    <button className="text-blue-500 mr-2"><Edit size={18} /></button>
                    <button className="text-red-500"><Trash size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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