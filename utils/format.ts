export const formatCurrency = (amount: number): string => {
  return amount
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace(/\./g, ",");
}

export const truncateByWord = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;

  // cắt trước maxLength
  let truncated = text.substring(0, maxLength);

  // tìm khoảng trắng gần nhất
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 0) {
    truncated = truncated.substring(0, lastSpace);
  }

  return truncated + "...";
};

// Ví dụ
console.log(truncateByWord("bạn là lập trình viên Frontend", 10));
// 👉 "bạn là..."


