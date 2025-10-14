"use client";

import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";

const bestSellerData = [
  { name: "Laptop", sales: 240 },
  { name: "Điện thoại", sales: 180 },
  { name: "Tai nghe", sales: 140 },
  { name: "Bàn phím", sales: 100 },
];

export default function BestSellerChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
    <BarChart data={bestSellerData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="sales" fill="#22c55e" />
    </BarChart>
    </ResponsiveContainer>
  );
}