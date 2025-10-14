"use client"

import React, { useState } from "react";
import { Users, ShoppingCart, DollarSign, Package } from "lucide-react";
import SectionHeading from "@/components/admin/SectionHeading";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import RecentOrders from "./charts/RecentOrders";

const OrderStatusChart = dynamic(() => import("./charts/OrderStatusChart"), {
  ssr: false,
});
const BestSellerChart = dynamic(() => import("./charts/BestSellerChart"), {
  ssr: false,
});
const CategoryChart = dynamic(() => import("./charts/CategoryChart"), {
  ssr: false,
});
const RevenueChart = dynamic(() => import("./charts/RevenueChart"), {
  ssr: false,
});

const listBtnTime = ["Hôm nay", "Tuần này", "Tháng này", "Năm nay"];

const listCard = [
  {
    icon: <Users className="w-7 h-7 text-blue-500" />,
    title: "Người dùng",
    percent: "+12%",
    count: "1,250",
  },
  {
    icon: <ShoppingCart className="w-7 h-7 text-green-500" />,
    title: "Đơn hàng",
    percent: "+8%",
    count: "320",
  },
  {
    icon: <DollarSign className="w-7 h-7 text-yellow-500" />,
    title: "Doanh thu",
    percent: "+15%",
    count: "$12,450",
  },
  {
    icon: <Package className="w-7 h-7 text-purple-500" />,
    title: "Sản phẩm",
    percent: "-3%",
    count: "540",
  },
];
const DashboardPage = () => {
  const [active, setActive] = useState("Hôm nay");

  return (
    <div>
      <SectionHeading text="📊 Dashboard" />
      <div className="mt-5 p-6 rounded-md bg-gradient-to-b from-gray-50 to-white shadow-sm">
        {/* list time btn */}
        <div className="flex justify-end gap-3 items-center">
          {listBtnTime.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(item)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition shadow-sm 
              ${
                active === item
                  ? "bg-black text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* list card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {listCard.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white shadow-lg rounded-md p-5 flex items-center justify-between border border-gray-100"
            >
              <div>
                <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                <h3 className="text-2xl font-semibold mt-1">{card.count}</h3>
                <span
                  className={`text-xs font-medium ${
                    card.percent.startsWith("-")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {card.percent} so với tháng trước
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-md shadow-inner">
                {card.icon}
              </div>
            </motion.div>
          ))}
        </div>
        {/* charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 h-[350px]">
          
          {/* Order status pie chart */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white shadow-lg rounded-md p-3"
          >
            <h4 className="font-semibold text-lg mb-3">
              📦 Trạng thái đơn hàng
            </h4>
            <OrderStatusChart />
          </motion.div>
          <RecentOrders />
        </div>

        {/* charts row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Best seller */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white shadow-lg rounded-md p-3"
          >
            <h4 className="font-semibold text-lg mb-3">
              🔥 Các sản phẩm bán chạy
            </h4>
            
              <BestSellerChart />
            
          </motion.div>

          {/* Category pie chart */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white shadow-lg rounded-md p-3"
          >
            <h4 className="font-semibold text-lg mb-3">📂 Danh mục sản phẩm</h4>
            
              <CategoryChart />
            
          </motion.div>
        </div>

        {/* Revenue chart */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white shadow-lg rounded-md p-5 mt-6"
        >
          <h4 className="font-semibold text-lg mb-3">
            📈 Doanh thu theo tháng
          </h4>
          
            <RevenueChart />
          
        </motion.div>

        {/* table */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white shadow-lg rounded-md p-5 mt-6"
        >
          <h4 className="font-semibold text-lg mb-3">📝 Đơn hàng gần nhất</h4>
          <div className="text-gray-400 h-40 flex items-center justify-center border border-dashed rounded-lg">
            (Table Placeholder)
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;