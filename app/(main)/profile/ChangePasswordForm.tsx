import Button from '@/components/ui/Button'
import React from 'react'

const ChangePasswordForm = () => {
  return (
    <div>
        <h1 className="text-2xl mb-4">Đổi mật khẩu</h1>
        <form className="space-y-4 max-w-lg">
        <div>
            <label className="block mb-1 font-medium">Mật khẩu hiện tại</label>
            <input type="password" className="w-full border rounded-md p-2" />
        </div>
        <div>
            <label className="block mb-1 font-medium">Mật khẩu mới</label>
            <input type="password" className="w-full border rounded-md p-2" />
        </div>
        <div>
            <label className="block mb-1 font-medium">Xác nhận mật khẩu</label>
            <input type="password" className="w-full border rounded-md p-2" />
        </div>
        <Button text="Lưu thay đổi" isSubmit={true} />
        </form>
    </div>
  )
}

export default ChangePasswordForm
