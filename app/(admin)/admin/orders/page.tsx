"use client";

import SectionHeading from "@/components/admin/SectionHeading";
import Pagination from "@/components/ui/Pagination";
import { Eye, Trash } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Filter from "@/components/admin/Filter";
import Link from "next/link";
import Swal from "sweetalert2";
import { toast } from "sonner";

const Page = () => {
  const orders = [
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
        {/* Search & Filter */}
        <Filter currentShow={currentShow} search={search} setSearch={setSearch} />

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full">
            <thead>
              <tr className="bg-black text-left text-white">
                <th className="py-3 px-3 font-normal">#</th>
                <th className="py-3 px-3 font-normal">Mã đơn</th>
                <th className="py-3 px-3 font-normal">Khách hàng</th>
                <th className="py-3 px-3 font-normal">Ngày tạo</th>
                <th className="py-3 px-3 font-normal">Trạng thái</th>
                <th className="py-3 px-3 font-normal text-right">Tổng tiền</th>
                <th className="py-3 px-3 text-center font-normal">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((o, index) => (
                <tr key={o.id} className={`hover:bg-gray-50 ${index % 2 === 0 && "bg-gray-100"}`}>
                  <td className="px-3 py-3">
                    <input type="checkbox" />
                  </td>
                  <td className="px-3 py-3">{o.id}</td>
                  <td className="px-3 py-3">{o.customer}</td>
                  <td className="px-3 py-3">{o.date}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        o.status === "Hoàn thành"
                          ? "bg-green-100 text-green-700"
                          : o.status === "Đã hủy"
                          ? "bg-red-100 text-red-700"
                          : o.status === "Đang xử lý" 
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right">{o.total.toLocaleString("vi-VN")}₫</td>
                  <td className="px-3 py-3 flex items-center justify-center gap-2">
                    <Link href={`/admin/orders/${o.id}`} className="text-blue-500 mr-2"><Eye size={18} /></Link>
                    <button className="text-red-500"><Trash size={18} onClick={()=>handleClickDelete(o.id)}/></button>
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