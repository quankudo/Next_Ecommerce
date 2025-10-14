'use client'
import { addresses as initialAddresses } from "@/app/data";
import { Address } from "@/types/address";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [addresses, setAddresses] = useState(initialAddresses);

  const [formData, setFormData] = useState<Address>({
    id: -1,
    name: "",
    phone: "",
    line1: "",
    line2: "",
    isDefault: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.isDefault){
      setAddresses(prev=>prev.map(item=>{
        item.isDefault=false;
        return item;
      }));
    }
    if(formData.id>=0){
      toast.success("Cập nhật địa chỉ mới thành công!");
      setAddresses(prev=>prev.map(item=>item.id===formData.id? formData: item));
    }
    else {
      toast.success("Thêm địa chỉ mới thành công!");
      setAddresses([...addresses, formData]);
    }
  };

  const handleSetDefault = (id: number) => {
    const updated = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    }));
    setAddresses(updated);
  };

  const handleClickUpdateAddress = (addr: Address) => {
    setFormData(addr);
  }

  const handleClickCancle =() => {
    setFormData({
      id: -1,
      name: "",
      phone: "",
      line1: "",
      line2: "",
      isDefault: false,
    });
  }

  return (
    <div>
      <h1 className="text-2xl mb-4 text-black">
        Quản lý địa chỉ
      </h1>
      <div className="flex gap-8">
        {/* Danh sách địa chỉ */}
        <div className="flex-1">
          <div
            className={`overflow-hidden transition-all duration-500 max-h-[500px]`}
          >
            {addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={()=>handleClickUpdateAddress(addr)}
                className={`rounded-lg shadow-sm py-4 px-5 mb-3 border transition 
                  ${
                    addr.isDefault
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:shadow-md hover:bg-gray-50"
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex gap-3 items-start">
                      <p className="font-medium text-[16px] text-black">
                        {addr.name}
                      </p>
                      <p className="text-gray-600 text-sm">{addr.phone}</p>
                    </div>
                    <p className="text-gray-700 text-sm mt-1">{addr.line1}</p>
                    <p className="text-gray-700 text-sm">{addr.line2}</p>
                    {addr.isDefault && (
                      <span className="inline-block px-2 mt-2 text-xs rounded border border-red-500 text-red-500 font-medium">
                        Mặc định
                      </span>
                    )}
                  </div>

                  {/* Nút chọn mặc định */}
                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-sm px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
                    >
                      Đặt mặc định
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="flex justify-center gap-3 items-center mt-4
              cursor-pointer px-4 py-2 hover:bg-red-50 border rounded border-red-500"
              onClick={handleClickCancle}>
              <span className="w-5 h-5 rounded-full border border-red-500 flex justify-center items-center">
                <Plus className="w-4 h-4 text-red-500"/>
              </span>
              <p className="text-red-500">Thêm địa chỉ mới</p></button>
          </div>
        </div>

        {/* Form thêm/cập nhật (giữ nguyên form ở code trước) */}
        <div className="w-[400px] bg-white border border-gray-200 shadow-md rounded p-5">
          <h2 className="text-lg font-semibold mb-4 text-black">
            Thêm / Cập nhật địa chỉ
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Họ tên */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Số điện thoại
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0987654321"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            {/* Địa chỉ dòng 1 */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Địa chỉ (dòng 1)
              </label>
              <input
                type="text"
                name="line1"
                value={formData.line1}
                onChange={handleChange}
                placeholder="Số nhà, đường..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            {/* Địa chỉ dòng 2 */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Địa chỉ (dòng 2)
              </label>
              <input
                type="text"
                name="line2"
                value={formData.line2}
                onChange={handleChange}
                placeholder="Phường/Xã, Quận/Huyện, Tỉnh/Thành phố"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            {/* Checkbox mặc định */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isDefault"
                checked={!!formData.isDefault}
                onChange={handleChange}
                className="w-4 h-4 accent-red-500"
              />
              <label className="text-sm text-gray-700 font-medium">
                Đặt làm địa chỉ mặc định
              </label>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button type="button" className="py-2 px-8 rounded bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={handleClickCancle}>Hủy</button>
              <button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded py-2 font-medium shadow transition"
              >
                {formData.id>=0 ? "Cập nhật địa chỉ": "Thêm địa chỉ"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;