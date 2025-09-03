"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface PriceFilterProps {
  min: number;
  max: number;
}

export default function PriceFilter({ min, max }: PriceFilterProps) {
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  const router = useRouter();

  const handleFilter = () => {
    router.push(`/shop?min=${minPrice}&max=${maxPrice}`);
  };

  return (
    <div className="w-full max-w-md rounded-lg">
      <div className="mb-4 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="w-full accent-red-500"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-red-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
            onClick={handleFilter}
            className="bg-black text-white py-2 px-6"
        >
            Lọc
        </button>
        <div className="flex items-center gap-3 flex-1">
            Giá: {minPrice} - {maxPrice }
        </div>
      </div>
    </div>
  );
}