"use client";

import SectionTitle from "@/components/SectionTitle";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromWishlist } from "@/redux/wishlistSlice";

// Mock data (giả sử là dữ liệu từ backend)
const productData = [
  {
    id:'1',
    name: "Dining Chair 0073 WF MG-01",
    price: "180,000₫",
    discount: "170,000₫",
    createdAt: "31/08/2025",
    imageUrl:
      "https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/prod1-300x300.png",
  },
  {
    id: '2',
    name: "Lori Leather Otto man Site w/Tray",
    price: "490,000₫",
    discount: "390,000₫",
    createdAt: "31/08/2025",
    imageUrl:
      "https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/mora-300x300.png",
  },
  {
    id: '3',
    name: "Leather Singint Tols In Canada Chair",
    price: "280,000₫",
    discount: "200,000₫",
    createdAt: "31/08/2025",
    imageUrl:
      "https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/new-schair-300x300.png",
  },
];

const Page = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  // Lọc sản phẩm có id nằm trong wishlist
  const wishProducts = productData.filter((p) => wishlist.includes(p.id));

  return (
    <div>
      <SectionTitle title="Wishlist" />
      <div className="px-32">
        {wishProducts.length === 0 ? (
          <p className="text-center mt-10 text-gray-500">
            Danh sách yêu thích đang trống 😢
          </p>
        ) : (
          <table className="w-full mt-14 border border-gray-300 border-collapse">
            <tbody>
              {wishProducts.map((item) => (
                <tr key={item.id} className="border-b border-gray-300">
                  <td className="p-3 border border-gray-300 text-center w-[5%]">
                    <button
                      className="p-1 hover:text-red-500"
                      onClick={() => dispatch(removeFromWishlist(item.id))}
                    >
                      <X size={18} />
                    </button>
                  </td>
                  <td className="p-3 border border-gray-300 text-center w-[15%]">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="object-contain mx-auto"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 w-[80%]">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">{item.name}</h5>
                        <p className="text-gray-500 text-sm">
                          <span className="line-through mr-2">{item.price}</span>
                          <span className="text-red-500 font-semibold">
                            {item.discount}
                          </span>
                        </p>
                        <p className="text-xs text-gray-400">
                          Ngày thêm: {item.createdAt}
                        </p>
                      </div>
                      <Link
                        href={`/product/${item.id}`}
                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                      >
                        Thêm vào giỏ hàng
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Page;