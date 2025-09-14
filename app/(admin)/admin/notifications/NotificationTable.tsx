import React, { JSX } from "react";
import { Eye, Trash } from "lucide-react";
import Table from "@/components/ui/Table";

export interface Notification {
  id: number;
  title: string;
  message: string;
  createdAt: string; // ISO
  status: "Read" | "Unread";
  type: "Order" | "Review" | "System" | "Promotion";
}

const typeLabels: Record<Notification["type"], string> = {
  Order: "Đơn hàng",
  Review: "Bình luận",
  System: "Hệ thống",
  Promotion: "Khuyến mãi",
};

const typeIcons: Record<Notification["type"], JSX.Element> = {
  Order: <span className="text-blue-500">📦</span>,
  Review: <span className="text-green-500">💬</span>,
  System: <span className="text-gray-500">🔔</span>,
  Promotion: <span className="text-purple-500">🏷️</span>,
};

export default function NotificationTable({
  paginatedNotifications,
  handleClickDelete,
  handleMarkRead,
}: {
  paginatedNotifications: Notification[];
  handleClickDelete: (id: number, title: string) => void;
  handleMarkRead: (id: number) => void;
}) {
  const Columns = [
    {
      key: "checkbox",
      title: "#",
      render: () => <input type="checkbox" />,
    },
    { key: "id", title: "ID" },
    // {
    //   key: "type",
    //   title: "Loại",
    //   render: (value: Notification["type"]) => (
    //     <div className="flex items-center gap-2">
    //       {typeIcons[value]}
    //       <span>{typeLabels[value]}</span>
    //     </div>
    //   ),
    // },
    { key: "title", title: "Tiêu đề" },
    { key: "message", title: "Nội dung" },
    {
      key: "createdAt",
      title: "Ngày tạo",
      render: (value: string) =>
        value ? new Date(value).toLocaleString("vi-VN") : "-",
    },
    {
      key: "status",
      title: "Trạng thái",
      render: (value: string) => (
        <span
          className={`px-2 py-1 w-[max-content] rounded text-sm ${
            value === "Unread"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {value === "Unread" ? "Chưa đọc" : "Đã đọc"}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Hành động",
      align: "center",
      render: (_: any, row: Notification) => (
        <div className="flex items-center justify-end gap-2">
          {row.status === "Unread" && (
            <button
              className="text-blue-500 p-1 rounded hover:bg-blue-100"
              onClick={() => handleMarkRead(row.id)}
            >
              <Eye size={18} />
            </button>
          )}
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
    <Table<Notification>
      columns={Columns}
      data={paginatedNotifications}
      getRowKey={(row) => row.id}
    />
  );
}