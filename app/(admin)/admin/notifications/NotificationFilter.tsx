"use client";
import Select from "@/components/ui/Select";
import React from "react";

interface FilterProps {
  statusFilter: "All" | "Read" | "Unread";
  typeFilter: "All" | "Order" | "Review" | "System" | "Promotion";
  setStatusFilter: React.Dispatch<
    React.SetStateAction<"All" | "Read" | "Unread">
  >;
  setTypeFilter: React.Dispatch<
    React.SetStateAction<"All" | "Order" | "Review" | "System" | "Promotion">
  >;
}

const NotificationFilter: React.FC<FilterProps> = ({
  statusFilter,
  typeFilter,
  setStatusFilter,
  setTypeFilter,
}) => {
  const statusOptions = [
    { id: "All", name: "Tất cả trạng thái" },
    { id: "Unread", name: "Chưa đọc" },
    { id: "Read", name: "Đã đọc" },
  ];

  const typeOptions = [
    { id: "All", name: "Tất cả loại" },
    { id: "Order", name: "Đơn hàng" },
    { id: "Review", name: "Bình luận" },
    { id: "System", name: "Hệ thống" },
    { id: "Promotion", name: "Khuyến mãi" },
  ];

  return (
    <div className="flex gap-3">
      <Select
        data={statusOptions}
        value={statusFilter}
        valueField="id"
        labelField="name"
        onChange={(val) => setStatusFilter(val as "All" | "Read" | "Unread")}
        className="min-w-[160px]"
      />

      <Select
        data={typeOptions}
        value={typeFilter}
        valueField="id"
        labelField="name"
        onChange={(val) =>
          setTypeFilter(
            val as "All" | "Order" | "Review" | "System" | "Promotion"
          )
        }
        className="min-w-[160px]"
      />
    </div>
  );
};

export default NotificationFilter;
