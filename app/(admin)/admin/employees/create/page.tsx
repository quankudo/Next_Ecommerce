"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmployeeFormData, employeeSchema } from "@/schemas/employee";
import SectionHeading from "@/components/admin/SectionHeading";
import { toast } from "sonner";

export default function AddEmployeeForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      email: "",
      city: "",
      district: "",
      phone: "",
      image: null,
    },
  });

  const cityDistrictMap: Record<string, string[]> = {
    "Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 7", "Thủ Đức"],
    "Hà Nội": ["Hoàn Kiếm", "Ba Đình", "Tây Hồ", "Cầu Giấy"],
    "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Sơn Trà"],
  };

  const city = watch("city");
  const district = watch("district");

  // Reset district khi đổi city
  React.useEffect(() => {
    if (city && !cityDistrictMap[city]?.includes(district)) {
      setValue("district", "");
    }
  }, [city]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
        if (typeof reader.result === "string") {
            setImagePreview(reader.result); 
        }
        };
        reader.readAsDataURL(file);
    }
    };

  function onSubmit(data: EmployeeFormData) {
    const payload = new FormData();
    if (data.image) payload.append("image", data.image);
    payload.append("name", data.name);
    payload.append("email", data.email);
    payload.append("city", data.city);
    payload.append("district", data.district);
    payload.append("phone", data.phone);

    // Call Api thêm nhân viên
    toast.success('Thêm nhân viên thành công!');
  }

  return (
    <div className="">
      <SectionHeading text="Thêm nhân viên" links={[{href: '/admin/employees', label: 'Quản lý nhân viên'}]}/>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-5 p-4 rounded bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-1 flex flex-col items-center gap-3">
            <div className="w-36 h-36 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-sm text-gray-500">Ảnh đại diện</div>
              )}
            </div>
            <label
                htmlFor="imageUpload"
                className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 w-fit"
                >
                Upload Ảnh
            </label>
            <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tên</label>
              <input
                {...register("name")}
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="Nguyễn Văn A"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                {...register("email")}
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="email@domain.com"
                type="email"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Thành phố</label>
              <select
                {...register("city")}
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${errors.city ? 'border-red-500' : 'border-gray-200'}`}
              >
                <option value="">-- Chọn thành phố --</option>
                {Object.keys(cityDistrictMap).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Quận / Huyện</label>
              <select
                {...register("district")}
                disabled={!city}
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${errors.district ? 'border-red-500' : 'border-gray-200'}`}
              >
                <option value="">-- Chọn quận/huyện --</option>
                {city &&
                  cityDistrictMap[city].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
              </select>
              {errors.district && <p className="text-xs text-red-500 mt-1">{errors.district.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Số điện thoại</label>
              <input
                {...register("phone")}
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="0987123456"
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              reset();
              setImagePreview(null);
            }}
            className="px-6 py-2 rounded hover:bg-gray-300 text-gray-700 bg-gray-200"
          >
            Hủy
          </button>

          <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white">
            Thêm nhân viên
          </button>
        </div>
      </form>
    </div>
  );
}