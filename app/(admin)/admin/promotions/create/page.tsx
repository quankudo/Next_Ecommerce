"use client";

import { listProduct, Product } from "@/app/data";
import SectionHeading from "@/components/admin/SectionHeading";
import { truncateByWord } from "@/utils/format";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Enum types
export enum PromotionType {
  PERCENTAGE = "PERCENTAGE",
  FREESHIP = "FREESHIP",
  FIXED_AMOUNT = "FIXED_AMOUNT",
}

export enum TargetType {
  PRODUCT = "PRODUCT",
  CATEGORY = "CATEGORY",
  ORDER = "ORDER",
  NEW_CUSTOMER = "NEW_CUSTOMER",
}

// Zod schema
const promotionSchema = z
  .object({
    title: z.string().min(3, "Tiêu đề phải có ít nhất 3 ký tự"),
    type: z.nativeEnum(PromotionType).refine((val) => val !== undefined, { message: "Vui lòng chọn hình thức" }),
    targetType: z.nativeEnum(TargetType).refine((val) => val !== undefined, { message: "Vui lòng chọn loại áp dụng" }),
    value: z
      .string()
      .optional()
      .refine((val) => !val || Number(val) > 0, {
        message: "Giá trị phải lớn hơn 0",
      }),
    category: z.string().optional(),
    minOrder: z.string().optional(),
    status: z.string(),
    startDate: z.string().nonempty("Vui lòng chọn ngày bắt đầu"),
    endDate: z.string().nonempty("Vui lòng chọn ngày kết thúc"),
  })
  .refine((data) => new Date(data.startDate) < new Date(data.endDate), {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["endDate"],
  });

type PromotionFormData = z.infer<typeof promotionSchema>;

export default function PromotionForm() {
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PromotionFormData>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      title: "",
      type: PromotionType.PERCENTAGE,
      targetType: TargetType.PRODUCT,
      value: "",
      status: "Inactive",
      usage: "0/50",
      startDate: "",
      endDate: "",
    } as any,
  });

  const watchType = watch("type");
  const watchTargetType = watch("targetType");

  // handle search
  const handleChangeSearch = (value: string) => {
    setSearchProduct(value);
    if (!value) {
      setProducts([]);
    } else {
      const filterProduct = listProduct.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setProducts(filterProduct);
    }
  };

  // chọn sản phẩm
  const handleSelectProduct = (item: Product) => {
    if (!selectedProducts.find((x) => x.id === item.id)) {
      setSelectedProducts([...selectedProducts, item]);
    }
  };

  // bỏ chọn sản phẩm
  const handleUnselectProduct = (id: number) => {
    setSelectedProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const onSubmit = (data: PromotionFormData) => {
    const payload = {
      ...data,
      products: data.targetType === TargetType.PRODUCT ? selectedProducts : [],
    };
    console.log("🚀 Promotion Payload:", payload);
    alert("Thêm khuyến mãi thành công!");
  };

  return (
    <div className="rounded">
      <SectionHeading
        text="Thêm khuyến mãi"
        links={[{ href: "/admin/promotions", label: "Quản lý khuyến mãi" }]}
      />

      <div className="bg-white mt-4 p-6 rounded">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Tiêu đề */}
          <div>
            <label className="block text-sm font-medium mb-1">Tiêu đề</label>
            <input
              type="text"
              {...register("title")}
              className="w-full border rounded px-3 py-2"
              placeholder="Nhập tiêu đề khuyến mãi"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Hình thức */}
          <div>
            <label className="block text-sm font-medium mb-1">Hình thức</label>
            <select
              {...register("type")}
              className="w-full border rounded px-3 py-2"
            >
              <option value={PromotionType.PERCENTAGE}>Giảm giá %</option>
              <option value={PromotionType.FIXED_AMOUNT}>Giảm giá cố định</option>
              <option value={PromotionType.FREESHIP}>Miễn phí vận chuyển</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>

          {/* Nhập giá trị giảm */}
          {(watchType === PromotionType.FIXED_AMOUNT ||
            watchType === PromotionType.PERCENTAGE) && (
            <div>
              <label className="block text-sm font-medium mb-1">
                {watchType === PromotionType.FIXED_AMOUNT
                  ? "Nhập số tiền sẽ giảm"
                  : "Nhập % giảm"}
              </label>
              <input
                type="number"
                {...register("value")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.value && (
                <p className="text-red-500 text-sm">{errors.value.message}</p>
              )}
            </div>
          )}

          {/* Loại áp dụng */}
          <div>
            <label className="block text-sm font-medium mb-1">Loại áp dụng</label>
            <select
              {...register("targetType")}
              className="w-full border rounded px-3 py-2"
            >
              <option value={TargetType.PRODUCT}>Sản phẩm</option>
              <option value={TargetType.CATEGORY}>Loại sản phẩm</option>
              <option value={TargetType.ORDER}>Đơn hàng</option>
              <option value={TargetType.NEW_CUSTOMER}>Khách hàng mới</option>
            </select>
            {errors.targetType && (
              <p className="text-red-500 text-sm">{errors.targetType.message}</p>
            )}
          </div>

          {/* Điều kiện theo loại */}
          {watchTargetType === TargetType.PRODUCT && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Chọn sản phẩm
              </label>
              <input
                value={searchProduct}
                onChange={(e) => handleChangeSearch(e.target.value)}
                type="text"
                placeholder="Tìm và chọn sản phẩm..."
                className="w-full border rounded px-3 py-2"
              />

              {/* Danh sách tìm kiếm */}
              {products.length > 0 && (
                <div className="flex gap-3 items-center flex-wrap mt-4">
                  {products.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectProduct(item)}
                      className="flex items-center gap-2 p-2 rounded border cursor-pointer border-gray-200 hover:border-blue-500"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="object-cover"
                      />
                      <span>{truncateByWord(item.name, 20)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Danh sách đã chọn */}
              {selectedProducts.length > 0 && (
                <div className="flex gap-3 items-center flex-wrap mt-4">
                  {selectedProducts.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2 p-2 rounded border border-gray-200 relative"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="object-cover"
                      />
                      <span>{truncateByWord(item.name, 20)}</span>
                      <X
                        className="w-4 h-4 absolute top-0 right-0 hover:text-red-500 cursor-pointer"
                        onClick={() => handleUnselectProduct(item.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {watchTargetType === TargetType.CATEGORY && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Chọn loại sản phẩm
              </label>
              <select
                {...register("category")}
                className="w-full border rounded px-3 py-2"
              >
                <option>Điện thoại</option>
                <option>Laptop</option>
                <option>Gia dụng</option>
              </select>
            </div>
          )}

          {watchTargetType === TargetType.ORDER && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Điều kiện đơn hàng
              </label>
              <input
                type="number"
                {...register("minOrder")}
                placeholder="Áp dụng cho đơn hàng từ..."
                className="w-full border rounded px-3 py-2"
              />
            </div>
          )}

          {watchTargetType === TargetType.NEW_CUSTOMER && (
            <p className="text-sm text-gray-600">
              Áp dụng cho khách hàng mới (đăng ký lần đầu)
            </p>
          )}

          {/* Trạng thái */}
          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select
              {...register("status")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Active">Kích hoạt</option>
              <option value="Inactive">Ngừng</option>
            </select>
          </div>

          {/* Thời gian */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bắt đầu</label>
              <input
                type="date"
                {...register("startDate")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kết thúc</label>
              <input
                type="date"
                {...register("endDate")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Quay lại
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}