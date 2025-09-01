import Button from '@/components/ui/Button'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='flex justify-center items-center pt-16'>
            <div className='w-[450px]'>
                <h5 className='text-2xl mb-5'>Đăng Ký Tài Khoản</h5>
                <form action="" method="post" className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="register_name">
                            Tên tài khoản
                            <span className='text-red-500'> *</span>
                        </label>
                        <input type="text" id='register_name'
                            className='border border-black px-4 py-2 rounded'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="register_email">
                            Địa chỉ email 
                            <span className='text-red-500'> *</span>
                        </label>
                        <input type="email" id='register_email' placeholder='example@gmail.com'
                            className='border border-black px-4 py-2 rounded'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="register_pass">
                            Mật khẩu <span className='text-red-500'>*</span>
                        </label>
                        <input type="password" id='register_pass' placeholder='********'
                            className='border border-black px-4 py-2 rounded'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="register_confirmPass">
                            Xác nhận mật khẩu <span className='text-red-500'>*</span>
                        </label>
                        <input type="password" id='register_confirmPass' placeholder='********'
                            className='border border-black px-4 py-2 rounded'/>
                    </div>
                    <p className="text-sm text-gray-600 text-right">
                        Bạn đã có tài khoản?{" "}
                        <Link href="/login"
                            className="text-blue-600 hover:underline font-medium">
                            Đăng nhập
                        </Link>
                    </p>
                    <Button text='Đăng Ký' isSubmit={true} />
                </form>
            </div>
        </div>
    )
}

export default page
