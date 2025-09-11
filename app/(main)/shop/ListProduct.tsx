'use client'
import { listProduct, Product } from '@/app/data';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/ui/Pagination';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ListProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const currentShow = parseInt(searchParams.get("show") || "9", 10); 
    useEffect(()=> {
        const start = (currentPage - 1) * currentShow;
        const end = start + currentShow;
        setProducts(listProduct.slice(start, end));
        setTotal(Math.ceil(listProduct.length / currentShow));
    },[currentPage, currentShow])
    return (
        <>
            <div className='grid grid-cols-3 gap-5'>
                {products.map((item)=>(
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
            <Pagination
                currentPage={currentPage} 
                totalPages={total} 
            />
        </>
    )
}

export default ListProduct
