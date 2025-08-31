"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: { id: number; imageUrl: string }[];
};

export default function ProductImages({ images }: Props) {
  const [mainImage, setMainImage] = useState(images[0].imageUrl);

  return (
    <div className="w-1/2">
      {/* Ảnh chính */}
      <Image
        src={mainImage}
        width={600}
        height={600}
        className="object-cover w-full h-[500px]"
        alt="Main product image"
      />

      {/* Thumbnail */}
      <div className="grid grid-cols-4 gap-4 mt-5">
        {images.map((item) => (
          <Image
            key={item.id}
            src={item.imageUrl}
            width={300}
            height={300}
            className={`object-cover cursor-pointer h-32 ${mainImage === item.imageUrl && 'border border-black'}`}
            alt={`Thumbnail ${item.id}`}
            onClick={() => setMainImage(item.imageUrl)}
          />
        ))}
      </div>
    </div>
  );
}
