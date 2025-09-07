"use client";

import SectionHeading from "@/components/admin/SectionHeading";
import Pagination from "@/components/ui/Pagination";
import { Edit, Trash, UserPen } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Filter from "@/components/admin/Filter";
import Swal from "sweetalert2";
import PermissionModal from "./PermissionModal";


  // Định nghĩa các quyền
type PermissionAction = "R" | "C" | "U" | "D";

// Danh sách module
type ModuleName = "User" | "Order" | "Product" | "Category" | "Report";

// Object permission: key là module, value là mảng quyền
type Permissions = {
  [K in ModuleName]: PermissionAction[];
};

// Interface User
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  status: "Active" | "Inactive";
  permissions: Permissions;
};

const Page = () => {

// Danh sách mặc định quyền chỉ có Read
const defaultPermissions: Permissions = {
  User: ["R"],
  Order: ["R"],
  Product: ["R"],
  Category: ["R"],
  Report: ["R"],
};

// Danh sách Users
const usersInit: User[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    phone: "0123456789",
    district: "Đống Đa",
    city: 'Hà Nội',
    status: "Active",
    permissions: {
      User: ["R", "C"], // Ví dụ A có thêm quyền Create ở User
      Order: ["R"],
      Product: ["R"],
      Category: ["R"],
      Report: ["R"],
    },
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "thib@example.com",
    phone: "0987654321",
    city: "TP.HCM",
    district: '',
    status: "Inactive",
    permissions: defaultPermissions,
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "vanc@example.com",
    phone: "0911222333",
    city: "Đà Nẵng",
    district: '',
    status: "Active",
    permissions: defaultPermissions,
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "thid@example.com",
    phone: "0933444555",
    city: "Hải Phòng",
    district: '',
    status: "Active",
    permissions: defaultPermissions,
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "vane@example.com",
    phone: "0955666777",
    city: "Cần Thơ",
    district: '',
    status: "Inactive",
    permissions: defaultPermissions,
  },
  {
    id: 6,
    name: "Đỗ Thị F",
    email: "thif@example.com",
    phone: "0977888999",
    city: "Huế",
    district: '',
    status: "Active",
    permissions: defaultPermissions,
  },
  {
    id: 7,
    name: "Bùi Văn G",
    email: "vang@example.com",
    phone: "0909090909",
    city: "Quảng Ninh",
    district: '',
    status: "Inactive",
    permissions: defaultPermissions,
  },
];
  const [users, setUsers] = useState<User[]>(usersInit)
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [districts, setDistricts] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([]);
  const [isShowAddress, setIsShowAddress] = useState(false);

  const handleCityChange = (city: string) => {
    if (city === "Hà Nội") {
      setDistricts(["Ba Đình", "Hoàn Kiếm", "Đống Đa"]);
    } else if (city === "TP. Hồ Chí Minh") {
      setDistricts(["Quận 1", "Quận 3", "Bình Thạnh"]);
    } else if (city === "Đà Nẵng") {
      setDistricts(["Hải Châu", "Thanh Khê", "Ngũ Hành Sơn"]);
    }
    setSelectedUser({ ...selectedUser, city: city })
  };

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

  const handleClickDelete = (id: number) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa?" + id,
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
  };

  const handleClickEdit = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    console.log("Đã cập nhật:", selectedUser);
    setIsModalOpen(false);
    Swal.fire({
      title: "Cập nhật thành công!",
      text: `Nhân viên ${selectedUser?.name} đã được cập nhật.`,
      icon: "success",
      confirmButtonText: "OK"
    });
    setIsShowAddress(false);
    setDistricts([]);
    setUsers((prev) => prev.map(u => 
      u.id === selectedUser.id ? selectedUser : u
    ));
  };

  const handleClickPermission = (user: any) => {
    setSelectedUser(user);
    setIsPermissionModalOpen(true);
  };

  const handleClickUpdateAddress = () => {
    setIsShowAddress(!isShowAddress);
    if(cities.length > 0)
      return;
    setCities([
      "Hà Nội",
      "TP. Hồ Chí Minh",
      "Đà Nẵng",
    ]);
  }

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
                  <td className="px-3 py-3">{`${u.district}/${u.city} `}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        u.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 flex items-center justify-center gap-3">
                    <button className="text-yellow-500" onClick={() => handleClickEdit(u)}>
                      <UserPen size={18} />
                    </button>
                    <button className="text-blue-500">
                      <Edit size={18} onClick={() => handleClickPermission(u)}/>
                    </button>
                    <button className="text-red-500" onClick={() => handleClickDelete(u.id)}>
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>

      <PermissionModal
        isOpen={isPermissionModalOpen}
        onClose={() => setIsPermissionModalOpen(false)}
        user={selectedUser}
      />

      {/* Modal Update */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Cập nhật nhân viên</h2>

            <input
              className="w-full mb-3 p-2 border rounded"
              value={selectedUser?.name || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              placeholder="Tên"
            />
            <input
              className="w-full mb-3 p-2 border rounded"
              value={selectedUser?.email || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              placeholder="Email"
            />
            <input
              className="w-full mb-3 p-2 border rounded"
              value={selectedUser?.phone || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
              placeholder="Số điện thoại"
            />
            <div className="w-full mb-3 p-2 border rounded flex justify-between items-center">
              <input
                disabled={true}
                className="w-full outline-none flex-1"
                value={`${selectedUser?.district}/${selectedUser?.city}` || ""}
                placeholder="Địa chỉ"
              />
              <Edit className="w-5 h-5" onClick={handleClickUpdateAddress}/>
            </div>
            {
              isShowAddress && cities &&
              <select
                name="city"
                value={selectedUser?.city}
                onChange={(e)=>handleCityChange(e.target.value)}
                className="w-full border rounded px-3 py-2">
                {cities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            }
            {
              isShowAddress && districts.length>0 && 
              <select
                name="district"
                value={selectedUser?.district}
                onChange={(e)=>setSelectedUser({ ...selectedUser, district: e.target.value })}
                className="w-full border rounded px-3 py-2 mt-3">
                {districts.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            }
            <div className="flex justify-end gap-3 mt-3">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setIsModalOpen(false)}>
                Hủy
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;