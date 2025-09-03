import Image from 'next/image'
import React from 'react'

const listFeatures = [
    {
        id: 1,
        imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/service-2.png',
        title: 'Miễn Phí Vận Chuyển',
        desc: 'Mona Furniture - Miễn phí vận chuyển cho mọi đơn hàng! Mang sản phẩm nội thất chất lượng đến tận tay bạn mà không mất thêm chi phí vận chuyển.'
    },
    {
        id: 2,
        imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/service-1.png',
        title: 'Chính Sách Đổi Trả Dễ Dàng',
        desc: 'Mona Furniture - Đổi trả đơn giản, dễ dàng. Không hài lòng với sản phẩm? Mona Furniture mang đến chính sách đổi trả dễ dàng và nhanh chóng, đảm bảo quyền lợi cho bạn.'
    },
    {
        id: 3,
        imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/service-2.png',
        title: 'Chính Sách Bảo Hành Uy Tín',
        desc: 'Mona Furniture - Sản phẩm chất lượng, bảo hành dài lâu. Mỗi sản phẩm nội thất của Mona Furniture đều được bảo hành tận tâm, giúp bạn yên tâm sử dụng lâu dài.'
    }
]

const FeaturesList = () => {
    return (
        <div className='mx-32 mt-14 bg-gray-100 flex gap-5 p-5'>
            {listFeatures.map((item)=>(
                <div
                    className='hover:bg-white flex items-center flex-col p-8'
                    key={item.id}>
                    <Image src={item.imageUrl} alt={item.title} width={300} height={300} className='object-contain w-[250px] h-[200px]'/>
                    <h5 className='text-2xl mb-4 text-center'>{item.title}</h5>
                    <p className='leading-relaxed text-gray-600 text-center'>{item.desc}</p>
                </div>
            ))}
        </div>
    )
}

export default FeaturesList
