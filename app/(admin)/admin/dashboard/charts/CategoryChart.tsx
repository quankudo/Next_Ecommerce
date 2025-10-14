"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type CustomLabelProps = { name?: string; percent?: number };

const COLORS = ["#2563eb", "#22c55e", "#f59e0b", "#ef4444"];

const categoryData = [
  { name: "Điện tử", value: 400 },
  { name: "Thời trang", value: 300 },
  { name: "Gia dụng", value: 200 },
  { name: "Khác", value: 100 },
];

export default function CategoryChart() {
  return (
     <ResponsiveContainer width="100%" height={280}>
    <PieChart>
      <Pie
        data={categoryData}
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
        {categoryData.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
    </ResponsiveContainer>
  );
}