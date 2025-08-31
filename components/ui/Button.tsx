import React from 'react'

const Button = ({isSubmit, text}: {isSubmit?: boolean, text: string}) => {
    return (
        <button type={isSubmit ? 'submit' : 'button'} 
            className='px-8 py-2 bg-black text-white cursor-pointer'>
            {text}
        </button>
    )
}

export default Button
