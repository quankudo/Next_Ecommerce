// app/account/page.tsx
"use client";

import { useState } from "react";
import { User, Lock, LogOut, Archive } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ChangePasswordForm from "./ChangePasswordForm";
import UpdateProfileForm from "./UpdateProfileForm";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import OrderManagement from "./OrderManagement";

const listTab = [
  {
    title: 'Thông tin cá nhân',
    name: 'profile',
    icon: User
  },
  {
    title: 'Đơn hàng',
    name: 'order',
    icon: Archive
  },
  {
    title: 'Đổi mật khẩu',
    name: 'password',
    icon: Lock
  }
]

const page = () =>{
  const [tab, setTab] = useState("profile");
  const dispatch = useDispatch();
  return (
    <div className="">
      <SectionTitle title="Quản lý tài khoản"/>
      <div className="mx-32 flex mt-14 shadow">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-4">
          <h2 className="text-xl mb-6">Tài khoản</h2>
          <ul className="space-y-3">
            {
              listTab.map(item=>(
                <li key={item.name}>
                  <button
                    onClick={() => setTab(item.name)}
                    className={`flex items-center gap-2 w-full text-left p-2 rounded-md ${
                      tab === item.name ? "bg-black text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.title}
                  </button>
                </li>
              ))
            }
            <li>
              <button onClick={()=>dispatch(logout())}
                className="flex items-center gap-2 w-full text-left p-2 rounded-md hover:bg-gray-100 text-red-600">
                <LogOut className="w-5 h-5" />
                Đăng xuất
              </button>
            </li>
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          {tab === "profile" && (
            <UpdateProfileForm />
          )}

          {tab === "password" && (
            <ChangePasswordForm />
          )}

          {tab === "order" && (
            <OrderManagement />
          )}
        </main>
      </div>
    </div>
  );
}

export default page;
