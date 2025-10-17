export interface Category {
  id: string;
  name: string;
  description?: string;
  status: "active" | "inactive";
  displayOrder: number;
  imageUrl?: string;
  slug: string;
}
