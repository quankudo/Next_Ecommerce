"use client";

import SectionTitle from "@/components/SectionTitle";
import { X } from "lucide-react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromWishlist } from "@/redux/wishlistSlice";
import Empty from "@/components/ui/Empty";
import { listProduct, Product } from "@/app/data";
import { addItem } from "@/redux/cartSlice";
import { toast } from "sonner";

const Page = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  // Lọc sản phẩm có id nằm trong wishlist
  const wishProducts = listProduct.filter((p) => wishlist.includes(p.id+''));

  const addToCart = (product: Product) => {
    dispatch(addItem({
      id: product.id+'',
      name: product.name,
      price: product.newPrice,
      quantity: 1,
      imageUrl: product.image
    }));
    toast.success('Thêm vào giỏ hàng thành công!');
  }
  return (
    <div>
      <SectionTitle title="Wishlist" />
      <div className="px-32">
        {wishProducts.length === 0 ? (
          <Empty
            title="Danh sách yêu thích trống"
            description="Bạn chưa thêm sản phẩm nào vào danh sách yêu thích."
            actionLabel="Khám phá sản phẩm"
            actionHref="/shop"
          />
        ) : (
          <table className="w-full mt-14 border border-gray-300 border-collapse">
            <tbody>
              {wishProducts.map((item) => (
                <tr key={item.id} className="border-b border-gray-300">
                  <td className="p-3 border border-gray-300 text-center w-[5%]">
                    <button
                      className="p-1 hover:text-red-500"
                      onClick={() => dispatch(removeFromWishlist(item.id+''))}
                    >
                      <X size={18} />
                    </button>
                  </td>
                  <td className="p-3 border border-gray-300 text-center w-[15%]">
                    <Image
                      src={item.image}
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
                          <span className="line-through mr-2">{item.newPrice}</span>
                          <span className="text-red-500 font-semibold">
                            -{item.discount}%
                          </span>
                        </p>
                        <p className="text-xs text-gray-400">
                          Ngày thêm: {'20/10/2025'}
                        </p>
                      </div>
                      <button onClick={()=>addToCart(item)}
                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                      >
                        Thêm vào giỏ hàng
                      </button>
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