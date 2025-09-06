import { ReactNode } from "react";
import OrderTabs from "./OrderTabs";

export default function OrdersLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Tabs điều hướng */}
      <div className="bg-white shadow-sm">
        <OrderTabs />
      </div>
      {/* Nội dung từng trạng thái */}
      <div className="mt-6">{children}</div>
    </div>
  );
}