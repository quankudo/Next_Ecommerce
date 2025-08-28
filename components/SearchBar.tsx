import { Search } from 'lucide-react'
import React from 'react'

const SearchBar = () => {
  return (
    <div className='flex items-center gap-3 w-[260px] rounded-3xl bg-gray-100 border-1 border-gray-400 px-4 py-2'>
        <input type="text" className='flex-1 outline-none border-none' placeholder='Tìm kiếm' />
        <Search className='w-5 h-5 text-black' strokeWidth={1}/>
    </div>
  )
}

export default SearchBar
