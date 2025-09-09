import Table from "@/components/ui/Table";
import { Trash, Eye } from "lucide-react";
import Link from "next/link";

export interface Order {
  id: string;
  customer: string;
  date: string;
  status: "Đang xử lý" | "Hoàn thành" | "Đã hủy" | "Chờ xác nhận"; 
  total: number;
}

export default function OrderTable(
    {handleClickDelete, paginatedOrders}
    : {handleClickDelete: (id: string) => void, paginatedOrders: Order[];}
) {
  const columns = [
    {
        key: "select",
        title: "#",
        render: () => <input type="checkbox" />,
    },
    { key: "id", title: "Mã đơn" },
    { key: "customer", title: "Khách hàng" },
    { key: "date", title: "Ngày tạo" },
    {
        key: "status",
        title: "Trạng thái",
        render: (value: string) => (
        <span
            className={`px-2 py-1 rounded text-sm ${
            value === "Hoàn thành"
                ? "bg-green-100 text-green-700"
                : value === "Đã hủy"
                ? "bg-red-100 text-red-700"
                : value === "Đang xử lý"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
            }`}
        >
            {value}
        </span>
        ),
    },
    {
        key: "total",
        title: "Tổng tiền",
        align: "left",
        render: (value: number) => `${value.toLocaleString("vi-VN")}₫`,
    },
    {
        key: "actions",
        title: "Hành động",
        align: "center",
        render: (_: any, row: any) => (
        <div className="flex items-center justify-center gap-2">
            <Link href={`/admin/orders/${row.id}`} className="text-blue-500 p-1 rounded hover:bg-blue-100">
            <Eye size={18} />
            </Link>
            <button
                className="text-red-500 p-1 rounded hover:bg-red-100"
                onClick={() => handleClickDelete(row.id)}>
                <Trash size={18} />
            </button>
        </div>
        ),
    },
    ];


  return (
    <Table<Order>
      columns={columns}
      data={paginatedOrders}
      getRowKey={(row) => row.id}
    />
  );
}