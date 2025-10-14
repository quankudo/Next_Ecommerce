"use client";

import SectionHeading from "@/components/admin/SectionHeading";
import ProductForm from "../../ProductForm";

export default function UpdateProductPage() {
    const initialValues ={
        name: "Bàn gỗ tự nhiên",
        description: "Bàn gỗ cao cấp, phù hợp phòng khách và phòng ăn.",
        price: 2500000,
        stock: 15,
        category: "Bàn",
        brand: "Nội thất Hòa Phát",
        material: "Gỗ sồi",
        length: 120,
        width: 60,
        height: 75,
        color: "Nâu",
        status: "Active",
        images: ['https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/sofa2-600x600.png',
            'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/pro-6-600x600.png'
        ] as string[],
    };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     Swal.fire({
//       title: "Cập nhật thành công!",
//       text: `Sản phẩm "${product.name}" đã được lưu.`,
//       icon: "success",
//       timer: 1500,
//       showConfirmButton: false,
//     });
//   };

    return (
        <div>
            <SectionHeading text="Cập nhật sản phẩm" links={[{label: "Quản lý sản phẩm", href:"/admin/products"}]}/>
            <div className="mt-5 p-4 rounded bg-white">
            <h2 className="text-xl font-semibold mb-4">Cập nhật sản phẩm</h2>
            <ProductForm
                initialValues={initialValues}
                mode={false}
                onSubmit={(product) => {
                    // gọi API PUT
                }}
            />
            </div>
        </div>
    );
}