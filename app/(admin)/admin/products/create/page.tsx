"use client";
import SectionHeading from "@/components/admin/SectionHeading";
import ProductForm, { Product } from "../ProductForm";

const initialValues: Product ={
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    brand: "",
    material: "",
    length: 0,
    width: 0,
    height: 0,
    color: "",
    status: "Active",
    images: [],
}


export default function page() {
  return (
    <div>
        <SectionHeading text="Thêm mới sản phẩm" links={[{label: "Quản lý sản phẩm", href:"/admin/products"}]}/>
        <div className="mt-5 p-4 rounded bg-white">
            <h2 className="text-xl font-semibold mb-4">Thêm mới sản phẩm</h2>
            <ProductForm
                initialValues={initialValues}
                onSubmit={(product) => {
                    // gọi API PUT
                }}
                mode={true}
            />
        </div>
    </div>
  );
}
