"use client";

const mockOrders = {
  delivered: [
    {
      id: "HD000123",
      customer: "Nguyễn Văn A",
      address: "123 Lê Lợi, Q.1, TP.HCM",
      phone: "0987 654 321",
      date: "06/09/2025",
      items: [
        { code: "G001", name: "Giường gỗ sồi 1m6", qty: 1, price: 5500000 },
        { code: "C002", name: "Ghế sofa vải xám", qty: 2, price: 3200000 },
        { code: "L003", name: "Đèn bàn gốm", qty: 1, price: 950000 },
      ],
    },
  ],
};

export default function OrderStatusClient({ status }: { status: string }) {
  const orders = mockOrders[status as keyof typeof mockOrders] || [];

  if (!orders.length) {
    return <p>Không có đơn hàng nào ở trạng thái "{status}".</p>;
  }

  return (
    <div className="space-y-8">
      {orders.map((order) => {
        const total = order.items.reduce((s, i) => s + i.price * i.qty, 0);
        const vat = total * 0.1;
        const grand = total + vat;
        return (
          <div key={order.id} className="border border-gray-300 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Hóa đơn: {order.id}</h2>
            <div className="flex justify-between items-center">
              <div>
                <p>Khách hàng: {order.customer}</p>
                <p>SĐT: {order.phone}</p>
              </div>
              <div>
                <p>Địa chỉ: {order.address}</p>
                <p>Ngày: {order.date}</p>
              </div>
            </div>

            <table className="w-full mt-4 border border-gray-300 border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="p-2 text-left">Mã SP</th>
                  <th className="p-2 text-left">Tên sản phẩm</th>
                  <th className="p-2">SL</th>
                  <th className="p-2">Đơn giá</th>
                  <th className="p-2">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.code} className="border-b border-gray-300">
                    <td className="p-2">{item.code}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2 text-center">{item.qty}</td>
                    <td className="p-2 text-right">
                      {item.price.toLocaleString()} VND
                    </td>
                    <td className="p-2 text-right">
                      {(item.price * item.qty).toLocaleString()} VND
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right mt-4 space-y-1">
              <p>Tổng cộng: {total.toLocaleString()} VND</p>
              <p>VAT (10%): {vat.toLocaleString()} VND</p>
              <p className="font-semibold">
                Thanh toán: {grand.toLocaleString()} VND
              </p>
            </div>

            <p className="mt-2">Bảo hành: 12 tháng.</p>
          </div>
        );
      })}
    </div>
  );
}
