"use client";

import SectionHeading from "@/components/admin/SectionHeading";
import Pagination from "@/components/ui/Pagination";
import { Plus, Edit, FileText, FileDown, Trash2, FileUp } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Filter from "@/components/admin/Filter";
import Swal from "sweetalert2";
import PermissionModal from "./PermissionModal";
import EmployeeTable from "./EmployeeTable";
import { toast } from "sonner";
import ActionButtons from "@/components/admin/ActionButtons";

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
    district: "Đống Đa",
    status: "Inactive",
    permissions: defaultPermissions,
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "vanc@example.com",
    phone: "0911222333",
    city: "Đà Nẵng",
    district: "Đống Đa",
    status: "Active",
    permissions: defaultPermissions,
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "thid@example.com",
    phone: "0933444555",
    city: "Hải Phòng",
    district: "Đống Đa",
    status: "Active",
    permissions: defaultPermissions,
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "vane@example.com",
    phone: "0955666777",
    city: "Cần Thơ",
    district: "Đống Đa",
    status: "Inactive",
    permissions: defaultPermissions,
  },
  {
    id: 6,
    name: "Đỗ Thị F",
    email: "thif@example.com",
    phone: "0977888999",
    city: "Huế",
    district: "Đống Đa",
    status: "Active",
    permissions: defaultPermissions,
  },
  {
    id: 7,
    name: "Bùi Văn G",
    email: "vang@example.com",
    phone: "0909090909",
    city: "Quảng Ninh",
    district: "Đống Đa",
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
    else 
      setDistricts([]);
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

  const handleClickDelete = (id: number, name: string) => {
    Swal.fire({
      title: `Bạn có chắc muốn xóa nhân viên ${id}-${name}?`,
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(()=> {
      setUsers((prev)=>prev.filter((user)=>user.id!==id));
      toast.success("Xóa nhân viên thành công");
    });
  };

  const handleUpload = () => {
    toast.success("Tải từ file thành công!");
  };

  const handleExportExcel = () => {
    toast.success("Xuất Excel thành công!");
  };

  const handleExportPDF = () => {
    toast.success("Xuất PDF thành công!");
  };

  const handleDeleteAll = () => {
    toast.success("Xóa tất cả thành công!");
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
    handleCityChange(selectedUser.city);
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
        <ActionButtons
          actions={[
            {
              key: "create",
              label: "Thêm nhân viên",
              href: "/admin/employees/create",
              icon: Plus,
              className: "bg-blue-200 text-blue-700 hover:bg-blue-300",
            },
            {
              key: "upload",
              label: "Tải từ file",
              icon: FileUp,
              className: "bg-yellow-200 text-yellow-700 hover:bg-yellow-300",
              onClick: handleUpload,
            },
            {
              key: "exportExcel",
              label: "Xuất Excel",
              icon: FileDown,
              className: "bg-green-200 text-green-700 hover:bg-green-300",
              onClick: handleExportExcel,
            },
            {
              key: "exportPDF",
              label: "Xuất PDF",
              icon: FileText,
              className: "bg-red-200 text-red-700 hover:bg-red-300",
              onClick: handleExportPDF,
            },
            {
              key: "deleteAll",
              label: "Xóa tất cả",
              icon: Trash2,
              className: "bg-gray-200 text-gray-700 hover:bg-gray-300",
              onClick: handleDeleteAll,
            },
          ]}
        />
        <hr className="text-gray-300 my-4" />
        {/* Search & Filter */}
        <Filter currentShow={currentShow} search={search} setSearch={setSearch} />

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <EmployeeTable handleClickDelete={handleClickDelete} handleClickEdit={handleClickEdit}
            handleClickPermission={handleClickPermission} paginatedUsers={paginatedUsers}/>
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
              isShowAddress &&
              <select
                name="city"
                value={selectedUser?.city}
                onChange={(e)=>handleCityChange(e.target.value)}
                className="w-full border rounded px-3 py-2">
                <option value="">--Chọn thành phố--</option>
                {cities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            }
            {
              isShowAddress && 
              <select
                name="district"
                value={selectedUser?.district}
                onChange={(e)=>setSelectedUser({ ...selectedUser, district: e.target.value })}
                className="w-full border rounded px-3 py-2 mt-3">
                <option value="">--Chọn quận/huyện--</option>
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