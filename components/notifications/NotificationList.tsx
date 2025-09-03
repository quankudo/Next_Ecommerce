"use client";

import { Notification } from "@/types/notification";
import NotificationItem from "./NotificationItem";

const notifications: Notification[] = [
  {
    id: 1,
    type: "order",
    content: "Đơn hàng #1234 của bạn đã được xác nhận",
    date: "2025-09-01 14:30",
    isRead: false,
  },
  {
    id: 2,
    type: "system",
    content: "Hệ thống sẽ bảo trì vào 12h đêm nay",
    date: "2025-09-02 09:15",
    isRead: true,
  },
  {
    id: 3,
    type: "promotion",
    content: "Giảm giá 20% cho tất cả sản phẩm trong tuần này!",
    date: "2025-09-02 10:00",
    isRead: false,
  },
];

export default function NotificationList({
  isOpenBell,
  setIsOpenBell,
}: {
  isOpenBell: boolean;
  setIsOpenBell: (value: boolean) => void;
}) {
    return (
        <div
            className={`absolute top-[calc(100%+4px)] right-0 z-[4] bg-white shadow-md p-4 rounded w-[360px] 
            origin-top-right transform transition-all duration-300 ease-in-out
            ${
            isOpenBell
                ? "opacity-100 scale-100"
                : "opacity-0 scale-0 pointer-events-none"
            }`}
        >
            <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h5 className="font-medium text-black text-xl">Thông báo</h5>
                <button
                    onClick={() => setIsOpenBell(false)}
                    className="text-gray-500 cursor-pointer hover:text-black"
                >
                    ✕
                </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
            {notifications.map((item) => (
                <NotificationItem item={item} key={item.id} />
            ))}
            </div>
        </div>
  );
}