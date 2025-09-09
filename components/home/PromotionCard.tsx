"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const listPromotion = [
  {
    id: 1,
    title: "Tạo nên không gian sống ấm cúng",
    desc: "Be together in the moment with Barnix calling",
    sale: 30,
    imageUrl:
      "https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/shop-3.jpg",
    color: "#000000",
  },
  {
    id: 2,
    title: "Khuyến Mãi 25% Giảm Giá",
    desc: "Cùng Mona Furniture làm đẹp không gian sống của bạn.",
    sale: 25,
    imageUrl:
      "https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/shop-2.jpg",
    color: "#ffffff",
  },
];

const PromotionCard = () => {
  return (
    <div className="flex justify-between gap-8 px-32">
      {listPromotion.map((item, index) => (
        <motion.div
          key={item.id}
          className="w-[48%] h-[260px] flex justify-between px-10 py-8 gap-5 relative rounded-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: index * 0.2,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Border overlay */}
          <div className="absolute top-4 left-4 right-4 bottom-4 border border-white" />

          {/* Background image */}
          <Image
            alt=""
            src={item.imageUrl}
            fill
            className="object-cover absolute top-0 left-0 z-[-1]"
          />

          {/* Text content */}
          <div className="flex flex-1 flex-col gap-4 justify-center">
            <p className="text-red-500">{item.title}</p>
            <h5 style={{ color: item.color }} className="text-xl">
              {item.desc}
            </h5>
            <Link
              href={""}
              className="flex items-center text-sm hover:underline"
              style={{ color: item.color }}
            >
              Mua ngay
              <ArrowRight strokeWidth={1.5} className="w-6 h-5 ml-1" />
            </Link>
          </div>

          {/* Sale circle */}
          <div
            className="w-[100px] h-[100px] flex flex-col items-center justify-center rounded-full border bg-white/10 backdrop-blur-sm"
            style={{ borderColor: item.color }}
          >
            <span style={{ color: item.color }} className="font-medium">
              SALE
            </span>
            <p style={{ color: item.color }} className="font-medium">
              <span className="text-red-500">{item.sale}</span>% OFF
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PromotionCard;