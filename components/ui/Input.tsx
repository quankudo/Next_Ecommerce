import React from 'react'

interface Props {
    text?: string,
    placeholder?: string, 
    type?: string | 'text',
    haveLabel?: boolean | true
}

const Input = ({text, placeholder, type, haveLabel}: Props) => {
  return (
    <div className='flex flex-col gap-2 flex-1'>
        {haveLabel &&<label htmlFor="">
            {text} <span className='text-red-500 font-bold'>*</span>
        </label>}
        <input type={type} placeholder={placeholder} className='placeholder:text-sm block w-full border border-gray-300 rounded px-4 py-2'/>
    </div>
  )
}

export default Input
