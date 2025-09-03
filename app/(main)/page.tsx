import BlogPreviewCard from "@/components/BlogPreviewCard";
import CategoryTitle from "@/components/CategoryTitle";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import ListProduct from "@/components/ListProduct";
import PromotionCard from "@/components/home/PromotionCard";
import SaleCard from "@/components/home/SaleCard";
import ProductCard from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <SaleCard />
      <ListProduct title="Bàn Ghế Hiện Đại" count={8} />
      <PromotionCard />
      <ListProduct title="Tủ quần áo" count={8} />

      <div className="px-32">
        <CategoryTitle title="Có Thể Bạn Quan Tâm"/>
        <div className="grid grid-cols-4 gap-5">
          <BlogPreviewCard />
          <BlogPreviewCard />
          <BlogPreviewCard />
          <BlogPreviewCard />
        </div>
        <div className="flex justify-center mt-8"><Link href={'/'} className="flex items-center gap-2 bg-black text-white px-10 py-3 w-[max-content]">Xem tất cả <ArrowRight/></Link></div>
      </div>
    </div>
  );
}
