import { listCategory } from "@/app/data";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const Categories = () => {
  return (
    <div className="mx-32 mt-16">
        <h2 className="relative text-2xl font-medium mb-8 text-gray-800 text-center 
            after:content-[''] after:block after:h-[2px] after:w-20 after:bg-red-500 after:absolute after:top-1/2 after:left-0
            before:content-[''] before:block before:h-[2px] before:w-20 before:bg-red-500 before:absolute before:top-1/2 before:right-0">
            <span className="px-4 bg-white">Danh mục sản phẩm</span>
        </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {listCategory.map((item, index) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // lazy load khi xuất hiện trong viewport
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.03 }}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer"
          >
            {item.imageUrl && (
              <div className="overflow-hidden w-32 h-32 rounded-xl">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={140}
                  height={140}
                  className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-300"
                />
              </div>
            )}
            <h5 className="text-base font-semibold text-gray-700 text-center">
              {item.name}
            </h5>
            <p className="text-xs text-gray-500 text-center line-clamp-2">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;