"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/schemas/auth";
import { toast } from "sonner";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    toast.success("Đăng ký thành công")
    console.log("Register Data:", data);
    // 🚀 call API register ở đây
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="w-[450px] bg-white shadow-lg rounded-2xl px-8 py-10">
        <h5 className="text-2xl font-medium text-center mb-5">Đăng Ký Tài Khoản</h5>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="register_name">
              Tên tài khoản <span className="text-red-500">*</span>
            </label>
            <input
              id="register_name"
              type="text"
              {...register("name")}
              className="border border-black px-4 py-2 rounded"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="register_email">
              Địa chỉ email <span className="text-red-500">*</span>
            </label>
            <input
              id="register_email"
              type="email"
              {...register("email")}
              placeholder="example@gmail.com"
              className="border border-black px-4 py-2 rounded"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="register_pass">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              id="register_pass"
              type="password"
              {...register("password")}
              placeholder="********"
              className="border border-black px-4 py-2 rounded"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="register_confirmPassword">
              Xác nhận mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              id="register_confirmPassword"
              type="password"
              {...register("confirmPassword")}
              placeholder="********"
              className="border border-black px-4 py-2 rounded"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <p className="text-sm text-gray-600 text-right">
            Bạn đã có tài khoản?{" "}
            <Link
              href="/login"
              className="text-red-600 hover:underline font-medium"
            >
              Đăng nhập
            </Link>
          </p>

          <Button text="Đăng Ký" isSubmit={true} />
        </form>
      </div>
    </div>
  );
};

export default Page;