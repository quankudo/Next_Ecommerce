'use client'

import { useState } from "react"
import SectionTitle from "@/components/SectionTitle"
import { ChevronDown } from "lucide-react"
import Button from "@/components/ui/Button"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { formatCurrency } from "@/utils/format"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { toast } from "sonner"
import { addresses } from "@/app/data"

const Page = () => {
  const [selectedAddressId, setSelectedAddressId] = useState<number>(addresses[0].id);
  const [paymentStatus, setPaymentStatus] = useState('bank');
  const [isOpen, setIsOpen] = useState(false);

  const items = useSelector((state: RootState) => state.cart.items); 
  const totalCartPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

  const router = useRouter();
  const handleClickCancle = () => {
     Swal.fire({
      title: "Bạn không muốn thanh toán bây giờ à?",
      text: "Bạn có thể quay lại giỏ hàng để xem hoặc chỉnh sửa đơn.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Quay lại giỏ hàng",
      cancelButtonText: "Tiếp tục thanh toán",
    }).then((result) => {
      if (result.isConfirmed) {
        router.back();
      }
    });
  }

  const handleClickPayment =() => {
    // Call API
    // Xóa giỏ hàng
    toast.success('Đặt hàng thành công!');
    router.push('/');
  }
  return (
    <div>
      <SectionTitle title="Thanh Toán" />
      <div className="px-32 my-14 flex items-start gap-5">
        {/* Thông tin thanh toán */}
        <div className="flex-1">
          <h4 className="text-2xl">Thông tin thanh toán</h4>

          {/* Địa chỉ đang chọn */}
          {selectedAddress && (
            <div className="flex justify-between items-start shadow py-3 px-4 mt-4 mb-2">
              <div className="flex-1">
                <div className="flex gap-3 items-center">
                  <p className="font-medium text-[16px]">{selectedAddress.name}</p>
                  <p className="text-gray-600 text-sm">{selectedAddress.phone}</p>
                </div>
                <p className="text-gray-700 text-sm mt-1">{selectedAddress.line1}</p>
                <p className="text-gray-700 text-sm">{selectedAddress.line2}</p>
                {selectedAddress.isDefault && (
                  <span className="inline-block px-2 mt-2 text-sm rounded border border-red-500 text-red-500">Mặc định</span>
                )}
              </div>
              <button
                className={`cursor-pointer px-2 py-1 border border-red-500 flex justify-center items-center rounded transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <ChevronDown className="w-5 h-5 text-red-500" />
              </button>
            </div>
          )}

          {/* Danh sách địa chỉ */}
          <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
            {addresses.map(addr => (
              addr.id !== selectedAddressId && (
                <div
                  key={addr.id}
                  className="flex justify-between items-start shadow py-3 px-4 mb-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    setSelectedAddressId(addr.id)
                    setIsOpen(false)
                  }}
                >
                  <div className="flex-1">
                    <div className="flex gap-3 items-start">
                      <p className="font-medium text-[16px]">{addr.name}</p>
                      <p className="text-gray-600 text-sm">{addr.phone}</p>
                    </div>
                    <p className="text-gray-700 text-sm mt-1">{addr.line1}</p>
                    <p className="text-gray-700 text-sm">{addr.line2}</p>
                    {addr.isDefault && (
                      <span className="inline-block px-2 mt-2 text-sm rounded border border-red-500 text-red-500">Mặc định</span>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>

          <h4 className="text-2xl mt-5">Thông tin bổ sung</h4>
          <div className="mt-4">
            <p className="text-sm">Ghi chú đơn hàng (tuỳ chọn)</p>
            <textarea className="h-24 w-full placeholder:text-sm px-4 py-2 border border-gray-300 rounded mt-2"
                placeholder="Ghi chú về đơn hàng, Ví dụ: thời gian hay địa chỉ đơn hàng chi tiết hơn."/>
          </div>
        </div>

        {/* Thông tin đơn hàng */}
        <div className="w-[600px]">
            <h4 className="text-2xl">Thông tin đơn hàng</h4>
            <div className="p-4 rounded border border-gray-300 mt-4">
                <div className="flex justify-between">
                    <span className="font-medium">Sản phẩm</span>
                    <span className="font-medium">Tạm tính</span>
                </div>
                <div className="mt-4 flex flex-col">
                  {items.map(item=>(
                    <div key={item.id} className="flex justify-between items-center border-t border-gray-300 py-4">
                      <p className="text-sm">{item.name}  <span className="font-bold">x {item.quantity}</span></p>
                      <span className="text-sm">{formatCurrency(item.price)}</span>
                    </div>
                  ))}
                </div>
                <p className="flex justify-between items-center text-sm border-t border-b mt-3 border-gray-300 py-4"><span className="font-medium">Tạm tính</span><span>{formatCurrency(totalCartPrice)}</span></p>
                <p className="flex justify-between items-center text-xl mt-4"><span className="font-medium">Tổng</span><span>{formatCurrency(totalCartPrice)}</span></p>
                <div className="rounded p-4 bg-gray-100 mt-5">
                    <div className="flex items-center gap-3">
                        <input type="radio" 
                            name="paymentStatus" 
                            id=""
                            value="bank"
                            checked={paymentStatus === "bank"}
                            onChange={() => setPaymentStatus("bank")} />
                        <span className="text-sm">Chuyển khoản ngân hàng</span>
                    </div>
                    <p className={`overflow-hidden transition-all duration-500 ease-in-out 
                        bg-purple-100 rounded text-sm mb-3 mt-2 text-gray-700 
                        ${paymentStatus === 'bank' ? 'px-3 py-2 max-h-40 opacity-100' : 'max-h-0 opacity-0 p-0'}`}>
                        Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. 
                        Vui lòng sử dụng Mã đơn hàng của bạn trong phần Nội dung thanh toán. 
                        Đơn hàng sẽ đươc giao sau khi tiền đã chuyển.
                    </p>
                    <div className="flex items-center gap-3">
                        <input
                            type="radio"
                            name="paymentStatus"
                            value="cod"
                            checked={paymentStatus === "cod"}
                            onChange={() => setPaymentStatus("cod")}
                        />
                        <span className="text-sm">Trả tiền mặt khi nhận hàng</span>
                    </div>
                    <p className={`overflow-hidden transition-all duration-500 ease-in-out 
                        bg-purple-100 rounded text-sm mt-2 px-3 py-2 text-gray-700 
                        ${paymentStatus === 'cod' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        Trả tiền mặt khi giao hàng.
                    </p>
                    <hr className="text-gray-400 my-4"/>
                    <div className="flex justify-end gap-4">
                      <button onClick={()=>handleClickCancle()}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700">
                        Quay lại
                      </button>
                      <Button text="ĐẶT HÀNG" event={handleClickPayment}/>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Page