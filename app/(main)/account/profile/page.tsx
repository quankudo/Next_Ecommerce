import Button from '@/components/ui/Button'
import React from 'react'

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thông tin cá nhân | MyShop",
  description: "Cập nhật thông tin cá nhân của bạn",
};

const UpdateProfileForm = () => {
    return (
        <div>
            <h1 className="text-2xl mb-4">Thông tin cá nhân</h1>
            <form className="space-y-4 max-w-lg">
            <div>
                <label className="block mb-1 font-medium">Họ và tên</label>
                <input
                type="text"
                className="w-full border rounded-md p-2"
                defaultValue="Nguyễn Văn A"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                type="email"
                className="w-full border rounded-md p-2"
                defaultValue="nguyenvana@example.com"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium">Số điện thoại</label>
                <input
                type="text"
                className="w-full border rounded-md p-2"
                defaultValue="Chưa có"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium">Địa chỉ</label>
                <input
                type="text"
                className="w-full border rounded-md p-2"
                defaultValue="Chưa có"
                />
            </div>
            <Button text="Cập nhật" isSubmit={true} isWidthFull={true}/>
            </form>
        </div>
    )
}

export default UpdateProfileForm
