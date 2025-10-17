export const formatCurrency = (amount: number): string => {
  return amount
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace(/\./g, ",");
};

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
