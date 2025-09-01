"use client";

import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
        dispatch(
            login({ id: "1", name: "Quan Kudo", email, token: "fake_token_123" })
        );
        router.push("/");
        }
    };

  return (
    <div className="flex justify-center items-center pt-16">
        <div className="w-[450px]">
            <h5 className="text-2xl mb-5 font-medium">Đăng nhập</h5>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col gap-2">
                <label htmlFor="login_email" className="text-sm font-medium">
                Tên tài khoản hoặc địa chỉ email
                <span className="text-red-500"> *</span>
                </label>
                <input
                    type="email"
                    id="login_email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
                <label htmlFor="login_pass" className="text-sm font-medium">
                Mật khẩu <span className="text-red-500">*</span>
                </label>
                <input
                    type="password"
                    id="login_pass"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
                <Link
                    href="/forgot-password"
                    className="text-sm font-medium underline text-right"
                >
                Quên mật khẩu?
                </Link>
            </div>

            <Button text="Đăng Nhập" isSubmit={true} />

            {/* Google login */}
            <button
                type="button"
                className="w-full flex items-center justify-center cursor-pointer gap-2 border 
                    border-gray-300 rounded py-2 hover:bg-gray-50 transition"
            >
                <Image width={20} height={20} src={"/google.png"} alt="Google" />
                Đăng nhập với Google
            </button>
            </form>

            {/* Register link */}
            <p className="text-center text-sm mt-6">
                Bạn chưa có tài khoản?
                <Link href="/register" className="underline font-medium ml-1">
                    Đăng ký ngay
                </Link>
            </p>
        </div>
    </div>
  );
};

export default Page;
