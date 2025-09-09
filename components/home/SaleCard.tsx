"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const listSale = [
  {
    id: 1,
    discount: 30,
    name: "Đèn Bàn Sang Trọng",
    price: 300,
    imageUrl:
      "https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/lamp.png",
  },
  {
    id: 2,
    discount: 30,
    name: "Nội Thất Mona",
    price: 300,
    imageUrl:
      "https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/bed.png",
  },
  {
    id: 3,
    discount: 40,
    name: "Ghế Ăn Cao Cấp",
    price: 460,
    imageUrl:
      "https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/chair-1-1.png",
  },
];

const SaleCard = () => {
  return (
    <div className="flex px-32 gap-5">
      {listSale.map((item, index) => (
        <motion.div
          key={item.id}
          className="flex-1 bg-gray-200 gap-3 p-5 rounded flex justify-between items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: index * 0.2,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex-1">
            <p className="text-xs">Giảm {item.discount}%</p>
            <h4 className="text-xl my-1">{item.name}</h4>
            <p className="text-sm">
              Giá chỉ từ{" "}
              <span className="text-red-500 text-[16px] font-medium">
                {item.price}K
              </span>
            </p>
          </div>
          <div className="relative w-[140px] h-[150px]">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SaleCard;