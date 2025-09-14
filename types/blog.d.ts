export interface Blog {
  id: number;
  title: string;
  category: string;
  author: string;
  status: "Published" | "Draft";
  publishedAt: string; // ISO string
  views: number;
  images: string[];
  desc: string;
}
