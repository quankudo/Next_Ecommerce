"use client";
import { useState } from "react";
import ColorSelect from "./ColorSelect";
import ProductImages from "./ProductImages";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { toast } from "sonner";
import Link from "next/link";

export interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
  material: string;
  length: number;
  width: number;
  height: number;
  color: string;
  status: string;
  images: string[];
}

interface Props {
  initialValues: Product;
  onSubmit: (product: Product) => void;
  mode: boolean;
}

const materialsInit = [
  "Gỗ sồi",
  "Gỗ thông",
  "Thép",
  "Inox",
  "Nhôm",
  "Nhựa ABS",
  "Nhựa PVC",
  "Kính cường lực",
  "Vải nỉ",
  "Da PU",
  "Tre",
  "Mây",
];

const brandsInit = [
  "Ashley Furniture",
  "Nội thất Hòa Phát",
  "Panasonic",
  "Philips",
  "Toshiba",
  "Sony",
  "LG",
  "Samsung",
  "Electrolux",
  "Xiaomi",
  "Sunhouse",
  "Kangaroo",
];

const categoriesInit = ["Bàn", "Ghế", "Tủ", "Giường", "Đèn"];

const ProductForm = ({ initialValues, onSubmit, mode }: Props) => {
    const [categories, setCategories] = useState(categoriesInit);
    const [materials, setMaterials] = useState(materialsInit);
    const [brands, setBrands] = useState(brandsInit);
    const [product, setProduct] = useState<Product>(initialValues);
    const [modalType, setModalType] = useState<null | "category" | "brand" | "material">(null);
    const [newValue, setNewValue] = useState("");


    const handleChange = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(product);
    };

    const handleAddNewItem = () => {
        if(modalType === "category"){
            setCategories([...categories, newValue]);
            toast.success(`Thêm mới danh mục ${newValue} thành công`)
        }
        else if(modalType === 'material'){
            setMaterials([...materials, newValue]);
            toast.success(`Thêm mới vật liệu ${newValue} thành công`)
        }
        else {
            setBrands([...brands, newValue]);
            toast.success(`Thêm mới thương hiệu ${newValue} thành công`)
        }
        setNewValue('');
        setModalType(null);
    }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-5">
            <div className="flex-1 flex flex-col gap-4">
                <div>
                    <label className="block text-sm mb-1">Tên sản phẩm</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm mb-1">Giá</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm mb-1">Số lượng</label>
                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm mb-1">Danh mục</label>
                        <div className="flex gap-2 items-center">
                            <select
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                {categories.map(c => (
                                <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            <button onClick={() => setModalType("category")} className="w-6 h-6 rounded-full border-[2px] border-red-500 flex justify-center items-center">
                                <Plus className="w-4 h-4 text-red-500"/>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm mb-1">Chất liệu</label>
                        <div className="flex gap-2 items-center">
                            <select
                                name="material"
                                value={product.material}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                {materials.map(c => (
                                <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            <button onClick={() => setModalType("material")} className="w-6 h-6 rounded-full border-[2px] border-red-500 flex justify-center items-center">
                                <Plus className="w-4 h-4 text-red-500"/>
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-1">Thương hiệu</label>
                    <div className="flex flex-wrap gap-2 items-center">
                        {brands.map((brand) => (
                        <button
                            key={brand}
                            type="button"
                            onClick={() => handleChange({
                                target: {
                                    name: "brand",
                                    value: brand,
                                },
                            })}
                            className={`px-3 py-1 rounded-full border text-sm transition
                            ${
                                product.brand === brand
                                ? "bg-red-500 text-white border-red-500"
                                : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
                            }`}
                        >
                            {brand}
                        </button>
                        ))}
                        <button onClick={() => setModalType("brand")} className="w-6 h-6 rounded-full border-[2px] border-red-500 flex justify-center items-center">
                            <Plus className="w-4 h-4 text-red-500"/>
                        </button>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div>
                        <label className="block text-sm mb-1">Chiều dài (cm)</label>
                        <input
                            type="number"
                            name="length"
                            value={product.length}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="VD: 120"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Chiều rộng (cm)</label>
                        <input
                            type="number"
                            name="width"
                            value={product.width}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="VD: 60"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Chiều cao (cm)</label>
                        <input
                            type="number"
                            name="height"
                            value={product.height}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="VD: 75"
                        />
                    </div>
                </div>
                <ColorSelect value={product.color} onChange={handleChange} />
            </div>
            <ProductImages
                images={product.images}
                onChange={(newImages) => setProduct({ ...product, images: newImages })}
            />
        </div>

        <div className="">
            <label className="block text-sm mb-1">Mô tả</label>
            <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded px-3 py-2"
            />
        </div>

        <div className="flex justify-end gap-4">
            <Link href={'/admin/products'} className="px-6 py-2 bg-gray-200 text-gray-700">Quay lại</Link>
            <Button
                isSubmit={true}
                text={ mode ? 'Thêm mới': 'Cập nhật' }/>
        </div>
        {/* Modal */}
        {modalType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-4 rounded shadow w-96">
            <h2 className="text-lg font-semibold mb-2">
                {modalType === "category" && "Thêm danh mục mới"}
                {modalType === "brand" && "Thêm thương hiệu mới"}
                {modalType === "material" && "Thêm chất liệu mới"}
            </h2>
            <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-3"
                placeholder="Nhập tên..."
            />
            <div className="flex justify-end gap-2">
                <button onClick={() => setModalType(null)} className="px-4 py-2 border rounded">
                Hủy
                </button>
                <Button text="Thêm" event={handleAddNewItem} />
            </div>
            </div>
        </div>
        )}
    </form>
  )
}

export default ProductForm
