import React from 'react'
import { Edit, Trash } from "lucide-react";
import Table from "@/components/ui/Table";
import { User } from '@/app/data';


export default function UserTable({paginatedUsers, handleClickDelete}
    : {paginatedUsers: User[], handleClickDelete: (id: number, name: string)=>void}) {
    const Columns = [
    {
        key: "checkbox",
        title: "#",
        render: () => <input type="checkbox" />,
    },
    { key: "id", title: "ID" },
    { key: "name", title: "Tên" },
    { key: "email", title: "Email" },
    { key: "phone", title: "SĐT" },
    { key: "address", title: "Địa chỉ" },
    {
        key: "status",
        title: "Trạng thái",
        render: (value: string) => (
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
        render: (_:any, row:User) => (
        <div className="flex items-center justify-center gap-2">
            <button className="text-blue-500 p-1 rounded hover:bg-blue-100">
            <Edit size={18} />
            </button>
            <button className="text-red-500 p-1 rounded hover:bg-red-100">
            <Trash size={18} onClick={()=>handleClickDelete(row.id, row.name)}/>
            </button>
        </div>
        ),
    },
    ];
  return (
    <Table<User>
        columns={Columns}
        data={paginatedUsers}
        getRowKey={(row) => row.id}
    />
  )
}
