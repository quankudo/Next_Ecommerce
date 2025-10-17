// src/hooks/useActionHandler.ts
"use client";
import { toast } from "sonner";
import Swal from "sweetalert2";

export const useActionHandler = (entityName: string = "mục này") => {
  const handleUpload = () => {
    toast.success(`Tải ${entityName} từ file thành công!`);
  };

  const handleExportExcel = () => {
    toast.success(`Xuất ${entityName} ra Excel thành công!`);
  };

  const handleExportPDF = () => {
    toast.success(`Xuất ${entityName} ra PDF thành công!`);
  };

  const handleDeleteAll = () => {
    Swal.fire({
      title: `Xác nhận xóa tất cả ${entityName}?`,
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa tất cả",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success(`Đã xóa tất cả ${entityName}!`);
      }
    });
  };

  const handleClickDelete = (id: number | string, name?: string) => {
    Swal.fire({
      title: `Bạn có chắc muốn xóa ${entityName} ${id}${
        name ? ` - ${name}` : ""
      }?`,
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success(`Đã xóa ${entityName} thành công!`);
      }
    });
  };

  return {
    handleUpload,
    handleExportExcel,
    handleExportPDF,
    handleDeleteAll,
    handleClickDelete,
  };
};
