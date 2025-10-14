"use client";

import Button from "@/components/ui/Button";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    toast.success("Đăng nhập thành công");
    dispatch(
      login({
        id: "1",
        name: "Quan Kudo",
        email: data.email,
        token: "fake_token_123",
      })
    );
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="w-[450px] bg-white shadow-lg rounded-2xl px-8 py-10">
        {/* Title */}
        <h5 className="text-2xl font-medium text-center mb-5 text-black">
          Đăng nhập
        </h5>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="login_email"
              className="text-sm font-medium text-gray-700"
            >
              Tên tài khoản hoặc địa chỉ email
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="email"
              id="login_email"
              placeholder="example@gmail.com"
              {...register("email")}
              className="border border-gray-300 px-4 py-3 rounded-lg 
              transition placeholder:text-gray-400"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="login_pass"
              className="text-sm font-medium text-gray-700"
            >
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="login_pass"
              placeholder="********"
              {...register("password")}
              className="border border-gray-300 px-4 py-3 rounded-lg 
              transition placeholder:text-gray-400"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-red-600 hover:text-red-700 underline text-right"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {/* Login button */}
          <Button
            text="Đăng Nhập"
            isSubmit={true}
          />

          {/* Google login */}
          <button
            type="button"
            className="w-full flex items-center justify-center cursor-pointer gap-2 border 
              border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition text-gray-700 font-medium"
          >
            <Image width={20} height={20} src={"/google.png"} alt="Google" />
            Đăng nhập với Google
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm mt-8 text-gray-600">
          Bạn chưa có tài khoản?
          <Link
            href="/register"
            className="underline font-medium ml-1 text-red-600 hover:text-red-700"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
