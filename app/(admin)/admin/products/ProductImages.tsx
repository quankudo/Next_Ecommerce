import Empty from "@/components/ui/Empty";
import React, { useRef } from "react";

interface ProductImagesProps {
  images: string[];
  onChange: (newImages: string[]) => void;
}

const ProductImages: React.FC<ProductImagesProps> = ({ images, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = [...images];
    for (let i = 0; i < files.length; i++) {
      if (newImages.length >= 4) break; // giới hạn 4 ảnh
      const url = URL.createObjectURL(files[i]);
      newImages.push(url);
    }
    onChange(newImages);

    // reset input để chọn lại file trùng tên cũng nhận
    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleAddClick = () => {
    if (images.length >= 4) {
      alert("Chỉ được tối đa 4 ảnh!");
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="block text-sm font-medium">Ảnh sản phẩm</label>

      <div className="grid grid-cols-2 gap-4">
        {images.length > 0 ? images.map((img, index) => (
          <div key={index} className="relative border rounded p-2 flex flex-col items-center">
            <img
              src={img}
              alt={`Ảnh ${index + 1}`}
              className="w-28 h-28 object-cover rounded mb-2"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Xóa
            </button>
          </div>
        )): <div className="col-span-2 m-5"><Empty actionHref={""} description="Hiện tại chưa có ảnh để hiển thị." /></div>
        }
      </div>

      <button
        type="button"
        onClick={handleAddClick}
        className="mt-2 px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 w-fit"
      >
        + Thêm ảnh
      </button>

      {/* input file ẩn */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default ProductImages;