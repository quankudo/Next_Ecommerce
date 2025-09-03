"use client";

import { Inbox } from "lucide-react";
import Link from "next/link";

interface EmptyProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function Empty({
  title = "Không có dữ liệu",
  description = "Hiện tại chưa có thông tin để hiển thị.",
  actionLabel = "Quay về Trang chủ",
  actionHref = "/",
}: EmptyProps) {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center text-center">
      <Inbox className="w-16 h-16 black mb-4" strokeWidth={1.5} />
      <h2 className="text-2xl font-semibold">
        {title}
      </h2>
      <p className="text-black mt-2">{description}</p>

      {actionHref && (
        <Link
          href={actionHref}
          className="mt-6 px-5 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}