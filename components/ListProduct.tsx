import React from 'react'
import CategoryTitle from './CategoryTitle'
import ProductCard from './ProductCard'
import { listProduct, Product } from '@/app/data'

const ListProduct = ({title, category}: {title: string, category: string}) => {
  const products = listProduct.filter((item=>item.category===category));
  return (
    <div className="px-32 pt-16">
        <CategoryTitle title={title}/>
        <div className="grid grid-cols-4 gap-5">
          {products.map((item) => (
            <ProductCard key={item.id} product={item}/>
          ))}
        </div>
    </div>
  )
}

export default ListProduct
