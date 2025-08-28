"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const listHero = [
  {
    imageUrl:
      "https://smartfurniture.monamedia.net/wp-content/uploads/2024/11/247592.jpg",
    title: "Mang đến phong cách sống đẳng cấp",
    desc: "Nâng tầm không gian sống với những thiết kế nội thất hiện đại và sang trọng từ bộ sưu tập 2024 của Mona Furniture.",
    price: 500,
  },
  {
    imageUrl:
      "https://smartfurniture.monamedia.net/wp-content/uploads/2024/11/2069.jpg",
    title: "Nội thất phong cách tối giản",
    desc: "Gia tăng hiệu suất làm việc với các thiết kế nội thất tinh tế, đơn giản mà đầy đủ tiện nghi, giúp không gian luôn gọn gàng và thanh lịch.",
    price: 500,
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState([false, false, false, false, false]);

  useEffect(() => {
    // Reset state mỗi lần đổi slide
    setShow([false, false, false, false, false]);

    // Hiện lần lượt từng dòng
    const timers = [
      setTimeout(() => setShow((prev) => [true, false, false, false, false]),500),
      setTimeout(() => setShow((prev) => [true, true, false, false, false]), 900),
      setTimeout(() => setShow((prev) => [true, true, true, false, false]), 1300),
      setTimeout(() => setShow((prev) => [true, true, true, true, false]), 1700),
      setTimeout(() => setShow((prev) => [true, true, true, true, true]), 2100),
    ];

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % listHero.length);
    }, 6000); // đổi slide mỗi 8s

    return () => {
      timers.forEach((t) => clearTimeout(t));
      clearInterval(interval);
    };
  }, [current]);

  const hero = listHero[current];

  const baseClass =
    "transform transition-all duration-700 ease-out";
  const hidden = "-translate-x-20 opacity-0";
  const visible = "translate-x-0 opacity-100";

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Background */}
      <Image
        src={hero.imageUrl}
        alt=""
        fill
        className="object-cover absolute top-0 left-0 w-full h-full z-[-1]"
      />

      {/* Content */}
      <div className="w-full h-full flex flex-col gap-6 justify-center px-32 text-white">
        <span className={`${baseClass} ${show[0] ? visible : hidden} text-red-500`}>
          QuanKudo Shop
        </span>

        <h4
          className={`max-w-3xl text-5xl ${baseClass} ${
            show[1] ? visible : hidden
          }`}
        >
          {hero.title}
        </h4>

        <p
          className={`max-w-3xl text-xl leading-normal ${baseClass} ${
            show[2] ? visible : hidden
          }`}
        >
          {hero.desc}
        </p>

        <p
          className={`font-semibold text-xl ${baseClass} ${
            show[3] ? visible : hidden
          }`}
        >
          Giá chỉ từ:{" "}
          <span className="text-red-500 text-2xl">{hero.price}K</span>
        </p>

        <Link
          href={"/"}
          className={`px-6 py-3 bg-white text-black flex justify-center gap-4 items-center w-max rounded shadow-md hover:bg-gray-200 transition ${baseClass} ${
            show[4] ? visible : hidden
          }`}
        >
          Mua Ngay <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
