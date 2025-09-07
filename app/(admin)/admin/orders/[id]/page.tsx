"use client";

import SectionHeading from "@/components/admin/SectionHeading";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const OrderDetailPage = () => {
  const params = useParams();
  const orderId = params?.id || "DH001";

  const order = {
    id: orderId,
    customer: {
      name: "Nguyễn Văn A",
      email: "vana@example.com",
      phone: "0123456789",
      address: "123 Đường ABC, Hà Nội",
    },
    date: "2025-09-01",
    status: "Đang xử lý",
    total: 1500000,
    items: [
      { id: 1, name: "Bàn gỗ sồi", quantity: 1, price: 1000000, image: "https://via.placeholder.com/60" },
      { id: 2, name: "Ghế nhựa", quantity: 2, price: 250000, image: "https://via.placeholder.com/60" },
    ],
  };

  return (
    <div>
      <SectionHeading links={[{label: "Quản lý đơn hàng", href:"/admin/orders"}]} text={`Chi tiết đơn hàng - ${order.id}`} />
      <div className="mt-5 p-4 rounded bg-white">
        {/* Thông tin đơn hàng */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-xl mb-2">Thông tin khách hàng</h3>
            <p><strong>Tên:</strong> {order.customer.name}</p>
            <p><strong>Email:</strong> {order.customer.email}</p>
            <p><strong>SĐT:</strong> {order.customer.phone}</p>
            <p><strong>Địa chỉ:</strong> {order.customer.address}</p>
          </div>
          <div>
            <h3 className="text-xl mb-2">Thông tin đơn hàng</h3>
            <p><strong>Mã đơn:</strong> {order.id}</p>
            <p><strong>Ngày tạo:</strong> {order.date}</p>
            <p><strong>Trạng thái:</strong> 
              <span
                className={`ml-2 px-2 py-1 rounded text-sm ${
                  order.status === "Hoàn thành"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Đã hủy"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </p>
            <p><strong>Tổng tiền:</strong> {order.total.toLocaleString("vi-VN")}₫</p>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <h3 className="text-xl mb-2">Sản phẩm trong đơn</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Ảnh</th>
              <th className="border px-3 py-2">Tên sản phẩm</th>
              <th className="border px-3 py-2">Số lượng</th>
              <th className="border px-3 py-2">Giá</th>
              <th className="border px-3 py-2">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id}>
                <td className="border px-3 py-2 text-center">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover mx-auto" />
                </td>
                <td className="border px-3 py-2">{item.name}</td>
                <td className="border px-3 py-2 text-center">{item.quantity}</td>
                <td className="border px-3 py-2 text-right">{item.price.toLocaleString("vi-VN")}₫</td>
                <td className="border px-3 py-2 text-right">
                  {(item.quantity * item.price).toLocaleString("vi-VN")}₫
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetailPage;