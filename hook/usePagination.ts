import { useMemo } from "react";

/**
 * Hook phân trang dùng chung cho toàn hệ thống
 * @param data - Mảng dữ liệu gốc (sau khi filter/search)
 * @param currentPage - Trang hiện tại (bắt đầu từ 1)
 * @param itemsPerPage - Số phần tử mỗi trang
 * @returns paginatedData, totalPages, startIndex, endIndex
 */
export function usePagination<T>(
  data: T[],
  currentPage: number,
  itemsPerPage: number
) {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, itemsPerPage, currentPage]);

  return { paginatedData, totalPages };
}
