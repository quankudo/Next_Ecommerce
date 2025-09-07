import React from "react";

const colors = [
  { name: "Trắng", code: "#FFFFFF" },
  { name: "Đen", code: "#000000" },
  { name: "Nâu", code: "#8B4513" },
  { name: "Xám", code: "#808080" },
  { name: "Xanh", code: "#1E90FF" },
  { name: "Đỏ", code: "#FF0000" },
];

interface ColorSelectProps {
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
}

export default function ColorSelect({ value, onChange }: ColorSelectProps) {
  return (
    <div>
      <label className="block text-sm mb-2">Màu sắc</label>
      <div className="flex flex-wrap gap-3">
        {colors.map((c) => (
          <div
            key={c.code}
            className={`w-10 h-10 rounded-full border-2 cursor-pointer transition 
              ${value === c.name ? "border-blue-500 scale-110" : "border-gray-300"}
            `}
            style={{ backgroundColor: c.code }}
            onClick={() => onChange({ target: { name: "color", value: c.name } })}
            title={c.name}
          />
        ))}
      </div>
      {value && <p className="text-sm mt-2">Đang chọn: {value}</p>}
    </div>
  );
}
