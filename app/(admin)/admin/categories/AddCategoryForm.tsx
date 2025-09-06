"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Category } from "./page";

export default function AddCategoryForm({ category }: { category: Category | null }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "active" as "active" | "inactive",
    displayOrder: 1,
    slug: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // 🔥 fix: đồng bộ khi category thay đổi
  useEffect(() => {
    if (category) {
      setForm({
        name: category.name,
        description: category.description || "",
        status: category.status,
        displayOrder: category.displayOrder,
        slug: category.slug,
      });
      setPreviewUrl(category.imageUrl || "");
      setImageFile(null);
    } else {
      setForm({
        name: "",
        description: "",
        status: "active",
        displayOrder: 1,
        slug: "",
      });
      setPreviewUrl("");
      setImageFile(null);
    }
  }, [category]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  const HandleClickCancle = () => {
    setForm({
      name: "",
      description: "",
      status: "active",
      displayOrder: 1,
      slug: "",
    });
    setPreviewUrl("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("status", form.status);
    data.append("displayOrder", String(form.displayOrder));
    data.append("slug", form.slug);
    if (imageFile) {
      data.append("image", imageFile);
    }

    const url = category ? `/api/categories/${category.id}` : "/api/categories";
    const method = category ? "PUT" : "POST";

    const res = await fetch(url, { method, body: data });

    if (res.ok) {
      alert(category ? "Cập nhật thành công!" : "Thêm danh mục thành công!");
    } else {
      alert("Có lỗi xảy ra!");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded w-[450px]">
      <h2 className="text-2xl font-medium mb-4">
        {category ? "Cập nhật danh mục" : "Thêm danh mục"}
      </h2>

      {/* Tên danh mục */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tên danh mục</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        />
      </div>

      {/* Slug */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Slug</label>
        <input
          type="text"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        />
      </div>

      {/* Mô tả */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Mô tả</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
          rows={3}
        />
      </div>

      {/* Thứ tự hiển thị */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Thứ tự hiển thị</label>
        <input
          type="number"
          name="displayOrder"
          value={form.displayOrder}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
          min={1}
        />
      </div>

      {/* Upload hình ảnh */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Hình ảnh</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        {previewUrl && (
          <div className="relative w-[200px] h-[120px] mt-3 border border-gray-300 rounded">
            <Image fill src={previewUrl} alt="Preview" className="object-cover" />
          </div>
        )}
      </div>
      <div className="flex justify-end mt-5 gap-3">
        <button className="px-6 py-2 bg-gray-200 text-gray-700" onClick={()=>HandleClickCancle()}>Hủy</button>
        <Button text={category ? "Cập nhật" : "Thêm danh mục"} isSubmit />
      </div>
    </form>
  );
}