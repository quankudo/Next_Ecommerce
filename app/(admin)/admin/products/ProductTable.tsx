// interface
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  status: "Active" | "Inactive";
}

import Table from "@/components/ui/Table";
// columns
import { Eye, Edit, Trash } from "lucide-react";
import Link from "next/link";
export default function ProductTable({  paginatedProducts,
  handleClickDelete,
}: {
  paginatedProducts: Product[];
  handleClickDelete: (id: number, name: string) => void;
}) {

const columns = [
  {
    key: "checkbox",
    title: "#",
    render: (_: any, row: Product) => <input type="checkbox" />,
  },
  { key: "id", title: "ID" },
  { key: "name", title: "Tên sản phẩm" },
  {
    key: "price",
    title: "Giá",
    render: (value:any) => `${value.toLocaleString("vi-VN")} ₫`,
  },
  { key: "category", title: "Danh mục" },
  {
    key: "status",
    title: "Trạng thái",
    render: (value: Product["status"]) => (
      <span
        className={`px-2 py-1 rounded text-sm ${
          value === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: "actions",
    title: "Hành động",
    align: "center",
    render: (_:any, row:Product) => (
      <div className="flex items-center justify-center gap-2">
        <button className="text-blue-500 p-1 rounded cursor-pointer hover:bg-blue-100">
          <Eye size={18} />
        </button>
        <Link
          href={`/admin/products/${row.id}/edit`}
          className="text-green-500 p-1 rounded cursor-pointer hover:bg-green-100 inline-flex items-center"
        >
          <Edit size={18} />
        </Link>
        <button
          className="text-red-500 p-1 rounded cursor-pointer hover:bg-red-100"
          onClick={() => handleClickDelete(row.id, row.name)}
        >
          <Trash size={18} />
        </button>
      </div>
    ),
  },
];
    return (
        <Table<Product>
          columns={columns}
          data={paginatedProducts}
          getRowKey={(row) => row.id}
        />
    );
}

