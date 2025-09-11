import React from "react";
import { Edit, Trash } from "lucide-react";
import Table from "@/components/ui/Table";

export interface Promotion {
  id: number;
  title: string;
  method: string;
  type: string;
  status: "Active" | "Inactive" | "Expired";
  usage: string;
  startDate: string;
  endDate: string;
}

export default function PromotionTable({
  paginatedPromotions,
  handleClickDelete,
}: {
  paginatedPromotions: Promotion[];
  handleClickDelete: (id: number, title: string) => void;
}) {
  const Columns = [
    {
      key: "checkbox",
      title: "#",
      render: () => <input type="checkbox" />,
    },
    { key: "id", title: "ID" },
    { key: "title", title: "Tiêu đề" },
    { key: "method", title: "Hình thức" },
    { key: "type", title: "Loại" },
    {
      key: "status",
      title: "Trạng thái",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded text-sm ${
            value === "Active"
              ? "bg-green-100 text-green-700"
              : value === "Inactive"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: "usage", title: "Đã sử dụng" },
    {
      key: "startDate",
      title: "Bắt đầu",
      render: (value: string) =>
        value ? new Date(value).toLocaleDateString("vi-VN") : "-",
    },
    {
      key: "endDate",
      title: "Kết thúc",
      render: (value: string) =>
        value ? new Date(value).toLocaleDateString("vi-VN") : "-",
    },
    {
      key: "actions",
      title: "Hành động",
      align: "center",
      render: (_: any, row: Promotion) => (
        <div className="flex items-center justify-center gap-2">
          <button className="text-blue-500 p-1 rounded hover:bg-blue-100">
            <Edit size={18} />
          </button>
          <button
            className="text-red-500 p-1 rounded hover:bg-red-100"
            onClick={() => handleClickDelete(row.id, row.title)}
          >
            <Trash size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Table<Promotion>
      columns={Columns}
      data={paginatedPromotions}
      getRowKey={(row) => row.id}
    />
  );
}