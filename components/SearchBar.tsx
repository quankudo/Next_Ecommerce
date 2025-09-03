"use client";

import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDebounce } from "@/hook/useDebounce";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Sofa cao cấp",
    price: 1200000,
    imageUrl: "https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/sofa-1-600x600.png",
  },
  {
    id: "2",
    name: "Bàn gỗ tự nhiên",
    price: 450000,
    imageUrl: "https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/prod1-300x300.png",
  },
  {
    id: "3",
    name: "Ghế ăn hiện đại",
    price: 180000,
    imageUrl: "https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/prod1-300x300.png",
  },
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      // call API thật ở đây
      const filtered = mockProducts.filter((p) =>
        p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  return (
    <div className="relative w-[300px]">
      {/* Search input */}
      <div className="flex items-center gap-3 rounded-3xl bg-gray-100 border border-gray-300 px-4 py-2">
        <input
          type="text"
          className="flex-1 outline-none bg-transparent"
          placeholder="Tìm kiếm sản phẩm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="w-5 h-5 text-black" strokeWidth={1} />
      </div>

      {/* Dropdown results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white shadow-md rounded-md max-h-[300px] overflow-y-auto z-50">
          {results.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 transition"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={40}
                height={40}
                className="rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.price.toLocaleString()} ₫</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No results */}
      {isOpen && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white shadow-md rounded-md p-4 text-center text-sm text-gray-500 z-50">
          Không tìm thấy sản phẩm
        </div>
      )}
    </div>
  );
};

export default SearchBar;
