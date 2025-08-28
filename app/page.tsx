import BlogPreviewCard from "@/components/BlogPreviewCard";
import CategoryTitle from "@/components/CategoryTitle";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import SaleCard from "@/components/home/SaleCard";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <SaleCard />
      <div className="px-32 py-16">
        <CategoryTitle title="Bàn Ghế Hiện Đại"/>
        <div className="grid grid-cols-4 gap-5">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      <div className="px-32">
        <CategoryTitle title="Có Thể Bạn Quan Tâm"/>
        <div className="grid grid-cols-4 gap-5">
          <BlogPreviewCard />
          <BlogPreviewCard />
          <BlogPreviewCard />
          <BlogPreviewCard />
        </div>
      </div>
    </div>
  );
}
