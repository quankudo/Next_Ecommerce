"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, User } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "Proud found a work computer setup That’s",
    img: "https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/news-9-150x150.jpg",
  },
  {
    id: 2,
    title: "Perfect found a work computer setup",
    img: "https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/news-10-150x150.jpg",
  },
  {
    id: 3,
    title: "Modern home office design",
    img: "https://secure.gravatar.com/avatar/9855b85c8526972b8cb3a82ebe7a17d4?s=160&d=mm&r=g",
  },
];
const RecommendBlogs = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % blogs.length);
  const prev = () => setIndex((i) => (i - 1 + blogs.length) % blogs.length);

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden 
        w-full py-8 border-t border-b border-gray-300 mt-10"
    >
      <button
        onClick={prev}
        className="absolute left-5 bg-gray-100 px-4 py-2 rounded-3xl 
        transition-all duration-300 hover:bg-black hover:text-white"
      >
        <ChevronLeft />
      </button>

      <div className="w-[70%] flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={blogs[index].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6"
          >
            <img
              src={blogs[index].img}
              alt={blogs[index].title}
              className="w-32 h-32 object-cover rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">{blogs[index].title}</h3>
              <div className="text-gray-500 flex items-center gap-4 mt-3">
                <p className="flex items-center gap-2">
                  <User className="w-5 h-5" /> monamedia
                </p>
                <span>-</span>
                <p className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5" /> Th9 24, 2022
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={next}
        className="absolute right-5 bg-gray-100 px-4 py-2 rounded-3xl 
        transition-all duration-300 hover:bg-black hover:text-white"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default RecommendBlogs;
