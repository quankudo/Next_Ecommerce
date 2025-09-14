'use client'
import SectionHeading from '@/components/admin/SectionHeading'
import React, { useState } from 'react'
import { listProduct, listUsers, Product, User } from '@/app/data';
import Image from 'next/image';
import { Plus, X } from 'lucide-react';
import Input from '@/components/ui/Input';
import { toast } from 'sonner';
import { formatCurrency } from '@/utils/format';
import Button from '@/components/ui/Button';
import Swal from 'sweetalert2';

interface Order {
  productId: number,
  quantity: number,
  price: number
} 

const page = () => {
  const [user, setUser] = useState<User>();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>(listProduct);
  const [allUsers, setAllUsers] = useState<User[]>(listUsers);
  const [users, setUsers] = useState<User[]>(listUsers);
  const [userForm, setUserForm] = useState<User>();
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeSelectUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = Number(e.target.value);
    const user = allUsers.find(item=>item.id === userId);
    setUser(user);
    toast.success(user?.name);
  }

  const handleAddOrderItem = (e: React.MouseEvent<HTMLDivElement>, product: Product)=> {
    const btn = e.currentTarget;

    // tạo span +1
    const plusOne = document.createElement("span");
    plusOne.innerText = "+1";
    plusOne.className =
      "absolute text-sm font-bold text-red-500 animate-fly";
    btn.appendChild(plusOne);

    // tự xoá khi animation xong
    plusOne.addEventListener("animationend", () => {
      plusOne.remove();
    });
    product.quantity = 1;
    const isAdded = selectedProducts.find(item=>item.id===product.id);
    if(isAdded){
      setSelectedProducts(prev=>prev.map(item=>item.id===isAdded.id ? {...item, quantity: item.quantity++}: item))
    }
    else setSelectedProducts([...selectedProducts, product]);
  }

  const handleDeleteOrderItem = (id: number) => {
    setSelectedProducts(prev=>prev.filter(item=>item.id!==id))
  } 

  const totalPrice = selectedProducts.reduce((total, item)=>total+(item.newPrice*item.quantity),0)

  const handleClickCheckout = () => {
    Swal.fire({
    title: "Bạn có muốn in hóa đơn?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Có, in ngay",
    cancelButtonText: "Tiếp tục thanh toán",
  }).then((result) => {
    if (result.isConfirmed) {
      // Gọi hàm in
      window.print();
    }
    else {
    }
    toast.success('Thanh toán đơn hàng thành công!');
  });
  }

  return (
    <div>
        <SectionHeading text='Tạo đơn hàng' links={[{href:'/admin/orders', label:'Quản lý đơn hàng'}]}/>
        <div className='bg-white mt-6 p-4 rounded flex gap-10'>
          {/* Left */}
          <div className='flex-1'>
            <h4 className='text-xl mb-3'>Thông tin khách hàng</h4>
            {
              !isOpen && <div className='p-3 rounded border border-gray-200 flex gap-5'>
                <select name="" id="" 
                  onChange={handleChangeSelectUser}
                  className='outline-none flex-1 block'>
                  <option value="">--Chọn người mua--</option>
                {
                  users.map(item=>(
                    <option value={item.id} key={item.id}>{item.name} - {item.email}</option>
                  ))
                }
                </select>
                <div title='Thêm thông tin người mua' onClick={()=>setIsOpen(true)}
                  className='w-6 h-6 rounded-full bg-green-500 flex justify-center items-center cursor-pointer'>
                  <Plus className='text-white w-5 h-5'/>
                </div>
              </div>
            }
            {
              isOpen && <div className='shadow p-3 rounded'>
                <div className='flex justify-end'>
                  <X className='w-5 h-5 hover:text-red-500' 
                    onClick={()=>setIsOpen(false)}/>
                </div>
                <form className='flex flex-col gap-3'>
                  <Input text='Họ tên người dùng' haveLabel={true}/>
                  <Input text='Email' type='email' haveLabel={true}/>
                  <Input text='Số điện thoại' haveLabel={true}/>
                  <Input text='Địa chỉ' haveLabel={true}/>
                </form>
              </div>
            }
            <h4 className='text-xl my-3'>Danh sách sản phẩm</h4>
            <div className='h-[60vh] overflow-y-scroll p-3 shadow'>
            {
              products.map(item=>(
                <div key={item.id} onClick={(e)=>handleAddOrderItem(e,item)}
                  className='flex relative cursor-pointer items-center p-3 rounded hover:bg-gray-100'>
                  <div className='flex gap-3 items-center'>
                    <Image src={item.image} alt={item.name} width={50} height={50} className='object-cover'/>
                    <p>{item.name}</p>
                  </div>
                </div>
              ))
            }
            </div>
          </div>
          {/* Right */}
          <div className='flex-1'>
            <div>
              <h4 className='text-xl mb-3'>Thông tin đơn hàng</h4>
              {
                user && <div className='flex flex-col gap-3 p-3 rounded shadow'>
                <p className='flex justify-between'><span>Họ tên:</span><span className='font-medium'>{user.name}</span></p>
                <p className='flex justify-between'><span>Email:</span><span className='font-medium'>{user.email}</span></p>
                <p className='flex justify-between'><span>Số điện thoại:</span><span className='font-medium'>{user.phone}</span></p>
                <p className='flex justify-between'><span>Địa chỉ:</span><span className='font-medium'>{user.address}</span></p>
              </div>
              }
              {selectedProducts.length > 0 && (
                <>
                <table className="mt-5 w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium">STT</th>
                      <th className="text-center py-2 font-medium">Sản phẩm</th>
                      <th className="text-center py-2 font-medium">Số lượng</th>
                      <th className="text-right py-2 font-medium">Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProducts.map((product, index) => (
                      <tr key={product.id} className="border-b border-gray-200 py-2">
                        <td className="py-2">{index + 1}</td>
                        <td className="py-2">
                          <div className="flex gap-3 items-center relative">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                            <p>{product.name}</p>
                            <span className='absolute w-4 h-4 top-0 right-0 
                              rounded bg-red-500 hover:bg-red-600 flex justify-center items-center'>
                              <X className='w-3 h-3 text-white' onClick={()=>handleDeleteOrderItem(product.id)}/>
                            </span>
                          </div>
                        </td>
                        <td className="text-center py-2">{product.quantity}</td>
                        <td className="text-right py-2 text-sm">{formatCurrency(product.newPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='flex flex-col gap-3 mt-5 p-4 rounded shadow'>
                  <p className='flex justify-between items-center'><span>Tạm tính</span><span className='font-medium'>{formatCurrency(totalPrice)}</span></p>
                  <p className='flex justify-between items-center'><span>Tổng tiền</span><span className='font-medium'>{formatCurrency(totalPrice)}</span></p>
                </div>
                <div className='mt-5'>
                  <Button text='Thanh toán' isWidthFull={true} event={handleClickCheckout}/>
                </div>
              </>
              )}
            </div>
          </div>
        </div>
    </div>
  )
}

export default page