"use client";

import React, { JSX, useEffect, useMemo, useState } from "react";
import { ShoppingCart, MessageSquare, Bell, Tag } from "lucide-react";
import NotificationTable from "./NotificationTable";
import Pagination from "@/components/ui/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import Filter from "@/components/admin/Filter";
import SectionHeading from "@/components/admin/SectionHeading";
import { useDebounce } from "@/hook/useDebounce";
import NotificationFilter from "./NotificationFilter";
import { usePagination } from "@/hook/usePagination";

export interface Notification {
  id: number;
  title: string;
  message: string;
  createdAt: string; // ISO
  status: "Read" | "Unread";
  type: "Order" | "Review" | "System" | "Promotion";
}

const notificationIcons: Record<Notification["type"], JSX.Element> = {
  Order: <ShoppingCart className="w-5 h-5 text-blue-500" />,
  Review: <MessageSquare className="w-5 h-5 text-green-500" />,
  System: <Bell className="w-5 h-5 text-gray-500" />,
  Promotion: <Tag className="w-5 h-5 text-purple-500" />,
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: "Đơn hàng mới",
    message: "Bạn có đơn hàng mới từ khách hàng Nguyễn Văn A",
    createdAt: "2025-09-14T10:30:00Z",
    status: "Unread",
    type: "Order",
  },
  {
    id: 2,
    title: "Bình luận mới",
    message: "Khách hàng Minh đã bình luận về sản phẩm Ghế Sofa",
    createdAt: "2025-09-13T09:15:00Z",
    status: "Read",
    type: "Review",
  },
  {
    id: 3,
    title: "Bảo trì hệ thống",
    message: "Website sẽ bảo trì lúc 2:00 AM ngày 15/09",
    createdAt: "2025-09-12T20:00:00Z",
    status: "Unread",
    type: "System",
  },
  {
    id: 4,
    title: "Khuyến mãi mới",
    message: "Giảm giá 20% cho tất cả sản phẩm nội thất phòng khách",
    createdAt: "2025-09-10T18:00:00Z",
    status: "Read",
    type: "Promotion",
  },
];

const Page = () => {
  const router = useRouter();
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [statusFilter, setStatusFilter] = useState<"All" | "Read" | "Unread">(
    "All"
  );
  const [typeFilter, setTypeFilter] = useState<
    "All" | "Order" | "Review" | "System" | "Promotion"
  >("All");

  const handleMarkRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "Read" } : n))
    );
  };

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {}, [debouncedSearch]);

  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentShow = parseInt(searchParams.get("show") || "5", 10);

  const filtered = useMemo(() => {
    return notifications.filter((n) => {
      const byStatus =
        statusFilter === "All" ? true : n.status === statusFilter;
      const byType = typeFilter === "All" ? true : n.type === typeFilter;
      return byStatus && byType;
    });
  }, [notifications, statusFilter, typeFilter]);

  const { paginatedData: paginatedNotifications, totalPages } = usePagination(
    filtered,
    currentPage,
    currentShow
  );

  return (
    <div>
      <SectionHeading text="Quản lý thông báo" />

      <div className="p-4 bg-white rounded mt-4">
        {/* Bộ lọc */}
        <Filter currentShow={currentShow} search={search} setSearch={setSearch}>
          <NotificationFilter
            setStatusFilter={setStatusFilter}
            setTypeFilter={setTypeFilter}
            statusFilter={statusFilter}
            typeFilter={typeFilter}
          />
        </Filter>

        {/* Bảng thông báo */}
        <div className="overflow-x-auto mt-4">
          <NotificationTable
            handleClickDelete={handleDelete}
            handleMarkRead={handleMarkRead}
            paginatedNotifications={paginatedNotifications}
          />
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Page;
