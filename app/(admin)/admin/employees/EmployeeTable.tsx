import Table from "@/components/ui/Table";
import { UserPen, Edit, Trash } from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  status: "Active" | "Inactive";
};

export default function EmployeeTable({
  paginatedUsers,
  handleClickEdit,
  handleClickPermission,
  handleClickDelete,
}: {
  paginatedUsers: User[];
  handleClickEdit: (u: User) => void;
  handleClickPermission: (u: User) => void;
  handleClickDelete: (id: number, name: string) => void;
}) {
  const columns = [
    {
      key: "checkbox",
      title: "#",
      render: () => <input type="checkbox" />,
    },
    { key: "id", title: "ID" },
    { key: "name", title: "Tên" },
    { key: "email", title: "Email" },
    { key: "phone", title: "SĐT" },
    {
      key: "address",
      title: "Địa chỉ",
      render: (_: any, row: User) => `${row.district}/${row.city}`,
    },
    {
      key: "status",
      title: "Trạng thái",
      render: (value: any) => (
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
      render: (_: any, row: User) => (
        <div className="flex items-center justify-center gap-3">
          <button
            className="text-yellow-500 p-1 rounded hover:bg-yellow-100"
            onClick={() => handleClickEdit(row)}
          >
            <UserPen size={18} />
          </button>
          <button
            className="text-blue-500 p-1 rounded hover:bg-blue-100"
            onClick={() => handleClickPermission(row)}
          >
            <Edit size={18} />
          </button>
          <button
            className="text-red-500 p-1 rounded hover:bg-red-100"
            onClick={() => handleClickDelete(row.id, row.name)}
          >
            <Trash size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Table<User>
      columns={columns}
      data={paginatedUsers}
      getRowKey={(row) => row.id}
    />
  );
}