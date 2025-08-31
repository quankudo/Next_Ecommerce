import { Star } from "lucide-react";
import React from "react";

interface Props {
  score: number; 
}

const ScoreStar: React.FC<Props> = ({ score }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${index + 1 <= score ? "text-yellow-400" : "text-gray-400"}`}
          fill={index + 1 <= score ? "#facc15" : "none"} // fill vàng cho sao được chọn
        />
      ))}
    </div>
  );
};

export default ScoreStar;
