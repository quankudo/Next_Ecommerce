"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type CustomLabelProps = { name?: string; percent?: number };

const COLORS = ["#2563eb", "#22c55e", "#f59e0b", "#ef4444"];

const orderStatusData = [
  { name: "Hoàn thành", value: 55 },
  { name: "Đang xử lý", value: 25 },
  { name: "Đã hủy", value: 20 },
];

export default function OrderStatusChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
        <PieChart>
        <Pie
            data={orderStatusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }: CustomLabelProps) =>
            `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
        >
            {orderStatusData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        <Tooltip />
        </PieChart>
    </ResponsiveContainer>
  );
}