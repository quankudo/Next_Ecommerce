import React from 'react'
import CategoryTitle from './CategoryTitle'
import ProductCard from './ProductCard'

const ListProduct = ({title, count}: {title: string,  count: number}) => {
  return (
    <div className="px-32 py-16">
        <CategoryTitle title={title}/>
        <div className="grid grid-cols-4 gap-5">
          {Array.from({ length: count }).map((_, index) => (
            <ProductCard key={index} />
          ))}
        </div>
    </div>
  )
}

export default ListProduct
