"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // Ví dụ: "/products?page="
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  const createPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        if (currentPage <= 4) {
        // Gần đầu
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
        } else if (currentPage >= totalPages - 3) {
        // Gần cuối
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
        // Ở giữa
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
        }
    }

    return pages;
    };


  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Previous */}
      {currentPage > 1 && (
        <Link
          href={`${basePath}${currentPage - 1}`}
          className="p-3 border rounded hover:bg-gray-100 flex items-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
      )}

      {/* Page numbers */}
      {createPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-2 flex items-center">
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </span>
        ) : (
          <Link
            key={`page-${page}`}
            href={`${basePath}${page}`}
            className={`px-4 py-2 border rounded ${
              page === currentPage
                ? "bg-black text-white border-black"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}${currentPage + 1}`}
          className="p-3 border rounded hover:bg-gray-100 flex items-center"
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
