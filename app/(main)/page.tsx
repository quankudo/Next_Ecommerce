"use client";

import { motion } from "framer-motion";
import BlogPreviewCard from "@/components/BlogPreviewCard";
import CategoryTitle from "@/components/CategoryTitle";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import ListProduct from "@/components/ListProduct";
import PromotionCard from "@/components/home/PromotionCard";
import SaleCard from "@/components/home/SaleCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { listProduct } from "../data";
import ListSupplier from "@/components/home/ListSupplier";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const }
  }
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -100 },   // bắt đầu bên trái
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: "easeOut" as const } 
  }
};


export default function Home() {
  return (
    <div>
      {/* Hero */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Hero />
      </motion.div>

      {/* Features */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Features />
      </motion.div>
      {/* SaleCard */}
      <SaleCard />

      {/* List Product 1 */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <ListProduct title="Máy giặt / Tủ lạnh" category="Máy giặt / Tủ lạnh"/>
      </motion.div>

      {/* List Product 2 */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <ListProduct title="Máy lọc nước / không khí" category="Máy lọc nước / không khí" />
      </motion.div>

      {/* Promotion */}
      <PromotionCard />

      {/* Các nhà cung cấp */}
      <motion.div
        variants={slideFromLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <ListSupplier />
      </motion.div>

      {/* Blog Section */}
      <div className="px-32">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <CategoryTitle title="Có Thể Bạn Quan Tâm" />
        </motion.div>

        <div className="grid grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <BlogPreviewCard />
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center mt-8"
        >
          <Link
            href={"/"}
            className="flex items-center gap-2 bg-black text-white px-10 py-3 w-[max-content]"
          >
            Xem tất cả <ArrowRight />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}