import React from "react";
import { Edit, Trash, Eye } from "lucide-react";
import Table from "@/components/ui/Table";

export interface Blog {
  id: number;
  title: string;
  category: string;
  author: string;
  status: "Published" | "Draft";
  publishedAt: string; // ISO string
  views: number;
}

export default function BlogTable({
  paginatedBlogs,
  handleClickDelete,
}: {
  paginatedBlogs: Blog[];
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
    { key: "category", title: "Danh mục" },
    { key: "author", title: "Tác giả" },
    {
      key: "status",
      title: "Trạng thái",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded text-sm ${
            value === "Published"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "publishedAt",
      title: "Ngày đăng",
      render: (value: string) =>
        value ? new Date(value).toLocaleDateString("vi-VN") : "-",
    },
    { key: "views", title: "Lượt xem", align: 'center' },
    {
      key: "actions",
      title: "Hành động",
      align: "center",
      render: (_: any, row: Blog) => (
        <div className="flex items-center justify-center gap-2">
            <button className="text-green-500 p-1 rounded hover:bg-green-100">
                <Eye size={18} />
            </button>
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
    <Table<Blog>
      columns={Columns}
      data={paginatedBlogs}
      getRowKey={(row) => row.id}
    />
  );
}