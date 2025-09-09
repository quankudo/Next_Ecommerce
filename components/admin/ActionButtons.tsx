// components/ActionButtons.tsx
"use client";

import Link from "next/link";
import { LucideIcon, Plus } from "lucide-react";

type ActionConfig = {
  key: string; // định danh action
  label: string;
  href?: string; // nếu có thì render Link, nếu không thì render button
  icon?: LucideIcon; // icon truyền vào (mặc định là Plus)
  className?: string; // tùy chỉnh màu sắc
  onClick?: () => void; // event click
};

interface ActionButtonsProps {
  actions: ActionConfig[];
}

export default function ActionButtons({ actions }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-3">
      {actions.map(({ key, label, href, icon: Icon = Plus, className, onClick }) =>
        href ? (
          <Link
            key={key}
            href={href}
            className={`flex items-center px-2 text-[12px] font-medium cursor-pointer py-1 rounded ${className}`}
          >
            <Icon className="w-4 h-4 mr-1" strokeWidth={1} />
            {label}
          </Link>
        ) : (
          <button
            key={key}
            onClick={onClick}
            className={`flex items-center px-2 text-[12px] font-medium cursor-pointer py-1 rounded ${className}`}
          >
            <Icon className="w-4 h-4 mr-1" strokeWidth={1} />
            {label}
          </button>
        )
      )}
    </div>
  );
}