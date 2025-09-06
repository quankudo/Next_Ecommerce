"use client";

import { User, Lock, LogOut, Archive } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";

const listTab = [
  { title: "Thông tin cá nhân", pathName: "/account/profile", href: "/account/profile", icon: User },
  { title: "Đơn hàng", pathName: "/account/order", href: "/account/order/pending", icon: Archive },
  { title: "Đổi mật khẩu", pathName: "/account/password", href: "/account/password", icon: Lock },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  return (
    <div>
      <SectionTitle title="Quản lý tài khoản" />
      <div className="mx-32 flex mt-14 border border-gray-300 rounded">
        {/* Sidebar */}
        <aside className="w-64 rounded bg-white shadow-md p-4 sticky top-24 min-h-[78vh] self-start">
          <h2 className="text-xl text-center">Tài khoản</h2>
          <hr className="text-gray-300 my-3"/>
          <ul className="space-y-3">
            {listTab.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 w-full text-left p-2 rounded-md ${
                    pathname.includes(item.pathName)
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => dispatch(logout())}
                className="flex items-center gap-2 w-full text-left p-2 rounded-md hover:bg-gray-100 text-red-600"
              >
                <LogOut className="w-5 h-5" />
                Đăng xuất
              </button>
            </li>
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-5 min-h-[70vh]">{children}</main>
      </div>
    </div>
  );
}