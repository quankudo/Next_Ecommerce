"use client";

import { Headset, LockKeyhole, Truck, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const listFeatures = [
  {
    icon: Truck,
    title: "Miễn Phí Vận Chuyển",
    desc: "Miễn phí vận chuyển cho đơn hàng trên 500k",
  },
  {
    icon: LockKeyhole,
    title: "Thanh Toán An Toàn",
    desc: "Thanh toán bảo mật an toàn 100%",
  },
  {
    icon: Headset,
    title: "Hỗ Trợ 24/7",
    desc: "Dịch vụ hỗ trợ chuyên nghiệp 24/7",
  },
  {
    icon: Wallet,
    title: "Cam Kết Hoàn Tiền",
    desc: "Đảm bảo hoàn tiền nếu không hài lòng",
  },
];

// variants trượt từ trái sang phải
const slideIn = {
  hidden: { opacity: 0, x: -100 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.2, // delay theo index để có hiệu ứng stagger
      ease: "easeOut" as const,
    },
  }),
};

const Features = () => {
  return (
    <div className="flex justify-between px-32 gap-8 my-16">
      {listFeatures.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-center px-6 py-4 gap-5 bg-white shadow-md rounded-xl"
          variants={slideIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={index} // truyền index vào để delay
        >
          <item.icon className="w-10 h-10" strokeWidth={1} />
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm mt-2 text-gray-600">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Features;