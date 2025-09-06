"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Previous */}
      {currentPage > 1 && (
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="p-3 border rounded hover:bg-gray-100 flex items-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Page numbers */}
      {createPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-2 flex items-center">
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => goToPage(page as number)}
            className={`px-4 py-2 border rounded ${
              page === currentPage
                ? "bg-black text-white border-black"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      {currentPage < totalPages && (
        <button
          onClick={() => goToPage(currentPage + 1)}
          className="p-3 border rounded hover:bg-gray-100 flex items-center"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}