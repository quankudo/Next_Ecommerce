'use client'

import { Clock, Truck, CheckCircle, RotateCcw, XCircle } from "lucide-react";
import { usePathname, useRouter } from 'next/navigation';

export const orderTabs = [
  { key: "pending", title: "Chờ xác nhận", icon: Clock },
  { key: "shipping", title: "Chờ giao hàng", icon: Truck },
  { key: "delivered", title: "Đã giao", icon: CheckCircle },
  { key: "returned", title: "Trả hàng", icon: RotateCcw },
  { key: "canceled", title: "Đã hủy", icon: XCircle },
];

export default function OrderTabs () {
  const router = useRouter();
  const pathname = usePathname();

  // lấy status hiện tại từ URL
  const currentStatus = pathname.split("/").pop();

  return (
    <div className="flex gap-5 items-center relative after:content-[''] after:absolute after:-top-4 after:left-0 after:w-full after:h-4 after:bg-white after:z-[5]">
      {orderTabs.map((item) => {
        const isActive = currentStatus === item.key;

        return (
          <div
            key={item.key}
            onClick={() => router.push(`/account/order/${item.key}`)}
            className={`flex-1 flex flex-col items-center gap-2 p-4 border rounded cursor-pointer transition
              ${isActive ? "bg-black text-white" : "border-gray-300 bg-white text-black"}
            `}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </div>
        );
      })}
    </div>
  );
};
