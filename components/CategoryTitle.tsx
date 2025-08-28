import React from "react";

const CategoryTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-3 mb-6 relative">
      <div className="h-6 w-[2px] bg-red-500 rounded-xl"></div>
      <h4 className="text-2xl font-medium text-black">{title}</h4>
    </div>
  );
};

export default CategoryTitle;
