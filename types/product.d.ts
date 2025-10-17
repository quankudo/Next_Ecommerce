export interface Product {
  id: number;
  name: string;
  image: string;
  oldPrice: number;
  newPrice: number;
  discount: number;
  score: number;
  quantity: number;
  category: string; // thêm danh mục
}
