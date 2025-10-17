"use client";
import React from "react";

interface SelectProps<T> {
  data: T[];
  value: string | number;
  valueField: keyof T; // ví dụ "id"
  labelField: keyof T; // ví dụ "name"
  onChange: (value: string | number) => void;
  className?: string;
  placeholder?: string;
}

function Select<T>({
  data,
  value,
  valueField,
  labelField,
  onChange,
  className = "",
  placeholder,
}: SelectProps<T>) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-gray-100 border border-gray-300 rounded-lg px-3 py-2
        text-gray-800 text-sm
        hover:border-gray-400 transition duration-150 ease-in-out ${className}`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {data.map((item, index) => (
        <option key={index} value={String(item[valueField])}>
          {String(item[labelField])}
        </option>
      ))}
    </select>
  );
}

export default Select;
