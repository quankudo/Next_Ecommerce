"use client";

interface Product {
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  customer: string;
  products: Product[];
}

const recentOrders: Order[] = [
  {
    id: "DH001",
    customer: "Nguyễn Văn A",
    products: [
      { name: "Bàn làm việc gỗ", quantity: 1 },
      { name: "Ghế Ergonomic", quantity: 2 },
    ],
  },
  {
    id: "DH002",
    customer: "Trần Thị B",
    products: [
      { name: "Đèn bàn LED", quantity: 1 },
      { name: "Tủ hồ sơ", quantity: 1 },
    ],
  },
  {
    id: "DH003",
    customer: "Lê Văn C",
    products: [{ name: "Laptop Stand", quantity: 1 }],
  },
  {
    id: "DH004",
    customer: "Phạm Thị D",
    products: [
      { name: "Chuột không dây", quantity: 2 },
      { name: "Bàn phím cơ", quantity: 1 },
      { name: "Tai nghe Bluetooth", quantity: 1 },
      { name: "Ổ cứng SSD 1TB", quantity: 1 },
      { name: "USB 64GB", quantity: 3 },
    ],
  },
  {
    id: "DH005",
    customer: "Hoàng Văn E",
    products: [
      { name: "Máy in Canon", quantity: 1 },
      { name: "Giấy A4 (500 tờ)", quantity: 2 },
      { name: "Mực in Laser", quantity: 1 },
      { name: "Kệ sách gỗ", quantity: 1 },
    ],
  },
];

export default function RecentOrders() {
  return (
    <div className="bg-white rounded-md shadow p-4 h-full overflow-y-scroll">
      <h2 className="text-lg font-semibold mb-4">Đơn hàng gần đây</h2>
      <ul className="space-y-4">
        {recentOrders.map((order) => (
          <li
            key={order.id}
            className="border rounded p-4 hover:shadow transition"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{order.customer}</span>
              <span className="text-sm text-gray-500">{order.id}</span>
            </div>
            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              {order.products.map((p, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{p.name}</span>
                  <span className="text-gray-600">x{p.quantity}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}