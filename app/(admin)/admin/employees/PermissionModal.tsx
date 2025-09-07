import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User } from "./page";

const modules = ["User", "Order", "Product", "Category", "Report"];
const actions = ["R", "C", "U", "D"]; // Read, Create, Update, Delete

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const PermissionModal: React.FC<PermissionModalProps> = ({ isOpen, onClose, user }) => {
  const [permissions, setPermissions] = useState<Record<string, string[]>>({});

  // reset state mỗi khi mở modal
  useEffect(() => {
    if (isOpen && user) {
      setPermissions(
        user.permissions || Object.fromEntries(modules.map(m => [m, ["R"]]))
      );
    }
  }, [isOpen, user]);

  const togglePermission = (module: string, action: string) => {
    setPermissions(prev => {
      const current = prev[module] || [];
      const updated = current.includes(action)
        ? current.filter(a => a !== action) // bỏ tick
        : [...current, action]; // thêm tick
      return { ...prev, [module]: updated };
    });
  };

  const handleSave = () => {
    console.log("Cập nhật quyền:", permissions);

    Swal.fire({
      title: "✅ Cập nhật thành công!",
      text: `Quyền của ${user?.name} đã được lưu.`,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // click ra ngoài để đóng
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-[650px] animate-fadeIn"
        onClick={e => e.stopPropagation()} // ngăn đóng khi click bên trong
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Cập nhật quyền - <span className="text-blue-600">{user?.name}</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border px-3 py-2 text-left">Module</th>
                {actions.map(a => (
                  <th key={a} className="border px-2 py-2 text-center">{a}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modules.map(m => (
                <tr key={m} className="hover:bg-gray-50">
                  <td className="border px-3 py-2 font-medium">{m}</td>
                  {actions.map(a => (
                    <td key={a} className="border text-center">
                      <input
                        type="checkbox"
                        checked={!!permissions[m]?.includes(a)}
                        onChange={() => togglePermission(m, a)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;