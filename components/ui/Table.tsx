"use client";
import React from "react";

type Column<T> = {
  key: keyof T | string;
  title: string;
  align?: string;
  className?: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  getRowKey: (row: T, index: number) => string | number;
  striped?: boolean;
};

export default function Table<T extends object>({
  columns,
  data,
  getRowKey,
  striped = true,
}: TableProps<T>) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-black text-left text-white">
          {columns.map((col) => (
            <th
              key={col.key.toString()}
              className={`py-3 px-3 font-normal ${
                      col.align ? `text-${col.align}` : "text-left"
                    }`}
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              className="text-center py-4 text-gray-500"
            >
              Không có dữ liệu
            </td>
          </tr>
        ) : (
          data.map((row, index) => (
            <tr
              key={getRowKey(row, index)}
              className={`hover:bg-gray-50 ${
                striped && index % 2 === 0 ? "bg-gray-100" : ""
              }`}
            >
              {columns.map((col) => {
                const value = (row as any)[col.key];
                return (
                  <td
                    key={col.key.toString()}
                    className={`px-3 py-3 ${
                      col.align ? `text-${col.align}` : "text-left"
                    }`}
                  >
                    {col.render ? col.render(value, row, index) : value}
                  </td>
                );
              })}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}